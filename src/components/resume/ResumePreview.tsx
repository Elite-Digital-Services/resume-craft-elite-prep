
import React from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

interface ResumePreviewProps {
  className?: string;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ className }) => {
  const { resumeData, template } = useResumeContext();

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div className={`bg-gray-100 dark:bg-gray-800 p-4 overflow-auto h-full ${className}`}>
      <div className="shadow-lg">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
