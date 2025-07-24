'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ProductCardProps } from '@/lib/types'
import { formatPrice, cn } from '@/lib/utils'

export function ProductCard({ product, onAddToCart, onProductClick }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden bg-black border-white/10 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer",
        "transform-gpu will-change-transform",
        isHovered && "scale-[1.02] -rotate-1"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {/* Geometric border overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={cn(
          "absolute inset-0 border-2 border-transparent transition-all duration-300",
          isHovered && "border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
        )} />
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-green-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-green-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Scanning line effect */}
      <div className={cn(
        "absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform translate-y-0 opacity-0 transition-all duration-500",
        isHovered && "translate-y-full opacity-100"
      )} />

      {/* Product Image Container */}
      <div 
        className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-900 to-black"
        onClick={() => onProductClick(product)}
      >
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-all duration-500 filter grayscale contrast-125",
            isHovered && "scale-110 grayscale-0 contrast-100",
            isPressed && "scale-105"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Image overlay with geometric pattern */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Holographic effect */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-green-500/10 opacity-0 transition-opacity duration-300",
          isHovered && "opacity-100"
        )} />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-light text-white text-sm tracking-wide leading-tight group-hover:text-cyan-100 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-2xl font-extralight text-white tracking-wider font-mono">
            {formatPrice(product.price_in_cents)}
          </p>
        </div>

        {/* Action Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation()
            onAddToCart(product)
          }}
          className={cn(
            "w-full bg-transparent border border-white/20 text-white/80 hover:text-black hover:bg-cyan-500 transition-all duration-200 font-light tracking-wide text-xs",
            isPressed && "scale-95"
          )}
          variant="outline"
        >
          ADD TO CART
          {/* Button pulse effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-200" />
        </Button>
      </div>

      {/* Electronic pulse animation */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping opacity-40" />
        </div>
      )}

      {/* Geometric network lines */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#00ff00" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="url(#lineGradient)" strokeWidth="1" />
        </svg>
      </div>
    </Card>
  )
}