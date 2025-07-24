'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, Plus, Minus, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Product } from '@/lib/types'
import { formatPrice, cn } from '@/lib/utils'

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product, quantity: number) => void
}

export function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  if (!product) return null

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    await new Promise(resolve => setTimeout(resolve, 600)) // Animation delay
    onAddToCart(product, quantity)
    setIsAddingToCart(false)
    setQuantity(1)
    onClose()
  }

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full h-[90vh] bg-black/95 border-white/10 text-white p-0 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Geometric patterns */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="modalGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#ffffff" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#modalGrid)" />
            </svg>
          </div>
          
          {/* Scanning lines */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-white/60 hover:text-white hover:bg-white/10 rounded-full w-10 h-10 p-0"
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 h-full relative z-10">
          {/* Product Image */}
          <div className="relative bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-8">
            <div className="relative w-full max-w-lg aspect-square">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover rounded-lg filter grayscale contrast-125 hover:grayscale-0 hover:contrast-100 transition-all duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Image overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-lg" />
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-500/40" />
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-green-500/40" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-green-500/40" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-500/40" />
            </div>

            {/* 3D preview placeholder */}
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/5 border border-white/20 rounded text-xs text-white/60 font-light">
              360° View Available
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col p-8 lg:p-12 space-y-8">
            {/* Product Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl lg:text-4xl font-extralight text-white leading-tight tracking-wide">
                  {product.name}
                </h1>
                <p className="text-4xl lg:text-5xl font-extralight text-white tracking-wider font-mono">
                  {formatPrice(product.price_in_cents)}
                </p>
              </div>

              {/* Product description placeholder */}
              <div className="space-y-3">
                <p className="text-white/70 font-light leading-relaxed">
                  Experience the future of design with this exceptional piece. 
                  Crafted with precision and attention to detail, this item represents 
                  the perfect fusion of form and function.
                </p>
                <p className="text-white/60 font-light text-sm leading-relaxed">
                  Each item is manufactured using quantum-grade materials and 
                  advanced fabrication techniques, ensuring durability and elegance 
                  that transcends time.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h3 className="text-white/80 font-light tracking-wide">Features:</h3>
                <ul className="space-y-1 text-white/60 text-sm font-light">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-cyan-500 rounded-full" />
                    Quantum-engineered materials
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-green-500 rounded-full" />
                    Zero-waste manufacturing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-cyan-500 rounded-full" />
                    Lifetime warranty included
                  </li>
                </ul>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="text-white/80 font-light text-sm tracking-wide">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-white/20 rounded">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="h-10 w-10 p-0 text-white/60 hover:text-white hover:bg-white/5"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 text-white font-mono min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="h-10 w-10 p-0 text-white/60 hover:text-white hover:bg-white/5"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-white/60 font-mono text-sm">
                    Total: {formatPrice(product.price_in_cents * quantity)}
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={cn(
                  "w-full bg-gradient-to-r from-cyan-500 to-green-500 text-black font-medium tracking-wide py-4 text-lg transition-all duration-200",
                  isAddingToCart ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]"
                )}
              >
                {isAddingToCart ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Adding to Cart...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-5 h-5" />
                    Add to Quantum Cart
                  </div>
                )}
              </Button>

              {/* Additional Actions */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1 border-white/20 text-white/80 hover:bg-white/5 hover:border-white/40 font-light tracking-wide"
                >
                  AR Preview
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-white/20 text-white/80 hover:bg-white/5 hover:border-white/40 font-light tracking-wide"
                >
                  Share Design
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="text-xs text-white/40 font-light space-y-1">
                <p>✓ Free quantum shipping on orders over $500</p>
                <p>✓ 30-day return policy</p>
                <p>✓ Authenticated by blockchain certificate</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}