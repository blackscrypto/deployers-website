'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'

  return (
    <motion.button
      type="button"
      aria-label={isLight ? 'Passer en mode sombre' : 'Passer en mode clair'}
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-6 right-6 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-theme-border bg-theme-surface/80 backdrop-blur-md transition-colors hover:bg-theme-surface text-theme-text-muted hover:text-theme-text"
    >
      <motion.span initial={false} transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
        {isLight ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </motion.span>
    </motion.button>
  )
}
