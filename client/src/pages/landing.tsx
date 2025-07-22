// src/pages/landing.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { Clock, ChevronRight, Mail, Users, Sparkles, Search, Crown } from "lucide-react";
import { insertReservationSchema, type InsertReservation } from "@shared/schema";
// import { marked } from 'marked'; // Uncomment if you use markdown fields and need to parse them

export default function Landing() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const { toast } = useToast();

  // New state for dynamic content
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch content specific to the landing page from JSON
  useEffect(() => {
    fetch('/content/landing.json')
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
        console.error("Error loading Landing page content:", err);
        setError(err);
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once on mount

  // Countdown timer logic, now using dynamic targetDate from content
  useEffect(() => {
    if (!content || !content.countdown_target_date) return; // Wait for content to load

    const targetDate = new Date(content.countdown_target_date);

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval); // Stop countdown when it reaches zero
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [content]); // Re-run if content (specifically target_date) changes

  const signupMutation = useMutation({
    mutationFn: async (data: { email: string; firstName?: string }) => {
      const reservationData: InsertReservation = {
        email: data.email,
        firstName: data.firstName || "",
        lastName: "",
        investigationInterests: ["Cultural Mysteries"],
        preferredRole: "Detective"
      };

      const response = await apiRequest("POST", "/api/reservations", reservationData);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Welcome to the Investigation!",
        description: "You're now on the list for exclusive event updates and early access.",
        variant: "default",
      });
      setEmail("");
      setFirstName("");
    },
    onError: (error: Error) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again or contact us for help.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation.mutate({ email, firstName });
  };

  // Helper to render MailerLite forms
  const renderMailerLiteForm = (formId, embedDivId) => {
    if (!formId) return null;
    return (
      <div id={embedDivId}>
        <div data-ml-form={formId}></div>
        {useEffect(() => {
          if (!window.mailerlite && !document.querySelector('script[src*="mailerlite"]')) {
            (function(m,a,i,l,e,r){ m['MailerLiteObject']=e;function f(){
            var c={ a:[], q:[]};return function(n){c.a.push(n);return function(){c.q.push(arguments);return c}}()}
            var x=f(),y=f();e?m[e]=x:m.mailerlite=x;m[e].c=y;m[e].f=r;r.k=e;r.load=f;
            }(window,document,'script','ml','mailerlite',{"v":"20230801"}));
          } else if (window.mailerlite && window.mailerlite.load) {
            window.mailerlite.load();
          }
        }, [formId])}
      </div>
    );
  };

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

  // Main component return block, with dynamic content
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] text-white">
      {/* Minimal Header */}
      <header className="relative z-50 p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-2 border-neo-gold rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-neo-gold rounded-full"></div>
            </div>
            <span className="text-xl font-bold tracking-wider">{content.header_title}</span>
          </div>
          <Link href="/" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
            {content.back_to_coming_soon_text}
          </Link>
        </div>
      </header>

      {/* Hero Event Section */}
      <main className="relative px-6 py-12">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-[#FFB90F] rotate-45"></div>
          <div className="absolute bottom-40 right-32 w-24 h-24 border border-[#8B0000] rotate-12"></div>
          <div className="absolute top-1/3 right-20 w-16 h-16 bg-[#FFB90F] opacity-20 rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
          {/* Main Event Hero */}
          <div className="space-y-8">
            {/* Pulsing Logo */}
            <div className="flex justify-center">
              <div className="w-20 h-20 border-4 border-neo-gold rotate-45 mx-auto mb-8 relative animate-pulse-glow">
                <div className="absolute inset-3 bg-neo-gold/20 rotate-45"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-neo-gold rounded-full"></div>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-bold leading-tight">
                {content.hero_main_headline.split(' ')[0]}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB90F] to-[#FFA500]">
                  {content.hero_main_headline.split(' ').slice(1).join(' ')}
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {content.hero_sub_headline}
              </p>
              <div className="text-xl text-[#FFB90F] font-semibold">
                {content.event_date_text}
              </div>
            </div>

            {/* Value Proposition */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.value_proposition_text }}></p>
            </div>

            {/* Countdown Timer */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-[#FFB90F] mr-3" />
                <h3 className="text-2xl font-semibold">Event Launches In</h3>
              </div>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-[#FFB90F]">{timeLeft.days}</div>
                  <div className="text-sm text-gray-400">Days</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-[#FFB90F]">{timeLeft.hours}</div>
                  <div className="text-sm text-gray-400">Hours</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-[#FFB90F]">{timeLeft.minutes}</div>
                  <div className="text-sm text-gray-400">Minutes</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-[#FFB90F]">{timeLeft.seconds}</div>
                  <div className="text-sm text-gray-400">Seconds</div>
                </div>
              </div>
            </div>

            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Button 
                onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto bg-[#8B0000] hover:bg-[#8B0000]/90 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200"
              >
                {content.reserve_spot_button_text}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                onClick={() => document.getElementById('what-to-expect')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="w-full sm:w-auto border-[#FFB90F] text-[#FFB90F] hover:bg-[#FFB90F] hover:text-black px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200"
              >
                {content.learn_more_button_text}
              </Button>
            </div>
          </div>

          {/* Brief What to Expect Section */}
          <div id="what-to-expect" className="mt-20 pt-8 border-t border-white/10 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-8">{content.whats_coming_next_title}</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFB90F]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#FFB90F]" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{content.feature1_title}</h4>
                <p className="text-gray-300">{content.feature1_description}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFB90F]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-[#FFB90F]" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{content.feature2_title}</h4>
                <p className="text-gray-300">{content.feature2_description}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFB90F]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-[#FFB90F]" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{content.feature3_title}</h4>
                <p className="text-gray-300">{content.feature3_description}</p>
              </div>
            </div>
          </div>

          {/* Access Tiers Section */}
          <div className="mt-20 pt-8 border-t border-white/10 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center">{content.access_tiers_title}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Detective Tier */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#FFB90F]/50 transition-all duration-300">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#FFB90F]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-[#FFB90F]" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{content.detective_tier_title}</h4>
                  <div className="text-3xl font-bold text-[#FFB90F] mb-4">{content.detective_tier_price}</div>
                  <p className="text-gray-300 mb-6 text-sm">
                    {content.detective_tier_description}
                  </p>
                  <ul className="text-left space-y-2 mb-6">
                    {content.detective_tier_features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-[#FFB90F] rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Curator Tier */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border-2 border-[#FFB90F] hover:border-[#FFB90F]/80 transition-all duration-300 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#FFB90F] text-black px-3 py-1 rounded-full text-xs font-semibold">
                    {content.curator_tier_tag}
                  </span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#FFB90F]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-[#FFB90F]" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{content.curator_tier_title}</h4>
                  <div className="text-3xl font-bold text-[#FFB90F] mb-4">{content.curator_tier_price}</div>
                  <p className="text-gray-300 mb-6 text-sm">
                    {content.curator_tier_description}
                  </p>
                  <ul className="text-left space-y-2 mb-6">
                    {content.curator_tier_features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-[#FFB90F] rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Accomplice Tier */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#8B0000]/50 transition-all duration-300">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#8B0000]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-6 h-6 text-[#8B0000]" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{content.accomplice_tier_title}</h4>
                  <div className="text-3xl font-bold text-[#8B0000] mb-4">{content.accomplice_tier_price}</div>
                  <p className="text-gray-300 mb-6 text-sm">
                    {content.accomplice_tier_description}
                  </p>
                  <ul className="text-left space-y-2 mb-6">
                    {content.accomplice_tier_features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-[#8B0000] rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Streamlined Email Signup Form (Original form, text now dynamic) */}
          <div id="signup-form" className="mt-20 pt-8 border-t border-white/10 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold mb-4 text-center">{content.signup_form_title}</h3>
              <p className="text-gray-300 mb-8 text-center">
                {content.signup_form_description}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder={content.firstname_placeholder}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl h-12"
                  />
                  <Input
                    type="email"
                    placeholder={content.email_placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl h-12"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={signupMutation.isPending}
                  className="w-full bg-[#FFB90F] hover:bg-[#FFB90F]/90 text-black font-semibold rounded-xl h-12 text-lg transition-all duration-200"
                >
                  {signupMutation.isPending ? content.signup_button_pending_text : content.signup_button_text}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </form>

              <p className="text-xs text-gray-400 mt-4 text-center">
                {content.signup_form_footer_text}
              </p>
            </div>
          </div>

          {/* MailerLite Form 1 (Additional) */}
          <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 text-center">MailerLite Form</h3>
            {renderMailerLiteForm(content.mailerlite_form1_id, 'landing-mailerlite-form-1')}
          </div>

          {/* Tally Form 1 (Additional) */}
          <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 text-center">Tally Form</h3>
            {renderTallyForm(content.tally_form1_id, 'landing-tally-form-1')}
          </div>

          {/* Brief FAQ */}
          <div className="mt-16 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-center">{content.faq_title}</h3>
            <div className="space-y-4">
              {content.faq_items.map((item, index) => (
                <details key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <summary className="cursor-pointer font-medium text-[#FFB90F] hover:text-[#FFA500] transition-colors">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: item.answer }}></p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative mt-16 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">&copy; {content.footer_copyright_text}</p>
            <div className="flex items-center space-x-6">
              <a href="mailto:hello@elusiveorigin.com" className="text-sm text-gray-400 hover:text-[#FFB90F] transition-colors">
                {content.contact_us_link_text}
              </a>
              <Link href="/" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
                {content.back_to_coming_soon_text}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
