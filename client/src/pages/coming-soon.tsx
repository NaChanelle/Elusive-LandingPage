import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Clock, Mail, Menu, ChevronUp, Users, ChevronLeft, ChevronRight, Quote, Shield, Lightbulb, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import MailerLiteForm from "@/components/MailerLiteForm";

export default function ComingSoon() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Load content from JSON
  const { data: content } = useQuery({
    queryKey: ['/assets/content/coming-soon.json'],
  });

  // Get carousel images from loaded content or use defaults
  const carouselImages = (content as any)?.gallery_images || [];

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
                {carouselImages.length > 0 && (
                  <>
                    <img 
                      src={carouselImages[currentImageIndex]?.image || carouselImages[currentImageIndex]?.url}
                      alt={carouselImages[currentImageIndex]?.alt || "Elusive Experience"}
                      className="w-full h-full object-contain bg-gray-900 transition-all duration-500"
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
                      {carouselImages.map((_: any, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex ? 'bg-[#FFB90F]' : 'bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{(content as any)?.testimonials_title || "What is Elusive?"}</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {(content as any)?.testimonials?.map((testimonial: any, index: number) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FFB90F] rounded-full flex items-center justify-center flex-shrink-0">
                    <Quote className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-gray-300 mb-4 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#FFB90F] rounded-full flex items-center justify-center">
                        <span className="text-black font-bold text-sm">{testimonial.initials}</span>
                      </div>
                      <span className="text-[#FFB90F] font-medium">{testimonial.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join the Investigation Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{(content as any)?.why_join_title || "Why Join the Investigation?"}</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {(content as any)?.why_join_features?.map((feature: any, index: number) => {
              const icons = [Shield, Lightbulb, Crown];
              const colors = ['#FFB90F', '#8B0000', 'gradient'];
              const Icon = icons[index % icons.length];
              const color = colors[index % colors.length];
              
              return (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
                  <div className={`w-16 h-16 ${color === 'gradient' ? 'bg-gradient-to-r from-[#FFB90F] to-[#8B0000]' : `bg-[${color}]`} rounded-lg flex items-center justify-center mx-auto mb-6`}>
                    <Icon className={`w-8 h-8 ${color === '#FFB90F' ? 'text-black' : 'text-white'}`} />
                  </div>
                  <h3 className={`text-xl font-semibold mb-4 ${color === 'gradient' ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#FFB90F] to-[#8B0000]' : `text-[${color}]`}`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{(content as any)?.faq_section_title || "Frequently Asked Questions"}</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {(content as any)?.faq_items?.map((item: any, index: number) => (
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

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 border-2 border-[#FFB90F] rotate-45 relative">
                <div className="absolute inset-1 bg-[#FFB90F]/20 rotate-45"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#FFB90F] rounded-full"></div>
              </div>
              <span className="text-xl font-bold text-[#FFB90F]">ELUSIVE</span>
            </div>
            <p className="text-sm text-gray-400">&copy; 2025 Elusive Origin. All rights reserved.</p>
            <div className="flex justify-center space-x-8 text-sm text-gray-400">
              <a href="mailto:hello@elusive.io" className="hover:text-[#FFB90F] transition-colors">Contact</a>
              <Link href="/" className="hover:text-[#FFB90F] transition-colors">Privacy</Link>
              <Link href="/" className="hover:text-[#FFB90F] transition-colors">Terms</Link>
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