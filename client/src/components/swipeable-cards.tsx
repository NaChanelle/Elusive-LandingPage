import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SwipeableCardsProps {
  cards: {
    title: string;
    description: string;
    features: string[];
    image?: string;
  }[];
}

export default function SwipeableCards({ cards }: SwipeableCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // If dragged more than 50px, change card
    if (Math.abs(translateX) > 50) {
      if (translateX > 0) {
        prevCard();
      } else {
        nextCard();
      }
    }
    
    setTranslateX(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (Math.abs(translateX) > 50) {
      if (translateX > 0) {
        prevCard();
      } else {
        nextCard();
      }
    }
    
    setTranslateX(0);
  };

  // Desktop click handlers
  const handleCardClick = (index: number) => {
    if (!isDragging) {
      setCurrentIndex(index);
    }
  };

  return (
    <div className="relative">
      {/* Mobile: Single card with swipe */}
      <div className="block md:hidden">
        <div
          ref={containerRef}
          className="relative overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${isDragging ? translateX : 0}px))`,
            }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 px-4"
              >
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-gray-300 mb-4">{card.description}</p>
                  <ul className="space-y-2">
                    {card.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-gray-400 text-sm">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile navigation dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                currentIndex === index
                  ? "bg-[#FFB90F] w-6"
                  : "bg-gray-600"
              )}
            />
          ))}
        </div>

        {/* Mobile arrow controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={prevCard}
            className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-gray-400 text-sm">
            {currentIndex + 1} of {cards.length}
          </span>
          <button
            onClick={nextCard}
            className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Desktop: All cards visible with click interaction */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className={cn(
              "bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 border cursor-pointer transition-all duration-300",
              currentIndex === index
                ? "border-[#FFB90F] scale-105 shadow-xl shadow-[#FFB90F]/20"
                : "border-gray-700 hover:border-gray-600 hover:scale-102"
            )}
          >
            <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
            <p className="text-gray-300 mb-4">{card.description}</p>
            <ul className="space-y-2">
              {card.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="text-gray-400 text-sm">
                  • {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}