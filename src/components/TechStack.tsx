import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Cloud,
  Bot,
  BarChart3,
  Layers,
  Users,
  Rocket,
  Lock,
} from "lucide-react";

const techCategories = [
  {
    icon: Cloud,
    title: "Cloud & Security",
    items: [
      "AWS (GuardDuty, IAM, ECS, EKS)",
      "Infrastructure Monitoring",
      "Security Audits",
      "ISO 27001 Compliance",
      "CloudWatch",
      "Route 53",
      "SageMaker",
    ],
  },
  {
    icon: Rocket,
    title: "DevOps & Automation",
    items: [
      "Jenkins",
      "AWS CodePipeline",
      "Bitbucket Pipelines",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Ansible",
      "CI/CD",
      "Grafana",
    ],
  },
  {
    icon: Code2,
    title: "Programming & Frameworks",
    items: ["Python", "Node.js", "JavaScript", "Angular", "React.js"],
  },
  {
    icon: Layers,
    title: "Messaging & Databases",
    items: [
      "Apache Kafka",
      "RabbitMQ",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Redis",
      "Data Modeling",
    ],
  },
  {
    icon: Lock,
    title: "Tools & Practices",
    items: [
      "Git",
      "SonarCloud",
      "Agile",
      "TDD",
      "Code Reviews",
      "System Architecture",
    ],
  },
  {
    icon: Users,
    title: "Soft Skills & Leadership",
    items: [
      "Team Leadership",
      "Cross-Functional Collaboration",
      "Stakeholder Management",
      "Mentorship",
      "Adaptability",
    ],
  },
];

const TechStack = () => {
  return (
    <section id="tech" className=" relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center space-y-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold">🧠 Tech Stack</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.title}
                  className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all"
                  style={{ animationDelay: `${categoryIndex * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-left">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-sm px-3 py-1"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
