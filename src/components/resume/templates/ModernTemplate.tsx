
import React from 'react';
import { ResumeData } from '@/types/resume';
import { Phone, Mail, MapPin, Linkedin, Globe } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="resume-page">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-eliteblue">{personalInfo.fullName}</h1>
        <h2 className="text-xl mt-1 text-gray-600">{personalInfo.title}</h2>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5 text-eliteblue" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5 text-eliteblue" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-eliteblue" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-3.5 w-3.5 text-eliteblue" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-3.5 w-3.5 text-eliteblue" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>
      
      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-eliteblue mb-2 pb-1">Professional Summary</h2>
          <p className="text-sm">{summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-eliteblue mb-3 pb-1">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="text-sm">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{exp.position}</h3>
                  <span className="text-gray-600">
                    {exp.startDate} - {exp.isCurrentPosition ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <h4 className="text-eliteblue">{exp.company}</h4>
                  {exp.location && <span className="text-gray-600">{exp.location}</span>}
                </div>
                <p className="mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-eliteblue mb-3 pb-1">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="text-sm">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <span className="text-gray-600">
                    {edu.startDate} - {edu.isCurrentlyStudying ? 'Present' : edu.endDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <h4 className="text-eliteblue">{edu.institution}</h4>
                  {edu.location && <span className="text-gray-600">{edu.location}</span>}
                </div>
                {edu.gpa && <p className="mt-1">GPA: {edu.gpa}</p>}
                {edu.description && <p className="mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-lg font-bold border-b-2 border-eliteblue mb-3 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 text-eliteblue rounded-full px-3 py-1 text-xs">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;
