'use client'

import { useState, useEffect } from 'react'
import { Search, ShoppingCart, User, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { HeaderProps } from '@/lib/types'
import { cn } from '@/lib/utils'

const categories = ['All', 'Electronics', 'Fashion', 'Lifestyle', 'Design']

export function FuturisticHeader({ 
  cartItemsCount, 
  onCartClick, 
  onSearchChange 
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onSearchChange(value)
  }

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
      isScrolled 
        ? "bg-black/95 backdrop-blur-md border-b border-white/10" 
        : "bg-transparent"
    )}>
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-transparent via-green-500/20 to-transparent"></div>
      </div>

      <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-extralight text-white tracking-[0.2em] font-mono">
              <span className="relative">
                VIBE
                <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-cyan-500 to-transparent opacity-60"></div>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <button
                key={category}
                className="group relative py-2 px-1 text-white/80 font-light text-sm tracking-wide hover:text-white transition-all duration-200"
              >
                {category}
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-sm"></div>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-cyan-500 to-green-500 group-hover:w-full transition-all duration-300"></div>
              </button>
            ))}
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Search */}
            <div className="hidden sm:block relative group">
              <div className={cn(
                "flex items-center border transition-all duration-200",
                isSearchFocused 
                  ? "border-cyan-500/50 bg-black/20" 
                  : "border-white/20 hover:border-white/30"
              )}>
                <Search className="w-4 h-4 text-white/60 ml-3" />
                <Input
                  placeholder="Search future..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="bg-transparent border-0 text-white placeholder:text-white/40 font-light focus-visible:ring-0 focus-visible:ring-offset-0 w-48"
                />
              </div>
              {/* Search glow effect */}
              {isSearchFocused && (
                <div className="absolute inset-0 bg-cyan-500/10 blur-sm -z-10 rounded-sm"></div>
              )}
            </div>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartClick}
              className="relative text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200 p-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-black text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </Button>

            {/* User Button */}
            <Button
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200 p-2"
            >
              <User className="w-5 h-5" />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200 p-2"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black/95 border-white/10 text-white">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-white/60 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <Input
                      placeholder="Search future..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40 pl-10"
                    />
                  </div>
                  
                  {/* Mobile Categories */}
                  <div className="flex flex-col space-y-4">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className="text-left py-2 text-white/80 font-light tracking-wide hover:text-white transition-colors duration-200"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Bottom scanning line effect */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-pulse"></div>
    </header>
  )
}