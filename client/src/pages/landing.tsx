import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import VesselPreview from "@/components/vessel-preview";
import EventTeaser from "@/components/event-teaser";
import UserJourney from "@/components/user-journey";
import AccessTiers from "@/components/access-tiers";
import NameReservation from "@/components/name-reservation";
import Footer from "@/components/footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-deep-charcoal text-gray-100">
      <Navigation />
      <HeroSection />
      <VesselPreview />
      <EventTeaser />
      <UserJourney />
      <AccessTiers />
      <NameReservation />
      <Footer />
    </div>
  );
}
