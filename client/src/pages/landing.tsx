// src/pages/landing.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Clock, Users, BookOpen, Calendar, Eye, Zap, Lightbulb, MessageSquare, Play, Globe, Database } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Define the type for the content structure
interface TierFeature {
  feature: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface LandingContent {
  header_title: string;
  back_to_coming_soon_text: string;
  hero_main_headline_part1: string;
  hero_main_headline_part2: string;
  hero_sub_headline: string;
  event_date_text: string;
  event_launch_description: string; // Kept from your original
  current_rsvps: number; // Kept from your original, though UI part removed
  target_rsvps: number; // Kept from your original, though UI part removed
  value_proposition_text: string;
  countdown_target_date: string;
  reserve_spot_button_text: string;
  learn_more_button_text: string;
  image_carousel_title: string; // Kept from your original
  carousel_images: Array<{ // Kept from your original
    id: number;
    alt: string;
    placeholder: string;
    image?: string; // Optional actual image URL
  }>;
  whats_coming_next_title: string;
  feature1_title: string;
  feature1_description: string;
  feature2_title: string;
  feature2_description: string;
  feature3_title: string;
  feature3_description: string;
  access_tiers_title: string;
  detective_tier_title: string;
  detective_tier_price: string;
  detective_tier_description: string;
  detective_tier_selection: string; // Kept from your original, though UI part removed
  detective_tier_features: TierFeature[];
  curator_tier_tag: string;
  curator_tier_title: string;
  curator_tier_price: string;
  curator_tier_description: string;
  curator_tier_selection: string; // Kept from your original, though UI part removed
  curator_tier_features: TierFeature[];
  accomplice_tier_title: string;
  accomplice_tier_price: string;
  accomplice_tier_description: string;
  accomplice_tier_selection: string; // Kept from your original, though UI part removed
  accomplice_tier_features: TierFeature[];
  signup_form_title: string;
  signup_form_description: string;
  firstname_placeholder: string;
  email_placeholder: string;
  signup_button_pending_text: string;
  signup_button_text: string;
  signup_form_footer_text: string;
  mailerlite_form1_id: string; // MailerLite form ID for this page
  tally_form1_id: string; // Tally form ID (will be replaced with MailerLite)
  faq_title: string;
  faq_items: FAQItem[];
  footer_copyright_text: string;
  contact_us_link_text: string;
}

// Helper Check icon for features list (kept from your original)
const Check = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
  </svg>
);

export default function Landing() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Kept from your original

  // State for dynamic content with proper typing
  const [content, setContent] = useState<LandingContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Fetch content specific to the landing page from JSON (kept from your original)
  useEffect(() => {
    fetch('/assets/content/landing.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: LandingContent) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        console.error("Error loading Landing page content:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // Image carousel auto-rotation (kept from your original)
  useEffect(() => {
    if (!content?.carousel_images?.length) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        (prev + 1) % content.carousel_images.length
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [content?.carousel_images]);

  // Countdown timer logic (kept from your original)
  useEffect(() => {
    if (!content || !content.countdown_target_date) return;

    const targetDate = new Date(content.countdown_target_date);

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

  // MailerLite embed rendering helper
  // This function now directly renders the MailerLite HTML embed code.
  // The MailerLite script (loaded globally in App.tsx) will find and initialize this div.
  const renderMailerLiteForm = (formId: string, embedDivId: string) => {
    if (!formId) return null;
    // This is the HTML embed code for the Landing Page form (ID 28257750)
    return (
      <div id={embedDivId} className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-28257750">
        <div className="ml-form-embedWrapper embedForm">
          <div className="ml-form-embedBody ml-form-embedBodyHorizontal row-form">
            <div className="ml-form-embedContent" style={{ marginBottom: 0 }}>
              <h4>Join Our Waitlist</h4>
              <p>Be the first to know when we launch and get exclusive updates.</p>
            </div>
            <form className="ml-block-form" action="https://assets.mailerlite.com/jsonp/204279/forms/28257750/subscribe" data-v2-id="28257750" method="post" target="_blank">
              <div style={{ display: 'none' }}>
                <input type="text" name="b_204279_28257750" tabIndex={-1} value="" />
              </div>
              <div className="ml-form-formContent">
                <div className="ml-form-fieldRow ml-last-item">
                  <div className="ml-field-group ml-field-name ml-validate-required">
                    <input type="text" className="form-control" data-inputmask="" name="fields[name]" placeholder="First Name" autoComplete="name" />
                  </div>
                  <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                    <input type="email" className="form-control" data-inputmask="" name="fields[email]" placeholder="Email" autoComplete="email" />
                  </div>
                </div>
              </div>
              <input type="hidden" name="ml-submit" value="1" />
              <div className="ml-form-embedSubmit">
                <button type="submit" className="primary">Join Waitlist</button>
                <button disabled={true} style={{ display: 'none' }} type="button" className="loading">
                  <div className="ml-form-embedSubmitLoad"></div>
                  <span className="sr-only">Loading...</span>
                </button>
              </div>
              <input type="hidden" name="anticsrf" value="true" />
            </form>
          </div>
          <div className="ml-form-successBody row-success" style={{ display: 'none' }}>
            <div className="ml-form-successContent">
              <h4>Thank you!</h4>
              <p>You have successfully joined our subscriber list.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Conditional rendering for loading and error states (kept from your original)
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
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] text-white font-inter">
      {/* Header */}
      <header className="p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-2 border-[#FFB90F] rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#FFB90F] rounded-full"></div>
            </div>
            <span className="text-xl font-bold tracking-wider">{content.header_title}</span>
          </div>
          <Link href="/">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              {content.back_to_coming_soon_text}
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              {content.hero_main_headline_part1}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB90F] to-[#FFA500]">
                {content.hero_main_headline_part2}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">{content.hero_sub_headline}</p>
            <div className="text-[#FFB90F] font-semibold">{content.event_date_text}</div>
            <div className="text-sm text-gray-400">{content.event_launch_description}</div>
            <div 
              className="text-lg text-gray-300 max-w-2xl mx-auto"
              dangerouslySetInnerHTML={{ 
                __html: content.value_proposition_text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
              }}
            />
          </div>

          {/* RSVP Progress - Simplified as per previous request */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-[#FFB90F] mr-2" />
              <h3 className="text-xl font-semibold">Community Interest</h3>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FFB90F] mb-2">Growing Community</div>
                <p className="text-gray-300 text-sm">
                  Investigators are joining the mystery. Reserve your spot to be notified when we launch.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#FFB90F] hover:bg-[#FFB90F]/90 text-black font-medium px-8 py-3 rounded-full"
            >
              {content.reserve_spot_button_text}
            </Button>
            <Button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-full"
            >
              {content.learn_more_button_text}
            </Button>
          </div>
        </div>
      </section>

      {/* Image Carousel Section (kept from your original) */}
      <section id="gallery" className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{content.image_carousel_title}</h2>
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-2 border border-white/10 aspect-video flex items-center justify-center overflow-hidden">
              {content.carousel_images[currentImageIndex]?.image ? (
                <div className="relative w-full h-full">
                  <img 
                    src={content.carousel_images[currentImageIndex].image} 
                    alt={content.carousel_images[currentImageIndex].alt} 
                    className="w-full h-full object-cover rounded-lg" 
                    onError={(e) => { 
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement; 
                      target.style.display = 'none'; 
                      const fallback = target.nextElementSibling as HTMLElement; 
                      if (fallback) fallback.style.display = 'flex'; 
                    }} 
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-lg flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-semibold mb-1 text-[#FFB90F]"> 
                        {content.carousel_images[currentImageIndex]?.alt} 
                      </h3>
                      <p className="text-gray-200 text-sm"> 
                        {content.carousel_images[currentImageIndex]?.placeholder} 
                      </p>
                    </div>
                  </div>
                  {/* Fallback content (hidden by default) */}
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center" style={{display: 'none'}}>
                    <div className="text-center p-8">
                      <div className="w-16 h-16 bg-[#FFB90F]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Eye className="w-8 h-8 text-[#FFB90F]" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-[#FFB90F]"> 
                        {content.carousel_images[currentImageIndex]?.alt} 
                      </h3>
                      <p className="text-gray-300"> 
                        {content.carousel_images[currentImageIndex]?.placeholder} 
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-[#FFB90F]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-[#FFB90F]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#FFB90F]"> 
                    {content.carousel_images[currentImageIndex]?.alt} 
                  </h3>
                  <p className="text-gray-300"> 
                    {content.carousel_images[currentImageIndex]?.placeholder} 
                  </p>
                </div>
              )}
            </div>
            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {content.carousel_images.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => setCurrentImageIndex(index)} 
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${ 
                    index === currentImageIndex ? 'bg-[#FFB90F]' : 'bg-gray-600 hover:bg-gray-400' 
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's Coming Next */}
      <section id="features" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">{content.whats_coming_next_title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center">
              <div className="w-16 h-16 bg-[#FFB90F]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-[#FFB90F]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{content.feature1_title}</h3>
              <p className="text-gray-300 text-sm">{content.feature1_description}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center">
              <div className="w-16 h-16 bg-[#FFB90F]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-[#FFB90F]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{content.feature2_title}</h3>
              <p className="text-gray-300 text-sm">{content.feature2_description}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center">
              <div className="w-16 h-16 bg-[#FFB90F]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#FFB90F]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{content.feature3_title}</h3>
              <p className="text-gray-300 text-sm">{content.feature3_description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Access Tiers */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">{content.access_tiers_title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Detective Tier */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold mb-2 text-white">{content.detective_tier_title}</h3>
              <p className="text-4xl font-extrabold text-[#FFB90F] mb-4">{content.detective_tier_price}</p>
              <p className="text-gray-300 text-sm mb-6">{content.detective_tier_description}</p>
              <ul className="text-gray-300 text-sm space-y-2 mb-8 text-left w-full">
                {content.detective_tier_features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-4 h-4 text-[#FFB90F] mr-2" />
                    {feature.feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-auto bg-[#FFB90F] hover:bg-[#FFB90F]/90 text-black font-medium px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 w-full">
                Select {content.detective_tier_title}
              </Button>
            </div>

            {/* Curator Tier */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-[#FFB90F] relative flex flex-col items-center text-center shadow-lg">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFB90F] text-black text-xs font-bold px-3 py-1 rounded-full">{content.curator_tier_tag}</span>
              <h3 className="text-2xl font-bold mb-2 text-white">{content.curator_tier_title}</h3>
              <p className="text-4xl font-extrabold text-[#FFB90F] mb-4">{content.curator_tier_price}</p>
              <p className="text-gray-300 text-sm mb-6">{content.curator_tier_description}</p>
              <ul className="text-gray-300 text-sm space-y-2 mb-8 text-left w-full">
                {content.curator_tier_features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-4 h-4 text-[#FFB90F] mr-2" />
                    {feature.feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-auto bg-[#FFB90F] hover:bg-[#FFB90F]/90 text-black font-medium px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 w-full">
                Select {content.curator_tier_title}
              </Button>
            </div>

            {/* Accomplice Tier */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold mb-2 text-white">{content.accomplice_tier_title}</h3>
              <p className="text-4xl font-extrabold text-[#FFB90F] mb-4">{content.accomplice_tier_price}</p>
              <p className="text-gray-300 text-sm mb-6">{content.accomplice_tier_description}</p>
              <ul className="text-gray-300 text-sm space-y-2 mb-8 text-left w-full">
                {content.accomplice_tier_features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-4 h-4 text-[#FFB90F] mr-2" />
                    {feature.feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-auto bg-[#FFB90F] hover:bg-[#FFB90F]/90 text-black font-medium px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 w-full">
                Select {content.accomplice_tier_title}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup - MailerLite Form */}
      <section id="signup" className="py-16 px-6"> {/* Added id="signup" for scrollIntoView */}
        <div className="max-w-lg mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">{content.signup_form_title}</h2>
          <p className="text-gray-300 mb-6">{content.signup_form_description}</p>
          
          {/* MailerLite Form Embed for Landing Page */}
          {renderMailerLiteForm(content.mailerlite_form1_id, 'mlb2-28257750')}

          <p className="text-xs text-gray-400 mt-3">{content.signup_form_footer_text}</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">{content.faq_title}</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {content.faq_items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`} className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
                <AccordionTrigger className="px-6 py-4 text-left text-white hover:text-[#FFB90F] transition-colors font-semibold text-lg hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: item.answer }}></AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-6 h-6 border-2 border-[#FFB90F] rotate-45 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#FFB90F] rounded-full"></div>
            </div>
            <span className="text-lg font-bold tracking-wider">{content.header_title}</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">{content.footer_copyright_text}</p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-[#FFB90F] transition-colors">
              {content.contact_us_link_text}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
