'use client'

import { motion } from 'framer-motion'

export default function TaglineSection() {
  return (
    <section className="relative px-6 pt-16 pb-32 overflow-visible flex items-center justify-center">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", stiffness: 70, damping: 20 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-loose text-left relative"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            className="text-white"
          >
            We are your AI Partner{' '}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{
              textShadow: [
                "0 0 20px rgba(127, 156, 245, 0.3)",
                "0 0 30px rgba(127, 156, 245, 0.5)",
                "0 0 20px rgba(127, 156, 245, 0.3)",
              ]
            }}
            transition={{
              opacity: { duration: 1.5, ease: "easeOut", delay: 0.5 },
              textShadow: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="bg-gradient-to-r from-deployers-blue via-deployers-light to-deployers-blue bg-clip-text text-transparent"
          >
            360°
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.7 }}
            className="text-white"
          >
            We{' '}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{
              textShadow: [
                "0 0 20px rgba(127, 156, 245, 0.3)",
                "0 0 30px rgba(127, 156, 245, 0.5)",
                "0 0 20px rgba(127, 156, 245, 0.3)",
              ]
            }}
            transition={{
              opacity: { duration: 1.5, ease: "easeOut", delay: 0.85 },
              textShadow: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }
            }}
            className="bg-gradient-to-r from-deployers-blue via-deployers-light to-deployers-blue bg-clip-text text-transparent"
          >
            transform{' '}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.95 }}
            className="text-white"
          >
            businesses
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1.3 }}
            className="text-white"
          >
            into{' '}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1.5 }}
            className="bg-gradient-to-r from-white via-deployers-light to-white bg-clip-text text-transparent"
          >
            AI Leaders.
          </motion.span>
        </motion.h2>
      </div>

      {/* Ambient glow effects - subtle */}
      <motion.div
        animate={{
          opacity: [0.15, 0.3, 0.15],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/4 w-80 h-80 bg-deployers-blue/10 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 right-1/4 w-80 h-80 bg-deployers-blue/8 rounded-full blur-[80px] pointer-events-none"
      />
    </section>
  )
}
