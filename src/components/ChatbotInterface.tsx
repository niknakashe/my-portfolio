import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
}

interface ChatbotInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotInterface = ({ isOpen, onClose }: ChatbotInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm your portfolio assistant. I can help you explore projects, tech stack, and more. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions = [
    {
      label: "Show Projects",
      response:
        "Here are some key projects I've led:\n\n📊 **Leadership Analytics Dashboard** - Automated data pipelines for real-time executive reporting using Airflow and PostgreSQL.\n\n🧠 **Comment Sentiment Analysis Engine** - NLP pipeline using AWS Comprehend and GPT-4o-mini for employee feedback analysis.\n\n📡 **High-Volume Report System** - Implemented Apache Kafka for asynchronous processing of large-scale admin reports.\n\n⚙️ **CI/CD Automation** - Reduced deployment time by over 80% using Jenkins, Docker, and AWS ECS.\n\nWhich one would you like to dive deeper into?",
    },
    {
      label: "About",
      response:
        "I'm a Technology Lead with a solid track record in building scalable systems and leading engineering teams. My focus areas include:\n\n• High-performance system architecture\n• DevOps and infrastructure automation (AWS, Kubernetes, CI/CD)\n• Scalable data engineering and messaging (Kafka, Airflow)\n• Security and compliance (ISO 27001)\n\nI'm passionate about technical excellence, workflow automation, and fostering growth within my teams.",
    },
    {
      label: "Contact",
      response:
        "I'd love to connect with you! Here's how you can reach me:\n\n📧 **Email**: nikhilnakashe@gmail.com (or use the contact form)\n💼 **LinkedIn**: linkedin.com/in/nikhil-nakashe\n🐙 **GitHub**: github.com/nikhilnakashe\n\nI'm always open to discussing technical leadership roles, scalable architecture, or DevOps automation!",
    },
    {
      label: "Tech Stack",
      response:
        "My technical toolkit is quite broad:\n\n**Languages**: Python, Node.js, JavaScript/TypeScript\n\n**Frontend**: React.js, Angular\n\n**Cloud & DevOps**: AWS (ECS, Lambda, CloudWatch, SageMaker), Jenkins, Docker, Kubernetes, Terraform\n\n**Messaging & DB**: Apache Kafka, RabbitMQ, PostgreSQL, MongoDB, Redis\n\n**Practices**: Agile, TDD, CI/CD, SonarCloud, System Architecture\n\nI'm always looking for ways to optimize system performance and automate complex workflows!",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const typeMessage = async (text: string) => {
    setIsTyping(true);
    const words = text.split(" ");
    let currentText = "";

    // Add empty assistant message
    const messageIndex = messages.length;
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", isTyping: true },
    ]);

    // Type word by word
    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? " " : "") + words[i];
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === messageIndex ? { ...msg, content: currentText } : msg
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 30));
    }

    // Mark typing as complete
    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === messageIndex ? { ...msg, isTyping: false } : msg
      )
    );
    setIsTyping(false);
  };

  const handleQuickAction = async (action: (typeof quickActions)[0]) => {
    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: action.label }]);

    // Wait a bit before typing response
    await new Promise((resolve) => setTimeout(resolve, 500));
    await typeMessage(action.response);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    // Wait a bit before typing response
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate contextual response
    const response = generateResponse(userMessage);
    await typeMessage(response);
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    // Greetings
    if (
      lowerQuery.includes("hello") ||
      lowerQuery.includes("hi") ||
      lowerQuery.includes("hey") ||
      lowerQuery.includes("greetings")
    ) {
      return "Hello! 👋 Nice to meet you! How can I help you explore my portfolio today?";
    }

    // Thanks
    if (
      lowerQuery.includes("thank") ||
      lowerQuery.includes("thanks") ||
      lowerQuery.includes("appreciate")
    ) {
      return "You're welcome! 😊 Feel free to ask me anything else about my work, projects, or how to get in touch!";
    }

    // Projects
    if (
      lowerQuery.includes("project") ||
      lowerQuery.includes("portfolio") ||
      lowerQuery.includes("built") ||
      lowerQuery.includes("created")
    ) {
      return quickActions[0].response;
    }

    // About / Who
    if (
      lowerQuery.includes("about") ||
      lowerQuery.includes("who are you") ||
      lowerQuery.includes("tell me about yourself") ||
      lowerQuery.includes("introduce")
    ) {
      return quickActions[1].response;
    }

    // Contact
    if (
      lowerQuery.includes("contact") ||
      lowerQuery.includes("reach") ||
      lowerQuery.includes("email") ||
      lowerQuery.includes("phone") ||
      lowerQuery.includes("linkedin") ||
      lowerQuery.includes("connect")
    ) {
      return quickActions[2].response;
    }

    // Tech Stack / Skills
    if (
      lowerQuery.includes("tech") ||
      lowerQuery.includes("skill") ||
      lowerQuery.includes("stack") ||
      lowerQuery.includes("tools") ||
      lowerQuery.includes("programming") ||
      lowerQuery.includes("language")
    ) {
      return quickActions[3].response;
    }

    // Experience / Work History
    if (
      lowerQuery.includes("experience") ||
      lowerQuery.includes("work history") ||
      lowerQuery.includes("career") ||
      lowerQuery.includes("job") ||
      lowerQuery.includes("company") ||
      lowerQuery.includes("employer")
    ) {
      return "I have over 7 years of experience in software engineering and technical leadership. I've successfully led teams of 9+ developers and managed architectures for systems with 200k+ concurrent users. My background spans from Node.js and Python to high-volume Kafka-based systems and AWS cloud automation. Would you like details on a specific role or company?";
    }

    // Education
    if (
      lowerQuery.includes("education") ||
      lowerQuery.includes("degree") ||
      lowerQuery.includes("university") ||
      lowerQuery.includes("college") ||
      lowerQuery.includes("qualification") ||
      lowerQuery.includes("study")
    ) {
      return "🎓 I hold a Bachelor's degree in Computer Science. Beyond formal education, I'm a continuous learner and have earned multiple certifications in cloud technologies and DevOps practices. I believe in hands-on learning and staying current with emerging technologies.";
    }

    // Certifications
    if (
      lowerQuery.includes("certification") ||
      lowerQuery.includes("certified") ||
      lowerQuery.includes("certificate")
    ) {
      return "📜 I hold several professional certifications including AWS certifications and have expertise in ISO 27001 security compliance. I'm committed to continuous learning and staying updated with the latest industry standards.";
    }

    // Leadership / Management
    if (
      lowerQuery.includes("lead") ||
      lowerQuery.includes("manage") ||
      lowerQuery.includes("team") ||
      lowerQuery.includes("leadership")
    ) {
      return "👥 As a Technology Lead, I've led teams of 9+ developers, driving technical excellence and mentoring junior engineers. My leadership style focuses on collaborative problem-solving, code quality, and fostering a culture of continuous improvement. I've successfully delivered multiple high-impact projects under tight deadlines.";
    }

    // DevOps / CI/CD
    if (
      lowerQuery.includes("devops") ||
      lowerQuery.includes("ci/cd") ||
      lowerQuery.includes("cicd") ||
      lowerQuery.includes("deployment") ||
      lowerQuery.includes("jenkins") ||
      lowerQuery.includes("docker") ||
      lowerQuery.includes("kubernetes")
    ) {
      return "� I specialize in DevOps automation and CI/CD pipelines. Key achievements include:\n\n• Reduced deployment time from 15 mins to 1 min using Jenkins, Docker, and AWS ECS\n• Implemented infrastructure as code with Terraform\n• Built self-healing monitoring systems achieving 99.98% uptime\n• Automated quality gates with SonarCloud integration";
    }

    // Data Engineering / Pipelines
    if (
      lowerQuery.includes("data") ||
      lowerQuery.includes("pipeline") ||
      lowerQuery.includes("etl") ||
      lowerQuery.includes("airflow") ||
      lowerQuery.includes("analytics")
    ) {
      return "📊 Data Engineering is one of my core strengths:\n\n• Built real-time data pipelines using Apache Airflow and PostgreSQL\n• Developed sentiment analysis engines using AWS Comprehend and NLP\n• Created automated ETL processes for leadership analytics dashboards\n• Experience with both batch and real-time data processing";
    }

    // Kafka / Messaging
    if (
      lowerQuery.includes("kafka") ||
      lowerQuery.includes("messaging") ||
      lowerQuery.includes("queue") ||
      lowerQuery.includes("rabbitmq") ||
      lowerQuery.includes("async")
    ) {
      return "📡 I have extensive experience with messaging systems:\n\n• Implemented Apache Kafka for high-volume report generation handling massive concurrent requests\n• Built decoupled, fault-tolerant architectures\n• Experience with RabbitMQ and Redis for caching and pub/sub patterns\n• Designed systems handling 200k+ concurrent users";
    }

    // AWS / Cloud
    if (
      lowerQuery.includes("aws") ||
      lowerQuery.includes("cloud") ||
      lowerQuery.includes("amazon") ||
      lowerQuery.includes("lambda") ||
      lowerQuery.includes("ecs")
    ) {
      return "☁️ AWS Cloud is my primary cloud platform:\n\n• **Compute**: ECS, Lambda, EC2\n• **AI/ML**: Comprehend, SageMaker\n• **Monitoring**: CloudWatch\n• **Storage**: S3, RDS\n\nI've architected and deployed production systems serving thousands of users with high availability and auto-scaling.";
    }

    // AI / ML / OpenAI
    if (
      lowerQuery.includes("ai") ||
      lowerQuery.includes("ml") ||
      lowerQuery.includes("machine learning") ||
      lowerQuery.includes("artificial intelligence") ||
      lowerQuery.includes("openai") ||
      lowerQuery.includes("gpt") ||
      lowerQuery.includes("llm")
    ) {
      return "🤖 I've integrated AI/ML into production systems:\n\n• **Nudge AI Engine**: Built behavior-based nudge system using OpenAI API, increasing engagement by 27%\n• **Sentiment Analysis**: Developed NLP pipelines using AWS Comprehend and GPT-4o-mini\n• **Quality Scoring**: AI-powered code quality assessment integrated with SonarCloud";
    }

    // Achievements / Impact
    if (
      lowerQuery.includes("achievement") ||
      lowerQuery.includes("impact") ||
      lowerQuery.includes("accomplish") ||
      lowerQuery.includes("success") ||
      lowerQuery.includes("result")
    ) {
      return "🏆 Key achievements:\n\n• Reduced deployment time by 80% (15 min → 1 min)\n• Achieved 99.98% system uptime\n• Increased product engagement by 27% with AI-driven nudges\n• Reduced MTTR by 65% with automated error handling\n• Led teams of 9+ developers successfully";
    }

    // Availability / Hiring
    if (
      lowerQuery.includes("available") ||
      lowerQuery.includes("hire") ||
      lowerQuery.includes("hiring") ||
      lowerQuery.includes("opportunity") ||
      lowerQuery.includes("open to") ||
      lowerQuery.includes("looking for")
    ) {
      return "💼 I'm always open to discussing exciting opportunities! If you're looking for a Technology Lead with expertise in:\n\n• Scalable system architecture\n• DevOps and cloud automation\n• Data engineering and AI integration\n• Team leadership\n\nFeel free to reach out via the Contact section or email me at nikhilnakashe@gmail.com!";
    }

    // Resume / CV
    if (
      lowerQuery.includes("resume") ||
      lowerQuery.includes("cv") ||
      lowerQuery.includes("download")
    ) {
      return "📄 You can view my resume by clicking the 'View Resume' button in the Hero section of my portfolio. It contains detailed information about my experience, skills, and achievements.";
    }

    // Location
    if (
      lowerQuery.includes("location") ||
      lowerQuery.includes("where") ||
      lowerQuery.includes("based") ||
      lowerQuery.includes("city") ||
      lowerQuery.includes("country")
    ) {
      return "📍 I'm based in India and open to remote opportunities as well as relocation for the right role. My experience includes working with distributed teams across different time zones.";
    }

    // Goodbye
    if (
      lowerQuery.includes("bye") ||
      lowerQuery.includes("goodbye") ||
      lowerQuery.includes("see you") ||
      lowerQuery.includes("take care")
    ) {
      return "Goodbye! 👋 It was great chatting with you. Feel free to come back anytime if you have more questions. Best of luck!";
    }

    // Help
    if (
      lowerQuery.includes("help") ||
      lowerQuery.includes("what can you") ||
      lowerQuery.includes("how do") ||
      lowerQuery.includes("options")
    ) {
      return "I can help you with:\n\n• 📊 **Projects** - Learn about my key projects and technical work\n• 👤 **About** - Know more about my background\n• 💻 **Tech Stack** - Explore my technical skills\n• 📞 **Contact** - Ways to reach me\n• 💼 **Experience** - My work history and achievements\n\nJust ask me anything or click on the quick action buttons!";
    }

    // Fallback responses (randomized to avoid repetition)
    const fallbackResponses = [
      "I'd be happy to help with that! Could you try asking about my projects, skills, experience, or how to contact me?",
      "Great question! I'm best at answering questions about my portfolio, technical skills, or work experience. What would you like to explore?",
      "I'm here to help you learn about my work! Try asking about my projects in Data Engineering, DevOps, or AI automation.",
      "Let me help you explore my portfolio! You can ask about my tech stack, leadership experience, or specific projects.",
      "I'd love to tell you more! Ask me about my achievements, the technologies I work with, or how to get in touch.",
    ];

    return fallbackResponses[
      Math.floor(Math.random() * fallbackResponses.length)
    ];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm animate-fade-in">
      <div className="container mx-auto h-full max-w-4xl flex flex-col p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-glow">
              <Bot className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Portfolio Assistant</h2>
              <p className="text-sm text-muted-foreground">
                Ask me anything about my work
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-4 scroll-smooth">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-3 animate-slide-up",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3 whitespace-pre-wrap",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border"
                )}
              >
                {message.content}
                {message.isTyping && (
                  <span className="inline-block w-1 h-4 ml-1 bg-current animate-pulse" />
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length === 1 && (
          <div className="mb-4 flex flex-wrap gap-2 animate-fade-in">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action)}
                disabled={isTyping}
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask me anything..."
            disabled={isTyping}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            className="px-6"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotInterface;
