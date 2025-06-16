import { scrollToSection } from "@/lib/utils";

export default function Footer() {
  const navigationLinks = [
    { href: "vessel", label: "The Vessel" },
    { href: "events", label: "Next Event" },
    { href: "tiers", label: "Access Tiers" },
    { href: "reserve", label: "Reserve Access" },
  ];

  const connectLinks = [
    { href: "about", label: "About Us" },
    { href: "contact", label: "Contact" },
    { href: "team", label: "Join the Team" },
    { href: "community", label: "Community" },
  ];

  return (
    <footer className="bg-deep-charcoal border-t border-neo-gold/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 border-2 border-neo-gold rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-neo-gold rounded-full"></div>
              </div>
              <span className="text-xl font-serif font-semibold">Elusive Origin</span>
            </div>
            <p className="text-gray-300 mb-4">
              Where social commentary mingles with suspense. Cultural investigation meets collaborative storytelling.
            </p>
            <div className="text-sm text-gray-400">
              © 2025 Elusive Origin. All mysteries reserved.
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Investigation</h4>
            <ul className="space-y-2 text-gray-300">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="hover:text-neo-gold transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-300">
              {connectLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-neo-gold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
