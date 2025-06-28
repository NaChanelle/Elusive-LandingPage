import { useState, useEffect } from "react";
import { Menu, X, User, LogIn } from "lucide-react";
import { Link } from "wouter";
import { scrollToSection } from "@/lib/utils";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "vessel", label: "Vessel" },
    { href: "events", label: "Events" },
    { href: "journey", label: "Your Journey" },
    { href: "tiers", label: "Access Tiers" },
    { href: "reserve", label: "Reserve" },
  ];

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-deep-charcoal/95 backdrop-blur-sm border-b border-neo-gold/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 border-2 border-neo-gold rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-neo-gold rounded-full"></div>
              </div>
              <span className="text-xl font-serif font-semibold">Investigation Portal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-300 hover:text-neo-gold transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4 ml-6 border-l border-gray-700 pl-6">
              <Link href="/signin">
                <button className="flex items-center text-gray-300 hover:text-neo-gold px-3 py-2 text-sm font-medium transition-colors">
                  <LogIn size={16} className="mr-2" />
                  Sign In
                </button>
              </Link>
              <Link href="/signup">
                <button className="bg-gradient-to-r from-neo-gold to-social-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-neo-gold/90 hover:to-social-red/90 transition-all">
                  <User size={16} className="mr-2 inline" />
                  Join Investigation
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-neo-gold"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-neo-gold/20 bg-deep-charcoal/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-neo-gold transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Auth Links */}
              <div className="border-t border-gray-700 pt-3 mt-3">
                <Link href="/signin">
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center text-gray-300 hover:text-neo-gold block px-3 py-2 text-base font-medium w-full text-left transition-colors"
                  >
                    <LogIn size={16} className="mr-2" />
                    Sign In
                  </button>
                </Link>
                <Link href="/signup">
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-gradient-to-r from-neo-gold to-social-red text-white px-4 py-2 rounded-lg text-sm font-medium w-full mt-2 transition-all"
                  >
                    <User size={16} className="mr-2 inline" />
                    Join Investigation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
