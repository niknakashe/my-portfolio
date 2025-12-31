import { Bot, Zap, TrendingUp } from "lucide-react";

const AIAutomation = () => {
  return (
    <section id="ai" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              ⚙️ AI & Automation Showcase
            </h2>
            <p className="text-lg text-muted-foreground">
              Building intelligent systems that scale and adapt
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all hover:shadow-lg">
              <Zap className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Data Pipeline Automation
              </h3>
              <p className="text-muted-foreground">
                Streamlined and automated complex data pipelines in the Data
                Warehouse using Python, PostgreSQL, and Apache Airflow for
                real-time reporting.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all hover:shadow-lg">
              <Bot className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Intelligent Quality Gates
              </h3>
              <p className="text-muted-foreground">
                Integrated SonarCloud with AWS Lambda and Notion to
                automatically compute and update developer quality scores,
                driving engineering excellence.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all hover:shadow-lg">
              <TrendingUp className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Deployment Efficiency
              </h3>
              <p className="text-muted-foreground">
                Automated deployment pipelines using Jenkins and Bitbucket with
                Docker and ECS, reducing deployment time from 15 minutes to just
                1 minute.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAutomation;
