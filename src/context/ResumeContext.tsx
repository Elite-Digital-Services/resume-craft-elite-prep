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
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';

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
  const { user } = useAuth();
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [template, setTemplate] = useState<TemplateType>('modern');
  const [language, setLanguage] = useState<LanguageType>('english');
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');

  // Load resume data from Supabase or local storage when user changes
  useEffect(() => {
    const fetchResume = async () => {
      setLoading(true);
      
      if (user) {
        // If logged in, try to fetch from Supabase
        try {
          const { data, error } = await supabase
            .from('resumes')
            .select('data, template, language')
            .eq('user_id', user.id)
            .single();

          if (error) {
            console.error('Error fetching resume:', error);
            // Fall back to local storage if error
            loadFromLocalStorage();
          } else if (data) {
            setResumeData(JSON.parse(data.data));
            setTemplate(data.template as TemplateType || 'modern');
            setLanguage(data.language as LanguageType || 'english');
          }
        } catch (error) {
          console.error('Error parsing resume data:', error);
          loadFromLocalStorage();
        }
      } else {
        // If not logged in, use local storage
        loadFromLocalStorage();
      }
      
      setLoading(false);
    };

    const loadFromLocalStorage = () => {
      const savedData = localStorage.getItem('resumeData');
      const savedTemplate = localStorage.getItem('resumeTemplate');
      const savedLanguage = localStorage.getItem('resumeLanguage');
      
      setResumeData(savedData ? JSON.parse(savedData) : initialResumeData);
      setTemplate((savedTemplate as TemplateType) || 'modern');
      setLanguage((savedLanguage as LanguageType) || 'english');
    };

    fetchResume();
  }, [user]);

  // Save to local storage and Supabase when data changes
  useEffect(() => {
    const saveResume = async () => {
      if (loading) return;

      // Always save to local storage
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
      localStorage.setItem('resumeTemplate', template);
      localStorage.setItem('resumeLanguage', language);

      // If logged in, save to Supabase
      if (user) {
        setSaveStatus('saving');
        try {
          const { error } = await supabase
            .from('resumes')
            .upsert(
              {
                user_id: user.id,
                data: JSON.stringify(resumeData),
                template: template,
                language: language,
                updated_at: new Date().toISOString(),
              },
              { onConflict: 'user_id' }
            );

          if (error) {
            console.error('Error saving resume:', error);
            setSaveStatus('error');
          } else {
            setSaveStatus('saved');
          }
        } catch (error) {
          console.error('Error saving resume:', error);
          setSaveStatus('error');
        }
      }
    };

    // Debounce save to avoid too many requests
    const timer = setTimeout(() => {
      saveResume();
    }, 1000);

    return () => clearTimeout(timer);
  }, [resumeData, template, language, user, loading]);

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
    saveStatus,
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
