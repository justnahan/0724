'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { CartItem } from '@/lib/types'
import { formatPrice, calculateCartTotal, cn } from '@/lib/utils'

interface ShoppingCartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
}

export function ShoppingCart({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem 
}: ShoppingCartProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const total = calculateCartTotal(items)

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsCheckingOut(false)
    // In a real app, redirect to checkout or payment processing
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-black/95 border-white/10 text-white">
        <SheetHeader className="border-b border-white/10 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white font-light tracking-wide text-lg">
              Quantum Cart
            </SheetTitle>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <ShoppingBag className="w-4 h-4" />
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </div>
          </div>
          
          {/* Scanning line */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-pulse" />
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-20 h-20 border-2 border-white/10 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-white/20" />
                </div>
                <h3 className="text-white/60 font-light tracking-wide mb-2">
                  Your cart is empty
                </h3>
                <p className="text-white/40 text-sm font-light">
                  Add some futuristic items to get started
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.id} 
                  className="group relative border border-white/10 rounded-lg p-4 hover:border-cyan-500/30 transition-all duration-200"
                >
                  {/* Item background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg" />
                  
                  <div className="relative flex gap-4">
                    {/* Product Image */}
                    <div className="w-16 h-16 relative overflow-hidden rounded bg-gradient-to-br from-gray-900 to-black">
                      <Image
                        src={item.product.image_url}
                        alt={item.product.name}
                        fill
                        className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-200"
                        sizes="64px"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-2">
                      <h4 className="text-white font-light text-sm tracking-wide leading-tight">
                        {item.product.name}
                      </h4>
                      <p className="text-white/80 font-mono text-sm">
                        {formatPrice(item.product.price_in_cents)}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-white/20 rounded">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/5"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="px-3 py-1 text-sm font-mono text-white">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/5"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(item.id)}
                          className="h-8 w-8 p-0 text-red-400/60 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-white font-mono text-sm">
                        {formatPrice(item.product.price_in_cents * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="border-t border-white/10 pt-4 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center py-2">
                <span className="text-white/80 font-light tracking-wide">
                  Total
                </span>
                <span className="text-2xl font-light text-white font-mono tracking-wide">
                  {formatPrice(total)}
                </span>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={cn(
                  "w-full bg-gradient-to-r from-cyan-500 to-green-500 text-black font-medium tracking-wide transition-all duration-200",
                  isCheckingOut ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]"
                )}
              >
                {isCheckingOut ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <>
                    Quantum Checkout
                    <div className="ml-2 w-1 h-1 bg-black rounded-full animate-pulse" />
                  </>
                )}
              </Button>

              {/* Security Notice */}
              <p className="text-xs text-white/40 text-center font-light">
                Secured by quantum encryption
              </p>
            </div>
          )}
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Vertical scanning lines */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-pulse" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-500/20 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </SheetContent>
    </Sheet>
  )
}