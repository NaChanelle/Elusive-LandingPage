import { useEffect, useRef } from 'react';

interface MailerLiteFormProps {
  formId: string;
  className?: string;
}

export default function MailerLiteForm({ formId, className = '' }: MailerLiteFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    if (isLoadedRef.current) return;

    const loadForm = () => {
      if (window.ml && containerRef.current) {
        try {
          // Clear any existing content
          containerRef.current.innerHTML = '';
          
          // Load the MailerLite form
          window.ml('forms', 'load', formId, containerRef.current);
          isLoadedRef.current = true;
          
          console.log(`MailerLite form ${formId} loaded successfully`);
        } catch (error) {
          console.error('MailerLite form loading error:', error);
        }
      }
    };

    // Check if MailerLite is already loaded
    if (window.ml) {
      loadForm();
    } else {
      // Wait for MailerLite to load
      const checkInterval = setInterval(() => {
        if (window.ml) {
          clearInterval(checkInterval);
          loadForm();
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!isLoadedRef.current) {
          console.warn(`MailerLite form ${formId} failed to load after 10 seconds`);
        }
      }, 10000);

      return () => clearInterval(checkInterval);
    }
  }, [formId]);

  return (
    <div 
      ref={containerRef}
      className={`mailerlite-form ${className}`}
      data-form={formId}
    />
  );
}

// MailerLite global is already declared in index.html script