interface MailerLiteFormProps {
  formId: string;
  className?: string;
}

export default function MailerLiteForm({ formId, className = '' }: MailerLiteFormProps) {
  // Use direct iframe embed approach for reliable MailerLite integration
  const iframeSrc = `https://landing.mailerlite.com/webforms/landing/${formId}`;
  
  return (
    <div className={`mailerlite-form ${className}`}>
      <iframe
        src={iframeSrc}
        width="100%"
        height="400"
        frameBorder="0"
        style={{
          border: 'none',
          borderRadius: '12px',
          background: 'transparent'
        }}
        title={`MailerLite Form ${formId}`}
        loading="lazy"
      />
    </div>
  );
}