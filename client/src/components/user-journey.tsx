import { ArrowRight, Users, Search, Zap, Calendar } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function UserJourney() {
  const journeyPaths = [
    {
      title: "New to Mystery Experiences",
      subtitle: "First-time investigators",
      description: "Perfect for cultural enthusiasts curious about interactive storytelling",
      icon: Search,
      color: "neo-gold",
      steps: [
        {
          step: 1,
          title: "Start with Detective Tier",
          description: "Basic investigation access to understand the format",
          action: "Reserve Detective Access",
          target: "reserve"
        },
        {
          step: 2,
          title: "Join Community Theories",
          description: "Connect with fellow code-breakers and cultural curators",
          action: "Reserve Your Name",
          target: "reserve"
        },
        {
          step: 3,
          title: "Experience August Event",
          description: "Participate in your first immersive cultural mystery",
          action: "Event Details",
          target: "events"
        }
      ],
      recommended: false
    },
    {
      title: "Cultural Story Enthusiasts",
      subtitle: "Theory builders & reference decoders",
      description: "For those who appreciate layered storytelling and cultural commentary",
      icon: Users,
      color: "neo-gold",
      steps: [
        {
          step: 1,
          title: "Choose Curator Tier",
          description: "Enhanced tools for cultural code library access",
          action: "Reserve Curator Access",
          target: "tiers"
        },
        {
          step: 2,
          title: "Explore Vessel Preview",
          description: "Understand the theory boards and story studios",
          action: "Learn About Vessel",
          target: "vessel"
        },
        {
          step: 3,
          title: "Early Access Signup",
          description: "Be first to experience the full cultural investigation platform",
          action: "Reserve Your Investigation",
          target: "reserve"
        }
      ],
      recommended: true
    },
    {
      title: "Mystery Experience Veterans",
      subtitle: "Accomplices in truth-seeking",
      description: "Experienced participants ready for co-creation opportunities",
      icon: Zap,
      color: "social-red",
      steps: [
        {
          step: 1,
          title: "Join as Accomplice",
          description: "Full investigation partnership with behind-the-scenes access",
          action: "Reserve Accomplice Access",
          target: "tiers"
        },
        {
          step: 2,
          title: "Vessel Early Access",
          description: "Beta access to theory boards and story studios",
          action: "Get Early Access",
          target: "reserve"
        },
        {
          step: 3,
          title: "Co-Creation Opportunities",
          description: "Shape narratives and contribute to the cultural code chronicles",
          action: "Join the Investigation",
          target: "reserve"
        }
      ],
      recommended: false
    }
  ];

  return (
    <section id="journey" className="py-20 bg-deep-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-neo-gold text-sm font-mono tracking-widest mb-4">
            YOUR INVESTIGATION PATHWAY
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Choose Your Journey</h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Everyone's a suspect. Every city holds a clue. Your experience level determines your entry point 
            into the Cultural Codes Chronicles. Where will you begin your investigation?
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {journeyPaths.map((path, index) => {
            const Icon = path.icon;
            const isRecommended = path.recommended;
            const colorClass = path.color === "social-red" ? "social-red" : "neo-gold";
            
            return (
              <div 
                key={index}
                className={cn(
                  "bg-medium-charcoal rounded-2xl p-8 relative",
                  isRecommended 
                    ? "border-2 border-neo-gold transform scale-105" 
                    : path.color === "social-red"
                      ? "border border-social-red"
                      : "border border-gray-600"
                )}
              >
                {isRecommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-neo-gold text-deep-charcoal px-6 py-2 rounded-full text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className={cn(
                    "w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center",
                    path.color === "social-red" ? "bg-social-red/20" : "bg-neo-gold/20"
                  )}>
                    <Icon 
                      className={cn(
                        "text-3xl",
                        path.color === "social-red" ? "text-social-red" : "text-neo-gold"
                      )} 
                      size={32} 
                    />
                  </div>
                  <h3 className="text-2xl font-serif font-semibold mb-2">{path.title}</h3>
                  <p className={cn(
                    "text-sm font-medium mb-3",
                    path.color === "social-red" ? "text-social-red" : "text-neo-gold"
                  )}>
                    {path.subtitle}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {path.description}
                  </p>
                </div>
                
                <div className="space-y-6">
                  {path.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start space-x-4">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0",
                        path.color === "social-red" 
                          ? "bg-social-red text-white" 
                          : "bg-neo-gold text-deep-charcoal"
                      )}>
                        {step.step}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold mb-1">{step.title}</h4>
                        <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                          {step.description}
                        </p>
                        <button
                          onClick={() => scrollToSection(step.target)}
                          className={cn(
                            "text-sm font-medium flex items-center space-x-2 hover:opacity-80 transition-opacity",
                            path.color === "social-red" ? "text-social-red" : "text-neo-gold"
                          )}
                        >
                          <span>{step.action}</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Cultural Commentary Section */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-social-red/10 to-neo-gold/10 border border-neo-gold/30 rounded-2xl p-8 md:p-12 text-center">
            <div className="w-16 h-16 border-2 border-neo-gold rounded-full mx-auto mb-6 flex items-center justify-center">
              <Calendar className="text-neo-gold" size={32} />
            </div>
            <h3 className="text-2xl font-serif font-semibold mb-4">Mystery Mingles with Meaning</h3>
            <p className="text-lg text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed">
              Where social commentary mingles with suspense, and strangers become accomplices in uncovering truth. 
              Each investigation layer reveals cultural codes that connect us across space, time, and ancestry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('vessel')}
                className="bg-neo-gold text-deep-charcoal px-6 py-3 rounded-lg font-semibold hover:bg-neo-gold/90 transition-all"
              >
                Explore the Vessel
              </button>
              <button 
                onClick={() => scrollToSection('events')}
                className="border-2 border-social-red text-social-red px-6 py-3 rounded-lg font-semibold hover:bg-social-red hover:text-white transition-all"
              >
                August Event Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}