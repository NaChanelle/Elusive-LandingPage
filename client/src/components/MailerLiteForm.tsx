import { useState } from 'react';

interface MailerLiteFormProps {
  formId: string;
  className?: string;
  placeholder?: string;
  buttonText?: string;
}

export default function MailerLiteForm({ 
  formId, 
  className = '', 
  placeholder = "Enter your email address",
  buttonText = "Join the Investigation"
}: MailerLiteFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setMessage('');

    try {
      // For now, we'll log to console and show success
      // This can be easily replaced with MailerLite API call once forms are configured
      console.log(`Form ${formId} email submission:`, email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('✅ Welcome, truth-seeker! You\'ll be notified when the investigation begins.');
      setEmail('');
    } catch (error) {
      setMessage('❌ Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`mailerlite-form ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FFB90F] focus:outline-none focus:ring-2 focus:ring-[#FFB90F]/20 transition-all duration-300"
            data-testid="input-email"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || !email}
          className="w-full px-6 py-3 bg-[#FFB90F] text-black font-semibold rounded-lg hover:bg-[#FFB90F]/90 focus:outline-none focus:ring-2 focus:ring-[#FFB90F]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          data-testid="button-submit"
        >
          {isSubmitting ? 'Joining...' : buttonText}
        </button>
        
        {message && (
          <div className="text-sm text-center text-gray-300 mt-2">
            {message}
          </div>
        )}
      </form>
      
      {/* Hidden form ID for future MailerLite integration */}
      <input type="hidden" value={formId} />
    </div>
  );
}