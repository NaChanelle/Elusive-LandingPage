import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Clock, ChevronRight, Mail, Users, Sparkles, Search, Crown, BookOpen, Calendar, Eye } from "lucide-react";
import MailerLiteForm from "@/components/MailerLiteForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Landing() {
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show back to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Static content for the landing page
  const content = {
    header_title: "ELUSIVE",
    back_to_coming_soon_text: "← Coming Soon",
    hero_main_headline: "Next Event",
    hero_sub_headline: "History is now.",
    event_date_text: "Live Event Launch: Private",
    event_launch_description: "Early Access gets first look at event date once launched.",
    current_rsvps: 75,
    target_rsvps: 500,
    detective_tier_title: "Detective",
    detective_tier_price: "$15",
    detective_tier_description: "Essential access to the mystery",
    detective_tier_selection: "Detective - $15",
    detective_tier_features: [
      { feature: "Event access" },
      { feature: "Basic clues" },
      { feature: "Community access" }
    ],
    curator_tier_title: "Curator",
    curator_tier_price: "$35", 
    curator_tier_description: "Enhanced investigation tools",
    curator_tier_selection: "Curator - $35",
    curator_tier_features: [
      { feature: "Everything in Detective" },
      { feature: "Advanced clues" },
      { feature: "Early access" }
    ],
    accomplice_tier_title: "Accomplice",
    accomplice_tier_price: "$75",
    accomplice_tier_description: "Full behind-the-scenes access", 
    accomplice_tier_selection: "Accomplice - $75",
    accomplice_tier_features: [
      { feature: "Everything in Curator" },
      { feature: "Creator tools" },
      { feature: "Priority support" }
    ],
    access_tiers_title: "Choose Your Investigation Level",
    signup_form_title: "Reserve Your Investigation",
    signup_form_description: "Join the growing community of truth-seekers",
    footer_copyright_text: "2025 ELUSIVE. All rights reserved.",
    contact_us_link_text: "Contact",
    faq_title: "Frequently Asked Questions",
    faq_items: [
      {
        question: "When will the event happen?",
        answer: "The live event will be announced once we reach 500 RSVPs. Early access members get first notification."
      },
      {
        question: "What's included in my access?",
        answer: "Each tier includes different levels of access to clues, community features, and behind-the-scenes content."
      },
      {
        question: "Can I upgrade later?",
        answer: "Yes, you can upgrade your access level at any time before the event launches."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] text-white font-inter">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 border-2 border-[#FFB90F] rotate-45 relative">
                <div className="absolute inset-1 bg-[#FFB90F]/20 rotate-45"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#FFB90F] rounded-full"></div>
              </div>
              <span className="text-xl font-bold text-[#FFB90F]">{content.header_title}</span>
            </div>
          </Link>
          
          <Link href="/">
            <Button variant="ghost" className="text-gray-300 hover:text-[#FFB90F]">
              {content.back_to_coming_soon_text}
            </Button>
          </Link>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Next </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB90F] to-[#FFA500]">Event</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">{content.hero_sub_headline}</p>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-gray-700">
              <p className="text-[#FFB90F] font-medium mb-2">{content.event_date_text}</p>
              <p className="text-gray-300">{content.event_launch_description}</p>
            </div>

            {/* RSVP Progress */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-gray-700">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Users className="w-6 h-6 text-[#FFB90F]" />
                <h2 className="text-xl font-semibold text-[#FFB90F]">Community Interest</h2>
              </div>
              <h3 className="text-3xl font-bold text-[#FFB90F] mb-2">Growing Community</h3>
              <p className="text-gray-300 mb-4">Investigators are joining the mystery. Reserve your spot to be notified when we launch.</p>
              <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                <div className="bg-gradient-to-r from-[#FFB90F] to-[#FFA500] h-3 rounded-full" style={{width: '15%'}}></div>
              </div>
              <p className="text-sm text-gray-400">Join the investigation</p>
            </div>
          </div>
        </section>

        {/* Access Tiers Section */}
        <section className="px-6 py-16" id="signup">
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
                    document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full transition-all duration-300 ${
                    selectedTier === content.detective_tier_selection
                      ? 'bg-[#FFB90F] text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Select Detective
                </Button>
              </div>

              {/* Curator Tier */}
              <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 cursor-pointer ${
                selectedTier === content.curator_tier_selection 
                  ? 'border-[#FFB90F] bg-[#FFB90F]/10' 
                  : 'border-white/10 hover:border-white/20'
              }`}>
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
                    document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full transition-all duration-300 ${
                    selectedTier === content.curator_tier_selection
                      ? 'bg-[#FFB90F] text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Select Curator
                </Button>
              </div>

              {/* Accomplice Tier */}
              <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 cursor-pointer ${
                selectedTier === content.accomplice_tier_selection 
                  ? 'border-[#FFB90F] bg-[#FFB90F]/10' 
                  : 'border-white/10 hover:border-white/20'
              }`}>
                <h3 className="text-xl font-semibold mb-2">{content.accomplice_tier_title}</h3>
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
                    document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full transition-all duration-300 ${
                    selectedTier === content.accomplice_tier_selection
                      ? 'bg-[#FFB90F] text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Select Accomplice
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Signup Form Section */}
        <section className="px-6 py-16" id="signup-form">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Mail className="w-6 h-6 text-[#FFB90F]" />
                <h2 className="text-2xl font-semibold text-[#FFB90F]">{content.signup_form_title}</h2>
              </div>
              
              <p className="text-gray-300 mb-6">{content.signup_form_description}</p>
              
              {/* MailerLite Form */}
              <MailerLiteForm formId="qp06KG" className="w-full" />
              
              {selectedTier && (
                <div className="text-sm text-gray-300 text-center mt-4">
                  Selected: <span className="text-[#FFB90F] font-medium">{selectedTier}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{content.faq_title}</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {content.faq_items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-700 rounded-lg px-6">
                  <AccordionTrigger className="text-white hover:text-[#FFB90F]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="relative mt-16 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">&copy; {content.footer_copyright_text}</p>
            <div className="flex items-center space-x-6">
              <a href="mailto:hello@elusiveorigin.com" className="text-sm text-gray-400 hover:text-[#FFB90F] transition-colors">
                {content.contact_us_link_text}
              </a>
              <Link href="/" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
                {content.back_to_coming_soon_text}
              </Link>
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
          <ChevronRight className="w-5 h-5 rotate-[-90deg]" />
        </Button>
      )}
    </div>
  );
}