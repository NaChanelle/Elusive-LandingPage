import { useEffect, useRef, useState } from 'react';

interface MailerLiteFormProps {
  formId: string;
  className?: string;
}

export default function MailerLiteForm({ formId, className = '' }: MailerLiteFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadForm = () => {
      if (typeof window !== 'undefined' && (window as any).ml && containerRef.current) {
        try {
          // Use MailerLite's official forms load method
          (window as any).ml('forms', 'load', formId, `#mailerlite-form-${formId}`);
          setIsLoaded(true);
        } catch (error) {
          console.log('MailerLite form loading:', error);
          // Retry after delay if first attempt fails
          setTimeout(() => {
            if ((window as any).ml) {
              try {
                (window as any).ml('forms', 'load', formId, `#mailerlite-form-${formId}`);
                setIsLoaded(true);
              } catch (retryError) {
                console.log('MailerLite retry failed:', retryError);
              }
            }
          }, 1000);
        }
      }
    };

    // Wait for MailerLite script to be ready
    const checkAndLoad = () => {
      if ((window as any).ml) {
        loadForm();
      } else {
        setTimeout(checkAndLoad, 100);
      }
    };

    // Start checking after a brief delay
    const timer = setTimeout(checkAndLoad, 500);
    
    return () => clearTimeout(timer);
  }, [formId]);

  return (
    <div className={`w-full ${className}`}>
      {/* MailerLite form container with unique ID */}
      <div 
        id={`mailerlite-form-${formId}`} 
        ref={containerRef}
        className="w-full min-h-[300px]"
        data-testid={`mailerlite-form-${formId}`}
      >
        {!isLoaded && (
          <div className="flex items-center justify-center min-h-[300px] text-gray-400">
            Loading form...
          </div>
        )}
      </div>
    </div>
  );
}