'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { FuturisticHeader } from '@/components/FuturisticHeader'
import { HeroSection } from '@/components/HeroSection'
import { ProductGrid } from '@/components/ProductGrid'
import { ShoppingCart } from '@/components/ShoppingCart'
import { ProductModal } from '@/components/ProductModal'
import { Product, CartItem } from '@/lib/types'
import { filterProducts } from '@/lib/utils'

export default function HomePage() {
  // State management
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // Load products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching products:', error)
        toast.error('Failed to load products. Please refresh the page.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter products based on search query
  useEffect(() => {
    const filtered = filterProducts(products, searchQuery)
    setFilteredProducts(filtered)
  }, [products, searchQuery])

  // Cart functions
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id)
      
      if (existingItem) {
        // Update existing item quantity
        const updatedItems = prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
        toast.success(`Updated ${product.name} quantity in cart`)
        return updatedItems
      } else {
        // Add new item to cart
        const newItem: CartItem = {
          id: product.id,
          quantity,
          product
        }
        toast.success(`Added ${product.name} to cart`)
        return [...prevItems, newItem]
      }
    })
  }

  const updateCartItemQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id)
      return
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.id === id)
      if (item) {
        toast.success(`Removed ${item.product.name} from cart`)
      }
      return prevItems.filter(item => item.id !== id)
    })
  }

  // Product modal functions
  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const closeProductModal = () => {
    setSelectedProduct(null)
    setIsProductModalOpen(false)
  }

  // Search function
  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }

  // Cart total calculation
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="min-h-screen bg-black text-white custom-scrollbar">
      {/* Header */}
      <FuturisticHeader
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        onSearchChange={handleSearchChange}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Products Section */}
      <section id="products-section" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-sm text-white/60 font-light tracking-wide mb-6">
              {searchQuery ? `Search results for "${searchQuery}"` : 'Featured Collection'}
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-white leading-tight tracking-wide mb-4">
              {searchQuery ? 'Search Results' : 'Quantum Designs'}
            </h2>
            
            <p className="text-lg text-white/60 font-light tracking-wide max-w-2xl mx-auto">
              {searchQuery 
                ? `Found ${filteredProducts.length} products matching your criteria`
                : 'Explore our curated selection of future-forward design pieces'
              }
            </p>
          </div>

          {/* Product Grid */}
          <ProductGrid
            products={filteredProducts}
            loading={loading}
            onAddToCart={addToCart}
            onProductClick={openProductModal}
          />

          {/* Load More Button (placeholder for pagination) */}
          {!loading && filteredProducts.length > 0 && !searchQuery && (
            <div className="text-center mt-16">
              <button className="group relative px-8 py-3 border border-white/20 text-white/80 hover:text-white hover:border-cyan-500/50 transition-all duration-200 font-light tracking-wide">
                Load More Designs
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="text-2xl font-extralight text-white tracking-[0.2em] font-mono">
                VIBE
              </div>
              <p className="text-white/60 font-light text-sm leading-relaxed">
                Transcending the boundaries of design and technology, 
                bringing you pieces from the future.
              </p>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <h3 className="text-white/80 font-light tracking-wide">Navigation</h3>
              <div className="space-y-2">
                {['Collection', 'About', 'Technology', 'Contact'].map((link) => (
                  <button
                    key={link}
                    className="block text-white/60 hover:text-white font-light text-sm transition-colors duration-200"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-white/80 font-light tracking-wide">Connect</h3>
              <div className="space-y-2 text-white/60 font-light text-sm">
                <p>quantum@vibe.future</p>
                <p>+1 (555) 2050-VIBE</p>
                <p>New Neo Tokyo, Mars Colony</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/40 font-light text-sm">
              © 2050 VIBE. All rights reserved in this dimension.
            </p>
            <div className="flex gap-6">
              {['Privacy', 'Terms', 'Quantum Policy'].map((link) => (
                <button
                  key={link}
                  className="text-white/40 hover:text-white/60 font-light text-sm transition-colors duration-200"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Shopping Cart */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartItemQuantity}
        onRemoveItem={removeFromCart}
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={closeProductModal}
        onAddToCart={addToCart}
      />
    </div>
  )
}
