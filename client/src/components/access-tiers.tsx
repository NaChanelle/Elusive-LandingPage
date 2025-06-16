import { Check } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function AccessTiers() {
  const eventTiers = [
    {
      name: "Detective",
      price: 15,
      priceType: "event",
      description: "Basic investigation access",
      features: [
        "Event attendance",
        "Basic theory boards access",
        "Community discussion"
      ],
      buttonText: "Reserve Detective Access",
      buttonStyle: "border-2 border-neo-gold text-neo-gold hover:bg-neo-gold hover:text-deep-charcoal",
      recommended: false
    },
    {
      name: "Curator",
      price: 35,
      priceType: "event",
      description: "Enhanced investigation tools",
      features: [
        "All Detective features",
        "Cultural code library access",
        "Story studios participation",
        "Exclusive content previews"
      ],
      buttonText: "Reserve Curator Access",
      buttonStyle: "bg-neo-gold text-deep-charcoal hover:bg-neo-gold/90",
      recommended: true
    },
    {
      name: "Accomplice",
      price: 75,
      priceType: "event",
      description: "Full investigation partnership",
      features: [
        "All Curator features",
        "Behind-the-scenes access",
        "Co-creation opportunities",
        "Vessel app early access"
      ],
      buttonText: "Reserve Accomplice Access",
      buttonStyle: "bg-social-red text-white hover:bg-social-red/90",
      recommended: false
    }
  ];

  const appTiers = [
    {
      name: "Explorer Monthly",
      price: 12,
      priceType: "month",
      features: [
        "Theory boards access",
        "Cultural code library",
        "Community features"
      ]
    },
    {
      name: "Investigator Annual",
      price: 120,
      priceType: "year",
      features: [
        "All Explorer features",
        "Story studios unlimited",
        "Priority event access"
      ]
    }
  ];

  return (
    <section id="tiers" className="py-20 bg-black-mirror">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Access Tiers</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose your level of investigation. Each tier unlocks deeper access to the cultural code library.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {eventTiers.map((tier, index) => (
            <div 
              key={index} 
              className={cn(
                "bg-medium-charcoal rounded-xl p-8 relative",
                tier.recommended 
                  ? "border-2 border-neo-gold transform scale-105" 
                  : tier.name === "Accomplice" 
                    ? "border border-social-red" 
                    : "border border-gray-600"
              )}
            >
              {tier.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-neo-gold text-deep-charcoal px-6 py-2 rounded-full text-sm font-semibold">
                  RECOMMENDED
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-serif font-semibold mb-2">{tier.name}</h3>
                <div className={cn(
                  "text-4xl font-bold mb-4",
                  tier.name === "Accomplice" ? "text-social-red" : "text-neo-gold"
                )}>
                  ${tier.price}<span className="text-lg text-gray-400">/{tier.priceType}</span>
                </div>
                <p className="text-gray-300">{tier.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check 
                      className={cn(
                        "mr-3",
                        tier.name === "Accomplice" ? "text-social-red" : "text-neo-gold"
                      )} 
                      size={20} 
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => scrollToSection('reserve')}
                className={cn(
                  "w-full py-3 rounded-lg font-semibold transition-all",
                  tier.buttonStyle
                )}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>
        
        {/* App Subscription Tiers */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-semibold mb-4">Vessel App Subscriptions</h3>
            <p className="text-lg text-gray-300">Ongoing access to the cultural investigation platform</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {appTiers.map((tier, index) => (
              <div key={index} className="bg-medium-charcoal border border-neo-gold rounded-xl p-8">
                <h4 className="text-xl font-semibold mb-4">{tier.name}</h4>
                <div className="text-3xl font-bold text-neo-gold mb-4">
                  ${tier.price}<span className="text-lg text-gray-400">/{tier.priceType}</span>
                </div>
                <ul className="space-y-3 text-gray-300">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="text-neo-gold mr-3" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
