import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ArrowLeft, Eye, Users, Zap, BookOpen, Lightbulb, MessageSquare, Play, ChevronRight, Mail, Globe } from "lucide-react";
import FeatureCarousel from "@/components/feature-carousel";
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

  const vesselFeatures = [
    {
      icon: Eye,
      title: "Theory Boards",
      description: "Collaborative investigation spaces where cultural patterns emerge through community analysis",
      details: [
        "Interactive evidence mapping",
        "Reference connection tools", 
        "Community voting on theories",
        "Cultural context layers"
      ]
    },
    {
      icon: Users,
      title: "Cultural Code Library",
      description: "Living archive connecting generations through shared meaning and storytelling traditions",
      details: [
        "Searchable reference database",
        "User-contributed context",
        "Generational bridge content",
        "Meaning discovery tools"
      ]
    },
    {
      icon: Zap,
      title: "Story Studios",
      description: "Where strangers become accomplices in truth through collaborative narrative creation",
      details: [
        "Interactive story building",
        "Character development tools",
        "Plot threading system",
        "Community feedback loops"
      ]
    },
    {
      icon: BookOpen,
      title: "Original Story Studio",
      description: "Creator toolkit for developing authentic mysteries rooted in cultural commentary",
      details: [
        "Story framework templates",
        "Cultural authenticity guides",
        "Community feedback system",
        "Publication pathways"
      ]
    },
    {
      icon: Lightbulb,
      title: "Investigation Dashboard",
      description: "Personal command center tracking your theories, contributions, and discovery journey",
      details: [
        "Theory tracking system",
        "Contribution analytics",
        "Discovery milestones",
        "Community recognition"
      ]
    },
    {
      icon: MessageSquare,
      title: "Accomplice Network",
      description: "Connect with fellow investigators across cities and storylines",
      details: [
        "Cross-city connections",
        "Skill-based matching",
        "Collaboration spaces",
        "Mentorship opportunities"
      ]
    }
  ];

  const storyStudioFeatures = [
    "Framework-guided story development with cultural authenticity checks",
    "Community feedback integration for iterative improvement", 
    "Reference library with cultural context and meaning",
    "Publishing pathways from digital creation to live events",
    "Mentorship connections with established cultural storytellers",
    "Collaboration tools for co-creation with other investigators"
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

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-deep-charcoal via-black-mirror to-deep-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-block text-neo-gold text-sm font-mono tracking-widest mb-4 animate-pulse">
              VESSEL PROTOCOL INITIALIZING...
            </div>
            <div className="w-20 h-20 border-4 border-neo-gold rotate-45 mx-auto mb-8 relative animate-pulse-glow">
              <div className="absolute inset-3 bg-neo-gold/20 rotate-45"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-neo-gold rounded-full"></div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-white via-neo-gold to-white bg-clip-text text-transparent">
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
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-black-mirror">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">The Vision</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              An immersive platform where mystery meets meaning, connecting investigators 
              across space, time, and ancestry through collaborative storytelling.
            </p>
          </div>
          
          <FeatureCarousel features={vesselFeatures} />
        </div>
      </section>

      {/* Original Story Studio Focus */}
      <section className="py-20 bg-deep-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Original Story Studio</h2>
              <p className="text-xl text-neo-gold mb-6">
                Empowering authentic voices to craft mysteries that matter
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                The heart of Vessel where creators develop original mystery narratives rooted in genuine 
                experiences and social commentary. From digital creation to live event realization.
              </p>
              
              <div className="space-y-4 mb-8">
                {storyStudioFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-neo-gold rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-neo-gold/10 to-social-red/10 border border-neo-gold/30 rounded-2xl p-8">
              <h3 className="text-2xl font-serif font-semibold mb-4 text-center">Share Your Vision</h3>
              <p className="text-gray-300 text-center mb-6">
                Help shape the Original Story Studio by sharing what features would empower your storytelling
              </p>
              <div className="bg-medium-charcoal rounded-lg p-6">
                <p className="text-sm text-gray-400 mb-4">Tell us about your ideal story creation tools:</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• What frameworks would help you develop authentic narratives?</li>
                  <li>• How should community feedback integrate into the creation process?</li>
                  <li>• What pathways from digital to live events would you value?</li>
                  <li>• How can we ensure stories maintain authenticity and depth?</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access Registration */}
      <section className="py-20 bg-black-mirror">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Secure Early Access</h2>
            <p className="text-xl text-gray-300 mb-8">
              Be among the first to enter the Vessel. Help us build the future of interactive storytelling.
            </p>
          </div>
          
          <div className="bg-medium-charcoal border border-neo-gold/30 rounded-2xl p-8 md:p-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">First Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your first name"
                            {...field}
                            className="bg-deep-charcoal border-gray-600 text-white focus:border-neo-gold"
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
                        <FormLabel className="text-gray-300">Last Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your last name"
                            {...field}
                            className="bg-deep-charcoal border-gray-600 text-white focus:border-neo-gold"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                          className="bg-deep-charcoal border-gray-600 text-white focus:border-neo-gold"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Role Interest */}
                <FormField
                  control={form.control}
                  name="preferredRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Primary Interest in Vessel</FormLabel>
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

                {/* Story Studio Input */}
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        What features would you want in the Original Story Studio? (Optional)
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Share your ideas for story creation tools, collaboration features, or authenticity frameworks..."
                          {...field}
                          className="bg-deep-charcoal border-gray-600 text-white focus:border-neo-gold"
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
    </div>
  );
}