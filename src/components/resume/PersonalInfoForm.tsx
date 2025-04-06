
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useResumeContext } from '@/context/ResumeContext';
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Briefcase, Linkedin, Globe } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PersonalInfoFormProps {
  className?: string;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ className }) => {
  const { resumeData, updatePersonalInfo } = useResumeContext();
  const { personalInfo } = resumeData;
  const { toast } = useToast();

  const handleLinkedInImport = () => {
    toast({
      title: "LinkedIn Import Coming Soon",
      description: "This feature will be available in a future update!",
    });
  };

  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLinkedInImport}
              className="flex items-center gap-1"
            >
              <Linkedin className="h-4 w-4" />
              Import from LinkedIn
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={personalInfo.fullName}
                onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Professional Title
              </Label>
              <Input
                id="title"
                placeholder="Software Developer"
                value={personalInfo.title}
                onChange={(e) => updatePersonalInfo({ title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={personalInfo.email}
                onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </Label>
              <Input
                id="phone"
                placeholder="+1 234 567 890"
                value={personalInfo.phone}
                onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                id="location"
                placeholder="City, Country"
                value={personalInfo.location}
                onChange={(e) => updatePersonalInfo({ location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin" className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn (optional)
              </Label>
              <Input
                id="linkedin"
                placeholder="linkedin.com/in/johndoe"
                value={personalInfo.linkedin || ''}
                onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website (optional)
              </Label>
              <Input
                id="website"
                placeholder="johndoe.com"
                value={personalInfo.website || ''}
                onChange={(e) => updatePersonalInfo({ website: e.target.value })}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
