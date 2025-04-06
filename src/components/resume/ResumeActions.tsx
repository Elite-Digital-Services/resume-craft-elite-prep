
import React, { useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useResumeContext } from '@/context/ResumeContext';
import { Download, Share2, Save, Upload, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useReactToPrint } from 'react-to-print';
import { ResumeData } from '@/types/resume';

interface ResumeActionsProps {
  className?: string;
  previewRef: React.RefObject<HTMLDivElement>;
}

const ResumeActions: React.FC<ResumeActionsProps> = ({ className, previewRef }) => {
  const { resumeData } = useResumeContext();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportPDF = useReactToPrint({
    content: () => previewRef.current,
    documentTitle: `${resumeData.personalInfo.fullName || 'Resume'}_${new Date().toLocaleDateString()}`,
    onBeforeGetContent: () => {
      setIsExporting(true);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setIsExporting(false);
      toast({
        title: "Resume Exported",
        description: "Your resume has been exported to PDF successfully.",
      });
    }
  });

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate saving to database
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Resume Saved",
        description: "Your resume has been saved successfully.",
      });
    }, 1000);
  };

  const handleShare = () => {
    setIsSharing(true);
    
    // Simulate generating a shareable link
    setTimeout(() => {
      setIsSharing(false);
      
      const dummyLink = `https://resumebuilder.elitetestprep.co.uk/share/${Math.random().toString(36).substring(2, 10)}`;
      
      // Copy to clipboard
      navigator.clipboard.writeText(dummyLink).then(
        () => {
          toast({
            title: "Shareable Link Generated",
            description: "The link has been copied to your clipboard.",
          });
        },
        () => {
          toast({
            title: "Couldn't Copy Link",
            description: dummyLink,
            variant: "destructive",
          });
        }
      );
    }, 1500);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string) as ResumeData;
        
        // Basic validation
        if (
          importedData &&
          importedData.personalInfo &&
          typeof importedData.personalInfo === 'object' &&
          Array.isArray(importedData.experience) &&
          Array.isArray(importedData.education) &&
          Array.isArray(importedData.skills)
        ) {
          // For demo, we'd update the context here
          toast({
            title: "Resume Imported",
            description: "Your resume data has been imported successfully.",
          });
        } else {
          throw new Error("Invalid resume data format");
        }
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "The file does not contain valid resume data.",
          variant: "destructive",
        });
      }
    };
    
    reader.readAsText(file);
    
    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateResumeForExport = (): boolean => {
    // Basic validation to ensure essential fields are filled
    const { personalInfo } = resumeData;
    return Boolean(personalInfo.fullName && personalInfo.email);
  };

  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Resume Actions</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="default"
              className="w-full"
              onClick={handleExportPDF}
              disabled={isExporting || !validateResumeForExport()}
            >
              {isExporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export to PDF
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Resume
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleShare}
              disabled={isSharing || !validateResumeForExport()}
            >
              {isSharing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Link...
                </>
              ) : (
                <>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Link
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleImport}
            >
              <Upload className="mr-2 h-4 w-4" />
              Import Resume
            </Button>
            
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="application/json"
              onChange={handleFileUpload}
            />
          </div>
          
          {!validateResumeForExport() && (
            <p className="text-xs text-amber-500 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Please fill in at least your name and email to export or share your resume.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeActions;
