import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { ChevronRight, Mail, Calendar, Users, Sparkles, Clock } from "lucide-react";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { toast } = useToast();

  // Countdown to August 2025 event
  useEffect(() => {
    const targetDate = new Date("2025-08-01T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const signupMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName: "Early Access",
          lastName: "Subscriber",
          investigationInterests: ["coming-soon"],
          preferredRole: "Detective",
          interests: "Early access signup from coming soon page"
        }),
      });
      
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "You're on the list!",
        description: "Check out our preview platform while you wait!",
        action: (
          <Link href="/platform" className="bg-[#FFB90F] text-black px-3 py-1 rounded text-sm font-semibold">
            Explore Now
          </Link>
        ),
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Already registered",
        description: "This email is already on our early access list.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      signupMutation.mutate(email);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] text-white overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#FFB90F] rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-black rounded-sm animate-pulse"></div>
            </div>
            <span className="text-xl font-bold tracking-wider">ELUSIVE</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/platform" className="text-gray-300 hover:text-[#FFB90F] transition-colors">
              Platform
            </Link>
            <Link href="/vessel" className="text-gray-300 hover:text-[#FFB90F] transition-colors">
              Vessel App
            </Link>
            <Link href="/signin" className="bg-[#FFB90F] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#FFB90F]/90 transition-colors">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative flex items-center justify-center min-h-screen px-6">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-[#FFB90F] rotate-45"></div>
          <div className="absolute bottom-40 right-32 w-24 h-24 border border-[#8B0000] rotate-12"></div>
          <div className="absolute top-1/3 right-20 w-16 h-16 bg-[#FFB90F] opacity-20 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          {/* Pulsing Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-[#FFB90F] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#FFB90F]/30 animate-pulse">
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-[#FFB90F]" />
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Unlock Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB90F] to-[#FFA500]">
                Cultural Detective
              </span>{" "}
              Potential
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join us at the most immersive cultural investigation experience ever created. 
              Discover mysteries, connect with creators, and become part of an exclusive community.
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <Calendar className="w-8 h-8 text-[#FFB90F] mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Exclusive Events</h3>
              <p className="text-sm text-gray-400">Be first to access immersive cultural investigations</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <Users className="w-8 h-8 text-[#FFB90F] mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Creator Community</h3>
              <p className="text-sm text-gray-400">Connect with storytellers and cultural curators</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <Sparkles className="w-8 h-8 text-[#FFB90F] mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Vessel App</h3>
              <p className="text-sm text-gray-400">Your companion for cultural exploration and mysteries</p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-[#FFB90F] mr-2" />
              <h3 className="text-xl font-semibold">First Event Launches In</h3>
            </div>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold text-[#FFB90F]">{timeLeft.days}</div>
                <div className="text-sm text-gray-400">Days</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold text-[#FFB90F]">{timeLeft.hours}</div>
                <div className="text-sm text-gray-400">Hours</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold text-[#FFB90F]">{timeLeft.minutes}</div>
                <div className="text-sm text-gray-400">Minutes</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold text-[#FFB90F]">{timeLeft.seconds}</div>
                <div className="text-sm text-gray-400">Seconds</div>
              </div>
            </div>
          </div>

          {/* Email Signup */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-lg mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-[#FFB90F] mr-2" />
              <h3 className="text-xl font-semibold">Get Early Access</h3>
            </div>
            <p className="text-gray-300 mb-6 text-sm">
              Be the first to know when we launch. Exclusive updates and early bird access.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl h-12 pr-32"
                  required
                />
                <Button
                  type="submit"
                  disabled={signupMutation.isPending}
                  className="absolute right-1 top-1 h-10 bg-[#FFB90F] hover:bg-[#FFB90F]/90 text-black font-semibold rounded-lg px-6 transition-all duration-200"
                >
                  {signupMutation.isPending ? "Joining..." : "Join Now"}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </form>
            
            <p className="text-xs text-gray-400 mt-3">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>

          {/* Additional CTA Section */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-lg text-gray-300 mb-6">
              Ready to dive deeper into the mystery?
            </p>
            <Link href="/platform">
              <Button className="bg-transparent border-2 border-[#FFB90F] text-[#FFB90F] hover:bg-[#FFB90F] hover:text-black px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300">
                Explore Preview Platform
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 pt-8">
            <a href="https://instagram.com/elusiveorigin" className="text-gray-400 hover:text-[#FFB90F] transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://twitter.com/elusiveorigin" className="text-gray-400 hover:text-[#FFB90F] transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/company/elusiveorigin" className="text-gray-400 hover:text-[#FFB90F] transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-400">
          <p>&copy; 2025 Elusive Origin. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-[#FFB90F] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#FFB90F] transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}