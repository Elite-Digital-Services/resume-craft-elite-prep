
import React from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SaveStatusProps {
  className?: string;
}

const SaveStatus: React.FC<SaveStatusProps> = ({ className }) => {
  const { saveStatus } = useResumeContext();

  if (!saveStatus) return null;

  return (
    <div className={cn("flex items-center text-xs gap-1", className)}>
      {saveStatus === 'saved' && (
        <>
          <Check className="h-3 w-3 text-green-500" />
          <span className="text-muted-foreground">All changes saved</span>
        </>
      )}
      
      {saveStatus === 'saving' && (
        <>
          <Clock className="h-3 w-3 text-amber-500 animate-pulse" />
          <span className="text-muted-foreground">Saving changes...</span>
        </>
      )}
      
      {saveStatus === 'error' && (
        <>
          <AlertCircle className="h-3 w-3 text-destructive" />
          <span className="text-destructive">Error saving changes</span>
        </>
      )}
    </div>
  );
};

export default SaveStatus;
