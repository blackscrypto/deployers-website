'use client'

import { motion } from 'framer-motion'

export default function TaglineSection() {
  return (
    <section className="relative px-6 pt-8 pb-32 overflow-visible flex items-center justify-center bg-[#03060f]">
      {/* Smooth gradient fade-out at the bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(3, 6, 15, 0.5) 40%, rgba(3, 6, 15, 1) 100%)',
        }}
      />
      
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Shine effect overlay */}
          <div className="absolute inset-0 pointer-events-none select-none z-10" aria-hidden="true">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-loose text-left headline text-shine-effect">
              We are your AI Partner 360° We transform businesses into AI Leaders.
            </h2>
          </div>
          
          {/* Main text */}
          <motion.h2 
            initial={{ opacity: 0, y: -40, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-loose text-left headline relative"
          >
            <motion.span
              initial={{ opacity: 0, y: -30, filter: "blur(15px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
              className="text-white"
            >
              We are your AI Partner{' '}
            </motion.span>
          <motion.span
            initial={{ opacity: 0, y: -30, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            animate={{
              textShadow: [
                "0 0 20px rgba(127, 156, 245, 0.3)",
                "0 0 30px rgba(127, 156, 245, 0.5)",
                "0 0 20px rgba(127, 156, 245, 0.3)",
              ]
            }}
            transition={{
              opacity: { duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 },
              y: { duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 },
              filter: { duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 },
              textShadow: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }
            }}
            className="bg-gradient-to-r from-deployers-blue via-deployers-light to-deployers-blue bg-clip-text text-transparent"
          >
            360°
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: -30, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            className="text-white"
          >
            We{' '}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: -30, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            animate={{
              textShadow: [
                "0 0 20px rgba(127, 156, 245, 0.3)",
                "0 0 30px rgba(127, 156, 245, 0.5)",
                "0 0 20px rgba(127, 156, 245, 0.3)",
              ]
            }}
            transition={{
              opacity: { duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 },
              y: { duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 },
              filter: { duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 },
              textShadow: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.5
              }
            }}
            className="bg-gradient-to-r from-deployers-blue via-deployers-light to-deployers-blue bg-clip-text text-transparent"
          >
            transform{' '}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: -30, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
            className="text-white"
          >
            businesses{' '}
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: -30, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
            className="text-white"
          >
            into{' '}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: -30, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.7 }}
            className="bg-gradient-to-r from-white via-deployers-light to-white bg-clip-text text-transparent"
          >
            AI Leaders.
          </motion.span>
        </motion.h2>
        </div>
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
