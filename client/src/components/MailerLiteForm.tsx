import { useState } from 'react';
import { Button } from "@/components/ui/button";

interface MailerLiteFormProps {
  formId: string;
  className?: string;
}

export default function MailerLiteForm({ formId, className = '' }: MailerLiteFormProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      // Submit to our backend first (for backup)
      const response = await fetch('/api/rsvps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName: firstName || undefined,
          source: `form_${formId}`,
          investigationInterests: [],
        }),
      });

      if (!response.ok) {
        throw new Error('Network error');
      }

      // Also submit directly to MailerLite using JSONP-like approach
      try {
        const mailerLiteSubmit = await fetch(`https://landing.mailerlite.com/webforms/submitform/${formId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            'fields[email]': email,
            'fields[name]': firstName || '',
            'ml-submit': '1',
            'anticsrf': 'true'
          }).toString(),
          mode: 'no-cors'
        });
        
        console.log('Submitted to MailerLite successfully');
      } catch (mlError) {
        console.log('MailerLite direct submission failed, but backup saved');
      }

      setMessage('✅ Success! You\'ll be notified when we launch.');
      setEmail('');
      setFirstName('');
      
    } catch (error) {
      console.error('Form submission error:', error);
      setMessage('❌ Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field (optional for some forms) */}
        {(formId !== '28257750') && (
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name (optional)"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB90F] focus:border-transparent transition-all"
            data-testid="input-firstname"
          />
        )}
        
        {/* Email Field */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB90F] focus:border-transparent transition-all"
          data-testid="input-email"
        />
        
        {/* Submit Button */}
        <Button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#FFB90F] hover:bg-[#FFB90F]/90 text-black font-medium py-3 rounded-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="button-submit"
        >
          {isSubmitting ? 'Joining...' : getButtonText(formId)}
        </Button>
        
        {/* Status Message */}
        {message && (
          <p className={`text-center text-sm transition-all ${
            message.includes('Success') || message.includes('✅') 
              ? 'text-green-400' 
              : 'text-red-400'
          }`} data-testid="form-message">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

// Helper function to get appropriate button text based on form
function getButtonText(formId: string): string {
  switch (formId) {
    case '28257750': // Home page
      return 'Reserve Your Investigation';
    case '28258222': // Platform page  
      return 'Join the Event';
    case '28314007': // Vessel page
      return 'Get Early Access';
    default:
      return 'Submit';
  }
}