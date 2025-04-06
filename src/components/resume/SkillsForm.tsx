
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResumeContext } from '@/context/ResumeContext';
import { Badge } from "@/components/ui/badge";
import { X, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SkillsFormProps {
  className?: string;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ className }) => {
  const { resumeData, updateSkills } = useResumeContext();
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (skillInput.trim()) {
      // Split by commas and filter out empty entries
      const newSkills = skillInput
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill !== '');
      
      // Add only unique skills
      const updatedSkills = Array.from(
        new Set([...resumeData.skills, ...newSkills])
      );
      
      updateSkills(updatedSkills);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = resumeData.skills.filter(skill => skill !== skillToRemove);
    updateSkills(updatedSkills);
  };

  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">Skills</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <AlertCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">List skills relevant to the job you're applying for. Include both technical and soft skills.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <form onSubmit={handleAddSkill} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="skills">Add Skills (comma separated)</Label>
              <div className="flex space-x-2">
                <Input
                  id="skills"
                  placeholder="JavaScript, React, Team Leadership"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                />
                <Button type="submit">Add</Button>
              </div>
            </div>
          </form>
          
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="py-1.5 px-3">
                {skill}
                <button 
                  onClick={() => handleRemoveSkill(skill)} 
                  className="ml-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            
            {resumeData.skills.length === 0 && (
              <p className="text-sm text-muted-foreground">No skills added yet.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsForm;
