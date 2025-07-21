import { useContent } from "@/hooks/useContent";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, BookOpen } from "lucide-react";

export default function DynamicComingSoon() {
  const { data: content, isLoading, error } = useContent("home");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-deep-charcoal flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-neo-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-deep-charcoal flex items-center justify-center">
        <div className="text-center">
          <p className="text-social-red mb-4">Failed to load content</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  const { hero, event, value_proposition, faq } = content || {};

  return (
    <div className="min-h-screen bg-deep-charcoal text-gray-100">
      {/* Header */}
      <div className="border-b border-neo-gold/20 bg-black-mirror">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-2 border-neo-gold rotate-45 flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 bg-neo-gold rounded-full"></div>
              </div>
              <span className="text-2xl font-serif font-bold">Elusive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-deep-charcoal via-black-mirror to-deep-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-neo-gold rotate-45 animate-pulse"></div>
          <div className="absolute bottom-40 right-40 w-24 h-24 border border-social-red rotate-12 animate-pulse"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-neo-gold to-white bg-clip-text text-transparent">
            {hero?.title || "The Investigation Begins"}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {hero?.subtitle || "Enter a sacred container for culture, craft, and community"}
          </p>
          
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            {hero?.description || "Join the mystery that shapes the story. Reserve your place in the August 2025 event where theories become truth."}
          </p>

          {/* Event Info */}
          <div className="bg-black-mirror/50 border border-neo-gold/30 rounded-2xl p-8 mb-12 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-neo-gold mr-2" />
              <h2 className="text-2xl font-semibold text-neo-gold">
                {event?.title || "Next Event: August 2025"}
              </h2>
            </div>
            <p className="text-gray-300 mb-6">
              {event?.description || "An immersive cultural investigation experience"}
            </p>
            <p className="text-sm text-gray-400">
              {event?.location || "Details revealed to reserved investigators"}
            </p>
          </div>

          {/* CTA Button */}
          <Button 
            size="lg"
            className="bg-neo-gold text-deep-charcoal hover:bg-neo-gold/90 text-lg px-8 py-4 rounded-full"
            onClick={() => document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {hero?.ctaText || "Reserve Your Investigation"}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-black-mirror">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              {value_proposition?.tagline || "Join the mystery. Shape the story. Become an accomplice in truth."}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {(value_proposition?.points || []).map((point: string, index: number) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-neo-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {index === 0 && <Users className="w-6 h-6 text-neo-gold" />}
                    {index === 1 && <Calendar className="w-6 h-6 text-neo-gold" />}
                    {index === 2 && <BookOpen className="w-6 h-6 text-neo-gold" />}
                  </div>
                  <p className="text-gray-300">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      <section id="reserve" className="py-20 bg-deep-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Reserve Your Investigation</h2>
            <p className="text-xl text-gray-300">
              Secure your place in the August 2025 event
            </p>
          </div>
          
          <div className="bg-black-mirror border border-neo-gold/30 rounded-2xl p-8 md:p-12">
            {content?.forms?.mailerlite_form_id ? (
              <div className="ml-embedded" data-form={content.forms.mailerlite_form_id}></div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">Form configuration needed</p>
                <p className="text-sm text-gray-500">Add your MailerLite form ID to content/home.json</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-black-mirror">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {(faq || []).map((item: any, index: number) => (
              <div key={index} className="bg-deep-charcoal/50 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-neo-gold mb-2">{item.question}</h3>
                <p className="text-gray-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 bg-deep-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Elusive Origin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}