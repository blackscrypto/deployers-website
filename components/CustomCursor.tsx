'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isInContactForm, setIsInContactForm] = useState(false)

  // Mouse position
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  // Dot follows instantly (no spring, direct values)
  const dotX = cursorX
  const dotY = cursorY
  
  // Ring follows with very slight delay (minimal trailing)
  const ringX = useSpring(cursorX, { damping: 40, stiffness: 800 })
  const ringY = useSpring(cursorY, { damping: 40, stiffness: 800 })

  useEffect(() => {
    // Check if mobile/touch device
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Detect hoverable elements and contact form
    const handleElementDetection = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check if in contact section
      const inContact = target.closest('#contact') !== null
      setIsInContactForm(inContact)
      
      const isClickable = !!(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('[role="button"]') ||
        target.closest('.group') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      )
      
      setIsHovering(isClickable)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousemove', handleElementDetection)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousemove', handleElementDetection)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('resize', checkMobile)
    }
  }, [cursorX, cursorY])

  // Don't render on mobile/touch devices
  if (isMobile) return null

  // Show default cursor in contact form
  if (isInContactForm) {
    return (
      <style jsx global>{`
        #contact, #contact * {
          cursor: auto !important;
        }
      `}</style>
    )
  }

  return (
    <>
      {/* Hide default cursor globally except contact */}
      <style jsx global>{`
        *:not(#contact):not(#contact *) {
          cursor: none !important;
        }
        #contact, #contact * {
          cursor: auto !important;
        }
      `}</style>

      {/* Ring (outer circle) - follows with delay */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full border-2 border-deployers-blue/60"
        animate={{
          opacity: isVisible && !isInContactForm ? 1 : 0,
          width: isHovering ? 50 : 32,
          height: isHovering ? 50 : 32,
          backgroundColor: isHovering ? 'rgba(127, 156, 245, 0.1)' : 'transparent',
        }}
        transition={{
          width: { type: 'spring', damping: 20, stiffness: 300 },
          height: { type: 'spring', damping: 20, stiffness: 300 },
          opacity: { duration: 0.2 },
        }}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: isHovering 
            ? '0 0 25px rgba(127, 156, 245, 0.4)' 
            : '0 0 15px rgba(127, 156, 245, 0.2)',
        }}
      />

      {/* Dot (inner circle) - follows instantly */}
      <motion.div
        className="fixed pointer-events-none z-[10000] rounded-full bg-deployers-blue"
        animate={{
          opacity: isVisible && !isInContactForm ? 1 : 0,
          width: isHovering ? 6 : 8,
          height: isHovering ? 6 : 8,
        }}
        transition={{
          width: { type: 'spring', damping: 20, stiffness: 300 },
          height: { type: 'spring', damping: 20, stiffness: 300 },
          opacity: { duration: 0.2 },
        }}
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 10px rgba(127, 156, 245, 0.8)',
        }}
      />
    </>
  )
}
