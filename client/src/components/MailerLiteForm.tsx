import { useEffect } from 'react';

interface MailerLiteFormProps {
  formId: string;
  className?: string;
}

export default function MailerLiteForm({ formId, className = '' }: MailerLiteFormProps) {
  useEffect(() => {
    // Ensure MailerLite script renders the form after component mounts
    const renderForm = () => {
      if (typeof window !== 'undefined' && (window as any).ml) {
        // Initialize MailerLite forms using the correct API
        try {
          (window as any).ml('forms');
        } catch (error) {
          console.log('MailerLite form initialization:', error);
        }
      }
    };

    // Small delay to ensure DOM is ready and script loaded
    const timer = setTimeout(renderForm, 200);
    
    return () => clearTimeout(timer);
  }, [formId]);

  return (
    <div className={`w-full ${className}`}>
      {/* Use exact MailerLite embed structure with proper IDs */}
      <div id={`mlb2-${formId}`} className="ml-form-embedContainer"></div>
    </div>
  );
}