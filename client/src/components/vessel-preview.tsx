import { Eye, Users, Zap } from "lucide-react";

export default function VesselPreview() {
  const features = [
    {
      icon: Eye,
      title: "Theory Boards",
      description: "Decode cultural patterns. Connect narrative threads. Uncover hidden truths through collaborative investigation."
    },
    {
      icon: Users,
      title: "Cultural Code Library",
      description: "Archive of references. Bridge between generations. Repository of meaning and cultural significance."
    },
    {
      icon: Zap,
      title: "Story Studios",
      description: "Create. Collaborate. Transform strangers into accomplices in truth through shared narrative experience."
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
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-medium-charcoal border border-neo-gold/30 rounded-xl p-8 hover:border-neo-gold/60 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-neo-gold text-4xl mb-6">
                  <Icon size={48} />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
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
