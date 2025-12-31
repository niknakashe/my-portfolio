import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import ResumeViewer from "@/components/ResumeViewer";

const Hero = () => {
  const taglines = [
    "Technology Lead with expertise in architecting scalable systems, automating data pipelines, and leading high-performing engineering teams.",
    "Specializing in Cloud & Security, DevOps automation, and building high-volume, reliable system architectures.",
    "Driving engineering excellence through AI-enabled automation, CI/CD optimization, and data-informed decision making.",
    "Architecting secure, high-performance systems — from backend engineering to cloud-native deployments.",
    "Leader and engineer focused on building impactful solutions that stay resilient under high-volume concurrent loads.",
  ];

  const [tagline, setTagline] = useState("");

  useEffect(() => {
    const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];
    setTagline(randomTagline);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />

      {/* Content */}
      <div className="container mx-auto px-4  relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-block">
            <span className="text-primary font-semibold text-lg mb-4 inline-block">
              Building High-Impact Systems
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Hi, I'm{" "}
            <span
              className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in inline-block"
              style={{ animationDelay: "400ms", animationFillMode: "both" }}
            >
              Nikhil
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {tagline}
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <ResumeViewer />
            <Button
              size="lg"
              variant="secondary"
              className="bg-secondary hover:bg-secondary/80"
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Me
            </Button>
          </div>

          <div className="flex gap-6 justify-center pt-8">
            <a
              href="https://linkedin.com/in/nikhil-nakashe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/nikhilnakashe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="mailto:nikhilnakashe@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>

          {/* Scroll Down Button */}
          <div
            className="mt-16 flex justify-center animate-fade-in"
            style={{ animationDelay: "800ms" }}
          >
            <button
              onClick={() =>
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
              }
              className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
    </section>
  );
};

export default Hero;
