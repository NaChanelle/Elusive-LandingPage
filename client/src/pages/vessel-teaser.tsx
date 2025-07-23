// src/pages/vessel-teaser.tsx
import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Eye, Users, Zap, BookOpen, Lightbulb, MessageSquare, Play, ChevronRight, Mail, Globe, Database, Calendar } from "lucide-react";
import SwipeableFeatureCarousel from "@/components/swipeable-feature-carousel";
import { Button } from "@/components/ui/button";

// Define TypeScript interfaces for vessel teaser content
interface FooterLink {
  text: string;
  url: string;
}

interface MVPFeature {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  visualPlaceholder?: string;
  gradient?: string;
  status?: string;
}

interface RoadmapFeature {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  status?: string;
  timeline?: string;
}

interface VesselContent {
  header_logo_text: string;
  platform_button_text: string;
  hero_background_image?: string;
  hero_main_headline_part1: string;
  hero_main_headline_part2: string;
  hero_sub_headline: string;
  discover_features_button_text: string;
  vessel_intro_title_part1: string;
  vessel_intro_title_part2: string;
  vessel_intro_description: string;
  mvp_features_title: string;
  mvp_features: MVPFeature[];
  roadmap_features_title: string;
  roadmap_features: RoadmapFeature[];
  cta_early_access_title: string;
  cta_early_access_description: string;
  tally_form_id: string;
  footer_logo_text: string;
  footer_copyright_text: string;
  footer_links: FooterLink[];
}

// Extend processed feature interface
interface ProcessedFeature extends MVPFeature {
  icon: React.ComponentType<any>;
}

interface ProcessedRoadmapFeature extends RoadmapFeature {
  icon: React.ComponentType<any>;
}

declare global {
  interface Window {
    Tally?: any;
  }
}

export default function VesselTeaser() {
  const [, setLocation] = useLocation();
  const [scrollY, setScrollY] = useState(0);

  // State for dynamic content with proper typing
  const [content, setContent] = useState<VesselContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch content specific to the Vessel Teaser page from JSON
  useEffect(() => {
    fetch('/assets/content/vessel.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: VesselContent) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        console.error("Error loading Vessel Teaser page content:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tally Script Injection
  useEffect(() => {
    const tallyScriptId = 'tally-embed-script';
    if (!document.getElementById(tallyScriptId)) {
      const script = document.createElement('script');
      script.id = tallyScriptId;
      script.src = 'https://tally.so/widgets/embed.js';
      script.async = true;
      script.onload = () => {
        if (typeof window.Tally !== "undefined") {
          window.Tally.loadEmbeds();
        } else {
          // Fallback if Tally object isn't immediately available
          document.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((e: any) => {
            e.src = e.dataset.tallySrc;
          });
        }
      };
      script.onerror = () => {
        // Fallback on error
        document.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((e: any) => {
          e.src = e.dataset.tallySrc;
        });
      };
      document.body.appendChild(script);
    }

    return () => {
      const existingScript = document.getElementById(tallyScriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // Helper to render Tally forms with proper typing
  const renderTallyForm = (formId: string, embedDivId: string) => {
    if (!formId || formId === 'your-tally-form-id') {
      // Return a simple fallback form if no Tally ID is configured
      return (
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB90F]"
          />
          <Button className="w-full bg-[#FFB90F] hover:bg-[#FFB90F]/90 text-black font-medium py-3 rounded-lg">
            Get Early Access
          </Button>
        </div>
      );
    }

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
        />
      </div>
    );
  };

  // Icon mapping helper
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      Eye,
      Users,
      Calendar,
      Database,
      BookOpen,
      MessageSquare,
      Play,
      Globe,
      Zap,
      Lightbulb
    };
    return iconMap[iconName] || Eye;
  };

  // Conditional rendering for loading and error states
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] text-white">
        Loading content...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] text-red-600">
        Error loading content: {error.message}
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] text-white">
        No content available
      </div>
    );
  }

  // Process features with icons
  const mvpFeatures: ProcessedFeature[] = content.mvp_features.map(feature => ({
    ...feature,
    icon: getIconComponent(feature.icon_name)
  }));

  const roadmapFeatures: ProcessedRoadmapFeature[] = content.roadmap_features.map(feature => ({
    ...feature,
    icon: getIconComponent(feature.icon_name)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] text-white overflow-x-hidden">
      {/* Header */}
      <header className="relative z-50 p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-2 border-[#FFB90F] rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#FFB90F] rounded-full"></div>
            </div>
            <span className="text-xl font-bold tracking-wider">{content.header_logo_text}</span>
          </div>
          <Button 
            onClick={() => setLocation("/platform")} 
            className="bg-[#FFB90F] hover:bg-[#FFB90F]/90 text-black font-medium px-6 py-2 rounded-full"
          >
            {content.platform_button_text}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute top-32 left-20 w-64 h-64 border border-[#FFB90F] rotate-45 opacity-30"></div>
          <div className="absolute bottom-20 right-32 w-48 h-48 border border-[#8B0000] rotate-12 opacity-40"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-[#FFB90F] opacity-10 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB90F] to-[#FFA500]">
                {content.hero_main_headline_part1}
              </span>{" "}
              {content.hero_main_headline_part2}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {content.hero_sub_headline}
            </p>
          </div>

          <Button 
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#FFB90F] hover:bg-[#FFB90F]/90 text-black font-medium px-8 py-4 rounded-full text-lg"
          >
            {content.discover_features_button_text}
          </Button>
        </div>
      </section>

      {/* Vessel Introduction */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            {content.vessel_intro_title_part1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#A52A2A]">
              {content.vessel_intro_title_part2}
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {content.vessel_intro_description}
          </p>
        </div>
      </section>

      {/* MVP Features - Swipeable Carousel */}
      <section id="features" className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{content.mvp_features_title}</h2>
          <SwipeableFeatureCarousel features={mvpFeatures} />
        </div>
      </section>

      {/* Roadmap Features */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{content.roadmap_features_title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {roadmapFeatures.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div key={feature.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#4B0082] to-[#6A0DAD] rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#FFB90F]">{feature.title}</h3>
                      {feature.timeline && (
                        <span className="text-sm text-gray-400">{feature.timeline}</span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300">{feature.description}</p>
                  {feature.status && (
                    <div className="mt-4">
                      <span className="px-3 py-1 bg-[#4B0082]/20 text-[#9370DB] rounded-full text-sm font-medium">
                        {feature.status}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-[#FFB90F] mr-3" />
              <h2 className="text-2xl font-bold">{content.cta_early_access_title}</h2>
            </div>
            <p className="text-gray-300 mb-6">{content.cta_early_access_description}</p>

            {/* Tally Form */}
            {renderTallyForm(content.tally_form_id, 'vessel-early-access-form')}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 border-2 border-[#FFB90F] rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-[#FFB90F] rounded-full"></div>
              </div>
              <span className="text-xl font-bold tracking-wider">{content.footer_logo_text}</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400 mb-2">{content.footer_copyright_text}</p>
              <div className="flex flex-wrap justify-center md:justify-end space-x-4">
                {content.footer_links.map((link, index) => (
                  <a key={index} href={link.url} className="text-sm text-gray-400 hover:text-[#FFB90F] transition-colors">
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}