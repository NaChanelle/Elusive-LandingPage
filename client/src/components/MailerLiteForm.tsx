import { useEffect } from 'react';

interface MailerLiteFormProps {
  formId: string;
  className?: string;
}

export default function MailerLiteForm({ formId, className = '' }: MailerLiteFormProps) {
  useEffect(() => {
    // Load MailerLite script if not already loaded
    if (!document.querySelector('script[src*="mailerlite"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.mailerlite.com/js/universal.js';
      script.async = true;
      document.body.appendChild(script);
      
      script.onload = () => {
        // Initialize MailerLite after script loads
        if (window.ml) {
          window.ml('account', '1605566');
        }
      };
    } else {
      // If script already loaded, just initialize
      if (window.ml) {
        window.ml('account', '1605566');
      }
    }
  }, []);

  return (
    <div className={`ml-embedded ${className}`} data-form={formId}></div>
  );
}

// Declare window.ml for TypeScript
declare global {
  interface Window {
    ml: (...args: any[]) => void;
  }
}
