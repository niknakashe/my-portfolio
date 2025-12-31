import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  impact: string;
  techStack: string[];
  delay?: number;
  isBest?: boolean;
}

const ProjectCard = ({ title, tagline, problem, solution, impact, techStack, delay = 0, isBest = false }: ProjectCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {isBest && (
        <div className="absolute top-0 right-0 z-20">
          <Badge className="rounded-tl rounded-tr rounded-br-none bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold px-4 py-1.5 shadow-lg">
            ⭐ Best Project
          </Badge>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="relative">
        <div className="space-y-2">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground italic">
            {tagline}
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="relative space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-destructive">Problem:</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {problem}
          </p>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-primary">Solution:</h4>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {solution}
          </p>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-accent">Impact:</h4>
          <p className="text-sm text-muted-foreground font-medium">
            {impact}
          </p>
        </div>
        
        <div className="space-y-2 pt-3 border-t border-border/50">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tech Stack:</h4>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <Badge 
                key={tech} 
                variant="outline" 
                className="text-xs bg-background/50"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
