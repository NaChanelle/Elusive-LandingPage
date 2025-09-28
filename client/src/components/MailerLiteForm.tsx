import { useEffect, useRef } from 'react';

interface MailerLiteFormProps {
  formId: string;
  className?: string;
}

export default function MailerLiteForm({ formId, className = '' }: MailerLiteFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Try the updated MailerLite integration approach
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://static.mailerlite.com/js/w/webforms.min.js?v${Date.now()}`;
    
    // Create the embed structure with additional attributes
    containerRef.current.innerHTML = `
      <div class="ml-form-embed" 
           data-account="1605566" 
           data-form="${formId}"
           id="mlb2-${formId}">
      </div>
    `;
    
    // Add script to head if not already present
    if (!document.querySelector(`script[src*="webforms.min.js"]`)) {
      document.head.appendChild(script);
    }
    
    // Force re-initialization after a delay
    setTimeout(() => {
      if (window.ml && window.ml.show) {
        try {
          window.ml.show({
            webforms: {
              'form': formId
            }
          });
        } catch (e) {
          console.log(`Attempting alternate initialization for form ${formId}`);
        }
      }
    }, 1000);

    console.log(`MailerLite form ${formId} updated integration attempt`);

  }, [formId]);

  return (
    <div 
      ref={containerRef}
      className={`mailerlite-form ${className}`}
      style={{ minHeight: '120px' }}
    />
  );
}

// MailerLite types already declared globally