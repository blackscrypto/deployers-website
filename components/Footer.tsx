'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from '@/context/ThemeContext'

const navigation = {
  main: [
    { name: 'Process', href: '#process' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ],
  social: [
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'Twitter', href: 'https://twitter.com' },
    { name: 'GitHub', href: 'https://github.com' },
  ],
}

export default function Footer() {
  const { theme } = useTheme()
  const logoSrc = theme === 'light' ? '/logo.png' : '/logo1.png'
  return (
    <footer className="relative px-6 py-20 border-t border-theme-border bg-theme-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 1, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, type: "spring", stiffness: 70, damping: 24 }}
              className="mb-6"
            >
              <Image
                src={logoSrc}
                alt="Deployers"
                width={80}
                height={80}
                className="mb-4"
              />
              <p className="text-theme-text-muted max-w-sm leading-relaxed">
                Transforming businesses with cutting-edge AI automation. 
                We build intelligent systems that work while you grow.
              </p>
            </motion.div>
          </div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 1, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 70, damping: 24, delay: 0.08 }}
          >
            <h3 className="text-sm font-semibold text-theme-text mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-deployers-light transition-colors duration-300 text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 1, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 70, damping: 24, delay: 0.12 }}
          >
            <h3 className="text-sm font-semibold text-theme-text mb-4">Connect</h3>
            <ul className="space-y-3">
              {navigation.social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-theme-text-muted hover:text-deployers-light transition-colors duration-300 text-sm"
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, type: "spring", stiffness: 70, damping: 24, delay: 0.18 }}
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-theme-border"
        >
          <p className="text-theme-text-subtle text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Deployers. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-theme-text-subtle hover:text-theme-text-muted text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-theme-text-subtle hover:text-theme-text-muted text-sm transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </motion.div>

        {/* Large "Let's talk" CTA */}
        <motion.div
          initial={{ opacity: 1, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, type: "spring", stiffness: 65, damping: 22, delay: 0.25 }}
          className="mt-20 text-center"
        >
          <a 
            href="#contact"
            className="group inline-block"
          >
            <span className="text-6xl md:text-8xl lg:text-9xl font-bold text-theme-text/10 hover:text-theme-text/20 transition-colors duration-500">
              Let's talk.
            </span>
          </a>
        </motion.div>
      </div>

      {/* Ambient effect */}
      <motion.div
        animate={{ opacity: [0.02, 0.05, 0.02] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-deployers-blue/10 rounded-full blur-[150px] pointer-events-none"
      />
    </footer>
  )
}
