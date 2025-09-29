import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import MailerLiteForm from "@/components/MailerLiteForm";
import { Link } from "wouter";
import { Eye, Users, Calendar, Database, BookOpen, MessageSquare, Play, Globe, Zap, Lightbulb, ChevronUp, ChevronRight } from "lucide-react";

export default function VesselTeaser() {
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

  // Static content for the vessel teaser page
  const content = {
    header_logo_text: "ELUSIVE",
    platform_button_text: "Home",
    hero_main_headline_part1: "Vessel",
    hero_main_headline_part2: "App",
    hero_sub_headline: "Introducing the Vessel: Elusive's digital storytelling companion app.",
    discover_features_button_text: "Discover Features",
    vessel_intro_title_part1: "Your phone is no longer just a device",
    vessel_intro_title_part2: "— it's a key.",
    vessel_intro_description: "Whether you're attending in person or decoding from afar, the Vessel App helps you stay immersed, connected, and informed. Track theories, collect clues, and engage with fellow investigators in real-time.",
    mvp_features_title: "Core Features",
    mvp_features: [
      {
        id: "theory-boards",
        title: "Theory Boards",
        description: "Organize your investigation theories with visual boards, connect clues, and share insights with the community.",
        icon_name: "Database",
        gradient: "from-blue-500 to-purple-600"
      },
      {
        id: "clue-tracker",
        title: "Live Clue Feed",
        description: "Real-time updates as mysteries unfold, with timestamps and location data for comprehensive tracking.",
        icon_name: "Eye",
        gradient: "from-green-500 to-teal-600"
      },
      {
        id: "community-hub",
        title: "Community Theories",
        description: "Connect with fellow investigators, share theories, and collaborate on solving the mystery together.",
        icon_name: "Users",
        gradient: "from-orange-500 to-red-600"
      },
      {
        id: "story-studio",
        title: "Story Studio",
        description: "Create and share your own mystery stories using our intuitive storytelling tools and templates.",
        icon_name: "BookOpen",
        gradient: "from-purple-500 to-pink-600"
      }
    ],
    freemium_section_title: "Free to Start, Premium to Master",
    freemium_description: "Begin your investigation journey at no cost, then unlock advanced features as you dive deeper.",
    freemium_features: [
      { feature: "Basic theory boards" },
      { feature: "Community access" },
      { feature: "Live clue feed" }
    ],
    premium_upgrade_text: "Upgrade for unlimited boards, priority support, and exclusive content.",
    cta_early_access_title: "Get Early Access",
    cta_early_access_description: "Be among the first to experience the Vessel app and shape its development.",
    feature_voting_description: "Your feedback directly influences which features we build next.",
    footer_copyright_text: "2025 ELUSIVE. All rights reserved.",
    contact_us_link_text: "Contact"
  };

  // Get icon component by name
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
      default: return Database;
    }
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
              <span className="text-xl font-bold text-[#FFB90F]">{content.header_logo_text}</span>
            </div>
          </Link>
          
          <Link href="/">
            <Button className="bg-[#FFB90F] hover:bg-[#e6a50e] text-black font-medium px-4 py-2 text-sm">
              {content.platform_button_text}
            </Button>
          </Link>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB90F] to-[#FFA500]">{content.hero_main_headline_part1}</span>
              <span className="text-white"> {content.hero_main_headline_part2}</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">{content.hero_sub_headline}</p>
            
            <Button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#FFB90F] hover:bg-[#e6a50e] text-black font-medium px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              {content.discover_features_button_text}
            </Button>
          </div>
        </section>

        {/* Intro Section */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-white">{content.vessel_intro_title_part1}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF6B6B]">{content.vessel_intro_title_part2}</span>
            </h2>
            
            <p className="text-xl text-gray-300 leading-relaxed">{content.vessel_intro_description}</p>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-16" id="features">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{content.mvp_features_title}</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {content.mvp_features.map((feature, index) => {
                const IconComponent = getIconComponent(feature.icon_name);
                return (
                  <div key={feature.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-[#FFB90F]">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Freemium Section */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#FFB90F]/10 to-[#FFA500]/10 backdrop-blur-sm rounded-xl p-8 border border-[#FFB90F]/20">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-[#FFB90F]">{content.freemium_section_title}</h2>
              
              <p className="text-xl text-gray-300 text-center mb-8">{content.freemium_description}</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 text-[#FFB90F]">Free Features</h3>
                  <ul className="space-y-2">
                    {content.freemium_features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <ChevronRight className="w-4 h-4 text-[#FFB90F] mr-2" />
                        {feature.feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-[#FFB90F]/20 to-[#FFA500]/20 backdrop-blur-sm rounded-lg p-6 border border-[#FFB90F]/40">
                  <h3 className="text-xl font-semibold mb-4 text-[#FFB90F]">Premium Benefits</h3>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center text-gray-300">
                      <ChevronRight className="w-4 h-4 text-[#FFB90F] mr-2" />
                      Unlimited theory boards
                    </li>
                    <li className="flex items-center text-gray-300">
                      <ChevronRight className="w-4 h-4 text-[#FFB90F] mr-2" />
                      Priority support
                    </li>
                    <li className="flex items-center text-gray-300">
                      <ChevronRight className="w-4 h-4 text-[#FFB90F] mr-2" />
                      Exclusive content
                    </li>
                    <li className="flex items-center text-gray-300">
                      <ChevronRight className="w-4 h-4 text-[#FFB90F] mr-2" />
                      Advanced analytics
                    </li>
                  </ul>
                  <p className="text-sm text-gray-400">{content.premium_upgrade_text}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Early Access CTA */}
        <section className="px-6 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-[#FFB90F]" />
                <h2 className="text-2xl font-semibold text-[#FFB90F]">{content.cta_early_access_title}</h2>
              </div>
              
              <p className="text-gray-300 mb-4">{content.cta_early_access_description}</p>
              <p className="text-sm text-gray-400 mb-6">{content.feature_voting_description}</p>
              
              {/* Email Signup Form */}
              <MailerLiteForm formId="evBTcL" className="w-full" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative mt-16 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">&copy; {content.footer_copyright_text}</p>
            <div className="flex items-center space-x-6">
              <a href="mailto:hello@elusiveorigin.com" className="text-sm text-gray-400 hover:text-[#FFB90F] transition-colors">
                {content.contact_us_link_text}
              </a>
              <Link href="/" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
                Home
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
          <ChevronUp className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}