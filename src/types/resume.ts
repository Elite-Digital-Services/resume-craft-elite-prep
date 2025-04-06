
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  linkedin?: string;
  website?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrentPosition: boolean;
  description: string;
  location?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  isCurrentlyStudying: boolean;
  description?: string;
  location?: string;
  gpa?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
}

export type TemplateType = 'modern' | 'classic' | 'minimal';

export type LanguageType = 'english' | 'french' | 'arabic';

export interface ResumeContextType {
  resumeData: ResumeData;
  template: TemplateType;
  language: LanguageType;
  saveStatus?: 'saved' | 'saving' | 'error';
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;
  addExperience: (experience: Omit<ExperienceItem, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  addEducation: (education: Omit<EducationItem, 'id'>) => void;
  updateEducation: (id: string, education: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  updateSkills: (skills: string[]) => void;
  setTemplate: (template: TemplateType) => void;
  setLanguage: (language: LanguageType) => void;
}
