import { Search, Brain, BookOpen } from "lucide-react";

const LearningResearch = () => {
  return (
    <section id="learning" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              📘 Learning & Research
            </h2>
            <p className="text-lg text-muted-foreground">
              Exploring cutting-edge technologies and methodologies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex gap-3">
                <Search className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-3 text-primary/90">
                  Exploring
                </h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Distributed Systems</li>
                <li>• Cloud-Native Security</li>
                <li>• ML Ops (AWS SageMaker)</li>
                <li>• Serverless Architectures</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex gap-3">
                <Brain className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-3 text-primary/90">
                  Building
                </h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Scalable Data Pipelines</li>
                <li>• High-Performance Microservices</li>
                <li>• Automated Security Audits</li>
                <li>• Observability Dashboards</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex gap-3">
                <BookOpen className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-3 text-primary/90">
                  Reading
                </h3>
              </div>

              <ul className="space-y-2 text-muted-foreground">
                <li>• Designing Data-Intensive Applications</li>
                <li>• AWS Well-Architected Framework</li>
                <li>• Clean Code & Clean Architecture</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningResearch;
