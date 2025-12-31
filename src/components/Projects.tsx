import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Real-time Leadership Analytics Dashboard",
    tagline: "Automated data pipelines in the Data Warehouse",
    problem:
      "Data reporting was manual and unreliable, hindering real-time leadership analytics.",
    solution:
      "Architected and automated data pipelines using Python, PostgreSQL, and Apache Airflow, enabling real-time reporting for the Leadership Analytics Dashboard.",
    impact:
      "🚀 Improved data reliability and enabled real-time decision-making for executive leadership at Great Manager Institute.",
    techStack: ["Python", "PostgreSQL", "Apache Airflow"],
    category: "Data Engineering",
    isBest: true,
  },
  {
    title: "Comment Sentiment Analysis Engine",
    tagline: "Intelligent NLP pipeline for employee feedback analysis",
    problem:
      "HR leaders struggled to extract actionable insights from thousands of unstructured employee feedback comments, leading to delayed interventions and subjective interpretations.",
    solution:
      "Built an end-to-end sentiment and theme classification pipeline using AWS Comprehend Batch API for real-time sentiment detection and key phrase extraction, a self-learning keyword classifier with 26+ management subthemes, and GPT-4o-mini for strategic insight consolidation—all orchestrated via Apache Airflow DAGs.",
    impact:
      "📊 Processes 1000+ comments per run with 90%+ accuracy, automatically surfacing top 5 appreciations & focus areas with quantified percentages, reducing analysis time from hours to minutes.",
    techStack: [
      "Python",
      "PostgreSQL",
      "Apache Airflow",
      "AWS Comprehend",
      "OpenAI API",
    ],
    category: "Data Engineering",
    isBest: true,
  },
  {
    title: "Nudge AI Engine",
    tagline:
      "Driving user engagement through intelligent behavior-based nudges",
    problem:
      "Managers often failed to take timely action on feedback reports due to generic reminders and poor contextual relevance.",
    solution:
      "Developed an AI-driven nudge engine that analyzed user behavior via PostHog and generated personalized prompts using OpenAI, improving follow-up and engagement patterns.",
    impact:
      "💡 Increased product engagement by 27%, boosted response actions by 31%, and improved feature adoption through contextual AI nudges.",
    techStack: ["OpenAI API", "PostHog", "Node.js", "MySQL"],
    category: "AI and Automation",
    isBest: true,
  },
  {
    title: "High-Volume Report Generation System",
    tagline: "Scalable asynchronous processing with Apache Kafka",
    problem:
      "Manual report generation for company admins was slow and prone to failures under high load.",
    solution:
      "Implemented Apache Kafka for decoupled, asynchronous handling of large volume Company Admin Reports, improving reliability and fault tolerance.",
    impact:
      "📈 Enabled scalable handling of massive report generation requests with zero downtime.",
    techStack: ["Apache Kafka", "Node.js", "Redis"],
    category: "System Architecture",
    isBest: true,
  },
  {
    title: "Enterprise CI/CD & Deployment Automation",
    tagline: "Reducing deployment time by 80%",
    problem:
      "Manual deployments were slow (15 mins) and inconsistent across staging and production.",
    solution:
      "Automated pipelines using Jenkins and Bitbucket (integrated with Docker and AWS ECS) with secrets management and automated quality gates.",
    impact:
      "🚀 Reduced deployment time from 15 minutes to 1 minute, significantly increasing team velocity.",
    techStack: ["Jenkins", "Docker", "AWS ECS", "Bitbucket"],
    category: "DevOps",
    isBest: false,
  },
  {
    title: "Intelligent Error Monitoring & Resolution System",
    tagline: "Accelerating incident response with automated alerts",
    problem:
      "Critical errors often went unnoticed, slowing down issue resolution and affecting uptime.",
    solution:
      "Developed an Error Handler & Alert System that automatically sends error reports to internal chat tools, logs incidents in Notion, and assigns ownership.",
    impact:
      "😊 Reduced mean time to resolution (MTTR) by 65%, ensuring faster recovery and better visibility.",
    techStack: ["Node.js", "Notion API", "Slack", "Monitoring"],
    category: "DevOps",
    isBest: false,
  },
  {
    title: "Self-Healing Uptime Monitoring System",
    tagline: "Automated recovery for maximum availability",
    problem:
      "Unplanned downtimes required manual intervention, affecting availability.",
    solution:
      "Built an uptime monitoring tool integrated with recovery scripts that automatically restarts services upon outage detection.",
    impact: "🌐 Reduced downtime to under 5 minutes, achieving 99.98% uptime.",
    techStack: ["Node.js", "AWS", "Monitoring", "Bash"],
    category: "DevOps",
    isBest: false,
  },

  {
    title: "AI-Powered Quality Scoring System",
    tagline: "Automated code quality & engineering excellence",
    problem:
      "Difficulty in tracking and improving code quality across a team of 9+ developers at the EPIC level.",
    solution:
      "Integrated SonarCloud with AWS Lambda and Notion to automatically compute and update a Developer Quality Score for every EPIC.",
    impact:
      "⚙️ Drove accountability and continuous improvement, leading to measurably higher engineering excellence.",
    techStack: ["SonarCloud", "AWS Lambda", "Notion API"],
    category: "AI and Automation",
    isBest: false,
  },
];

const categories = [
  "All",
  "AI and Automation",
  "DevOps",
  "Data Engineering",
  "System Architecture",
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold">
              💡 My Work — Engineering with Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Problem-solving through scalable, secure, and data-driven
              solutions
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
              👇{" "}
              <span className="text-foreground font-medium">
                Explore different categories
              </span>{" "}
              to see my diverse project portfolio
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={
                  selectedCategory === category ? "default" : "secondary"
                }
                className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                {...project}
                delay={index * 100}
                isBest={project.isBest}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
