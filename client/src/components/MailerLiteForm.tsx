import { useEffect } from 'react';

interface MailerLiteFormProps {
  formId: string;
  className?: string;
}

export default function MailerLiteForm({ formId, className = '' }: MailerLiteFormProps) {
  useEffect(() => {
    // Load MailerLite Universal Script exactly as provided by MailerLite
    if (!document.querySelector('script[src*="universal.js"]')) {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
        .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
        n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
        (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
        ml('account', '1605566');
      `;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className={`w-full ${className}`}>
      {/* Use exact MailerLite embed structure */}
      <div className="ml-embedded" data-form={formId}></div>
    </div>
  );
}