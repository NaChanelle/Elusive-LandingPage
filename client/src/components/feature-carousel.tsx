import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCarouselProps {
  features: {
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    details: string[];
    mockupImage?: string;
  }[];
}

export default function FeatureCarousel({ features }: FeatureCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentFeature = features[currentIndex];
  const Icon = currentFeature.icon;

  return (
    <div className="relative">
      {/* Main Feature Display */}
      <div className="bg-medium-charcoal border border-neo-gold/30 rounded-2xl p-8 md:p-12 min-h-[500px]">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Feature Content */}
          <div>
            <div className="text-neo-gold text-5xl mb-6">
              <Icon size={64} />
            </div>
            <h3 className="text-3xl font-serif font-semibold mb-4">{currentFeature.title}</h3>
            <p className="text-gray-300 leading-relaxed mb-8 text-lg">
              {currentFeature.description}
            </p>
            <div className="space-y-3">
              {currentFeature.details.map((detail, detailIndex) => (
                <div key={detailIndex} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-neo-gold rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">{detail}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mockup/Visual */}
          <div className="relative">
            {currentFeature.mockupImage ? (
              <img 
                src={currentFeature.mockupImage} 
                alt={`${currentFeature.title} mockup`}
                className="w-full h-80 object-cover rounded-xl border border-neo-gold/20"
              />
            ) : (
              <div className="w-full h-80 bg-gradient-to-br from-neo-gold/10 to-social-red/10 border-2 border-dashed border-neo-gold/30 rounded-xl flex items-center justify-center">
                <div className="text-center text-neo-gold">
                  <div className="w-16 h-16 border-2 border-neo-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Icon size={32} />
                  </div>
                  <p className="text-gray-400 font-medium">MVP Preview Coming Soon</p>
                  <p className="text-gray-500 text-sm mt-2">Interactive {currentFeature.title} Interface</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={prevSlide}
          className="flex items-center justify-center w-12 h-12 bg-medium-charcoal border border-neo-gold/30 rounded-full text-neo-gold hover:border-neo-gold/60 transition-all"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="flex space-x-3">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                index === currentIndex 
                  ? "bg-neo-gold scale-125" 
                  : "bg-gray-600 hover:bg-gray-500"
              )}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="flex items-center justify-center w-12 h-12 bg-medium-charcoal border border-neo-gold/30 rounded-full text-neo-gold hover:border-neo-gold/60 transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Feature Count */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-400">
          {currentIndex + 1} of {features.length} Core Features
        </span>
      </div>
    </div>
  );
}