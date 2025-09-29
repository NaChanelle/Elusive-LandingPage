import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Clock, ChevronRight, Mail, Users, Sparkles, Search, Crown, BookOpen, Calendar, Eye, ChevronLeft, Play, Zap, Heart } from "lucide-react";
import MailerLiteForm from "@/components/MailerLiteForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Landing() {
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentEventImageIndex, setCurrentEventImageIndex] = useState(0);

  // Past event carousel images
  const pastEventImages = [
    { 
      src: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=400&fit=crop",
      alt: "Mystery Investigation Scene 1" 
    },
    { 
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop", 
      alt: "Mystery Investigation Scene 2" 
    },
    { 
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop", 
      alt: "Mystery Investigation Scene 3" 
    }
  ];

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

        {/* Event Description Section */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-[#FFB90F]">The Grey Key Revelation</h2>
              <p className="text-gray-300 mb-4">
                The first chapter of "The Grey Key Revelation" is unfolding in Columbus, OH. 
                Local forensic science students are finding evidence related to the events of 1993, 
                where important cultural data was reportedly stolen and then lost. 75+ investigators 
                have joined the investigation, but truth remains obscured.
              </p>
              <p className="text-gray-300">
                Join a burgeoning community to help solve this collaborative mystery and shed light on these stolen truths.
              </p>
            </div>
          </div>
        </section>

        {/* Past Mystery Event Section */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Past Mystery Event August 2024 - #Burglary20</h2>
            </div>
            
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden group">
              <div className="relative h-96">
                <img 
                  src={pastEventImages[currentEventImageIndex].src}
                  alt={pastEventImages[currentEventImageIndex].alt}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                
                {/* Event overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Mystery Investigation Skills</h3>
                  <p className="text-gray-200 mb-4">Master investigation through mystery experience.</p>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-[#FFB90F] rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-xs font-bold text-black">A</span>
                      </div>
                      <div className="w-8 h-8 bg-[#8B0000] rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-xs font-bold text-white">B</span>
                      </div>
                      <div className="w-8 h-8 bg-gray-600 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-xs font-bold text-white">C</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-300">3 of 4</span>
                  </div>
                </div>
                
                {/* Navigation arrows */}
                <button 
                  onClick={() => setCurrentEventImageIndex((prev) => prev === 0 ? pastEventImages.length - 1 : prev - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setCurrentEventImageIndex((prev) => prev === pastEventImages.length - 1 ? 0 : prev + 1)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                {/* Dots indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {pastEventImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentEventImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentEventImageIndex ? 'bg-[#FFB90F]' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Coming Next Section */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What's Coming Next</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
                <div className="w-16 h-16 bg-[#FFB90F] rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#FFB90F]">Investigation Tools</h3>
                <p className="text-gray-300">
                  Our research demands collaborative detective methodology and deeper community involvement.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
                <div className="w-16 h-16 bg-[#8B0000] rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#8B0000]">Companion App</h3>
                <p className="text-gray-300">
                  The Vessel App helps track clues, build theories and stay connected during each mystery and beyond.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FFB90F] to-[#8B0000] rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFB90F] to-[#8B0000]">Connect</h3>
                <p className="text-gray-300">
                  Serialized video production focused on the real cultural mysteries we're uncovering.
                </p>
              </div>
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

        {/* The Briefing Section */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">The Briefing</h2>
            
            <div className="space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-3 text-[#FFB90F]">Our need to find more clues before the event?</h3>
                <p className="text-gray-300">
                  With each mystery we're bringing to light, we uncover new truths and elements that help us piece together what was lost. 
                  Each clue we collect will expand our story and enhance our investigation strategies. But it's never enough and that 
                  there's always more we can discover, as one reveal only leads us on the next investigation in our quest.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-3 text-[#FFB90F]">Is this a performance or a panel?</h3>
                <p className="text-gray-300">
                  Our events are real-time collaborative mysteries and cultural investigations. 
                  We're not hosting traditional panels or conferences, but actual investigative experiences where you work with other participants 
                  to uncover truths, analyze evidence, and contribute to ongoing cultural preservation efforts.
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-3 text-[#FFB90F]">What should I wear?</h3>
                <p className="text-gray-300">
                  Come as comfortable as possible! We recommend wearing clothes you can move in. 
                  Some investigations involve physical elements or may require you to examine materials closely. 
                  Think practical detective gear rather than formal attire. Dark colors can help you blend into mystery atmospheres.
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-3 text-[#FFB90F]">Can I come alone?</h3>
                <p className="text-gray-300">
                  Absolutely! Many of our best investigators arrive solo and form incredible collaborative partnerships during the experience. 
                  Our mysteries are designed to bring people together around shared curiosity and investigation goals. 
                  You'll be working with others regardless of whether you arrive with a team.
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-3 text-[#FFB90F]">Will you return to Burglary?</h3>
                <p className="text-gray-300">
                  The Burglary investigation opened many doors and revealed several ongoing cultural mysteries that demand further exploration. 
                  While we can't spoil what's next, the threads we pulled during Burglary have led to larger questions about cultural preservation 
                  and stolen narratives that will definitely inform future investigations.
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-3 text-[#FFB90F]">Pricing</h3>
                <p className="text-gray-300">
                  Our pricing reflects the comprehensive nature of these cultural investigation experiences. 
                  Each tier provides different levels of access to investigation tools, community features, and behind-the-scenes content. 
                  We believe in making cultural discovery accessible while ensuring sustainable, quality investigations.
                </p>
              </div>
            </div>
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