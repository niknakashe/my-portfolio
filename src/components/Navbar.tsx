import { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onChatbotToggle: () => void;
}

const Navbar = ({ onChatbotToggle }: NavbarProps) => {
  const [activeSection, setActiveSection] = useState("hero");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLUListElement>(null);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "tech", label: "Tech Stack" },
    { id: "ai", label: "AI & Automation" },
    { id: "projects", label: "Projects" },
    { id: "learning", label: "Learning" },
    { id: "beyond", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const updateIndicator = () => {
      if (navRef.current) {
        const activeButton = navRef.current.querySelector(
          `[data-section="${activeSection}"]`
        ) as HTMLElement;
        if (activeButton) {
          setIndicatorStyle({
            left: activeButton.offsetLeft,
            width: activeButton.offsetWidth,
          });
        }
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (section.element) {
          const top = section.element.offsetTop;
          const bottom = top + section.element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed top-6 w-full justify-center items-center z-50 animate-fade-in hidden md:flex">
      <div className="bg-background/70 backdrop-blur-xl border border-border/50 rounded-full px-2 py-2 shadow-lg flex items-center gap-3">
        <ul ref={navRef} className="flex gap-1 items-center relative">
          {/* Sliding indicator */}
          <div
            className="absolute bg-primary rounded-full transition-all duration-300 ease-out h-[calc(100%-4px)] top-[2px]"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
            }}
          />
          
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                data-section={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onChatbotToggle}
            className="hover:bg-accent hover:text-accent-foreground"
            title="Toggle AI Assistant"
          >
            <Bot className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
