import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface MailerLiteFormProps {
  formId: string;
  className?: string;
}

export default function MailerLiteForm({ formId, className = '' }: MailerLiteFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          formId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      const data = await response.json();
      
      toast({
        title: "Success!",
        description: "You've been added to our mystery investigation list. Welcome, truth-seeker.",
        className: "bg-[#FFB90F] text-black border-[#FFB90F]"
      });

      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us if the issue persists.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="your.email@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#FFB90F] focus:ring-[#FFB90F]"
          data-testid={`email-input-${formId}`}
          disabled={isSubmitting}
        />
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-[#FFB90F] hover:bg-[#e6a50e] text-black font-medium px-6 whitespace-nowrap"
          data-testid={`submit-button-${formId}`}
        >
          {isSubmitting ? 'Joining...' : 'Join Investigation'}
        </Button>
      </form>
    </div>
  );
}