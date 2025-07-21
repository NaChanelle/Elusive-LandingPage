import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Eye, Users, Zap, BookOpen, Lightbulb, MessageSquare, Play, ChevronRight, Mail, Globe, Database, Calendar } from "lucide-react";
import SwipeableFeatureCarousel from "@/components/swipeable-feature-carousel";
import { Button } from "@/components/ui/button";

export default function VesselTeaser() {
  const [, setLocation] = useLocation();
  const [scrollY, setScrollY] = useState(0);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add Tally script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    script.onload = () => {
      if (typeof (window as any).Tally !== "undefined") {
        (window as any).Tally.loadEmbeds();
      } else {
        document.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((e: any) => {
          e.src = e.dataset.tallySrc;
        });
      }
    };
    script.onerror = () => {
      document.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((e: any) => {
        e.src = e.dataset.tallySrc;
      });
    };
    
    if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
      document.body.appendChild(script);
    }

    return () => {
      const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // Core MVP Features - First Iteration Priority
  const mvpFeatures = [
    {
      id: "theory-boards",
      title: "Theory Boards",
      description: "Visual evidence mapping with real-time community collaboration.",
      icon: Eye,
      visualPlaceholder: "THEORY_BOARD_ALPHA",
      gradient: "bg-gradient-to-br from-neo-gold/20 to-social-red/20",
      status: "mvp"
    },
    {
      id: "live-events",
      title: "Live Events Integration",
      description: "Seamless connection between digital and real-world experiences.",
      icon: Calendar,
      visualPlaceholder: "EVENT_SYNC",
      gradient: "bg-gradient-to-br from-green-500/20 to-teal-500/20",
      status: "mvp"
    },
    {
      id: "character-roster",
      title: "Character Roster",
      description: "Track participants and their roles in ongoing investigations.",
      icon: Users,
      visualPlaceholder: "ROSTER_INTERFACE",
      gradient: "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
      status: "mvp"
    },
    {
      id: "cultural-library",
      title: "Cultural Code Library", 
      description: "Searchable archive of cultural knowledge and symbols.",
      icon: Database,
      visualPlaceholder: "ARCHIVE_INTERFACE",
      gradient: "bg-gradient-to-br from-purple-500/20 to-blue-500/20",
      status: "mvp"
    },
    {
      id: "investigation-log",
      title: "Investigation Log",
      description: "Chronological timeline of clues, discoveries, and community insights.",
      icon: BookOpen,
      visualPlaceholder: "LOG_INTERFACE",
      gradient: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
      status: "mvp"
    }
  ];

  // Future Roadmap Features
  const roadmapFeatures = [
    {
      id: "story-studio",
      title: "Original Story Studio",
      description: "Complete creator toolkit for developing authentic mysteries rooted in cultural commentary.",
      icon: Lightbulb,
      status: "roadmap",
      timeline: "Long-term Vision"
    },
    {
      id: "advanced-theory-tools",
      title: "Advanced Theory Tools",
      description: "AI-powered pattern recognition and cross-investigation analysis.",
      icon: Zap,
      status: "roadmap", 
      timeline: "Future Release"
    },
    {
      id: "community-governance",
      title: "Community Governance",
      description: "Democratic decision-making tools for investigation direction and story validation.",
      icon: MessageSquare,
      status: "roadmap",
      timeline: "On Our Roadmap"
    }
  ];

  return (
    <div className="min-h-screen bg-deep-charcoal text-gray-100">
      {/* Header */}
      <div className="border-b border-neo-gold/20 bg-black-mirror">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setLocation("/")}
              className="flex items-center space-x-3 text-neo-gold hover:text-neo-gold/80 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Coming Soon</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 border-2 border-neo-gold rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-neo-gold rounded-full"></div>
              </div>
              <span className="text-xl font-serif font-semibold">Vessel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Parallax */}
      <section className="relative py-20 bg-gradient-to-br from-deep-charcoal via-black-mirror to-deep-charcoal overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="absolute top-20 left-20 w-32 h-32 border border-neo-gold rotate-45"></div>
          <div className="absolute bottom-40 right-32 w-24 h-24 border border-social-red rotate-12"></div>
          <div className="absolute top-1/3 right-20 w-16 h-16 bg-neo-gold opacity-30 rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            <div className="inline-block text-neo-gold text-sm font-mono tracking-widest mb-4 animate-pulse">
              VESSEL PROTOCOL INITIALIZING...
            </div>
            <div className="w-20 h-20 border-4 border-neo-gold rotate-45 mx-auto mb-8 relative animate-pulse-glow">
              <div className="absolute inset-3 bg-neo-gold/20 rotate-45"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-neo-gold rounded-full"></div>
            </div>
          </div>
          
          <h1 
            className="text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-white via-neo-gold to-white bg-clip-text text-transparent"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            Vessel
          </h1>
          
          <p className="text-2xl md:text-3xl text-neo-gold font-medium mb-4">
            A sacred container for culture, craft, and community
          </p>
          
          <div className="w-24 h-1 bg-social-red mx-auto mb-8"></div>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Where cultural curators become co-creators... Where theories transform into collective truth... 
            Where every story you encounter carries a key to unlock deeper understanding.
          </p>
          
          {/* Soft CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => document.getElementById('app-preview')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-neo-gold text-deep-charcoal hover:bg-neo-gold/90 px-8 py-3 text-lg font-semibold"
            >
              Experience the Vision
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              onClick={() => document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              className="border-neo-gold text-neo-gold hover:bg-neo-gold hover:text-deep-charcoal px-8 py-3 text-lg font-semibold"
            >
              Get Early Access
            </Button>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section id="app-preview" className="py-20 bg-black-mirror relative">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="absolute top-40 left-40 w-20 h-20 border border-neo-gold rotate-45"></div>
          <div className="absolute bottom-60 right-40 w-16 h-16 border border-social-red rotate-12"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Experience Vessel</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              See how the Vessel app transforms cultural investigation through immersive interfaces and collaborative tools.
            </p>
          </div>
          
          {/* App Mockup Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="bg-gradient-to-br from-neo-gold/20 to-social-red/20 rounded-2xl p-8 border border-neo-gold/30 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-4 text-neo-gold">Theory Boards Interface</h3>
                <div className="bg-deep-charcoal rounded-lg p-6 mb-4 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-neo-gold rounded-full"></div>
                      <div className="w-3 h-3 bg-social-red rounded-full"></div>
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-400">Theory Board Alpha</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Eye className="w-4 h-4 text-neo-gold" />
                      <div className="h-2 bg-neo-gold/30 rounded flex-1"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-12 bg-white/10 rounded border border-neo-gold/20"></div>
                      <div className="h-12 bg-white/10 rounded border border-social-red/20"></div>
                      <div className="h-12 bg-white/10 rounded border border-white/20"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Evidence Map</span>
                      <span>Community Theories</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">Visual evidence mapping with real-time community collaboration and theory validation.</p>
              </div>
            </div>
            
            <div>
              <div className="bg-gradient-to-br from-social-red/20 to-neo-gold/20 rounded-2xl p-8 border border-social-red/30 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-4 text-social-red">Story Studio Dashboard</h3>
                <div className="bg-deep-charcoal rounded-lg p-6 mb-4 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-neo-gold font-mono">STUDIO_ACTIVE</div>
                    <Play className="w-4 h-4 text-social-red" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-social-red/40 rounded w-3/4"></div>
                    <div className="h-3 bg-neo-gold/40 rounded w-1/2"></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <div className="h-2 bg-white/20 rounded w-full"></div>
                        <div className="h-2 bg-white/20 rounded w-2/3"></div>
                      </div>
                      <div className="bg-white/5 rounded p-2 text-center">
                        <BookOpen className="w-6 h-6 mx-auto text-neo-gold mb-1" />
                        <div className="text-xs text-gray-400">Cultural Archive</div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">Intuitive story creation tools with cultural authenticity guides and community feedback loops.</p>
              </div>
            </div>
          </div>
          
          {/* Interactive Demo Preview */}
          <div className="bg-gradient-to-r from-deep-charcoal to-black-mirror rounded-2xl p-8 border border-neo-gold/20 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Interactive Demo Coming Soon</h3>
              <p className="text-gray-300 mb-6">
                Experience a limited preview of Vessel's core features. Navigate through Theory Boards, 
                explore the Cultural Code Library, and try the Story Studio interface.
              </p>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-neo-gold rounded-full animate-pulse"></div>
                  <span className="text-sm">Demo Build: 47%</span>
                </div>
                <div className="text-sm text-gray-400">Estimated: 2 weeks</div>
              </div>
              <Button 
                onClick={() => document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-neo-gold text-deep-charcoal hover:bg-neo-gold/90"
              >
                Notify Me When Ready
                <Mail className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* MVP Core Features Showcase */}
      <section className="py-20 bg-deep-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-neo-gold/20 border border-neo-gold rounded-full px-4 py-2 mb-4">
              <span className="text-neo-gold text-sm font-mono tracking-wider">LAUNCHING AUGUST 2025</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Core MVP Features</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Five essential features forming the foundation of your investigation experience.
            </p>
          </div>
          
          <SwipeableFeatureCarousel features={mvpFeatures} />
        </div>
      </section>

      {/* Future Features Roadmap */}
      <section className="py-20 bg-gradient-to-br from-black-mirror to-deep-charcoal relative">
        <div 
          className="absolute inset-0 opacity-5"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          <div className="absolute top-20 left-20 w-16 h-16 border border-neo-gold rotate-45"></div>
          <div className="absolute bottom-40 right-40 w-12 h-12 border border-social-red rotate-12"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">What's Next for Vessel?</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              Our long-term vision extends far beyond the initial launch. Here's what we're building toward.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {roadmapFeatures.map((feature, index) => (
              <div key={feature.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-neo-gold" />
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-800 rounded-full px-3 py-1">
                    {feature.timeline}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{feature.description}</p>
                
                <div className="flex items-center text-xs text-gray-400">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                  <span>Planned for Future Release</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-300 mb-6">
              Your feedback shapes our roadmap. Let us know which future features excite you most.
            </p>
            <Button 
              onClick={() => document.getElementById('share-vision')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              className="border-neo-gold text-neo-gold hover:bg-neo-gold hover:text-deep-charcoal"
            >
              Share Your Vision Below
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>



      {/* How Early Access Works */}
      <section className="py-20 bg-gradient-to-br from-black-mirror to-deep-charcoal relative">
        <div 
          className="absolute inset-0 opacity-5"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <div className="absolute top-32 left-32 w-24 h-24 border border-neo-gold rotate-45"></div>
          <div className="absolute bottom-32 right-32 w-16 h-16 border border-social-red rotate-12"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">How Early Access Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your journey from early access to full Vessel experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div 
              onClick={() => document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-center group cursor-pointer"
            >
              <div className="w-16 h-16 bg-neo-gold/20 border-2 border-neo-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-neo-gold/30 transition-colors">
                <span className="text-neo-gold font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-neo-gold">Sign Up Below</h3>
              <p className="text-gray-300 text-sm">Share your interests and help us understand what features matter most to you.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-social-red/20 border-2 border-social-red rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-social-red/30 transition-colors">
                <span className="text-social-red font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-social-red">Receive Exclusive Updates</h3>
              <p className="text-gray-300 text-sm">Get behind-the-scenes development insights and be first to see new features.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 border-2 border-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Vessel Protocol Launch</h3>
              <p className="text-gray-300 text-sm">Be notified the moment early access opens and get priority access to the platform.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-neo-gold to-social-red rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Shape the Future</h3>
              <p className="text-gray-300 text-sm">Your feedback directly influences Vessel's development and feature priorities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access Registration */}
      <section id="early-access" className="py-20 bg-black-mirror">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Secure Early Access</h2>
            <p className="text-xl text-gray-300 mb-4">
              Be among the first to enter the Vessel. Help us build the future of interactive storytelling.
            </p>
            <p className="text-sm text-neo-gold">
              Your feedback directly shapes Vessel's development and feature roadmap.
            </p>
          </div>
          
          <div className="bg-medium-charcoal border border-neo-gold/30 rounded-2xl p-8 md:p-12">
            <iframe 
              data-tally-src="https://tally.so/embed/w505EM?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
              loading="lazy" 
              width="100%" 
              height="398" 
              frameBorder="0" 
              marginHeight="0" 
              marginWidth="0" 
              title="Vessel Early Access"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Share Your Vision Section */}
      <section id="share-vision" className="py-16 bg-gradient-to-br from-deep-charcoal via-black-mirror to-deep-charcoal border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-neo-gold/10 to-social-red/10 border border-neo-gold/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-neo-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-neo-gold" />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">Help Shape the Future of Vessel</h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Your vision guides our roadmap. Share ideas for future features and tell us what would make Vessel invaluable for cultural investigation.
              </p>
            </div>
            
            <div className="bg-black-mirror/50 rounded-xl p-6 mb-6">
              <h4 className="text-lg font-semibold mb-4 text-neo-gold">What are your dream investigation tools?</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div>
                  <p className="mb-2">🔍 <strong>Theory Development:</strong> How should evidence connect across investigations?</p>
                  <p className="mb-2">📚 <strong>Cultural Archive:</strong> What knowledge should be preserved and shared?</p>
                </div>
                <div>
                  <p className="mb-2">🎭 <strong>Story Creation:</strong> What frameworks would empower authentic narratives?</p>
                  <p className="mb-2">🌐 <strong>Community Tools:</strong> How should investigators collaborate across distances?</p>
                </div>
              </div>
            </div>
            
            <iframe 
              data-tally-src="https://tally.so/embed/3NNy8G?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
              loading="lazy" 
              width="100%" 
              height="228" 
              frameBorder="0" 
              marginHeight="0" 
              marginWidth="0" 
              title="Vessel Feedback"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}