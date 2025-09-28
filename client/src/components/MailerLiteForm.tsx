import { useEffect, useRef } from 'react';

interface MailerLiteFormProps {
  formId: string;
  className?: string;
}

export default function MailerLiteForm({ formId, className = '' }: MailerLiteFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !formId) return;

    // Clear any existing content  
    containerRef.current.innerHTML = `
      <div class="ml-embedded" data-form="${formId}"></div>
    `;

    // Load MailerLite universal script if not already loaded
    if (!document.querySelector('script[src*="universal.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.mailerlite.com/js/universal.js';
      script.async = true;
      script.onload = () => {
        // Initialize MailerLite with account ID
        if (window.ml) {
          window.ml('account', '1605566');
        }
      };
      document.head.appendChild(script);
    } else {
      // If script already loaded, just initialize account
      if (window.ml) {
        window.ml('account', '1605566');
      }
    }

    console.log(`MailerLite form ${formId} embedded with data-form attribute`);

  }, [formId]);

  return (
    <div className={`w-full ${className}`}>
      <div 
        ref={containerRef}
        className="mailerlite-embed-container"
        style={{ minHeight: '120px' }}
      />
      
      {/* Custom styling for MailerLite forms to match ELUSIVE theme */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .mailerlite-embed-container .ml-form-embedContainer {
          background: transparent !important;
          border: none !important;
          width: 100% !important;
        }
        .mailerlite-embed-container .ml-form-embedWrapper {
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
        }
        .mailerlite-embed-container .ml-form-embedBody {
          padding: 0 !important;
          background: transparent !important;
        }
        .mailerlite-embed-container input[type="email"],
        .mailerlite-embed-container input[type="text"] {
          background: rgba(255, 255, 255, 0.1) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          border-radius: 8px !important;
          color: white !important;
          padding: 12px 16px !important;
          width: 100% !important;
          font-size: 14px !important;
          margin-bottom: 12px !important;
        }
        .mailerlite-embed-container input[type="email"]::placeholder,
        .mailerlite-embed-container input[type="text"]::placeholder {
          color: rgba(255, 255, 255, 0.6) !important;
        }
        .mailerlite-embed-container input[type="email"]:focus,
        .mailerlite-embed-container input[type="text"]:focus {
          border-color: #FFB90F !important;
          outline: none !important;
          box-shadow: 0 0 0 2px rgba(255, 185, 15, 0.2) !important;
        }
        .mailerlite-embed-container button[type="submit"] {
          background: #FFB90F !important;
          color: black !important;
          border: none !important;
          border-radius: 8px !important;
          padding: 12px 24px !important;
          font-weight: 500 !important;
          width: 100% !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          font-size: 14px !important;
        }
        .mailerlite-embed-container button[type="submit"]:hover {
          background: rgba(255, 185, 15, 0.9) !important;
          transform: translateY(-1px) !important;
        }
        .mailerlite-embed-container .ml-form-successMessage {
          color: #10B981 !important;
          background: rgba(16, 185, 129, 0.1) !important;
          border: 1px solid rgba(16, 185, 129, 0.3) !important;
          border-radius: 8px !important;
          padding: 12px !important;
          margin-top: 12px !important;
        }
        .mailerlite-embed-container .ml-form-errorMessage {
          color: #EF4444 !important;
          background: rgba(239, 68, 68, 0.1) !important;
          border: 1px solid rgba(239, 68, 68, 0.3) !important;
          border-radius: 8px !important;
          padding: 12px !important;
          margin-top: 12px !important;
        }
        `
      }} />
    </div>
  );
}

// Extend window for MailerLite global
declare global {
  interface Window {
    ml: any;
  }
}