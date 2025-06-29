import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ArrowLeft, Eye, Users, Zap, BookOpen, Lightbulb, MessageSquare, Play, ChevronRight, Mail, Globe, Database, Calendar } from "lucide-react";
import SwipeableFeatureCarousel from "@/components/swipeable-feature-carousel";
import { insertReservationSchema, type InsertReservation } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function VesselTeaser() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [, setLocation] = useLocation();
  const [scrollY, setScrollY] = useState(0);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const form = useForm<InsertReservation>({
    resolver: zodResolver(insertReservationSchema.extend({
      investigationInterests: insertReservationSchema.shape.investigationInterests.default(["vessel-app"])
    })),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      investigationInterests: ["vessel-app"],
      preferredRole: "",
      interests: "",
    },
  });

  const createReservation = useMutation({
    mutationFn: async (data: InsertReservation) => {
      const response = await apiRequest("POST", "/api/reservations", data);
      return response.json();
    },
    onSuccess: (data) => {
      setIsSuccess(true);
      toast({
        title: "Vessel Early Access Secured!",
        description: `Welcome to the future, ${data.reservation.firstName}. You'll be first to enter the Vessel when it launches.`,
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Early Access Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertReservation) => {
    createReservation.mutate(data);
  };

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





  if (isSuccess) {
    return (
      <div className="min-h-screen bg-deep-charcoal text-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="bg-black-mirror border border-neo-gold rounded-2xl p-12">
              <div className="w-16 h-16 bg-neo-gold rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-deep-charcoal text-2xl font-bold">✓</span>
              </div>
              <h2 className="text-3xl font-serif font-bold mb-4">Vessel Early Access Secured</h2>
              <p className="text-lg text-gray-300 mb-6">
                Your place aboard the Vessel has been reserved. Prepare to enter a sacred container 
                where theories transform into collective truth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setIsSuccess(false)}
                  className="bg-neo-gold text-deep-charcoal hover:bg-neo-gold/90"
                >
                  Reserve Another Access
                </Button>
                <button 
                  onClick={() => setLocation("/")}
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-social-red text-social-red rounded-lg font-semibold hover:bg-social-red hover:text-white transition-all"
                >
                  Return to Investigation Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <span>Back to Investigation Portal</span>
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
              <Button className="bg-neo-gold text-deep-charcoal hover:bg-neo-gold/90">
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
              onClick={() => document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })}
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
            <div className="text-center group">
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Primary Fields Section */}
                <div className="space-y-6">
                  {/* Name Fields - Most Prominent */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-lg font-semibold">
                            First Name <span className="text-social-red">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your first name"
                              {...field}
                              className="bg-deep-charcoal border-gray-600 text-white focus:border-neo-gold text-lg h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-lg font-semibold">
                            Last Name <span className="text-social-red">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your last name"
                              {...field}
                              className="bg-deep-charcoal border-gray-600 text-white focus:border-neo-gold text-lg h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Email - Most Prominent */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-lg font-semibold">
                          Email Address <span className="text-social-red">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="your.email@example.com"
                            {...field}
                            className="bg-deep-charcoal border-gray-600 text-white focus:border-neo-gold text-lg h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Optional Fields Section */}
                <div className="space-y-6 pt-6 border-t border-gray-600/50">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm font-medium">
                      Optional: Help us tailor your Vessel experience
                    </p>
                  </div>

                  {/* Role Interest - Optional */}
                  <FormField
                    control={form.control}
                    name="preferredRole"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 text-base">
                          Primary Interest in Vessel <span className="text-gray-500 text-sm">(Optional)</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-deep-charcoal border-gray-600 text-white focus:border-neo-gold">
                              <SelectValue placeholder="Select your primary interest" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-medium-charcoal border-gray-600">
                            <SelectItem value="original-story-creator" className="text-white hover:bg-black-mirror">
                              Original Story Creator
                            </SelectItem>
                            <SelectItem value="theory-board-investigator" className="text-white hover:bg-black-mirror">
                              Theory Board Investigator
                            </SelectItem>
                            <SelectItem value="community-collaborator" className="text-white hover:bg-black-mirror">
                              Community Collaborator
                            </SelectItem>
                            <SelectItem value="reference-library-contributor" className="text-white hover:bg-black-mirror">
                              Reference Library Contributor
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* MVP Features Feedback - Optional */}
                  <FormField
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 text-base">
                          Which MVP features excite you most? <span className="text-gray-500 text-sm">(Optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your interest in Theory Boards, Investigation Log, Character Roster, Cultural Library, or Live Events..."
                            {...field}
                            className="bg-deep-charcoal border-gray-600 text-white focus:border-neo-gold"
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  disabled={createReservation.isPending}
                  className="w-full gradient-gold-red text-deep-charcoal py-4 text-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105"
                >
                  {createReservation.isPending 
                    ? "Securing Vessel Access..." 
                    : "Secure Early Access to Vessel"
                  }
                </Button>
              </form>
            </Form>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                Early access gives you priority entry when Vessel launches, plus opportunities to shape 
                the Original Story Studio features based on your feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Share Your Vision Section */}
      <section className="py-16 bg-gradient-to-br from-deep-charcoal via-black-mirror to-deep-charcoal border-t border-gray-800">
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
            
            <form className="space-y-4">
              <Textarea 
                placeholder="Describe your ideal cultural investigation platform. What features would transform how communities preserve and share their stories?"
                className="bg-deep-charcoal border-gray-600 text-white focus:border-neo-gold min-h-[120px]"
              />
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Input 
                  placeholder="Your email (optional)"
                  className="bg-deep-charcoal border-gray-600 text-white focus:border-neo-gold"
                />
                <Button className="bg-neo-gold text-deep-charcoal hover:bg-neo-gold/90 px-8 py-2 font-semibold whitespace-nowrap">
                  Submit Feedback
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}