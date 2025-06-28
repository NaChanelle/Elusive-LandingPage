import { Eye, Users, Zap } from "lucide-react";
import SwipeableCards from "./swipeable-cards";

export default function VesselPreview() {
  const vesselFeatures = [
    {
      title: "Theory Boards",
      description: "Decode cultural patterns. Connect narrative threads. Uncover hidden truths through collaborative investigation.",
      features: [
        "Visual clue mapping",
        "Community collaboration", 
        "Real-time theory sharing",
        "Expert commentary"
      ]
    },
    {
      title: "Cultural Code Library",
      description: "Archive of references. Bridge between generations. Repository of meaning and cultural significance.",
      features: [
        "Cultural pattern analysis",
        "Historical connections",
        "Expert interpretations", 
        "Multimedia resources"
      ]
    },
    {
      title: "Story Studios",
      description: "Create. Collaborate. Transform strangers into accomplices in truth through shared narrative experience.",
      features: [
        "Collaborative storytelling",
        "Creator partnerships",
        "Original content development",
        "Community feedback loops"
      ]
    }
  ];

  return (
    <section id="vessel" className="py-20 bg-black-mirror">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">The Vessel</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            An immersive web application where cultural investigation meets collaborative storytelling
          </p>
        </div>
        
        <div className="mb-16">
          <SwipeableCards cards={vesselFeatures} />
        </div>
        
        {/* Coming Soon Preview */}
        <div className="bg-gradient-to-r from-social-red/20 to-neo-gold/20 border border-social-red/50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-serif font-semibold mb-4">PREVIEW: THE INVESTIGATION CONTINUES</h3>
          <p className="text-lg text-gray-300 mb-6 max-w-4xl mx-auto">
            "We don't just tell stories. We activate portals. Some will spark your memory. Others will awaken your mission. 
            All of them will leave you changed. The Cultural Codes Chronicles await your theories..."
          </p>
          <a 
            href="/vessel" 
            className="inline-block bg-neo-gold text-deep-charcoal px-6 py-2 rounded-full font-semibold hover:bg-neo-gold/90 transition-all transform hover:scale-105"
          >
            VESSEL LAUNCHING SOON
          </a>
        </div>
      </div>
    </section>
  );
}
