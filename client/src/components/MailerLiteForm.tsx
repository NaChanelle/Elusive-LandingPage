import { useEffect, useRef } from 'react';

interface MailerLiteFormProps {
  formId: string;
  className?: string;
}

export default function MailerLiteForm({ formId, className = '' }: MailerLiteFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create the proper MailerLite embed structure
    containerRef.current.innerHTML = `<div class="ml-embedded" data-form="${formId}"></div>`;
    
    // Debug logging to check what's happening
    console.log(`MailerLite form ${formId} container created`);
    
    // Check if MailerLite universal script is loaded
    setTimeout(() => {
      console.log('MailerLite check:', {
        formId,
        mlAvailable: !!window.ml,
        container: containerRef.current?.innerHTML,
        embedFound: !!document.querySelector(`[data-form="${formId}"]`)
      });
    }, 2000);

  }, [formId]);

  return (
    <div 
      ref={containerRef}
      className={`mailerlite-form ${className}`}
      style={{ minHeight: '120px' }} // Ensure space for the form
    />
  );
}

// Extend window type for MailerLite
declare global {
  interface Window {
    ml: any;
  }
}