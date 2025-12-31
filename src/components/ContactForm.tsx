import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import posthog from "@/lib/posthog";

const formSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  subject: z.string().trim().min(3, { message: "Subject must be at least 3 characters" }).max(150, { message: "Subject must be less than 150 characters" }),
  message: z.string().trim().min(10, { message: "Message must be at least 10 characters" }).max(1000, { message: "Message must be less than 1000 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Track form submission
      posthog.capture("contact_form_submitted", {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message
      });

      // Simulate API call (replace with actual email service integration)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success modal
      setShowSuccessModal(true);
      
      // Reset form
      form.reset();
      
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you as soon as possible.",
      });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <Mail className="h-8 w-8 text-primary" />
            <h3 className="text-2xl md:text-3xl font-bold">Get In Touch</h3>
          </div>
          <p className="text-muted-foreground">
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        {...field} 
                        className="transition-all duration-300 focus:scale-[1.02]"
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your.email@example.com" 
                        type="email" 
                        {...field} 
                        className="transition-all duration-300 focus:scale-[1.02]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Project inquiry, collaboration, etc." 
                      {...field} 
                      className="transition-all duration-300 focus:scale-[1.02]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell me about your project, timeline, and budget..." 
                      className="min-h-[150px] resize-none transition-all duration-300 focus:scale-[1.02]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              size="lg" 
              className="w-full md:w-auto group relative overflow-hidden"
              disabled={isSubmitting}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </form>
        </Form>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 animate-scale-in">
              <CheckCircle2 className="h-10 w-10 text-primary animate-fade-in" />
            </div>
            <DialogTitle className="text-2xl">Message Sent Successfully! 🎉</DialogTitle>
            <DialogDescription className="text-base pt-2">
              Thank you for reaching out! I've received your message and will get back to you within 24-48 hours.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button onClick={() => setShowSuccessModal(false)} className="w-full sm:w-auto">
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactForm;
