interface MailerLiteFormProps {
  formId: string;
  className?: string;
}

export default function MailerLiteForm({ formId, className = '' }: MailerLiteFormProps) {
  return (
    <div className={`w-full ${className}`}>
      <iframe
        src={`https://landing.mailerlite.com/webforms/landing/${formId}`}
        width="100%"
        height="400"
        style={{
          border: 'none',
          borderRadius: '8px',
          background: 'transparent'
        }}
        title="MailerLite Signup Form"
        loading="lazy"
        data-testid={`mailerlite-form-${formId}`}
      />
    </div>
  );
}