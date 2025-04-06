import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useResumeContext } from '@/context/ResumeContext';
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Plus, Trash2, Building, CalendarRange } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateExperienceDescription } from '@/lib/openai';

interface ExperienceFormProps {
  className?: string;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ className }) => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResumeContext();
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddExperience = () => {
    addExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      isCurrentPosition: false,
      description: '',
      location: '',
    });
  };

  const handleGenerateDescription = async (id: string) => {
    setIsGenerating(id);
    
    // Find the experience item
    const experience = resumeData.experience.find(item => item.id === id);
    
    try {
      if (experience?.position && experience?.company) {
        const generatedDescription = await generateExperienceDescription(
          experience.position,
          experience.company
        );
        
        updateExperience(id, { description: generatedDescription });
        
        toast({
          title: "Description Generated",
          description: "AI has created a professional description based on your job information.",
        });
      } else {
        toast({
          title: "Missing Information",
          description: "Please add a position title and company name before generating a description.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error generating description:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(null);
    }
  };

  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Work Experience</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleAddExperience}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Add Experience
            </Button>
          </div>
          
          {resumeData.experience.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No work experience added yet.</p>
              <p className="text-sm mt-1">Click "Add Experience" to get started.</p>
            </div>
          ) : (
            <Accordion type="multiple" className="space-y-4">
              {resumeData.experience.map((exp, index) => (
                <AccordionItem key={exp.id} value={exp.id} className="border rounded-lg">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <div className="flex flex-1 text-left">
                      <span>
                        {exp.position || exp.company ? 
                          `${exp.position || 'Position'} at ${exp.company || 'Company'}` : 
                          `Experience ${index + 1}`}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`company-${exp.id}`} className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          Company
                        </Label>
                        <Input
                          id={`company-${exp.id}`}
                          placeholder="Company Name"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`position-${exp.id}`}>Position</Label>
                        <Input
                          id={`position-${exp.id}`}
                          placeholder="Job Title"
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`location-${exp.id}`}>Location (optional)</Label>
                        <Input
                          id={`location-${exp.id}`}
                          placeholder="City, Country"
                          value={exp.location || ''}
                          onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                        />
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="space-y-2 flex-1">
                          <Label htmlFor={`startDate-${exp.id}`} className="flex items-center gap-2">
                            <CalendarRange className="h-4 w-4" />
                            Start Date
                          </Label>
                          <Input
                            id={`startDate-${exp.id}`}
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                          />
                        </div>
                        
                        <div className="space-y-2 flex-1">
                          <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                          <Input
                            id={`endDate-${exp.id}`}
                            type="month"
                            value={exp.endDate}
                            disabled={exp.isCurrentPosition}
                            onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      <div className="md:col-span-2 flex items-center space-x-2 py-2">
                        <Checkbox 
                          id={`current-${exp.id}`} 
                          checked={exp.isCurrentPosition}
                          onCheckedChange={(checked) => 
                            updateExperience(exp.id, { 
                              isCurrentPosition: checked as boolean,
                              endDate: checked ? 'Present' : '' 
                            })
                          }
                        />
                        <Label htmlFor={`current-${exp.id}`}>I currently work here</Label>
                      </div>
                      
                      <div className="md:col-span-2 space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor={`description-${exp.id}`}>Description</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGenerateDescription(exp.id)}
                            disabled={isGenerating === exp.id || !exp.company || !exp.position}
                            className="flex items-center gap-1"
                          >
                            <Sparkles className="h-4 w-4" />
                            {isGenerating === exp.id ? "Generating..." : "Generate with AI"}
                          </Button>
                        </div>
                        <Textarea
                          id={`description-${exp.id}`}
                          placeholder="Describe your responsibilities and achievements..."
                          className="min-h-[120px]"
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => removeExperience(exp.id)}
                        className="flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceForm;
