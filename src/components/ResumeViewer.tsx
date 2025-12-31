import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Code, Brain, Server, X, Download } from "lucide-react";
import posthog from "@/lib/posthog";

type ResumeType =
  | "backend-developer"
  | "senior-software-engineer"
  | "senior-python-developer"
  | "ai-engineer";

interface ResumeOption {
  id: ResumeType;
  title: string;
  description: string;
  icon: React.ReactNode;
  pdfUrl: string;
}

const resumeOptions: ResumeOption[] = [
  {
    id: "backend-developer",
    title: "Technology Lead",
    description:
      "Expertise in leading teams and architecting scalable backend systems",
    icon: <Server className="h-6 w-6" />,
    pdfUrl: "/resumes/technology-lead.html",
  },
  {
    id: "senior-software-engineer",
    title: "Senior Software Engineer",
    description: "Full-stack development with a focus on high-performance APIs",
    icon: <Code className="h-6 w-6" />,
    pdfUrl: "/resumes/senior-software-engineer.html",
  },
  {
    id: "senior-python-developer",
    title: "DevOps & Cloud Engineer",
    description:
      "Specialized in CI/CD automation and AWS infrastructure security",
    icon: <FileText className="h-6 w-6" />,
    pdfUrl: "/resumes/devops-cloud-engineer.html",
  },
  {
    id: "ai-engineer",
    title: "Full Stack Developer",
    description: "Proficient in Java, Node.js, and modern frontend frameworks",
    icon: <Brain className="h-6 w-6" />,
    pdfUrl: "/resumes/full-stack-developer.html",
  },
];

const ResumeViewer = () => {
  const [isSelectionOpen, setIsSelectionOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState<ResumeOption | null>(
    null
  );
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  const handleOpenSelection = () => {
    setIsSelectionOpen(true);
    posthog.capture("resume_viewer_opened");
  };

  const handleSelectResume = (resume: ResumeOption) => {
    setSelectedResume(resume);
    setIsSelectionOpen(false);
    setIsPdfOpen(true);

    // Track resume selection
    posthog.capture("resume_selected", {
      resume_type: resume.id,
      resume_title: resume.title,
    });
  };

  const handleClosePdf = () => {
    setIsPdfOpen(false);

    if (selectedResume) {
      posthog.capture("resume_viewer_closed", {
        resume_type: selectedResume.id,
      });
    }
  };

  const handleDownloadPdf = () => {
    if (!selectedResume) return;

    // Open resume in new window and trigger print for PDF
    const printWindow = window.open(selectedResume.pdfUrl, "_blank");
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }

    posthog.capture("resume_downloaded", {
      resume_type: selectedResume.id,
      resume_title: selectedResume.title,
    });
  };

  return (
    <>
      <Button
        onClick={handleOpenSelection}
        size="lg"
        className="bg-primary hover:bg-primary/90 text-primary-foreground animate-glow group relative overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-2">
          <FileText className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          View Resume
        </span>
      </Button>

      {/* Resume Selection Dialog */}
      <Dialog open={isSelectionOpen} onOpenChange={setIsSelectionOpen}>
        <DialogContent className="sm:max-w-2xl border-border bg-card">
          <button
            onClick={() => setIsSelectionOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Close</span>
          </button>

          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Choose Resume Type
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              Select the role you're interested in to view the relevant resume.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {resumeOptions.map((resume) => (
              <button
                key={resume.id}
                onClick={() => handleSelectResume(resume)}
                className="group flex flex-col items-start gap-3 rounded-lg border border-border bg-card p-4 text-left transition-all duration-300 hover:border-primary hover:bg-secondary hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 text-primary transition-transform duration-300 group-hover:scale-110">
                  {resume.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {resume.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {resume.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* PDF Viewer Dialog */}
      <Dialog open={isPdfOpen} onOpenChange={setIsPdfOpen}>
        <DialogContent className="sm:max-w-4xl h-[80vh] border-border bg-card p-0 [&>button]:hidden">
          <div className="flex flex-col h-full">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-bold text-foreground">
                  {selectedResume?.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  {selectedResume?.description}
                </DialogDescription>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadPdf}
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
                <button
                  onClick={handleClosePdf}
                  className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              {selectedResume && (
                <iframe
                  src={selectedResume.pdfUrl}
                  className="w-full h-full"
                  title={`${selectedResume.title} Resume`}
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResumeViewer;
