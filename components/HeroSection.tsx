'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowDown, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Dynamic Geometric Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated geometric shapes */}
        <div className="absolute inset-0">
          {/* Main geometric grid */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
                <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#00ff00" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Floating geometric elements */}
          {Array.from({ length: 12 }).map((_, index) => {
            const delay = index * 0.5
            const duration = 20 + (index % 5) * 5
            
            return (
              <div
                key={`geo-${index}`}
                className="absolute opacity-20"
                style={{
                  left: `${10 + (index * 7) % 80}%`,
                  top: `${15 + (index * 11) % 70}%`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                }}
              >
                {index % 3 === 0 ? (
                  // Hexagon
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-green-500/20 animate-spin-slow">
                    <svg viewBox="0 0 24 24" className="w-full h-full">
                      <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="currentColor" stroke="white" strokeWidth="0.5" />
                    </svg>
                  </div>
                ) : index % 3 === 1 ? (
                  // Triangle
                  <div className="w-6 h-6 bg-gradient-to-br from-green-500/20 to-cyan-500/20 animate-pulse">
                    <svg viewBox="0 0 24 24" className="w-full h-full">
                      <polygon points="12,2 22,20 2,20" fill="currentColor" stroke="white" strokeWidth="0.5" />
                    </svg>
                  </div>
                ) : (
                  // Diamond
                  <div className="w-4 h-4 bg-gradient-to-br from-cyan-500/20 to-green-500/20 rotate-45 animate-bounce-slow" />
                )}
              </div>
            )
          })}

          {/* Interactive cursor light */}
          <div 
            className="absolute w-96 h-96 bg-gradient-radial from-cyan-500/5 via-green-500/5 to-transparent rounded-full transition-all duration-300 ease-out pointer-events-none"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>

        {/* Scanning lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-green-500/50 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>

      {/* Main Content */}
      <div className={cn(
        "relative z-10 text-center max-w-4xl mx-auto px-4 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        {/* Main Heading */}
        <div className="space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-sm text-white/60 font-light tracking-wide mb-6">
            <Sparkles className="w-4 h-4" />
            Welcome to 2050
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight text-white leading-tight tracking-wide">
            <span className="block">Future</span>
            <span className="bg-gradient-to-r from-cyan-500 via-white to-green-500 bg-clip-text text-transparent">
              Design
            </span>
            <span className="block">Collection</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Discover exclusive design pieces from tomorrow. 
            <br className="hidden md:block" />
            Each item represents the perfect fusion of innovation and aesthetics.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            onClick={scrollToProducts}
            className="group bg-gradient-to-r from-cyan-500 to-green-500 text-black font-medium tracking-wide px-8 py-3 hover:scale-105 transition-all duration-200"
          >
            Explore Collection
            <ArrowDown className="ml-2 w-4 h-4 group-hover:animate-bounce" />
          </Button>
          
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5 hover:border-white/40 font-light tracking-wide px-8 py-3"
          >
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
          {[
            { number: '2050', label: 'Era' },
            { number: '∞', label: 'Possibilities' },
            { number: '1', label: 'Future' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-light text-white font-mono tracking-wider">
                {stat.number}
              </div>
              <div className="text-sm text-white/40 font-light tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/40">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <div className="text-xs font-light tracking-widest uppercase">Scroll</div>
          <ArrowDown className="w-4 h-4" />
        </div>
      </div>
    </section>
  )
}