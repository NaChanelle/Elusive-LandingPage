// src/pages/vessel-teaser.tsx
import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Eye, Users, Zap, BookOpen, Lightbulb, MessageSquare, Play, ChevronRight, Mail, Globe, Database, Calendar } from "lucide-react";
import SwipeableFeatureCarousel from "@/components/swipeable-feature-carousel";
import { Button } from "@/components/ui/button";

export default function VesselTeaser() {
  const [, setLocation] = useLocation();
  const [scrollY, setScrollY] = useState(0);

  // New state for dynamic content
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch content specific to the Vessel Teaser page from JSON
  useEffect(() => {
    fetch('/content/vessel.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading Vessel Teaser page content:", err);
        setError(err);
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once on mount

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper to render Tally forms
  const renderTallyForm = (formId, embedDivId) => {
    if (!formId) return null;
    return (
      <div id={embedDivId}>
        <iframe
          data-tally-src={`https://tally.so/r/${formId}?transparentBackground=1`}
          width="100%"
          height="auto"
          frameBorder="0"
          scrolling="no"
          className="rounded-lg"
          title="Tally Form"
        ></iframe>
        {useEffect(() => {
          if (!window.Tally && !document.querySelector('script[src*="tally.so/widgets/embed.js"]')) {
            var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};"undefined"!=typeof Tally?v():(d.querySelector('script[src="'+w+'"]')||d.head.appendChild(d.createElement("script")).src=w).addEventListener("load",v);
          } else if (window.Tally && window.Tally.loadEmbeds) {
            window.Tally.loadEmbeds();
          }
        }, [formId])}
      </div>
    );
  };

  // Conditional rendering for loading and error states
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] text-white">Loading content...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] text-red-600">Error loading content: {error.message}</div>;
  }

  // Core MVP Features - First Iteration Priority (now from content)
  const mvpFeatures = content.mvp_features.map(feature => ({
    ...feature,
    icon: {
      "Eye": Eye,
      "Users": Users,
      "Calendar": Calendar,
      "Database": Database,
      "BookOpen": BookOpen,
      "MessageSquare": MessageSquare,
      "Play": Play,
      "Globe": Globe,
      "Zap": Zap,
      "Lightbulb": Lightbulb
    }[feature.icon_name] || Eye // Default to Eye if icon_name not found
  }));

  // Future Roadmap Features (now from content)
  const roadmapFeatures = content.roadmap_features.map(feature => ({
    ...feature,
    icon: {
      "Eye": Eye,
      "Users": Users,
      "Calendar": Calendar,
      "Database": Database,
      "BookOpen": BookOpen,
      "MessageSquare": MessageSquare,
      "Play": Play,
      "Globe": Globe,
      "Zap": Zap,
      "Lightbulb": Lightbulb
    }[feature.icon_name] || Lightbulb // Default to Lightbulb if icon_name not found
  }));


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] text-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 backdrop-blur-sm bg-black/50">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Button
            onClick={() => setLocation('/')}
            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg backdrop-blur-sm border border-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-2 border-[#FFB90F] rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#FFB90F] rounded-full"></div>
            </div>
            <span className="text-xl font-bold tracking-wider">{content.header_logo_text}</span>
          </div>
          <Button
            onClick={() => setLocation('/platform')}
            className="bg-[#FFB90F] hover:bg-[#FFB90F]/90 text-black font-medium px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
          >
            {content.platform_button_text}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-100 ease-out"
          style={{
            backgroundImage: `url(${content.hero_background_image})`,
            transform: `translateY(${scrollY * 0.5}px) scale(1.1)`, // Parallax effect
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 p-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold leading-tight drop-shadow-lg">
            {content.hero_main_headline_part1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB90F] to-[#FFA500]">
              {content.hero_main_headline_part2}
            </span>
          </h1>
          <p className="text-xl md:text-3xl text-gray-300 mt-4 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            {content.hero_sub_headline}
          </p>
          <Button
            onClick={() => document.getElementById('vessel-features')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-8 bg-[#FFB90F] hover:bg-[#FFB90F]/90 text-black px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 shadow-lg"
          >
            {content.discover_features_button_text}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Vessel Introduction */}
      <section className="py-20 bg-[#1a1a1a] relative z-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            {content.vessel_intro_title_part1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB90F] to-[#FFA500]">
              {content.vessel_intro_title_part2}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {content.vessel_intro_description}
          </p>
        </div>
      </section>

      {/* MVP Features Section */}
      <section id="vessel-features" className="py-20 bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            {content.mvp_features_title}
          </h3>
          <SwipeableFeatureCarousel features={mvpFeatures} />
        </div>
      </section>

      {/* Roadmap Features Section */}
      <section className="py-20 bg-[#1a1a1a] relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            {content.roadmap_features_title}
          </h3>
          <SwipeableFeatureCarousel features={roadmapFeatures} />
        </div>
      </section>

      {/* Call to Action for Early Access */}
      <section className="py-20 bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] relative z-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {content.cta_early_access_title}
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            {content.cta_early_access_description}
          </p>
          {/* Tally Form - now dynamically rendered */}
          {renderTallyForm(content.tally_form_id, 'vessel-tally-form')}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 relative z-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
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
    </div>
  );
}