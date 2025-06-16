import { Compass } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

export default function EventTeaser() {
  return (
    <section id="events" className="py-20 bg-deep-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-neo-gold text-sm font-mono tracking-widest mb-4">
              AUGUST 2025 EVENT
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Next Event</h2>
            <p className="text-xl text-neo-gold mb-6">
              The investigation continues... Where will the next portal open?
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Join the mystery. Shape the story. Become an accomplice in truth. 
              An immersive cultural investigation experience that transforms strangers into collaborators.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('reserve')}
                className="bg-social-red text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-social-red/90 transition-all"
              >
                Reserve Your Spot
              </button>
              <button 
                onClick={() => scrollToSection('tiers')}
                className="border-2 border-neo-gold text-neo-gold px-8 py-4 rounded-lg font-semibold text-lg hover:bg-neo-gold hover:text-deep-charcoal transition-all"
              >
                Learn More
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-neo-gold/20 via-social-red/20 to-black-mirror rounded-2xl border-2 border-neo-gold/30 p-8 flex flex-col items-center justify-center text-center animate-float">
              <div className="w-24 h-24 border-4 border-neo-gold rounded-full mb-6 flex items-center justify-center animate-pulse-glow">
                <Compass className="text-neo-gold text-3xl" size={40} />
              </div>
              <h3 className="text-2xl font-serif font-semibold mb-4">Investigation Portal</h3>
              <p className="text-gray-300">
                Cultural curators become co-creators in this immersive storytelling experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
