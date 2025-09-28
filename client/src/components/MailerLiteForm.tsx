interface MailerLiteFormProps {
  formId: string;
  className?: string;
}

export default function MailerLiteForm({ formId, className = '' }: MailerLiteFormProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* Direct iframe embed - bypasses Universal script issues */}
      <iframe 
        src={`https://landing.mailerlite.com/webforms/landing/${formId}`}
        width="100%" 
        height="400"
        frameBorder="0"
        style={{ border: 'none', borderRadius: '8px' }}
        title="MailerLite Form"
        data-testid={`mailerlite-form-${formId}`}
      />
    </div>
  );
}