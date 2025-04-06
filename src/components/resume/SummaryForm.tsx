
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useResumeContext } from '@/context/ResumeContext';
import { Sparkles, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

interface SummaryFormProps {
  className?: string;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ className }) => {
  const { resumeData, updateSummary } = useResumeContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleAiGenerate = () => {
    setIsGenerating(true);
    
    // Simulate API call for AI generation
    setTimeout(() => {
      const jobTitle = resumeData.personalInfo.title || "professional";
      const generatedSummary = 
        `Results-driven ${jobTitle} with a proven track record of success in developing innovative solutions. Skilled in collaborating with cross-functional teams to drive project success and deliver high-quality outcomes. Adept at problem-solving and continuously learning new technologies to stay at the forefront of industry developments.`;
      
      updateSummary(generatedSummary);
      setIsGenerating(false);
      
      toast({
        title: "Summary Generated",
        description: "AI has created a professional summary based on your information.",
      });
    }, 1500);
  };

  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">Professional Summary</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <AlertCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">A strong professional summary is 3-5 sentences highlighting your experience, key skills, and most notable accomplishments.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAiGenerate}
              disabled={isGenerating}
              className="flex items-center gap-1"
            >
              <Sparkles className="h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate with AI"}
            </Button>
          </div>
          
          <div className="space-y-2">
            <Textarea
              placeholder="Write a professional summary highlighting your expertise and career achievements..."
              className="min-h-[120px] resize-none"
              value={resumeData.summary}
              onChange={(e) => updateSummary(e.target.value)}
            />
            <p className="text-xs text-muted-foreground text-right">
              {resumeData.summary.length} characters
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryForm;
