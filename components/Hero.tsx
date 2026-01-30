'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Particle {
  id: number
  x: number
  y: number
  size: number
}

export default function Hero() {
  const [particles, setParticles] = useState<Particle[]>([])
  const heroRef = useRef<HTMLElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const orbsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Generate star-like particles
    const newParticles: Particle[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
    }))
    setParticles(newParticles)
  }, [])

  // GSAP Parallax effect
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax for background particles (moves slower)
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          y: 200,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
      }

      // Parallax for orbs (moves even slower)
      if (orbsRef.current) {
        gsap.to(orbsRef.current, {
          y: 300,
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        })
      }

      // Content moves up slightly faster (creates depth)
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: -50,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "50% top",
            scrub: 0.5,
          },
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

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
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 bg-transparent overflow-hidden">
      {/* Animated Background - Star particles */}
      <div ref={backgroundRef} className="absolute inset-0 pointer-events-none" style={{ height: '150vh' }}>
        {/* Star-like particles with enhanced glow */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: 'radial-gradient(circle, #ffffff 0%, #e0e7ff 30%, #9EB3FF 50%, transparent 70%)',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.9), 0 0 20px rgba(158, 179, 255, 0.6), 0 0 30px rgba(127, 156, 245, 0.3)',
              filter: 'blur(0.2px)',
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -30, 20, 0],
              opacity: [0.6, 1, 0.7, 0.6],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{
              duration: 25 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Central Glowing Orb - Like reference image */}
      <div ref={orbsRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {/* Main blue glow */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.4) 0%, rgba(59, 130, 246, 0.2) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Secondary cyan glow */}
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.6, 0.4],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[250px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.35) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        {/* Warm accent (like reference orange/red) - using purple/pink */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[30%] w-[250px] h-[200px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.35) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 70%)',
            filter: 'blur(45px)',
          }}
        />
      </div>
      <motion.div
        ref={contentRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto text-center"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-deployers-blue/30 backdrop-blur-sm mb-8"
        >
          <Sparkles className="w-4 h-4 text-deployers-blue" />
          <span className="text-sm text-slate-300 font-medium">AI Automation Experts</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
        >
          <span className="block text-white">Automate.</span>
          <span className="block text-white">Scale.</span>
          <span className="block bg-gradient-to-r from-deployers-blue via-deployers-blue-light to-deployers-blue bg-clip-text text-transparent">
            Deploy.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
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
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 60px rgba(127, 156, 245, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-white text-midnight-dark rounded-full font-bold text-lg shadow-2xl hover:shadow-deployers-blue/50 transition-all duration-300 flex items-center gap-3"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>

          <motion.button
            whileHover={{ 
              scale: 1.05,
              borderColor: "rgba(127, 156, 245, 1)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-transparent border-2 border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/5 transition-all duration-300"
          >
            View Case Studies
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto"
        >
          {[
            { value: '500+', label: 'Automations Deployed' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '24/7', label: 'AI Systems Running' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-deployers-blue mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

    </section>
  )
}
