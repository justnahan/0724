'use client'

import { ProductCard } from './ProductCard'
import { Skeleton } from '@/components/ui/skeleton'
import { ProductGridProps, Product } from '@/lib/types'
import { cn } from '@/lib/utils'

const gridSizes = [
  'md:col-span-1 md:row-span-1', // 1x1
  'md:col-span-2 md:row-span-1', // 2x1
  'md:col-span-1 md:row-span-2', // 1x2
  'md:col-span-2 md:row-span-2', // 2x2 (featured)
]

export function ProductGrid({ 
  products, 
  loading = false,
  onAddToCart,
  onProductClick 
}: ProductGridProps & {
  onAddToCart: (product: Product) => void
  onProductClick: (product: Product) => void
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className={cn(
            "relative",
            gridSizes[index % gridSizes.length]
          )}>
            <Skeleton className="w-full aspect-square bg-white/5 border border-white/10" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-3/4 bg-white/5" />
              <Skeleton className="h-6 w-1/2 bg-white/5" />
              <Skeleton className="h-8 w-full bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="relative mb-6">
          {/* Geometric empty state icon */}
          <div className="w-24 h-24 border-2 border-white/20 rotate-45 flex items-center justify-center">
            <div className="w-12 h-12 border border-white/10 rotate-45"></div>
          </div>
          {/* Scanning lines */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-pulse"></div>
        </div>
        <h3 className="text-white/80 font-light text-lg tracking-wide mb-2">
          No products found
        </h3>
        <p className="text-white/40 font-light text-sm tracking-wide">
          Try adjusting your search or filters
        </p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Background geometric patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Connection lines between products */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#00ff00" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Dynamic connection lines */}
          {products.map((_, index) => {
            if (index === products.length - 1) return null
            const x1 = (index % 4) * 25 + 12.5
            const y1 = Math.floor(index / 4) * 25 + 12.5
            const x2 = ((index + 1) % 4) * 25 + 12.5
            const y2 = Math.floor((index + 1) / 4) * 25 + 12.5
            
            return (
              <line
                key={`connection-${index}`}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="url(#connectionGradient)"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="animate-pulse"
              />
            )
          })}
        </svg>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
        {products.map((product, index) => {
          // Determine card size based on position and product importance
          const isFeatured = index === 0 || (index + 1) % 7 === 0
          const isWide = (index + 1) % 5 === 0
          const isTall = (index + 1) % 6 === 0
          
          let sizeClass = 'col-span-1'
          
          // Only apply special sizes on larger screens
          if (isFeatured) {
            sizeClass = 'lg:col-span-2 lg:row-span-2' // Featured: 2x2
          } else if (isWide) {
            sizeClass = 'lg:col-span-2' // Wide: 2x1
          } else if (isTall) {
            sizeClass = 'lg:row-span-2' // Tall: 1x2
          }

          return (
            <div 
              key={product.id} 
              className={cn(
                sizeClass,
                "group relative"
              )}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onProductClick={onProductClick}
              />
              
              {/* Individual product connection nodes */}
              <div className="absolute top-2 right-2 w-2 h-2 border border-cyan-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping"></div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Grid enhancement lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {/* Horizontal lines */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={`h-line-${index}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{ top: `${(index + 1) * 20}%` }}
          />
        ))}
        {/* Vertical lines */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`v-line-${index}`}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
            style={{ left: `${(index + 1) * 25}%` }}
          />
        ))}
      </div>
    </div>
  )
}