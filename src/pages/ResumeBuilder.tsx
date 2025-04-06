
import React, { useState, useRef } from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import { useAuth } from '@/context/AuthContext';
import PersonalInfoForm from '@/components/resume/PersonalInfoForm';
import SummaryForm from '@/components/resume/SummaryForm';
import ExperienceForm from '@/components/resume/ExperienceForm';
import EducationForm from '@/components/resume/EducationForm';
import SkillsForm from '@/components/resume/SkillsForm';
import ResumePreview from '@/components/resume/ResumePreview';
import TemplateSelector from '@/components/resume/TemplateSelector';
import LanguageSelector from '@/components/resume/LanguageSelector';
import ResumeActions from '@/components/resume/ResumeActions';
import SaveStatus from '@/components/resume/SaveStatus';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, ArrowLeft, User, FileText, Briefcase, GraduationCap, Wrench, LayoutTemplate, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResumeBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const previewRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const tabs = [
    { id: "personal", label: "Personal Info", icon: <User className="h-4 w-4" /> },
    { id: "summary", label: "Summary", icon: <FileText className="h-4 w-4" /> },
    { id: "experience", label: "Experience", icon: <Briefcase className="h-4 w-4" /> },
    { id: "education", label: "Education", icon: <GraduationCap className="h-4 w-4" /> },
    { id: "skills", label: "Skills", icon: <Wrench className="h-4 w-4" /> },
    { id: "templates", label: "Templates", icon: <LayoutTemplate className="h-4 w-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ];

  const getNextTab = () => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    const nextIndex = Math.min(currentIndex + 1, tabs.length - 1);
    return tabs[nextIndex].id;
  };

  const getPrevTab = () => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    const prevIndex = Math.max(currentIndex - 1, 0);
    return tabs[prevIndex].id;
  };

  const handleNext = () => {
    setActiveTab(getNextTab());
  };

  const handlePrevious = () => {
    setActiveTab(getPrevTab());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-eliteblue dark:text-eliteblue-light">Resume Builder</h1>
        
        <div className="flex items-center gap-3">
          <SaveStatus />
          
          {!user && (
            <Button variant="secondary" size="sm" asChild>
              <Link to="/auth">Sign in to save</Link>
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 md:grid-cols-7 w-full">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-1">
                  {tab.icon}
                  <span className="hidden md:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="personal" className="space-y-4 mt-6">
              <PersonalInfoForm />
              <div className="flex justify-end">
                <Button onClick={handleNext}>
                  Next 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="summary" className="space-y-4 mt-6">
              <SummaryForm />
              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="experience" className="space-y-4 mt-6">
              <ExperienceForm />
              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="education" className="space-y-4 mt-6">
              <EducationForm />
              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="skills" className="space-y-4 mt-6">
              <SkillsForm />
              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="templates" className="space-y-4 mt-6">
              <TemplateSelector />
              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4 mt-6">
              <LanguageSelector className="mb-4" />
              <ResumeActions previewRef={previewRef} />
              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg border overflow-hidden h-[calc(100vh-180px)] lg:sticky lg:top-24">
          <div className="p-4 border-b bg-gray-50 dark:bg-gray-800">
            <h2 className="font-medium">Resume Preview</h2>
          </div>
          <div ref={previewRef} className="h-[calc(100%-57px)] overflow-auto">
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
