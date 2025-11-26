import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import MailerLiteEmbed from "@/components/MailerLiteEmbed";
import { Link } from "wouter";
import { Eye, Users, Calendar, Database, BookOpen, MessageSquare, Play, Globe, Zap, Lightbulb, ChevronUp, ChevronRight, ChevronLeft, Mail, Home } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function VesselTeaser() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  // Load content from JSON file
  const { data: content } = useQuery({
    queryKey: ['/assets/content/vessel.json'],
  });

  // Get MVP features from loaded content or use defaults
  const mvpFeatures = (content as any)?.mvp_features || [];

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
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#FFB90F] rounded-full"></div>
              </div>
              <span className="text-xl font-bold text-[#FFB90F]">{(content as any)?.header_logo_text || "ELUSIVE"}</span>
            </div>
          </Link>
          
          <Link href="/">
            <Button className="bg-[#FFB90F] hover:bg-[#e6a50e] text-black p-2.5 rounded-lg" title="Home">
              <Home className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB90F] to-[#FFA500]">{(content as any)?.hero_main_headline_part1 || "Vessel"}</span>
              <span className="text-white"> {(content as any)?.hero_main_headline_part2 || "App"}</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">{(content as any)?.hero_sub_headline || "Introducing the Vessel: Elusive's digital storytelling companion app."}</p>
            
            <Button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#FFB90F] hover:bg-[#e6a50e] text-black font-medium px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              {(content as any)?.discover_features_button_text || "Discover Features"}
            </Button>
          </div>
        </section>

        {/* Intro Section */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-white">{(content as any)?.vessel_intro_title_part1 || "Your phone is no longer just a device—"}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF6B6B]">{(content as any)?.vessel_intro_title_part2 || "it's a key."}</span>
            </h2>
            
            <p className="text-xl text-gray-300 leading-relaxed">{(content as any)?.vessel_intro_description || "Whether you're attending in person or decoding from afar, the Vessel App helps you stay immersed, connected, and informed."}</p>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-16" id="features">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{(content as any)?.mvp_features_title || "Core Features"}</h2>
            
            {/* Swipeable Feature Carousel */}
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
              <div className="relative h-96">
                {mvpFeatures.length > 0 && (
                  <>
                    {/* Feature card content */}
                    <div className={`h-full ${mvpFeatures[currentFeatureIndex]?.gradient || 'bg-gradient-to-br from-[#FFB90F] to-[#FFA500]'} p-8 flex flex-col justify-between`}>
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 bg-black/20 rounded-lg flex items-center justify-center">
                            <Database className="w-6 h-6 text-black" />
                          </div>
                          <h3 className="text-2xl font-bold text-black">{mvpFeatures[currentFeatureIndex]?.title}</h3>
                        </div>
                        
                        <p className="text-black/80 text-lg mb-6">{mvpFeatures[currentFeatureIndex]?.description}</p>
                    
                    {/* Visual mockup for Theory Boards */}
                    {currentFeatureIndex === 0 && (
                      <div className="bg-black/10 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-4 bg-black/20 rounded"></div>
                          <div className="h-4 bg-black/20 rounded"></div>
                          <div className="h-8 bg-black/30 rounded col-span-2"></div>
                          <div className="h-4 bg-black/20 rounded"></div>
                          <div className="h-4 bg-black/20 rounded"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {mvpFeatures.map((_: any, index: number) => (
                            <button
                              key={index}
                              onClick={() => setCurrentFeatureIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentFeatureIndex ? 'bg-black' : 'bg-black/40'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-black/60 text-sm">{currentFeatureIndex + 1} of {mvpFeatures.length}</span>
                      </div>
                    </div>
                    
                    {/* Navigation arrows */}
                    <button 
                      onClick={() => setCurrentFeatureIndex((prev) => prev === 0 ? mvpFeatures.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-black p-2 rounded-full transition-all duration-300"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setCurrentFeatureIndex((prev) => prev === mvpFeatures.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-black p-2 rounded-full transition-all duration-300"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Future Features Section */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{(content as any)?.roadmap_features_title || "Future Features"}</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {((content as any)?.roadmap_features || [
                { title: "Live Event Integration", description: "Real-time live integration to cultural investigative events.", icon_name: "Calendar" },
                { title: "Creator Empowerment", description: "Provide tools and community for original cultural storytelling initiatives.", icon_name: "Lightbulb" }
              ]).map((feature: any, index: number) => {
                const IconComponent = getIconComponent(feature.icon_name);
                return (
                  <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
                    <div className="w-16 h-16 bg-[#8B0000] rounded-lg flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-[#8B0000]">{feature.title}</h3>
                    <p className="text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Vessel Freemium Features Section */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{(content as any)?.freemium_section_title || "Vessel Freemium Features"}</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
                <h3 className="text-xl font-semibold mb-6 text-[#FFB90F]">Free Features</h3>
                <p className="text-gray-300 mb-6">
                  {(content as any)?.freemium_description || "Start investigating for free with essential tools, then upgrade for advanced features."}
                </p>
                <ul className="space-y-3">
                  {((content as any)?.freemium_features || ["Basic theory board (view-only)", "Cultural library access (view-only)", "Community discussions"]).map((feature: string, index: number) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <ChevronRight className="w-4 h-4 text-[#FFB90F] mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-[#FFB90F]/10 to-[#FFA500]/10 backdrop-blur-sm rounded-lg p-8 border border-[#FFB90F]/30">
                <h3 className="text-xl font-semibold mb-6 text-[#FFB90F]">Premium Upgrade</h3>
                <p className="text-gray-300 mb-6">
                  {(content as any)?.premium_upgrade_text || "Upgrade for commentary features, advanced tools, and exclusive content."}
                </p>
                <ul className="space-y-3">
                  {((content as any)?.premium_features || ["Unlimited theory boards", "Full cultural library access", "Advanced collaboration tools", "Priority community features"]).map((feature: string, index: number) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <ChevronRight className="w-4 h-4 text-[#FFB90F] mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Join the Waitlist Section */}
        <section className="px-6 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Mail className="w-6 h-6 text-[#FFB90F]" />
                <h2 className="text-2xl font-semibold text-[#FFB90F]">{(content as any)?.cta_early_access_title || "Join the Waitlist"}</h2>
              </div>
              
              <p className="text-gray-300 mb-4">{(content as any)?.cta_early_access_description || "Be the first to test the app, submit your own theories, and access hidden archives before the public launch."}</p>
              <p className="text-sm text-gray-400 mb-6">{(content as any)?.feature_voting_description || "Which features would you like to see prioritized?"}</p>
              
              {/* Email Signup Form */}
              <MailerLiteEmbed formType="vessel" className="w-full" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative mt-16 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 border-2 border-[#FFB90F] rotate-45 relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#FFB90F] rounded-full"></div>
              </div>
              <span className="text-xl font-bold text-[#FFB90F]">ELUSIVE</span>
            </div>
            <p className="text-sm text-gray-400">&copy; {(content as any)?.footer_copyright_text || "2025 Elusive Origin. All rights reserved."}</p>
            <div className="flex items-center space-x-6">
              <a href="mailto:hello@elusive.quest" className="text-sm text-gray-400 hover:text-[#FFB90F] transition-colors">
                Contact
              </a>
              <button onClick={() => setPrivacyOpen(true)} className="text-sm text-gray-400 hover:text-[#FFB90F] transition-colors">
                Privacy
              </button>
              <button onClick={() => setTermsOpen(true)} className="text-sm text-gray-400 hover:text-[#FFB90F] transition-colors">
                Terms
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Dialog */}
      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="bg-[#1a1a1a] border-gray-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#FFB90F]">Privacy Policy</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-gray-300 text-sm">
            <p><strong className="text-white">Last Updated:</strong> November 2025</p>
            
            <h3 className="text-lg font-semibold text-white">Information We Collect</h3>
            <p>When you subscribe to our email list or register for events, we collect your email address and optionally your name. We use this information solely to send you updates about Elusive events, experiences, and related content.</p>
            
            <h3 className="text-lg font-semibold text-white">How We Use Your Information</h3>
            <p>Your information is used to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Send event announcements and updates</li>
              <li>Provide early access to new experiences</li>
              <li>Share exclusive content and clues</li>
              <li>Communicate important changes to our services</li>
            </ul>
            
            <h3 className="text-lg font-semibold text-white">Data Protection</h3>
            <p>We use MailerLite to manage our email subscriptions. Your data is stored securely and is never sold to third parties. You can unsubscribe at any time using the link in any of our emails.</p>
            
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <p>For any privacy-related questions, contact us at <a href="mailto:hello@elusive.quest" className="text-[#FFB90F] hover:underline">hello@elusive.quest</a></p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Dialog */}
      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent className="bg-[#1a1a1a] border-gray-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#FFB90F]">Terms of Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-gray-300 text-sm">
            <p><strong className="text-white">Last Updated:</strong> November 2025</p>
            
            <h3 className="text-lg font-semibold text-white">Email Subscription Terms</h3>
            <p>By subscribing to the Elusive mailing list, you agree to receive periodic emails about our events, experiences, and related content. You may unsubscribe at any time.</p>
            
            <h3 className="text-lg font-semibold text-white">Event Participation</h3>
            <p>Participation in Elusive events and experiences is subject to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Availability and capacity limits</li>
              <li>Age requirements (where applicable)</li>
              <li>Event-specific terms announced prior to each experience</li>
              <li>Respectful behavior toward other participants and staff</li>
            </ul>
            
            <h3 className="text-lg font-semibold text-white">Intellectual Property</h3>
            <p>All content, stories, puzzles, and materials associated with Elusive are the property of Elusive Origin. Participants may not reproduce, distribute, or create derivative works without written permission.</p>
            
            <h3 className="text-lg font-semibold text-white">Limitation of Liability</h3>
            <p>Elusive Origin is not responsible for any damages arising from participation in our events or use of our digital platforms, except where required by law.</p>
            
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <p>For questions about these terms, contact us at <a href="mailto:hello@elusive.quest" className="text-[#FFB90F] hover:underline">hello@elusive.quest</a></p>
          </div>
        </DialogContent>
      </Dialog>

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