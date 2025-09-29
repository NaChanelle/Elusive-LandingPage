import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { Clock, Mail, Menu, ChevronUp, Users, ChevronLeft, ChevronRight, Quote, Shield, Lightbulb, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import MailerLiteForm from "@/components/MailerLiteForm";

export default function ComingSoon() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Carousel images
  const carouselImages = [
    { 
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
      alt: "Elusive Experience 1" 
    },
    { 
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop", 
      alt: "Elusive Experience 2" 
    },
    { 
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop", 
      alt: "Elusive Experience 3" 
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

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
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
              <span className="text-xl font-bold text-[#FFB90F]">ELUSIVE</span>
            </div>
          </Link>
          
          <div className="flex gap-3">
            <Link href="/platform">
              <Button className="bg-[#FFB90F] hover:bg-[#e6a50e] text-black font-medium px-4 py-2 text-sm">
                Event Updates
              </Button>
            </Link>
            <Link href="/vessel">
              <Button className="bg-[#8B0000] hover:bg-[#a51c1c] text-white font-medium px-4 py-2 text-sm">
                Vessel Preview
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-32 pt-40">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-[#FFB90F] rotate-45"></div>
          <div className="absolute bottom-40 right-32 w-24 h-24 border border-[#8B0000] rotate-12"></div>
          <div className="absolute top-1/3 right-20 w-16 h-16 bg-[#FFB90F] opacity-20 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          {/* Pulsing Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 border-4 border-[#FFB90F] rotate-45 mx-auto mb-8 relative animate-pulse">
              <div className="absolute inset-3 bg-[#FFB90F]/20 rotate-45"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#FFB90F] rounded-full"></div>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Mystery </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB90F] to-[#FFA500]">Worth</span>
            <br />
            <span className="text-white">Remembering</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Elusive is an immersive storytelling experience and cultural mystery platform where truth is pieced together by those brave enough to look closer. Not everything lost should stay hidden.
          </p>

          {/* CTA Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 mb-8 border border-gray-700">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="w-6 h-6 text-[#FFB90F]" />
              <h2 className="text-2xl font-semibold text-[#FFB90F]">Join the First Wave of Truth-Seekers</h2>
            </div>
            
            <p className="text-gray-300 mb-6">Get early access, behind-the-scenes clues, and a first look at the story before it unfolds.</p>
            
            {/* MailerLite Form */}
            <MailerLiteForm formId="4f8mQz" className="w-full" />
            
            <p className="text-xs text-gray-400 text-center mt-4">
              Join 75+ investigators in our upcoming cultural mystery experience.
            </p>
            <p className="text-xs text-gray-500 text-center mt-2">
              No spam, just mysteries. Unsubscribe at any time.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/platform">
              <Button className="bg-[#FFB90F] hover:bg-[#e6a50e] text-black font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
                Event Updates
              </Button>
            </Link>
            <Link href="/vessel">
              <Button className="bg-[#8B0000] hover:bg-[#a51c1c] text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
                Vessel Preview
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Static brand cards */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-2 border-[#FFB90F] rotate-45 mx-auto mb-4 relative">
                  <div className="absolute inset-2 bg-[#FFB90F]/20 rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#FFB90F] rounded-full"></div>
                </div>
                <span className="text-[#FFB90F] font-bold text-lg">ELUSIVE</span>
              </div>
            </div>
            
            {/* Interactive carousel */}
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden group">
              <div className="relative h-64">
                <img 
                  src={carouselImages[currentImageIndex].src}
                  alt={carouselImages[currentImageIndex].alt}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Navigation arrows */}
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                {/* Dots indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? 'bg-[#FFB90F]' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Third brand card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-2 border-[#8B0000] rotate-45 mx-auto mb-4 relative">
                  <div className="absolute inset-2 bg-[#8B0000]/20 rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#8B0000] rounded-full"></div>
                </div>
                <span className="text-[#8B0000] font-bold text-lg">ELUSIVE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Elusive Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What is Elusive?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FFB90F] rounded-full flex items-center justify-center flex-shrink-0">
                  <Quote className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-gray-300 mb-4 italic">
                    "We attend so we as an Fof a special. the type of mystery Like as a experience. Once concerning hit game into participating in a little mystery and discovered with as like experiencing special event."
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#FFB90F] rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-sm">CA</span>
                    </div>
                    <span className="text-[#FFB90F] font-medium">Creator's Address</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FFB90F] rounded-full flex items-center justify-center flex-shrink-0">
                  <Quote className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-gray-300 mb-4 italic">
                    "Absolutely the best experience"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#FFB90F] rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-sm">PO</span>
                    </div>
                    <span className="text-[#FFB90F] font-medium">Purchased Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join the Investigation Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Join the Investigation?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
              <div className="w-16 h-16 bg-[#FFB90F] rounded-lg flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#FFB90F]">Insider Access</h3>
              <p className="text-gray-300">
                Be the first to decode clues, learn detective methodologies, and gather intel before each reveal.
              </p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
              <div className="w-16 h-16 bg-[#8B0000] rounded-lg flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#8B0000]">Influence the Story</h3>
              <p className="text-gray-300">
                Your theories and insights help shape how the mystery unfolds. Our narratives build and live together.
              </p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#FFB90F] to-[#8B0000] rounded-lg flex items-center justify-center mx-auto mb-6">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFB90F] to-[#8B0000]">Exclusive Rewards</h3>
              <p className="text-gray-300">
                Get early access to drops, surprise events, special tools and First Access to limited events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-[#FFB90F]">
                What is Elusive, exactly?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Elusive is an immersive cultural mystery experience that combines storytelling, investigation, and community. Think escape room meets cultural investigation meets collaborative storytelling.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-[#FFB90F]">
                What makes Elusive different?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Unlike traditional mystery experiences, Elusive focuses on real cultural narratives and historical mysteries. Your participation helps preserve and explore stories that matter.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-[#FFB90F]">
                Is this a game or a film?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                It's neither and both. Elusive creates new experiences that blend interactive storytelling, documentary investigation, and community collaboration in ways that traditional media can't.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-[#FFB90F]">
                When does it launch?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                We're launching our first full experience in 2025. Early access members get first notification and exclusive content leading up to the launch.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-[#FFB90F]">
                Do I need to be a certain age to participate?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Most Elusive experiences are designed for ages 16+, though this may vary by specific event. We'll always specify age recommendations for each mystery.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6" className="border border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-[#FFB90F]">
                Is it free?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Joining our community is free! Some premium experiences and advanced features may have costs, but we believe in accessible storytelling for everyone.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-800 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center space-x-8 mb-6 text-sm text-gray-400">
            <Link href="/platform" className="hover:text-[#FFB90F] transition-colors">Event Updates</Link>
            <Link href="/vessel" className="hover:text-[#FFB90F] transition-colors">Vessel Preview</Link>
            <a href="mailto:hello@elusive.io" className="hover:text-[#FFB90F] transition-colors">Contact</a>
          </div>
          
          <div className="text-xs text-gray-500 space-y-2">
            <p>&copy; 2025 ELUSIVE. All rights reserved.</p>
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