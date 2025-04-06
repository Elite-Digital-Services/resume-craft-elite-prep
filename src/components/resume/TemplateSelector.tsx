
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useResumeContext } from '@/context/ResumeContext';
import { Check } from 'lucide-react';
import { TemplateType } from '@/types/resume';

interface TemplateSelectorProps {
  className?: string;
}

const templates: { id: TemplateType; name: string; description: string }[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean design with accent colors and icons'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional format with a timeless look'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Elegant and minimalist with ample white space'
  }
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ className }) => {
  const { template, setTemplate } = useResumeContext();

  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Choose Template</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((item) => (
              <Button
                key={item.id}
                variant="outline"
                className={`h-auto flex flex-col items-start p-4 relative ${
                  template === item.id ? 'border-eliteblue dark:border-eliteblue-light ring-2 ring-eliteblue/20' : ''
                }`}
                onClick={() => setTemplate(item.id)}
              >
                {template === item.id && (
                  <div className="absolute top-2 right-2">
                    <Check className="h-4 w-4 text-eliteblue dark:text-eliteblue-light" />
                  </div>
                )}
                <div className="text-left">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;
