
import React from 'react';
import { ResumeData } from '@/types/resume';

interface ClassicTemplateProps {
  data: ResumeData;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="resume-page">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wide">{personalInfo.fullName}</h1>
        {personalInfo.title && <h2 className="text-lg mt-1">{personalInfo.title}</h2>}
        
        <div className="mt-3 text-sm">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-1">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        </div>
      </header>
      
      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b pb-1 mb-2">Professional Summary</h2>
          <p className="text-sm">{summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b pb-1 mb-3">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="text-sm">
                <div className="flex justify-between font-semibold">
                  <span>{exp.company}</span>
                  <span>
                    {exp.startDate} - {exp.isCurrentPosition ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between italic">
                  <span>{exp.position}</span>
                  {exp.location && <span>{exp.location}</span>}
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
          <h2 className="text-lg font-bold uppercase border-b pb-1 mb-3">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="text-sm">
                <div className="flex justify-between font-semibold">
                  <span>{edu.institution}</span>
                  <span>
                    {edu.startDate} - {edu.isCurrentlyStudying ? 'Present' : edu.endDate}
                  </span>
                </div>
                <div className="flex justify-between italic">
                  <span>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</span>
                  {edu.location && <span>{edu.location}</span>}
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
          <h2 className="text-lg font-bold uppercase border-b pb-1 mb-3">Skills</h2>
          <p className="text-sm">{skills.join(' • ')}</p>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
