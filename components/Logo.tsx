'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface LogoProps {
  showText?: boolean
  size?: number
  className?: string
}

export default function Logo({ 
  showText = true, 
  size = 50,
  className = '' 
}: LogoProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative group cursor-pointer ${className}`}
    >
      {/* Blue glow effect on hover */}
      <div className="absolute inset-0 bg-deployers-blue opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500 rounded-lg scale-150" />
      
      {/* Logo */}
      <div className="relative flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Deployers Logo"
          width={size}
          height={size}
          className="relative z-10 transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(127,156,245,0.8)]"
          priority
        />
        {showText && (
          <span className="text-2xl font-bold tracking-tight text-white">
            deployers
          </span>
        )}
      </div>
    </motion.div>
  )
}
