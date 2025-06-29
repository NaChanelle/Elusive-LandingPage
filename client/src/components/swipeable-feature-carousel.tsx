import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Eye, BookOpen, Database, Calendar, Users, Lightbulb } from 'lucide-react';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  visualPlaceholder: string;
  gradient: string;
}

interface SwipeableFeatureCarouselProps {
  features: FeatureCard[];
}

export default function SwipeableFeatureCarousel({ features }: SwipeableFeatureCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Handle touch/mouse events for swiping
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    const threshold = 50;
    
    if (translateX > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (translateX < -threshold && currentIndex < features.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    
    setIsDragging(false);
    setTranslateX(0);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Mouse events for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < features.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, features.length]);

  // Navigation functions
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < features.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={isDragging ? handleMouseMove : undefined}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
          }}
        >
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="w-full flex-shrink-0 px-4 md:px-8"
            >
              {/* Feature Card */}
              <div className="mx-auto max-w-sm md:max-w-md lg:max-w-lg">
                <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${feature.gradient} border border-white/10 backdrop-blur-sm`}>
                  {/* Visual Placeholder */}
                  <div className="relative h-64 md:h-80 bg-gradient-to-br from-deep-charcoal to-black-mirror flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Mockup Interface */}
                    <div className="relative z-10 w-full h-full p-6 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-neo-gold rounded-full"></div>
                          <div className="w-3 h-3 bg-social-red rounded-full"></div>
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        </div>
                        <div className="text-xs text-gray-400 font-mono">{feature.visualPlaceholder}</div>
                      </div>
                      
                      {/* Interface Elements */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-3">
                          <feature.icon className="w-5 h-5 text-neo-gold" />
                          <div className="h-2 bg-neo-gold/30 rounded flex-1"></div>
                        </div>
                        
                        {/* Dynamic content based on feature */}
                        {feature.id === 'theory-boards' && (
                          <div className="grid grid-cols-3 gap-2 mt-4">
                            <div className="h-16 bg-white/10 rounded border border-neo-gold/20 flex items-center justify-center">
                              <Eye className="w-4 h-4 text-neo-gold" />
                            </div>
                            <div className="h-16 bg-white/10 rounded border border-social-red/20 flex items-center justify-center">
                              <div className="w-6 h-6 bg-social-red/30 rounded-full"></div>
                            </div>
                            <div className="h-16 bg-white/10 rounded border border-white/20 flex items-center justify-center">
                              <div className="grid grid-cols-2 gap-1">
                                <div className="w-2 h-2 bg-white/40 rounded"></div>
                                <div className="w-2 h-2 bg-white/40 rounded"></div>
                                <div className="w-2 h-2 bg-white/40 rounded"></div>
                                <div className="w-2 h-2 bg-white/40 rounded"></div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {feature.id === 'live-events' && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-neo-gold" />
                                <div className="text-xs text-neo-gold">LIVE</div>
                              </div>
                              <div className="w-2 h-2 bg-social-red rounded-full animate-pulse"></div>
                            </div>
                            <div className="bg-white/10 rounded p-3 text-center">
                              <div className="text-xs text-gray-300">Next Event</div>
                              <div className="text-sm font-bold text-neo-gold">Aug 2025</div>
                            </div>
                          </div>
                        )}
                        
                        {feature.id === 'character-roster' && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Users className="w-4 h-4 text-neo-gold" />
                              <span className="text-xs text-gray-400">12 Active</span>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                              <div className="w-8 h-8 bg-neo-gold/20 rounded-full flex items-center justify-center">
                                <div className="w-4 h-4 bg-neo-gold rounded-full"></div>
                              </div>
                              <div className="w-8 h-8 bg-social-red/20 rounded-full flex items-center justify-center">
                                <div className="w-4 h-4 bg-social-red rounded-full"></div>
                              </div>
                              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                              </div>
                              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                              </div>
                            </div>
                            <div className="text-xs text-gray-400 text-center">Investigators • Curators • Storytellers</div>
                          </div>
                        )}
                        
                        {feature.id === 'cultural-library' && (
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <div className="h-2 bg-white/20 rounded w-full"></div>
                              <div className="h-2 bg-white/20 rounded w-2/3"></div>
                              <div className="h-2 bg-white/20 rounded w-1/2"></div>
                            </div>
                            <div className="bg-white/5 rounded p-2 text-center">
                              <Database className="w-8 h-8 mx-auto text-neo-gold mb-1" />
                              <div className="text-xs text-gray-400">Archive</div>
                            </div>
                          </div>
                        )}
                        
                        {feature.id === 'investigation-log' && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <BookOpen className="w-4 h-4 text-neo-gold" />
                              <span className="text-xs text-gray-400">Timeline</span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-neo-gold rounded-full"></div>
                                <div className="h-1 bg-neo-gold/30 rounded flex-1"></div>
                                <span className="text-xs text-gray-400">15:42</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-social-red rounded-full"></div>
                                <div className="h-1 bg-social-red/30 rounded flex-1"></div>
                                <span className="text-xs text-gray-400">14:28</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <div className="h-1 bg-blue-500/30 rounded flex-1"></div>
                                <span className="text-xs text-gray-400">13:15</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-neo-gold/20 rounded-full flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-neo-gold" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">{feature.title}</h3>
                    </div>
                    <p className="text-gray-300 text-sm md:text-base">{feature.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows (Desktop) */}
      <div className="hidden md:block">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={goToNext}
          disabled={currentIndex === features.length - 1}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-neo-gold scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Counter */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-400">
          {currentIndex + 1} of {features.length}
        </span>
      </div>
    </div>
  );
}