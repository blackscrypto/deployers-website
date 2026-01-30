'use client'

import { motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Process', href: '#process' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
  ]

  return (
    <>
      {/* Logo - Fixed on the left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 20
        }}
        className="fixed top-6 left-6 z-50"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="cursor-pointer group"
        >
          <Image
            src="/logo1.png"
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 20,
          delay: 0.1
        }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center"
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-0 backdrop-blur-md bg-midnight-dark/70 border border-white/[0.06] px-4 py-2">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 20,
                delay: 0.2 + index * 0.05
              }}
              className="relative px-4 py-1.5 text-slate-400 hover:text-white transition-colors duration-200 text-sm group"
            >
              {item.name}
              {/* Subtle underline on hover */}
              <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-deployers-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.a>
          ))}
          
          {/* CTA Button with arrow */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 20,
              delay: 0.4
            }}
            whileHover={{ 
              x: 2,
            }}
            className="px-4 py-1.5 text-white text-sm flex items-center gap-1 group"
          >
            Contact
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden backdrop-blur-md bg-midnight-dark/70 border border-white/[0.06] text-white p-2"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </motion.nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 70, damping: 20 }}
          className="md:hidden fixed top-24 left-1/2 -translate-x-1/2 z-40 backdrop-blur-md bg-midnight-dark/90 border border-white/[0.08] rounded-2xl px-6 py-4 min-w-[200px]"
        >
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              className="text-white text-sm flex items-center gap-1 mt-2"
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
