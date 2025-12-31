import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { User, Sparkles, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import posthog from "@/lib/posthog";

const formSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const UserDetailsPopup = ({ delayMs = 10000 }: { delayMs?: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    // Check if popup was already shown in this session
    const hasShownPopup = sessionStorage.getItem("user_details_popup_shown");
    
    if (hasShownPopup) {
      return;
    }

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("user_details_popup_shown", "true");
      
      // Track popup view
      posthog.capture("user_details_popup_shown", {
        delay_ms: delayMs,
      });
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Track user details submission with PostHog
      posthog.capture("user_details_submitted", {
        name: data.name,
        email: data.email,
        source: "popup",
      });

      // Identify user in PostHog
      posthog.identify(data.email, {
        name: data.name,
        email: data.email,
      });

      // Simulate API call (replace with actual service)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Thank you! 🎉",
        description: "Your details have been saved successfully.",
      });

      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    posthog.capture("user_details_popup_closed", {
      has_interaction: form.formState.isDirty,
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md border-border bg-gradient-to-br from-card to-card/95 backdrop-blur-sm">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader className="text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-fade-in">
            <User className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome! 👋
          </DialogTitle>
          <DialogDescription className="text-base text-foreground/80">
            Help me personalize your experience by sharing a few details.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
                      {...field} 
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:scale-[1.01]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="john@example.com" 
                      type="email" 
                      {...field} 
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:scale-[1.01]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose}
                className="flex-1 border-border hover:bg-secondary hover:text-secondary-foreground"
              >
                Maybe Later
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground group relative overflow-hidden"
                disabled={isSubmitting}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? "Submitting..." : "Continue"}
                  <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </span>
              </Button>
            </div>
          </form>
        </Form>

        <p className="text-xs text-center text-muted-foreground pt-2">
          Your information is secure and will never be shared.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsPopup;
