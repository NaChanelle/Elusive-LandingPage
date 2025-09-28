import { useEffect, useRef } from 'react';

interface MailerLiteFormProps {
  formId: string;
  className?: string;
}

export default function MailerLiteForm({ formId, className = '' }: MailerLiteFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeForm = () => {
      if (typeof window !== 'undefined' && (window as any).ml && containerRef.current) {
        // Trigger MailerLite to scan for embedded forms
        try {
          // Force re-initialization of embedded forms
          (window as any).ml('account', '1605566');
          
          // Try to trigger form rendering after a short delay
          setTimeout(() => {
            if ((window as any).ml && (window as any).ml.fn) {
              // Check if forms data is available and render
              const mlFn = (window as any).ml.fn;
              if (mlFn.jsonpRequest && typeof mlFn.jsonpRequest === 'function') {
                mlFn.jsonpRequest();
              }
            }
          }, 100);
        } catch (error) {
          console.log('MailerLite initialization:', error);
        }
      }
    };

    // Initialize when component mounts
    initializeForm();

    // Also try after a delay in case script is still loading
    const timer = setTimeout(initializeForm, 500);
    
    return () => clearTimeout(timer);
  }, [formId]);

  return (
    <div className={`w-full ${className}`}>
      {/* Use exact MailerLite embed structure */}
      <div ref={containerRef} className="ml-embedded" data-form={formId}></div>
    </div>
  );
}