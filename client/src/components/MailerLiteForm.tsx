import { useEffect, useRef } from 'react';

interface MailerLiteFormProps {
  formId: string;
  className?: string;
}

export default function MailerLiteForm({ formId, className = '' }: MailerLiteFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    const loadMailerLite = () => {
      // Check if script already exists
      if (document.querySelector('script[src*="assets.mailerlite.com/js/universal.js"]')) {
        // Script exists, just initialize
        if ((window as any).ml) {
          (window as any).ml('account', '1605566');
        }
        return;
      }

      // Create and load the MailerLite universal script
      const script = document.createElement('script');
      script.src = 'https://assets.mailerlite.com/js/universal.js';
      script.async = true;
      
      script.onload = () => {
        if ((window as any).ml) {
          (window as any).ml('account', '1605566');
        }
      };
      
      document.head.appendChild(script);
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(loadMailerLite, 100);
    
    return () => clearTimeout(timer);
  }, [formId]);

  return (
    <div ref={containerRef} className={`ml-embedded ${className}`} data-form={formId}></div>
  );
}
