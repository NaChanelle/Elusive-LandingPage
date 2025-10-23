interface MailerLiteFormProps {
  formId: string;
  className?: string;
}

export default function MailerLiteForm({ formId, className = '' }: MailerLiteFormProps) {
  // MailerLite iframe embed URL format
  const iframeSrc = `https://landing.mailerlite.com/webforms/landing/${formId}`;

  return (
    <div className={className}>
      <iframe
        src={iframeSrc}
        width="100%"
        height="500"
        frameBorder="0"
        style={{
          border: 'none',
          borderRadius: '8px'
        }}
        title="MailerLite Form"
      />
    </div>
  );
}
