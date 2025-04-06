
import React from 'react';
import { ResumeData } from '@/types/resume';

interface MinimalTemplateProps {
  data: ResumeData;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="resume-page">
      {/* Header */}
      <header className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-light">{personalInfo.fullName}</h1>
        {personalInfo.title && <h2 className="text-lg text-gray-600 mt-1">{personalInfo.title}</h2>}
        
        <div className="mt-4 text-sm flex flex-wrap gap-x-6 gap-y-1 text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>
      
      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-lg font-light uppercase tracking-wider mb-2">About</h2>
          <p className="text-sm">{summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-light uppercase tracking-wider mb-3">Experience</h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id} className="text-sm">
                <h3 className="font-medium">{exp.position}</h3>
                <div className="text-gray-600 flex flex-wrap justify-between">
                  <span>{exp.company}{exp.location ? `, ${exp.location}` : ''}</span>
                  <span>
                    {exp.startDate} — {exp.isCurrentPosition ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-light uppercase tracking-wider mb-3">Education</h2>
          <div className="space-y-5">
            {education.map((edu) => (
              <div key={edu.id} className="text-sm">
                <h3 className="font-medium">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                <div className="text-gray-600 flex flex-wrap justify-between">
                  <span>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</span>
                  <span>
                    {edu.startDate} — {edu.isCurrentlyStudying ? 'Present' : edu.endDate}
                  </span>
                </div>
                {(edu.gpa || edu.description) && (
                  <p className="mt-2">
                    {edu.gpa && `GPA: ${edu.gpa}`}
                    {edu.gpa && edu.description && ' | '}
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-lg font-light uppercase tracking-wider mb-3">Skills</h2>
          <div className="text-sm">
            {skills.join(' • ')}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;
