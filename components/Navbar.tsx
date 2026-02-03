'use client'

import { motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { useTheme } from '@/context/ThemeContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()
  const logoSrc = theme === 'light' ? '/logo.png' : '/logo1.png'

  const navItems = [
    { name: 'Process', href: '#process' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
  ]

  return (
    <>
      {/* Logo - Fixed on the left */}
      <motion.div
        initial={{ opacity: 1, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 70, damping: 22, duration: 0.6 }}
        className="fixed top-6 left-6 z-50"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="cursor-pointer group"
        >
          <Image
            src={logoSrc}
            alt="Deployers Logo"
            width={100}
            height={100}
            className="relative transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(127,156,245,0.8)]"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Centered Navigation Bar */}
      <motion.nav
        initial={{ opacity: 1, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 70, damping: 22, delay: 0.08 }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center"
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-0 backdrop-blur-md bg-theme-surface border border-theme-border px-4 py-2">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 1, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 70, damping: 22, delay: 0.15 + index * 0.05 }}
              className="relative px-4 py-1.5 text-theme-text-muted hover:text-theme-text transition-colors duration-200 text-sm group"
            >
              {item.name}
              {/* Subtle underline on hover */}
              <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-deployers-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.a>
          ))}
          
          {/* CTA Button with arrow */}
          <motion.a
            href="#contact"
            initial={{ opacity: 1, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 70, damping: 22, delay: 0.35 }}
            whileHover={{ 
              x: 2,
            }}
            className="px-4 py-1.5 text-theme-text text-sm flex items-center gap-1 group"
          >
            Contact
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden backdrop-blur-md bg-theme-surface border border-theme-border text-theme-text p-2"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </motion.nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 1, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 70, damping: 22 }}
          className="md:hidden fixed top-24 left-1/2 -translate-x-1/2 z-40 backdrop-blur-md bg-theme-section border border-theme-border-strong rounded-2xl px-6 py-4 min-w-[200px]"
        >
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-theme-text-muted hover:text-theme-text transition-colors duration-200 text-sm"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              className="text-theme-text text-sm flex items-center gap-1 mt-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      )}
    </>
  )
}
