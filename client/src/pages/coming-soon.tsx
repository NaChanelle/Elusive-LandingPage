// src/pages/coming-soon.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Clock, Mail, Menu, ChevronUp, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Define TypeScript interfaces for the content
interface FooterLink {
  text: string;
  url: string;
}

interface GalleryImage {
  url: string;
  alt: string;
  image?: string;
}

interface Testimonial {
  quote: string;
  initials: string;
  name: string;
  role: string;
}

interface WhyJoinFeature {
  title: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ComingSoonContent {
  header_logo_text: string;
  event_updates_button_text: string;
  event_updates_link: string;
  vessel_preview_button_text: string;
  vessel_preview_link: string;
  main_headline_part1: string;
  main_headline_part2: string;
  main_headline_part3: string;
  hero_description: string;
  countdown_title: string;
  countdown_days_label: string;
  countdown_hours_label: string;
  countdown_minutes_label: string;
  countdown_seconds_label: string;
  countdown_date: string;
  countdown_type: string;
  rsvp_countdown_title: string;
  current_rsvps: number;
  target_rsvps: number;
  rsvp_progress_text: string;
  signup_section_title: string;
  signup_section_description: string;
  mailerlite_form_id: string;
  signup_form_footer_text: string;
  share_page_text: string;
  twitter_share_text: string;
  email_share_subject: string;
  email_share_body: string;
  gallery_images: GalleryImage[];
  testimonials_title: string;
  testimonials: Testimonial[];
  why_join_title: string;
  why_join_features: WhyJoinFeature[];
  faq_section_title: string;
  faq_items: FAQItem[];
  footer_logo_text: string;
  footer_copyright_text: string;
  footer_links: FooterLink[];
}

declare global {
  interface Window {
    mailerlite?: any;
    MailerLiteObject?: any;
  }
}

export default function ComingSoon() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // State for dynamic content with proper typing
  const [content, setContent] = useState<ComingSoonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentRSVPs, setCurrentRSVPs] = useState(0);
  const [investigationChoice, setInvestigationChoice] = useState<string>("");
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch content and current RSVP count
  useEffect(() => {
    Promise.all([
      fetch('/assets/content/coming-soon.json').then(res => res.json()),
      fetch('/api/rsvps/count').then(res => res.json())
    ])
      .then(([contentData, rsvpData]) => {
        setContent(contentData);
        setCurrentRSVPs(rsvpData.count);
        setLoading(false);
      })
      .catch((err: Error) => {
        console.error("Error loading page data:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // Handle scroll effect for menu transformation and back to top button
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && !(event.target as Element).closest('header')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  // Countdown timer logic, now using dynamic targetDate from content
  useEffect(() => {
    if (!content?.countdown_date) return; // Wait for content to load

    const targetDate = new Date(content.countdown_date);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [content]);

  // Helper to render MailerLite forms with proper typing
  const renderMailerLiteForm = (formId: string, embedDivId: string) => {
    if (!formId || formId === 'your-mailerlite-form-id') {
      // Return a simple fallback form if no MailerLite ID is configured
      return (
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB90F]"
          />
          <Button className="w-full bg-[#FFB90F] hover:bg-[#FFB90F]/90 text-black font-medium py-3 rounded-lg">
            Reserve Your Spot
          </Button>
        </div>
      );
    }

    return (
      <div id={embedDivId}>
        <div data-ml-form={formId}></div>
      </div>
    );
  };

  // Handle RSVP submission with investigation choice
  const handleRSVPSubmit = async (email: string, firstName: string = '') => {
    try {
      const response = await fetch('/api/rsvps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
          investigationChoice,
          source: 'coming_soon'
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit RSVP');
      }

      // Update RSVP count immediately
      setCurrentRSVPs(prev => prev + 1);
      
      return data;
    } catch (error) {
      console.error('RSVP submission error:', error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Submit RSVP to our backend first
      await handleRSVPSubmit(email, firstName);
      
      setMessage('Success! You\'ll be notified when we launch.');
      setEmail('');
      setFirstName('');
      
    } catch (error: any) {
      setMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // MailerLite embed form with custom styling
  const renderEnhancedMailerLiteForm = () => {
    return (
      <div className="mailerlite-form-wrapper">
        <div 
          className="ml-embedded" 
          data-form={content?.mailerlite_form_id}
        ></div>
        <style dangerouslySetInnerHTML={{
          __html: `
          .mailerlite-form-wrapper .ml-form-embedContainer {
            background: transparent !important;
            border: none !important;
            width: 100% !important;
          }
          .mailerlite-form-wrapper .ml-form-embedWrapper {
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
          }
          .mailerlite-form-wrapper .ml-form-embedBody {
            padding: 0 !important;
            background: transparent !important;
          }
          .mailerlite-form-wrapper input[type="email"],
          .mailerlite-form-wrapper input[type="text"] {
            background: rgba(255, 255, 255, 0.1) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            border-radius: 8px !important;
            color: white !important;
            padding: 12px 16px !important;
            width: 100% !important;
            font-size: 14px !important;
            margin-bottom: 12px !important;
          }
          .mailerlite-form-wrapper input[type="email"]::placeholder,
          .mailerlite-form-wrapper input[type="text"]::placeholder {
            color: rgba(255, 255, 255, 0.6) !important;
          }
          .mailerlite-form-wrapper input[type="email"]:focus,
          .mailerlite-form-wrapper input[type="text"]:focus {
            border-color: #FFB90F !important;
            outline: none !important;
          }
          .mailerlite-form-wrapper button[type="submit"] {
            background: #FFB90F !important;
            color: black !important;
            border: none !important;
            border-radius: 8px !important;
            padding: 12px 24px !important;
            font-weight: 500 !important;
            width: 100% !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
          }
          .mailerlite-form-wrapper button[type="submit"]:hover {
            background: rgba(255, 185, 15, 0.9) !important;
          }
          `
        }} />
      </div>
    );
  };

  // MailerLite script loading effect
  useEffect(() => {
    if (content?.mailerlite_form_id && content.mailerlite_form_id !== 'your-mailerlite-form-id') {
      if (!document.querySelector('script[src*="static.mailerlite.com"]')) {
        const script = document.createElement('script');
        script.src = 'https://static.mailerlite.com/js/universal.js';
        script.async = true;
        script.onload = () => {
          // Initialize MailerLite forms after script loads
          if (window.MailerLiteObject) {
            window.MailerLiteObject.q = window.MailerLiteObject.q || [];
            window.MailerLiteObject.q.push(['init', { embedMode: true }]);
          }
        };
        document.head.appendChild(script);
      }
    }
  }, [content?.mailerlite_form_id]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Conditional rendering for loading and error states
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] text-white">
        Loading content...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] text-red-600">
        Error loading content: {error.message}
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] text-white">
        No content available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] text-white">
      {/* Header */}
      <header className="relative z-50 p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-2 border-[#FFB90F] rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#FFB90F] rounded-full"></div>
            </div>
            <span className="text-xl font-bold tracking-wider">{content.header_logo_text}</span>
          </div>

          {/* Desktop Navigation with Animated Buttons */}
          <nav className="hidden md:flex items-center space-x-4">
            <div className={`transition-all duration-700 ${scrolled ? 'opacity-0 transform translate-x-8 scale-0' : 'opacity-100 transform translate-x-0 scale-100'}`}>
              <Link href={content.event_updates_link}>
                <Button className="bg-[#FFB90F] hover:bg-[#FFB90F]/90 text-black font-medium px-6 py-2 rounded-full transition-all duration-300 hover:scale-105">
                  {content.event_updates_button_text}
                </Button>
              </Link>
            </div>
            <div className={`transition-all duration-700 delay-100 ${scrolled ? 'opacity-0 transform translate-x-8 scale-0' : 'opacity-100 transform translate-x-0 scale-100'}`}>
              <Link href={content.vessel_preview_link}>
                <Button className="bg-[#8B0000] hover:bg-[#8B0000]/90 text-white font-medium px-6 py-2 rounded-full transition-all duration-300 hover:scale-105">
                  {content.vessel_preview_button_text}
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button (always visible on mobile) */}
          <div className="md:hidden">
            <Button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg backdrop-blur-sm border border-white/20"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-white/10 p-4 space-y-3">
            <Link href={content.event_updates_link} onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-[#FFB90F] hover:bg-[#FFB90F]/90 text-black font-medium py-3 rounded-lg">
                {content.event_updates_button_text}
              </Button>
            </Link>
            <Link href={content.vessel_preview_link} onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-[#8B0000] hover:bg-[#8B0000]/90 text-white font-medium py-3 rounded-lg">
                {content.vessel_preview_button_text}
              </Button>
            </Link>
          </div>
        )}
      </header>

      {/* Fixed Hamburger Menu (appears on desktop scroll) */}
      <div className={`fixed top-6 right-6 z-50 hidden md:block transition-all duration-700 delay-300 ${scrolled ? 'opacity-100 transform translate-x-0 scale-100' : 'opacity-0 transform translate-x-8 scale-0 pointer-events-none'}`}>
        <div className="relative">
          <Button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="bg-black/90 hover:bg-black text-white p-3 rounded-lg backdrop-blur-sm border border-white/20 shadow-lg"
          >
            <Menu className="w-5 h-5" />
          </Button>

          {/* Dropdown Menu for Fixed Hamburger */}
          {mobileMenuOpen && (
            <div className="absolute top-full right-0 mt-2 bg-black/95 backdrop-blur-sm border border-white/20 rounded-lg p-3 space-y-2 min-w-[200px] shadow-xl">
              <Link href={content.event_updates_link} onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#FFB90F] hover:bg-[#FFB90F]/90 text-black font-medium py-2 rounded-lg text-sm">
                  {content.event_updates_button_text}
                </Button>
              </Link>
              <Link href={content.vessel_preview_link} onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#8B0000] hover:bg-[#8B0000]/90 text-white font-medium py-2 rounded-lg text-sm">
                  {content.vessel_preview_button_text}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 py-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-[#FFB90F] rotate-45"></div>
          <div className="absolute bottom-40 right-32 w-24 h-24 border border-[#8B0000] rotate-12"></div>
          <div className="absolute top-1/3 right-20 w-16 h-16 bg-[#FFB90F] opacity-20 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          {/* Pulsing Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 border-4 border-[#FFB90F] rotate-45 mx-auto mb-8 relative animate-pulse-glow">
              <div className="absolute inset-3 bg-[#FFB90F]/20 rotate-45"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#FFB90F] rounded-full"></div>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              {content.main_headline_part1}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB90F] to-[#FFA500]">
                {content.main_headline_part2}
              </span>{" "}
              {content.main_headline_part3}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {content.hero_description}
            </p>
          </div>



          {/* Email Signup */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-lg mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-[#FFB90F] mr-2" />
              <h3 className="text-xl font-semibold">{content.signup_section_title}</h3>
            </div>
            <p className="text-gray-300 mb-6 text-sm">
              {content.signup_section_description}
            </p>



            {/* Enhanced MailerLite Form */}
            {renderEnhancedMailerLiteForm()}

            <p className="text-xs text-gray-400 mt-3">
              {content.signup_form_footer_text}
            </p>

            {/* Share This Page */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-sm text-gray-400 mb-3 text-center">{content.share_page_text}</p>
              <div className="flex justify-center space-x-4">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(content.twitter_share_text)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-[#1DA1F2] rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-[#4267B2] rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-[#0077b5] rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href={`mailto:?subject=${encodeURIComponent(content.email_share_subject)}&body=${encodeURIComponent(content.email_share_body + ' ' + window.location.href)}`}
                  className="w-10 h-10 bg-white/10 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Horizontal Scrolling Carousel */}
      <section className="py-16 overflow-hidden">
        <div className="relative">
          <div className="flex animate-scroll-left space-x-6" style={{ width: 'calc(300px * 12 + 5rem * 11)' }}>
            {/* Duplicate images for seamless loop */}
            {[...content.gallery_images, ...content.gallery_images].map((image, i) => (
              <div key={i} className="min-w-[300px] h-[200px] bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
                <img 
                  src={image.image || image.url} 
                  alt={image.alt}
                  className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    if (target.src !== image.url) {
                      target.src = image.url;
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">{content.testimonials_title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {content.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 bg-[#FFB90F] rounded-full flex items-center justify-center text-black font-bold">
                    {testimonial.initials}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{content.why_join_title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.why_join_features.map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <h3 className="text-xl font-semibold mb-4 text-[#FFB90F]">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{content.faq_section_title}</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {content.faq_items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-300">
                  <div dangerouslySetInnerHTML={{ __html: item.answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 border-2 border-[#FFB90F] rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-[#FFB90F] rounded-full"></div>
              </div>
              <span className="text-xl font-bold tracking-wider">{content.footer_logo_text}</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400 mb-2">{content.footer_copyright_text}</p>
              <div className="flex flex-wrap justify-center md:justify-end space-x-4">
                {content.footer_links.map((link, index) => (
                  <a key={index} href={link.url} className="text-sm text-gray-400 hover:text-[#FFB90F] transition-colors">
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-[#FFB90F] hover:bg-[#FFB90F]/90 text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}