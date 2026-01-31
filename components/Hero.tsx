'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'

export default function Hero() {
  const sectionRef = useRef(null)
  
  // Track scroll progress of the hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })
  
  // Transform values for "Deploy" based on scroll
  const deployScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.8])
  const deployY = useTransform(scrollYProgress, [0, 0.5], [0, -50])
  const deployGlow = useTransform(scrollYProgress, [0, 0.5], [0, 60])
  const deployGlowOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const deployBlur = useTransform(scrollYProgress, [0, 0.5], [0, 2])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 20
      }
    }
  }

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
      {/* Animated Mesh Gradient Background - Option 1 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d15] to-[#0a0a0f]" />
        
        {/* Unified Mesh Gradient - Morphing continuously */}
        <motion.div
          className="absolute inset-0 opacity-50"
          animate={{
            background: [
              'radial-gradient(at 40% 20%, rgba(99, 102, 241, 0.35) 0%, transparent 50%), radial-gradient(at 80% 80%, rgba(6, 182, 212, 0.3) 0%, transparent 50%), radial-gradient(at 20% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(at 60% 30%, rgba(99, 102, 241, 0.35) 0%, transparent 50%), radial-gradient(at 30% 90%, rgba(6, 182, 212, 0.3) 0%, transparent 50%), radial-gradient(at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(at 30% 50%, rgba(99, 102, 241, 0.35) 0%, transparent 50%), radial-gradient(at 70% 30%, rgba(6, 182, 212, 0.3) 0%, transparent 50%), radial-gradient(at 40% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(at 40% 20%, rgba(99, 102, 241, 0.35) 0%, transparent 50%), radial-gradient(at 80% 80%, rgba(6, 182, 212, 0.3) 0%, transparent 50%), radial-gradient(at 20% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            filter: 'blur(100px)',
          }}
        />
        
        {/* Secondary layer for more depth */}
        <motion.div
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              'radial-gradient(at 70% 50%, rgba(59, 130, 246, 0.25) 0%, transparent 50%), radial-gradient(at 30% 30%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
              'radial-gradient(at 40% 70%, rgba(59, 130, 246, 0.25) 0%, transparent 50%), radial-gradient(at 60% 40%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
              'radial-gradient(at 80% 30%, rgba(59, 130, 246, 0.25) 0%, transparent 50%), radial-gradient(at 20% 60%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
              'radial-gradient(at 70% 50%, rgba(59, 130, 246, 0.25) 0%, transparent 50%), radial-gradient(at 30% 30%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            filter: 'blur(120px)',
          }}
        />
        
        {/* Noise/Grain Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Smooth gradient fade-out at the bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(3, 6, 15, 0.5) 40%, rgba(3, 6, 15, 1) 100%)',
          }}
        />
      </div>
      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        {/* Animated Gradient Border Badge */}
        <motion.div
          variants={itemVariants}
          className="relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-10 group"
        >
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-full p-[1px] overflow-hidden">
            <div 
              className="absolute animate-spin-slow"
              style={{
                top: '-400%',
                left: '-400%',
                right: '-400%',
                bottom: '-400%',
                background: 'conic-gradient(from 0deg, transparent 0deg, #7F9CF5 60deg, #A78BFA 120deg, #06B6D4 180deg, transparent 360deg)',
              }}
            />
          </div>
          
          {/* Inner background */}
          <div className="absolute inset-[1px] rounded-full bg-[#0a0a0f]/90 backdrop-blur-sm" />
          
          {/* Static glow effect (no rotation) */}
          <div 
            className="absolute inset-0 rounded-full opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-70"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(127, 156, 245, 0.4), rgba(167, 139, 250, 0.3), transparent 70%)',
            }}
          />
          
          {/* Content */}
          <span className="relative w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="relative text-sm text-slate-300 font-medium tracking-wide">AI Automation Agency</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 headline"
        >
          <span className="block text-white">Automate.</span>
          <span className="block text-white">Scale.</span>
          <motion.span 
            className="block pb-2 relative"
            style={{ 
              scale: deployScale,
              y: deployY,
              filter: useTransform(deployBlur, (v) => `blur(${v}px)`),
              color: '#bdd9ff',
            }}
          >
            Deploy.
            {/* Animated glow effect - starts at 0 opacity */}
            <motion.span
              className="absolute inset-0 blur-2xl -z-10 pointer-events-none"
              style={{
                opacity: deployGlowOpacity,
                textShadow: useTransform(
                  deployGlow, 
                  (v) => `0 0 ${v}px rgba(189, 217, 255, 0.8), 0 0 ${v * 1.5}px rgba(127, 156, 245, 0.6), 0 0 ${v * 2}px rgba(99, 102, 241, 0.4)`
                ),
                color: '#bdd9ff',
              }}
            >
              Deploy.
            </motion.span>
          </motion.span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-slate-400 mb-14 max-w-3xl mx-auto leading-relaxed"
        >
          Transform your business with cutting-edge AI automation. 
          We build intelligent systems that work while you grow.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group px-8 py-4 bg-white text-[#0a0a0f] rounded-full font-semibold text-base shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] transition-all duration-500 flex items-center gap-3"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-transparent border border-white/10 text-white rounded-full font-medium text-base hover:border-white/20 transition-all duration-500"
          >
            View Case Studies
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-12 md:gap-16 mt-24"
        >
          {[
            { value: '500+', label: 'Automations Deployed' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '24/7', label: 'AI Systems Running' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-semibold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-slate-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

    </section>
  )
}
