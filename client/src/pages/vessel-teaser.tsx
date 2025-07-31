// src/pages/vessel-teaser.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Eye, Users, Calendar, Database, BookOpen, MessageSquare, Play, Globe, Zap, Lightbulb, ChevronUp } from "lucide-react";

// Define the type for the content structure
interface VesselTeaserContent {
  header_logo_text: string;
  platform_button_text: string;
  hero_background_image: string;
  hero_main_headline_part1: string;
  hero_main_headline_part2: string;
  hero_sub_headline: string;
  discover_features_button_text: string;
  vessel_intro_title_part1: string;
  vessel_intro_title_part2: string;
  vessel_intro_description: string;
  mvp_features_title: string;
  mvp_features: {
    id: string;
    title: string;
    description: string;
    icon_name: string;
    visualPlaceholder?: string;
    gradient?: string;
    status?: string;
  }[];
  roadmap_features_title: string;
  roadmap_features: {
    id: string;
    title: string;
    description: string;
    icon_name: string;
    status?: string;
    timeline?: string;
  }[];
  cta_early_access_title: string;
  cta_early_access_description: string;
  tally_form_id: string; // Will be replaced by mailerlite_form_id
  mailerlite_form_id: string; // New field for MailerLite form ID
  footer_logo_text: string;
  footer_copyright_text: string;
  footer_links: { text: string; url: string }[];
}

// Helper function to get Lucide icon component by name
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Eye": return Eye;
    case "Users": return Users;
    case "Calendar": return Calendar;
    case "Database": return Database;
    case "BookOpen": return BookOpen;
    case "MessageSquare": return MessageSquare;
    case "Play": return Play;
    case "Globe": return Globe;
    case "Zap": return Zap;
    case "Lightbulb": return Lightbulb;
    default: return null;
  }
};

export default function VesselTeaser() {
  const [content, setContent] = useState<VesselTeaserContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Fetch content from JSON
  useEffect(() => {
    fetch('/assets/content/vessel.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: VesselTeaserContent) => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading Vessel Teaser page content:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // Handle scroll effect for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // MailerLite embed rendering helper (simplified)
  // This function now directly renders the MailerLite HTML embed code.
  // The MailerLite script (loaded globally in App.tsx) will find and initialize this div.
  const renderMailerLiteForm = (formId: string, embedDivId: string) => {
    if (!formId) return null;
    // This is the HTML embed code for the Vessel Page form (ID 28314007)
    return (
      <div id={embedDivId} className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-28314007">
        <div className="ml-form-embedWrapper embedForm">
          <div className="ml-form-embedBody ml-form-embedBodyHorizontal row-form">
            <div className="ml-form-embedContent" style={{ marginBottom: 0 }}>
              <h4>Join Waitlist</h4>
              <p>Be the first to know when we launch and get exclusive updates.</p>
            </div>
            <form className="ml-block-form" action="https://assets.mailerlite.com/jsonp/204279/forms/28314007/subscribe" data-v2-id="28314007" method="post" target="_blank">
              <div style={{ display: 'none' }}>
                <input type="text" name="b_204279_28314007" tabIndex={-1} value="" />
              </div>
              <div className="ml-form-formContent">
                <div className="ml-form-fieldRow ml-last-item">
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] text-white">Loading content...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] text-red-600">Error loading content: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] text-white font-inter">
      {/* Header */}
      <header className="relative z-50 p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-2 border-[#FFB90F] rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#FFB90F] rounded-full"></div>
            </div>
            <span className="text-xl font-bold tracking-wider">{content.header_logo_text}</span>
          </div>
          <nav>
            <Link href="/platform">
              <Button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg backdrop-blur-sm border border-white/20">
                {content.platform_button_text}
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-16 text-center">
        <img
          src={content.hero_background_image || "https://placehold.co/1920x1080/0a0a0a/ffffff?text=Vessel+Hero"}
          alt="Vessel Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          onError={(e) => {
            e.currentTarget.onerror = null; // Prevent infinite loop
            e.currentTarget.src = "https://placehold.co/1920x1080/0a0a0a/ffffff?text=Vessel+Hero";
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            {content.hero_main_headline_part1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB90F] to-[#FFA500]">
              {content.hero_main_headline_part2}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {content.hero_sub_headline}
          </p>
          <Button className="bg-[#FFB90F] hover:bg-[#FFB90F]/90 text-black font-medium px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
            {content.discover_features_button_text}
          </Button>
        </div>
      </section>

      {/* Vessel Introduction */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            {content.vessel_intro_title_part1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB90F] to-[#FFA500]">
              {content.vessel_intro_title_part2}
            </span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">{content.vessel_intro_description}</p>
        </div>
      </section>

      {/* Core MVP Features */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">{content.mvp_features_title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.mvp_features.map((feature) => {
              const IconComponent = getIconComponent(feature.icon_name);
              return (
                <div key={feature.id} className={`bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 flex flex-col items-center text-center ${feature.gradient || ''}`}>
                  <div className="w-16 h-16 bg-[#FFB90F]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {IconComponent && <IconComponent className="w-8 h-8 text-[#FFB90F]" />}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                  {feature.status && (
                    <span className="mt-4 text-xs font-bold px-3 py-1 rounded-full bg-[#8B0000]/30 text-[#FFB90F]">
                      {feature.status.toUpperCase()}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roadmap Features */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">{content.roadmap_features_title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.roadmap_features.map((feature) => {
              const IconComponent = getIconComponent(feature.icon_name);
              return (
                <div key={feature.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gray-700/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {IconComponent && <IconComponent className="w-8 h-8 text-gray-400" />}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                  {feature.timeline && (
                    <span className="mt-4 text-xs font-bold px-3 py-1 rounded-full bg-gray-600/30 text-gray-300">
                      {feature.timeline}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Early Access - MailerLite Form */}
      <section className="py-16 px-6">
        <div className="max-w-lg mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">{content.cta_early_access_title}</h2>
          <p className="text-gray-300 mb-6">{content.cta_early_access_description}</p>
          
          {/* MailerLite Form Embed for Vessel Page */}
          {renderMailerLiteForm(content.mailerlite_form_id, 'mlb2-28314007')}

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-6 h-6 border-2 border-[#FFB90F] rotate-45 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#FFB90F] rounded-full"></div>
            </div>
            <span className="text-lg font-bold tracking-wider">{content.footer_logo_text}</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">{content.footer_copyright_text}</p>
          <div className="flex justify-center space-x-6 text-sm">
            {content.footer_links.map((link, index) => (
              <a key={index} href={link.url} className="text-gray-400 hover:text-[#FFB90F] transition-colors">
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={scrollToTop}
            className="bg-[#FFB90F] hover:bg-[#FFB90F]/90 text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            size="icon"
          >
            <ChevronUp className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
