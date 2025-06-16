import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCarouselProps {
  testimonials: {
    name: string;
    role: string;
    content: string;
    image?: string;
    eventImage?: string;
    location?: string;
  }[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Main Testimonial Display */}
      <div className="bg-medium-charcoal border border-neo-gold/30 rounded-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Event Image */}
          <div className="relative h-80 lg:h-auto">
            {currentTestimonial.eventImage ? (
              <img 
                src={currentTestimonial.eventImage} 
                alt={`${currentTestimonial.name} event`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-neo-gold/10 to-social-red/10 flex items-center justify-center">
                <div className="text-center text-neo-gold">
                  <div className="w-16 h-16 border-2 border-neo-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <p className="text-gray-400 font-medium">Event Recap Coming Soon</p>
                </div>
              </div>
            )}
            {currentTestimonial.location && (
              <div className="absolute bottom-4 left-4 bg-deep-charcoal/80 backdrop-blur-sm px-3 py-2 rounded-lg">
                <span className="text-neo-gold font-medium text-sm">{currentTestimonial.location}</span>
              </div>
            )}
          </div>
          
          {/* Testimonial Content */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <blockquote className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-8 italic">
              "{currentTestimonial.content}"
            </blockquote>
            
            <div className="flex items-center space-x-4">
              {currentTestimonial.image ? (
                <img 
                  src={currentTestimonial.image} 
                  alt={currentTestimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-neo-gold object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full border-2 border-neo-gold bg-medium-charcoal flex items-center justify-center">
                  <span className="text-neo-gold font-bold text-lg">
                    {currentTestimonial.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <p className="font-semibold text-white">{currentTestimonial.name}</p>
                <p className="text-sm text-neo-gold">{currentTestimonial.role}</p>
              </div>
            </div>
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
          {testimonials.map((_, index) => (
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
    </div>
  );
}