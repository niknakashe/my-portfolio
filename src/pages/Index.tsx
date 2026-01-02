import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import AIAutomation from "@/components/AIAutomation";
import Projects from "@/components/Projects";
import LearningResearch from "@/components/LearningResearch";
import BeyondCode from "@/components/BeyondCode";
import Footer from "@/components/Footer";
import CursorTrail from "@/components/CursorTrail";
import ChatbotInterface from "@/components/ChatbotInterface";

const Index = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <CursorTrail />
      <Navbar onChatbotToggle={() => setIsChatbotOpen(!isChatbotOpen)} />
      <ChatbotInterface
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />
      <Hero />
      <TechStack />
      <AIAutomation />
      <Projects />
      <LearningResearch />
      <BeyondCode />
      <Footer />
    </div>
  );
};

export default Index;
