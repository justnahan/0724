import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Product } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format price from cents to currency string
 * @param priceInCents - Price in cents
 * @returns Formatted price string (e.g., "$29.99")
 */
export function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(2)}`
}

/**
 * Calculate total price for cart items
 * @param items - Array of cart items with quantity
 * @returns Total price in cents
 */
export function calculateCartTotal(items: Array<{ product: Product; quantity: number }>): number {
  return items.reduce((total, item) => total + (item.product.price_in_cents * item.quantity), 0)
}

/**
 * Filter products based on search criteria
 * @param products - Array of products
 * @param query - Search query
 * @param minPrice - Minimum price filter in cents
 * @param maxPrice - Maximum price filter in cents  
 * @returns Filtered products array
 */
export function filterProducts(
  products: Product[], 
  query?: string,
  minPrice?: number,
  maxPrice?: number
): Product[] {
  return products.filter(product => {
    const matchesQuery = !query || 
      product.name.toLowerCase().includes(query.toLowerCase())
    
    const matchesMinPrice = !minPrice || product.price_in_cents >= minPrice
    const matchesMaxPrice = !maxPrice || product.price_in_cents <= maxPrice
    
    return matchesQuery && matchesMinPrice && matchesMaxPrice
  })
}

/**
 * Generate random geometric shapes for background
 * @returns CSS transform string for geometric elements
 */
export function generateGeometricTransform(): string {
  const rotations = [0, 45, 90, 135, 180, 225, 270, 315]
  const scales = [0.5, 0.75, 1, 1.25, 1.5]
  const rotation = rotations[Math.floor(Math.random() * rotations.length)]
  const scale = scales[Math.floor(Math.random() * scales.length)]
  
  return `rotate(${rotation}deg) scale(${scale})`
}
