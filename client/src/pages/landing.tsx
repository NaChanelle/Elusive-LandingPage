import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { Clock, ChevronRight, Mail, Users, Sparkles } from "lucide-react";
import { insertReservationSchema, type InsertReservation } from "@shared/schema";

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

  // Countdown to August 2025 (example date: August 15, 2025)
  useEffect(() => {
    const targetDate = new Date('2025-08-15T00:00:00Z');
    
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
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] text-white">
      {/* Minimal Header */}
      <header className="relative z-50 p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#FFB90F] rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-black rounded-sm animate-pulse"></div>
            </div>
            <span className="text-xl font-bold tracking-wider">ELUSIVE</span>
          </div>
          <Link href="/" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
            ← Back to Coming Soon
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
              <div className="w-20 h-20 bg-[#FFB90F] rounded-lg flex items-center justify-center shadow-2xl shadow-[#FFB90F]/30 animate-pulse">
                <div className="w-12 h-12 bg-black rounded-sm"></div>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-bold leading-tight">
                Next{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB90F] to-[#FFA500]">
                  Event
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                The investigation continues... Where will the next portal open?
              </p>
              <div className="text-xl text-[#FFB90F] font-semibold">
                August 2025 Event
              </div>
            </div>

            {/* Value Proposition */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
                Join the mystery. Shape the story. Become an accomplice in truth. 
                <br className="hidden md:block" />
                <span className="text-[#FFB90F]">An immersive cultural investigation experience that transforms strangers into collaborators.</span>
              </p>
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
                Reserve Your Spot
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                onClick={() => document.getElementById('what-to-expect')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="w-full sm:w-auto border-[#FFB90F] text-[#FFB90F] hover:bg-[#FFB90F] hover:text-black px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Brief What to Expect Section */}
          <div id="what-to-expect" className="mt-20 pt-8 border-t border-white/10 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-8">What's Coming Next?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFB90F]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#FFB90F]" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Cultural Investigation Event</h4>
                <p className="text-gray-300">Immersive live experience in August 2025</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFB90F]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-[#FFB90F]" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Vessel Companion App</h4>
                <p className="text-gray-300">Mobile companion for investigation logs and community theories</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFB90F]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-[#FFB90F]" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Cultural Codes Chronicles</h4>
                <p className="text-gray-300">Ongoing storytelling ecosystem and creator community</p>
              </div>
            </div>
          </div>

          {/* Streamlined Email Signup Form */}
          <div id="signup-form" className="mt-20 pt-8 border-t border-white/10 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold mb-4 text-center">Reserve Your Investigation</h3>
              <p className="text-gray-300 mb-8 text-center">
                Secure your place in the cultural code chronicles. Be notified when tickets drop and the vessel launches.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="First Name (optional)"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl h-12"
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
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
                  {signupMutation.isPending ? "Joining Investigation..." : "Get Event Updates"}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
              
              <p className="text-xs text-gray-400 mt-4 text-center">
                No spam. Unsubscribe anytime. You'll be the first to know about tickets, the Vessel app, and exclusive content.
              </p>
            </div>
          </div>

          {/* Brief FAQ */}
          <div className="mt-16 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-center">Questions?</h3>
            <div className="space-y-4">
              <details className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <summary className="cursor-pointer font-medium text-[#FFB90F] hover:text-[#FFA500] transition-colors">
                  When is the event?
                </summary>
                <p className="mt-3 text-gray-300 text-sm">
                  The inaugural cultural investigation experience launches in August 2025. Exact dates and venue details will be shared with early access subscribers first.
                </p>
              </details>
              <details className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <summary className="cursor-pointer font-medium text-[#FFB90F] hover:text-[#FFA500] transition-colors">
                  What is the Vessel app?
                </summary>
                <p className="mt-3 text-gray-300 text-sm">
                  Vessel is your companion app for cultural exploration, featuring investigation logs, community theories, and real-time clue drops during events. Early access available to event participants.
                </p>
              </details>
              <details className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <summary className="cursor-pointer font-medium text-[#FFB90F] hover:text-[#FFA500] transition-colors">
                  How much will tickets cost?
                </summary>
                <p className="mt-3 text-gray-300 text-sm">
                  Event access will be available in three tiers: Detective ($15), Curator ($35), and Accomplice ($75). Early subscribers get first access and potential early bird pricing.
                </p>
              </details>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative mt-16 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">&copy; 2025 Elusive Origin. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <a href="mailto:hello@elusiveorigin.com" className="text-sm text-gray-400 hover:text-[#FFB90F] transition-colors">
                Contact Us
              </a>
              <Link href="/" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
                Back to Coming Soon
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
