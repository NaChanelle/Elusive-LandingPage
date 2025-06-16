import { ChevronDown } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-charcoal via-black-mirror to-deep-charcoal opacity-90"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="inline-block text-neo-gold text-sm font-mono tracking-widest mb-4 animate-pulse">
            SACRED CONTAINER PROTOCOL INITIALIZING...
          </div>
          <div className="w-16 h-16 border-4 border-neo-gold rotate-45 mx-auto mb-8 relative animate-pulse-glow">
            <div className="absolute inset-2 bg-neo-gold/20 rotate-45"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-neo-gold rounded-full"></div>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 bg-gradient-to-r from-white via-neo-gold to-white bg-clip-text text-transparent">
          Elusive Origin
        </h1>
        
        <p className="text-xl md:text-2xl text-neo-gold font-medium mb-4">
          A sacred container for culture, craft, and community
        </p>
        
        <div className="w-24 h-1 bg-social-red mx-auto mb-8"></div>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
          Where cultural curators become co-creators... Where theories transform into collective truth... 
          Where every story you encounter carries a key.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => scrollToSection('vessel')}
            className="bg-neo-gold text-deep-charcoal px-8 py-4 rounded-lg font-semibold text-lg hover:bg-neo-gold/90 transition-all transform hover:scale-105"
          >
            Enter Investigation
          </button>
          <button 
            onClick={() => scrollToSection('reserve')}
            className="border-2 border-social-red text-social-red px-8 py-4 rounded-lg font-semibold text-lg hover:bg-social-red hover:text-white transition-all"
          >
            Reserve Your Name
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-neo-gold text-2xl" size={32} />
      </div>
    </section>
  );
}
