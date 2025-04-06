
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LanguageType } from '@/types/resume';
import { useResumeContext } from '@/context/ResumeContext';
import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageSelectorProps {
  className?: string;
}

const languages = [
  { id: 'english', name: 'English' },
  { id: 'french', name: 'Français' },
  { id: 'arabic', name: 'العربية' }
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className }) => {
  const { language, setLanguage } = useResumeContext();
  
  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Language
          </h3>
          
          <Select 
            value={language} 
            onValueChange={(value) => setLanguage(value as LanguageType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.id} value={lang.id}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default LanguageSelector;
