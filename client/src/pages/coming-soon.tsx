import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { Clock, Mail, Menu, ChevronUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import MailerLiteForm from "@/components/MailerLiteForm";

export default function ComingSoon() {
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