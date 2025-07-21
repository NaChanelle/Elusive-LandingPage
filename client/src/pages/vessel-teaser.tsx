import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Ship, Compass, Lock, Eye, ChevronLeft, Calendar, Users, MapPin } from "lucide-react";

export default function VesselTeaser() {
  const [scrolled, setScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown to vessel reveal
  useEffect(() => {
    const targetDate = new Date("2025-08-01T00:00:00Z");
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-deep-charcoal text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-deep-charcoal/95 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-neo-gold text-2xl font-bold tracking-wider">
              ELUSIVE ORIGIN
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-white hover:text-neo-gold">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-charcoal via-black-mirror to-medium-charcoal opacity-90" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-neo-gold/20 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-neo-gold/10 rounded-full animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <Ship className="h-24 w-24 text-neo-gold mx-auto mb-6 animate-pulse" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-neo-gold via-white to-neo-gold bg-clip-text text-transparent">
            THE VESSEL
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Where mysteries unfold and truths surface.
            <br />
            Your journey into the unknown begins here.
          </p>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto mb-12">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-medium-charcoal border border-neo-gold/30 rounded-lg p-4 mb-2">
                  <div className="text-2xl md:text-3xl font-bold text-neo-gold">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="text-sm text-gray-400">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-lg text-gray-300">
              Access Level: <span className="text-social-red font-semibold">CLASSIFIED</span>
            </p>
            <div className="flex items-center justify-center space-x-2 text-neo-gold">
              <Lock className="h-5 w-5" />
              <span>Vessel Details Locked Until Event Launch</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mystery Sections */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Investigation Hub */}
            <div className="bg-medium-charcoal border border-neo-gold/20 rounded-lg p-8 text-center hover:border-neo-gold/40 transition-all duration-300">
              <Compass className="h-12 w-12 text-neo-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Investigation Hub</h3>
              <p className="text-gray-300 leading-relaxed">
                Navigate through layers of mystery aboard our vessel. Each deck holds secrets waiting to be uncovered.
              </p>
            </div>

            {/* Immersive Experience */}
            <div className="bg-medium-charcoal border border-neo-gold/20 rounded-lg p-8 text-center hover:border-neo-gold/40 transition-all duration-300">
              <Eye className="h-12 w-12 text-neo-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Immersive Experience</h3>
              <p className="text-gray-300 leading-relaxed">
                Step into a world where reality blends with mystery. Every corner tells a story, every clue matters.
              </p>
            </div>

            {/* Exclusive Access */}
            <div className="bg-medium-charcoal border border-neo-gold/20 rounded-lg p-8 text-center hover:border-neo-gold/40 transition-all duration-300">
              <Users className="h-12 w-12 text-neo-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Exclusive Access</h3>
              <p className="text-gray-300 leading-relaxed">
                Join a select group of investigators. Limited spaces available for this unprecedented experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20 px-6 bg-black-mirror/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-neo-gold">
            Event Details
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex items-center justify-center space-x-4">
              <Calendar className="h-8 w-8 text-neo-gold" />
              <div className="text-left">
                <p className="text-sm text-gray-400">Launch Date</p>
                <p className="text-xl font-semibold">August 2025</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <MapPin className="h-8 w-8 text-neo-gold" />
              <div className="text-left">
                <p className="text-sm text-gray-400">Location</p>
                <p className="text-xl font-semibold">To Be Revealed</p>
              </div>
            </div>
          </div>

          <Link href="/platform">
            <Button size="lg" className="bg-neo-gold hover:bg-neo-gold/90 text-black font-semibold px-8 py-4 text-lg">
              Join the Investigation
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold text-neo-gold mb-4">ELUSIVE ORIGIN</div>
          <p className="text-gray-400 mb-6">Where mysteries begin and truths emerge</p>
          <div className="flex justify-center space-x-6">
            <Link href="/" className="text-gray-400 hover:text-neo-gold transition-colors">
              Home
            </Link>
            <Link href="/platform" className="text-gray-400 hover:text-neo-gold transition-colors">
              Platform
            </Link>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-sm text-gray-500">
              © 2025 Elusive Origin. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}