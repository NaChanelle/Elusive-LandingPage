import { useState } from "react";
import { Check, Crown, Eye, Users, ChevronRight, Infinity, Headphones, Moon, Music, Gift, FileText, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { scrollToSection } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function AccessTiers() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const tiers = [
    {
      name: "Detective",
      description: "Essential tools for curious investigators",
      monthlyPrice: 12.99,
      yearlyPrice: 129.99,
      originalYearlyPrice: 155.88,
      features: [
        { icon: Eye, text: "Monthly mystery case access" },
        { icon: FileText, text: "Basic theory boards access" },
        { icon: Users, text: "Community discussion access" },
        { icon: Gift, text: "Event updates & announcements" },
        { icon: Radio, text: "Mobile app early access" }
      ],
      icon: Eye,
      popular: false,
      freeTrialDays: 7
    },
    {
      name: "Curator",
      description: "Enhanced immersive investigation experience",
      monthlyPrice: 14.99,
      yearlyPrice: 59.99,
      originalYearlyPrice: 179.88,
      features: [
        { icon: Infinity, text: "Unlimited mystery access for 7 days" },
        { icon: Headphones, text: "50,000+ minutes of audio content designed for deep investigation" },
        { icon: Moon, text: "Exclusive mystery stories narrated by familiar voices" },
        { icon: Music, text: "Custom investigation soundscapes & focus music" },
        { icon: Gift, text: "Premium cultural artifacts & expert analysis" },
        { icon: Radio, text: "Live expert commentary & story sessions" }
      ],
      icon: Users,
      popular: true,
      freeTrialDays: 7,
      badge: "7-Day Free Trial"
    },
    {
      name: "Accomplice",
      description: "All-in-one premium investigation toolkit",
      monthlyPrice: 24.99,
      yearlyPrice: 249.99,
      originalYearlyPrice: 299.88,
      features: [
        { icon: Crown, text: "Access everything Elusive Origin has to offer" },
        { icon: Gift, text: "Exclusive benefits like premium articles & subscriber-only content" },
        { icon: Radio, text: "Audio app with narrated investigations & exclusive shows" },
        { icon: Users, text: "Direct creator collaboration & co-creation opportunities" },
        { icon: Eye, text: "VIP live events and annual gathering access" },
        { icon: FileText, text: "Personal investigation mentor & priority support" }
      ],
      icon: Crown,
      popular: false,
      freeTrialDays: 0,
      promoText: "This subscription includes unlimited access to Theory Boards, Story Studios, and Cultural Code Library."
    }
  ];

  return (
    <section id="tiers" className="py-24 px-6 bg-gradient-to-br from-[#363636] via-gray-800 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your All-in-One Investigation Planner
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Unlock deeper access to our cultural mystery ecosystem with premium features designed for every level of investigation.
          </p>
          <p className="text-gray-400 mt-4">You may cancel at any time.</p>
          
          {/* Billing Toggle */}
          <div className="flex justify-center mt-8">
            <div className="bg-gray-700 p-1 rounded-lg flex">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === "monthly"
                    ? "bg-[#FFB90F] text-black"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                1 MONTH
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all relative ${
                  billingCycle === "yearly"
                    ? "bg-[#FFB90F] text-black"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                12 MONTHS
                <Badge className="absolute -top-2 -right-2 bg-[#8B0000] text-white text-xs px-1">
                  Popular
                </Badge>
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            const price = billingCycle === "monthly" ? tier.monthlyPrice : tier.yearlyPrice;
            const originalPrice = billingCycle === "yearly" ? tier.originalYearlyPrice : null;
            const priceLabel = billingCycle === "monthly" ? "/mo" : "/yr.";
            const savings = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
            
            return (
              <Card
                key={tier.name}
                className={`relative overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                  tier.popular
                    ? "border-[#FFB90F] border-2 bg-gradient-to-b from-blue-900/20 to-blue-800/20 backdrop-blur-sm"
                    : "border-gray-700 bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm"
                } ${index === 0 ? 'md:transform md:scale-95' : ''} ${index === 2 ? 'md:transform md:scale-95' : ''}`}
              >
                {tier.badge && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#FFB90F] text-black font-semibold px-3 py-1 rounded-full">
                      {tier.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6 pt-8">
                  <div className="mx-auto mb-4 p-3 rounded-2xl bg-gradient-to-br from-[#FFB90F] to-[#8B0000]">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    {tier.name}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm px-2">
                    {tier.description}
                  </CardDescription>
                  
                  <div className="mt-6">
                    {originalPrice && billingCycle === "yearly" && (
                      <div className="text-gray-500 line-through text-lg">
                        ${originalPrice}
                      </div>
                    )}
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl font-bold text-[#FFB90F]">
                        ${price}
                      </span>
                      <span className="text-gray-400 ml-1 text-sm">{priceLabel}</span>
                    </div>
                    {savings > 0 && (
                      <div className="text-green-400 text-sm mt-1">
                        Save {savings}%
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 px-6">
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <li key={featureIndex} className="flex items-start">
                          <div className="mr-3 mt-0.5 p-1 rounded bg-[#FFB90F]/20">
                            <FeatureIcon className="w-4 h-4 text-[#FFB90F]" />
                          </div>
                          <span className="text-gray-300 text-sm leading-relaxed">{feature.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                  
                  {tier.promoText && (
                    <div className="mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                      <p className="text-xs text-gray-400 text-center">
                        {tier.promoText}
                      </p>
                    </div>
                  )}
                  
                  <Button
                    onClick={() => scrollToSection('reserve')}
                    className={`w-full h-12 font-semibold transition-all mb-4 ${
                      tier.popular
                        ? "bg-gradient-to-r from-[#FFB90F] to-[#8B0000] hover:from-[#E6A50E] hover:to-[#7A0000] text-white"
                        : "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                    }`}
                  >
                    {tier.freeTrialDays > 0 ? `Try Free & Subscribe` : `Subscribe Now`}
                  </Button>
                  
                  {tier.freeTrialDays > 0 && (
                    <div className="flex items-center justify-center text-green-400 text-sm">
                      <Check className="w-4 h-4 mr-1" />
                      No Payment Now!
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12 space-y-3">
          <p className="text-gray-400 text-sm">
            All subscriptions include automatic renewal terms
          </p>
          <p className="text-gray-500 text-xs max-w-2xl mx-auto">
            If you subscribe via this app, payment will be automatically charged to your account upon confirmation of purchase. 
            Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period.
          </p>
        </div>
      </div>
    </section>
  );
}
