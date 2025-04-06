
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ResumeData, 
  PersonalInfo, 
  ExperienceItem, 
  EducationItem,
  ResumeContextType,
  TemplateType,
  LanguageType
} from '@/types/resume';

// Simple ID generation function to replace uuid
const generateId = () => `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Default initial resume data
const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    // Try to load from local storage
    const savedData = localStorage.getItem('resumeData');
    return savedData ? JSON.parse(savedData) : initialResumeData;
  });
  
  const [template, setTemplate] = useState<TemplateType>(() => {
    const savedTemplate = localStorage.getItem('resumeTemplate');
    return (savedTemplate as TemplateType) || 'modern';
  });
  
  const [language, setLanguage] = useState<LanguageType>(() => {
    const savedLanguage = localStorage.getItem('resumeLanguage');
    return (savedLanguage as LanguageType) || 'english';
  });

  // Save to local storage whenever data changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('resumeTemplate', template);
  }, [template]);

  useEffect(() => {
    localStorage.setItem('resumeLanguage', language);
  }, [language]);

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const updateSummary = (summary: string) => {
    setResumeData((prev) => ({ ...prev, summary }));
  };

  const addExperience = (experience: Omit<ExperienceItem, 'id'>) => {
    const newExperience = { ...experience, id: generateId() };
    setResumeData((prev) => ({
      ...prev,
      experience: [newExperience, ...prev.experience],
    }));
  };

  const updateExperience = (id: string, experience: Partial<ExperienceItem>) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((item) =>
        item.id === id ? { ...item, ...experience } : item
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }));
  };

  const addEducation = (education: Omit<EducationItem, 'id'>) => {
    const newEducation = { ...education, id: generateId() };
    setResumeData((prev) => ({
      ...prev,
      education: [newEducation, ...prev.education],
    }));
  };

  const updateEducation = (id: string, education: Partial<EducationItem>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((item) =>
        item.id === id ? { ...item, ...education } : item
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  const updateSkills = (skills: string[]) => {
    setResumeData((prev) => ({ ...prev, skills }));
  };

  const value = {
    resumeData,
    template,
    language,
    updatePersonalInfo,
    updateSummary,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    updateSkills,
    setTemplate,
    setLanguage,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};
