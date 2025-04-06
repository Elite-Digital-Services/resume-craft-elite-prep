
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useResumeContext } from '@/context/ResumeContext';
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, GraduationCap, CalendarRange } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface EducationFormProps {
  className?: string;
}

const EducationForm: React.FC<EducationFormProps> = ({ className }) => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeContext();

  const handleAddEducation = () => {
    addEducation({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      isCurrentlyStudying: false,
      location: '',
    });
  };

  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Education</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleAddEducation}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Add Education
            </Button>
          </div>
          
          {resumeData.education.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No education added yet.</p>
              <p className="text-sm mt-1">Click "Add Education" to get started.</p>
            </div>
          ) : (
            <Accordion type="multiple" className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <AccordionItem key={edu.id} value={edu.id} className="border rounded-lg">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <div className="flex flex-1 text-left">
                      <span>
                        {edu.institution || edu.degree ? 
                          `${edu.degree || 'Degree'} at ${edu.institution || 'Institution'}` : 
                          `Education ${index + 1}`}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`institution-${edu.id}`} className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          Institution
                        </Label>
                        <Input
                          id={`institution-${edu.id}`}
                          placeholder="University or School Name"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                        <Input
                          id={`degree-${edu.id}`}
                          placeholder="Bachelor's, Master's, etc."
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                        <Input
                          id={`field-${edu.id}`}
                          placeholder="Computer Science, Business, etc."
                          value={edu.field}
                          onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`location-${edu.id}`}>Location (optional)</Label>
                        <Input
                          id={`location-${edu.id}`}
                          placeholder="City, Country"
                          value={edu.location || ''}
                          onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                        />
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="space-y-2 flex-1">
                          <Label htmlFor={`startDate-${edu.id}`} className="flex items-center gap-2">
                            <CalendarRange className="h-4 w-4" />
                            Start Date
                          </Label>
                          <Input
                            id={`startDate-${edu.id}`}
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                          />
                        </div>
                        
                        <div className="space-y-2 flex-1">
                          <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                          <Input
                            id={`endDate-${edu.id}`}
                            type="month"
                            value={edu.endDate}
                            disabled={edu.isCurrentlyStudying}
                            onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`gpa-${edu.id}`}>GPA (optional)</Label>
                        <Input
                          id={`gpa-${edu.id}`}
                          placeholder="e.g., 3.8/4.0"
                          value={edu.gpa || ''}
                          onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2 py-2">
                        <Checkbox 
                          id={`current-${edu.id}`} 
                          checked={edu.isCurrentlyStudying}
                          onCheckedChange={(checked) => 
                            updateEducation(edu.id, { 
                              isCurrentlyStudying: checked as boolean,
                              endDate: checked ? 'Present' : '' 
                            })
                          }
                        />
                        <Label htmlFor={`current-${edu.id}`}>I am currently studying here</Label>
                      </div>
                      
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor={`description-${edu.id}`}>Additional Information (optional)</Label>
                        <Textarea
                          id={`description-${edu.id}`}
                          placeholder="Awards, achievements, relevant coursework, etc."
                          className="min-h-[100px]"
                          value={edu.description || ''}
                          onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => removeEducation(edu.id)}
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

export default EducationForm;
