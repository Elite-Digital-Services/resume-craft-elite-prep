
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
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
import { generateResumeSummary } from '@/lib/openai';

interface SummaryFormProps {
  className?: string;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ className }) => {
  const { resumeData, updateSummary } = useResumeContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleAiGenerate = async () => {
    setIsGenerating(true);
    
    try {
      // Get experience to provide context to the AI
      let experienceContext = '';
      if (resumeData.experience.length > 0) {
        const latestExperience = resumeData.experience[0];
        experienceContext = `Recent role: ${latestExperience.position} at ${latestExperience.company}. ${latestExperience.description}`;
      }
      
      const generatedSummary = await generateResumeSummary({
        fullName: resumeData.personalInfo.fullName || 'Professional',
        title: resumeData.personalInfo.title || 'professional',
        experience: experienceContext
      });
      
      updateSummary(generatedSummary);
      
      toast({
        title: "Summary Generated",
        description: "AI has created a professional summary based on your information.",
      });
    } catch (error) {
      console.error('Error generating summary:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
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
