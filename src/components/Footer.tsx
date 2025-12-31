import { Linkedin, Github } from "lucide-react";
import ContactForm from "./ContactForm";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="py-20 border-t border-border/50 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Contact Form Section */}
          <div className="animate-fade-in">
            <ContactForm />
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground">
                Or connect with me
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-6 justify-center items-center">
            <a
              href="mailto:nikhilnakashe@gmail.com"
              className="group flex items-center gap-2 text-lg font-medium transition-all duration-300 hover:scale-110"
            >
              <span className="relative">
                <span className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/40 transition-all duration-300" />
                <span className="relative text-foreground group-hover:text-primary transition-colors">
                  nikhilnakashe@gmail.com
                </span>
              </span>
            </a>
            <span className="hidden md:inline text-muted-foreground">|</span>
            <a
              href="https://linkedin.com/in/nikhil-nakashe"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-lg font-medium transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="h-5 w-5 group-hover:text-primary transition-colors" />
              <span className="text-foreground group-hover:text-primary transition-colors">
                LinkedIn
              </span>
            </a>
            <span className="hidden md:inline text-muted-foreground">|</span>
            <a
              href="https://github.com/nikhilnakashe"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-lg font-medium transition-all duration-300 hover:scale-110"
            >
              <Github className="h-5 w-5 group-hover:text-primary transition-colors" />
              <span className="text-foreground group-hover:text-primary transition-colors">
                GitHub
              </span>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-center text-muted-foreground pt-6 border-t border-border/30">
            © {new Date().getFullYear()} Nikhil Nakashe. Built with React &
            Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
