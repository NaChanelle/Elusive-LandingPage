import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Clock, ChevronRight, Mail, Users, Sparkles, Search, Crown, BookOpen, Calendar, Eye, ChevronLeft, Play, Zap, Heart } from "lucide-react";
import MailerLiteEmbed from "@/components/MailerLiteEmbed";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";

export default function Landing() {
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentEventImageIndex, setCurrentEventImageIndex] = useState(0);

  // Load content from JSON file
  const { data: content } = useQuery({
    queryKey: ['/assets/content/landing.json'],
  });

  // Get carousel images from loaded content or use defaults
  const pastEventImages = (content as any)?.carousel_images || [];

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
              <span className="text-xl font-bold text-[#FFB90F]">{(content as any)?.header_title || "ELUSIVE"}</span>
            </div>
          </Link>
          
          <Link href="/">
            <Button variant="ghost" className="text-gray-300 hover:text-[#FFB90F]">
              {(content as any)?.back_to_coming_soon_text || "← Coming Soon"}
            </Button>
          </Link>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">{(content as any)?.hero_main_headline_part1 || "Next"} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB90F] to-[#FFA500]">{(content as any)?.hero_main_headline_part2 || "Event"}</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">{(content as any)?.hero_sub_headline || "History is now."}</p>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-gray-700">
              <p className="text-[#FFB90F] font-medium mb-2">{(content as any)?.event_date_text || "Live Event Launch: Private"}</p>
              <p className="text-gray-300">{(content as any)?.event_launch_description || "Early Access gets first look at event date once launched."}</p>
            </div>

            {/* Event Description - Above Community Interest */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 mb-8 border border-gray-700 text-left">
              <h2 className="text-2xl font-bold mb-4 text-[#FFB90F]">The Ones Who Remember</h2>
              <p className="text-gray-300 whitespace-pre-line">
                {(content as any)?.value_proposition_text || "The first chapter is unfolding. Local investigators are finding evidence related to events where important cultural data was reportedly stolen and then lost. 75+ investigators have joined the investigation, but truth remains obscured.\n\nJoin a burgeoning community to help solve this collaborative mystery and shed light on these stolen truths."}
              </p>
            </div>

            {/* RSVP Progress / Community Interest */}
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

        {/* Past Mystery Event Section */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{(content as any)?.image_carousel_title || "Past Mystery Event August 2024 - #Burglary20"}</h2>
            </div>
            
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden group">
              <div className="relative h-96">
                {pastEventImages.length > 0 && (
                  <img 
                    src={pastEventImages[currentEventImageIndex]?.image || pastEventImages[currentEventImageIndex]?.url}
                    alt={pastEventImages[currentEventImageIndex]?.alt || "Event Scene"}
                    className="w-full h-full object-contain bg-gray-900 transition-all duration-500"
                  />
                )}
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
                  {pastEventImages.map((_: any, index: number) => (
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{(content as any)?.whats_coming_next_title || "What's Coming Next"}</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
                <div className="w-16 h-16 bg-[#FFB90F] rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#FFB90F]">{(content as any)?.feature1_title || "Investigation Tools"}</h3>
                <p className="text-gray-300">
                  {(content as any)?.feature1_description || "Our research demands collaborative detective methodology and deeper community involvement."}
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
                <div className="w-16 h-16 bg-[#8B0000] rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#8B0000]">{(content as any)?.feature2_title || "Companion App"}</h3>
                <p className="text-gray-300">
                  {(content as any)?.feature2_description || "The Vessel App helps track clues, build theories and stay connected during each mystery and beyond."}
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FFB90F] to-[#8B0000] rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFB90F] to-[#8B0000]">{(content as any)?.feature3_title || "Connect"}</h3>
                <p className="text-gray-300">
                  {(content as any)?.feature3_description || "Serialized video production focused on the real cultural mysteries we're uncovering."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Access Tiers Section */}
        <section className="px-6 py-16" id="signup">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{(content as any)?.access_tiers_title || "Choose Your Investigation Level"}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Detective Tier */}
              <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 cursor-pointer ${
                selectedTier === (content as any)?.detective_tier_selection 
                  ? 'border-[#FFB90F] bg-[#FFB90F]/10' 
                  : 'border-white/10 hover:border-white/20'
              }`}>
                <h3 className="text-xl font-semibold mb-2">{(content as any)?.detective_tier_title || "Observer"}</h3>
                <div className="text-3xl font-bold mb-4 text-[#FFB90F]">{(content as any)?.detective_tier_price || "$15"}</div>
                <p className="text-gray-300 mb-6">{(content as any)?.detective_tier_description || "Perfect for curious investigators ready to explore."}</p>
                <ul className="space-y-2 mb-6">
                  {((content as any)?.detective_tier_features || []).map((feature: any, index: number) => (
                    <li key={index} className="flex items-center text-sm text-gray-300">
                      <ChevronRight className="w-4 h-4 text-[#FFB90F] mr-2" />
                      {feature.feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => {
                    setSelectedTier((content as any)?.detective_tier_selection || "observer");
                    document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full transition-all duration-300 ${
                    selectedTier === (content as any)?.detective_tier_selection
                      ? 'bg-[#FFB90F] text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Select Observer
                </Button>
              </div>

              {/* Curator Tier */}
              <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 cursor-pointer ${
                selectedTier === (content as any)?.curator_tier_selection 
                  ? 'border-[#FFB90F] bg-[#FFB90F]/10' 
                  : 'border-white/10 hover:border-white/20'
              }`}>
                <h3 className="text-xl font-semibold mb-2">{(content as any)?.curator_tier_title || "Memory Holder"}</h3>
                <div className="text-3xl font-bold mb-4 text-[#FFB90F]">{(content as any)?.curator_tier_price || "$35"}</div>
                <p className="text-gray-300 mb-6">{(content as any)?.curator_tier_description || "For dedicated narrative enthusiasts and story creators."}</p>
                <ul className="space-y-2 mb-6">
                  {((content as any)?.curator_tier_features || []).map((feature: any, index: number) => (
                    <li key={index} className="flex items-center text-sm text-gray-300">
                      <ChevronRight className="w-4 h-4 text-[#FFB90F] mr-2" />
                      {feature.feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => {
                    setSelectedTier((content as any)?.curator_tier_selection || "Memory Holder");
                    document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full transition-all duration-300 ${
                    selectedTier === (content as any)?.curator_tier_selection
                      ? 'bg-[#FFB90F] text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Select Memory Holder
                </Button>
              </div>

              {/* Accomplice Tier */}
              <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 cursor-pointer ${
                selectedTier === (content as any)?.accomplice_tier_selection 
                  ? 'border-[#FFB90F] bg-[#FFB90F]/10' 
                  : 'border-white/10 hover:border-white/20'
              }`}>
                <h3 className="text-xl font-semibold mb-2">{(content as any)?.accomplice_tier_title || "Accomplice"}</h3>
                <div className="text-3xl font-bold mb-4 text-[#FFB90F]">{(content as any)?.accomplice_tier_price || "$75"}</div>
                <p className="text-gray-300 mb-6">{(content as any)?.accomplice_tier_description || "For those ready to shape the narrative and lead investigations."}</p>
                <ul className="space-y-2 mb-6">
                  {((content as any)?.accomplice_tier_features || []).map((feature: any, index: number) => (
                    <li key={index} className="flex items-center text-sm text-gray-300">
                      <ChevronRight className="w-4 h-4 text-[#FFB90F] mr-2" />
                      {feature.feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => {
                    setSelectedTier((content as any)?.accomplice_tier_selection || "accomplice");
                    document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full transition-all duration-300 ${
                    selectedTier === (content as any)?.accomplice_tier_selection
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
                <h2 className="text-2xl font-semibold text-[#FFB90F]">{(content as any)?.signup_form_title || "Ready to Be Part of the Mystery?"}</h2>
              </div>
              
              <p className="text-gray-300 mb-6">{(content as any)?.signup_form_description || "This isn't just another event. It's a ceremony. A cipher. A cultural awakening."}</p>
              
              {/* MailerLite Form */}
              <MailerLiteEmbed formType="platform" className="w-full" />
              
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{(content as any)?.faq_title || "The Briefing"}</h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {((content as any)?.faq_items || []).map((item: any, index: number) => (
                <AccordionItem key={`item-${index}`} value={`item-${index}`} className="border border-gray-700 rounded-lg px-6">
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

      {/* Footer */}
      <footer className="relative mt-16 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 border-2 border-[#FFB90F] rotate-45 relative">
                <div className="absolute inset-1 bg-[#FFB90F]/20 rotate-45"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#FFB90F] rounded-full"></div>
              </div>
              <span className="text-xl font-bold text-[#FFB90F]">ELUSIVE</span>
            </div>
            <p className="text-sm text-gray-400">&copy; {(content as any)?.footer_copyright_text || "2025 Elusive Origin. All rights reserved."}</p>
            <div className="flex items-center space-x-6">
              <a href="mailto:hello@elusiveorigin.com" className="text-sm text-gray-400 hover:text-[#FFB90F] transition-colors">
                Contact
              </a>
              <Link href="/" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
                Privacy
              </Link>
              <Link href="/" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
                Terms
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