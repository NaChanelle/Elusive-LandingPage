// src/pages/landing.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { Clock, ChevronRight, Mail, Users, Sparkles, Search, Crown, Eye } from "lucide-react";
import { insertReservationSchema, type InsertReservation } from "@shared/schema";
import MailerLiteForm from "@/components/MailerLiteForm";

// Define TypeScript interfaces for the landing page content
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
  event_launch_description: string;
  current_rsvps: number;
  target_rsvps: number;
  value_proposition_text: string;
  reserve_spot_button_text: string;
  learn_more_button_text: string;
  image_carousel_title: string;
  carousel_images: Array<{
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
  detective_tier_selection: string;
  detective_tier_features: TierFeature[];
  curator_tier_tag: string;
  curator_tier_title: string;
  curator_tier_price: string;
  curator_tier_description: string;
  curator_tier_selection: string;
  curator_tier_features: TierFeature[];
  accomplice_tier_title: string;
  accomplice_tier_price: string;
  accomplice_tier_description: string;
  accomplice_tier_selection: string;
  accomplice_tier_features: TierFeature[];
  signup_form_title: string;
  signup_form_description: string;
  firstname_placeholder: string;
  email_placeholder: string;
  signup_button_pending_text: string;
  signup_button_text: string;
  signup_form_footer_text: string;
  mailerlite_form1_id: string;
  tally_form1_id: string;
  faq_title: string;
  faq_items: FAQItem[];
  footer_copyright_text: string;
  contact_us_link_text: string;
}

declare global {
  interface Window {
    mailerlite?: any;
    MailerLiteObject?: any;
  }
}

export default function Landing() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();

  // State for dynamic content with proper typing
  const [content, setContent] = useState<LandingContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch content specific to the landing page from JSON
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

  // Image carousel auto-rotation
  useEffect(() => {
    if (!content?.carousel_images?.length) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        (prev + 1) % content.carousel_images.length
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [content?.carousel_images]);


  // Mutation for form submission
  const reservationMutation = useMutation({
    mutationFn: (data: InsertReservation) =>
      apiRequest("POST", "/api/rsvps", data),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your reservation has been submitted successfully.",
      });
      setEmail("");
      setFirstName("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Email is required",
        variant: "destructive",
      });
      return;
    }

    const reservationData: InsertReservation = {
      email,
      firstName: firstName || undefined,
      investigationInterests: selectedTier ? [selectedTier] : [],
      preferredRole: selectedTier || undefined,
    };

    reservationMutation.mutate(reservationData);
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

          {/* RSVP Progress */}
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

      {/* Image Carousel Section */}
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
                    index === currentImageIndex 
                      ? 'bg-[#FFB90F]' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{content.whats_coming_next_title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 bg-[#FFB90F] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#FFB90F]">{content.feature1_title}</h3>
              <p className="text-gray-300">{content.feature1_description}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 bg-[#8B0000] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#FFB90F]">{content.feature2_title}</h3>
              <p className="text-gray-300">{content.feature2_description}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 bg-[#4B0082] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#FFB90F]">{content.feature3_title}</h3>
              <p className="text-gray-300">{content.feature3_description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Access Tiers Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{content.access_tiers_title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Detective Tier */}
            <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 cursor-pointer ${
              selectedTier === content.detective_tier_selection 
                ? 'border-[#FFB90F] bg-[#FFB90F]/10' 
                : 'border-white/10 hover:border-white/20'
            }`}>
              <h3 className="text-xl font-semibold mb-2">{content.detective_tier_title}</h3>
              <div className="text-3xl font-bold mb-4 text-[#FFB90F]">{content.detective_tier_price}</div>
              <p className="text-gray-300 mb-6">{content.detective_tier_description}</p>
              <ul className="space-y-2 mb-6">
                {content.detective_tier_features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-300">
                    <ChevronRight className="w-4 h-4 text-[#FFB90F] mr-2" />
                    {feature.feature}
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => {
                  setSelectedTier(content.detective_tier_selection);
                  document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full transition-all duration-300 ${
                  selectedTier === content.detective_tier_selection
                    ? 'bg-[#FFB90F] text-black'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                {selectedTier === content.detective_tier_selection ? '✓ Selected' : 'Choose Detective'}
              </Button>
            </div>

            {/* Curator Tier */}
            <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border-2 relative transition-all duration-300 cursor-pointer ${
              selectedTier === content.curator_tier_selection 
                ? 'border-[#FFB90F] bg-[#FFB90F]/10' 
                : 'border-[#FFB90F] hover:bg-[#FFB90F]/5'
            }`}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FFB90F] text-black px-4 py-1 rounded-full text-sm font-medium">
                {content.curator_tier_tag}
              </div>
              <h3 className="text-xl font-semibold mb-2">{content.curator_tier_title}</h3>
              <div className="text-3xl font-bold mb-4 text-[#FFB90F]">{content.curator_tier_price}</div>
              <p className="text-gray-300 mb-6">{content.curator_tier_description}</p>
              <ul className="space-y-2 mb-6">
                {content.curator_tier_features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-300">
                    <ChevronRight className="w-4 h-4 text-[#FFB90F] mr-2" />
                    {feature.feature}
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => {
                  setSelectedTier(content.curator_tier_selection);
                  document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full transition-all duration-300 ${
                  selectedTier === content.curator_tier_selection
                    ? 'bg-[#FFB90F] text-black ring-2 ring-[#FFB90F]/50'
                    : 'bg-[#FFB90F] hover:bg-[#FFB90F]/90 text-black'
                }`}
              >
                {selectedTier === content.curator_tier_selection ? '✓ Selected' : 'Choose Curator'}
              </Button>
            </div>

            {/* Accomplice Tier */}
            <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 cursor-pointer ${
              selectedTier === content.accomplice_tier_selection 
                ? 'border-[#8B0000] bg-[#8B0000]/10' 
                : 'border-white/10 hover:border-[#8B0000]/50'
            }`}>
              <div className="flex items-center mb-2">
                <Crown className="w-5 h-5 text-[#FFB90F] mr-2" />
                <h3 className="text-xl font-semibold">{content.accomplice_tier_title}</h3>
              </div>
              <div className="text-3xl font-bold mb-4 text-[#FFB90F]">{content.accomplice_tier_price}</div>
              <p className="text-gray-300 mb-6">{content.accomplice_tier_description}</p>
              <ul className="space-y-2 mb-6">
                {content.accomplice_tier_features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-300">
                    <ChevronRight className="w-4 h-4 text-[#FFB90F] mr-2" />
                    {feature.feature}
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => {
                  setSelectedTier(content.accomplice_tier_selection);
                  document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full transition-all duration-300 ${
                  selectedTier === content.accomplice_tier_selection
                    ? 'bg-[#8B0000] text-white ring-2 ring-[#8B0000]/50'
                    : 'bg-[#8B0000] hover:bg-[#8B0000]/90 text-white'
                }`}
              >
                {selectedTier === content.accomplice_tier_selection ? '✓ Selected' : 'Choose Accomplice'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Signup Section */}
      <section id="signup" className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">{content.signup_form_title}</h2>
              <p className="text-gray-300">{content.signup_form_description}</p>
            </div>

            {/* MailerLite Form */}
            <MailerLiteForm formId="28258222" className="w-full" />
            
            {selectedTier && (
              <div className="text-sm text-gray-300 text-center mt-4">
                Selected: <span className="text-[#FFB90F] font-medium">{selectedTier}</span>
              </div>
            )}

            <p className="text-xs text-gray-400 text-center mt-4">
              {content.signup_form_footer_text}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{content.faq_title}</h2>
          <div className="space-y-6">
            {content.faq_items.map((item, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-3 text-[#FFB90F]">{item.question}</h3>
                <div 
                  className="text-gray-300"
                  dangerouslySetInnerHTML={{ 
                    __html: item.answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 border-2 border-[#FFB90F] rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#FFB90F] rounded-full"></div>
            </div>
            <span className="text-xl font-bold tracking-wider">{content.header_title}</span>
          </div>
          <div className="text-sm text-gray-400 space-x-4">
            <span>{content.footer_copyright_text}</span>
            <a href="/contact" className="hover:text-[#FFB90F] transition-colors">
              {content.contact_us_link_text}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}