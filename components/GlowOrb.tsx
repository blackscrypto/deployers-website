'use client'

import { motion } from 'framer-motion'

interface GlowOrbProps {
  className?: string
  delay?: number
}

export default function GlowOrb({ className = '', delay = 0 }: GlowOrbProps) {
  return (
    <motion.div
      className={`pointer-events-none blur-[100px] rounded-full bg-deployers-blue ${className}`}
      initial={{ opacity: 0.6 }}
      animate={{ 
        opacity: [0.6, 0.8, 0.6],
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
    />
  )
}
