'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    name: 'AutoFlow',
    category: 'AI Agent',
    description: 'Intelligent workflow automation agent that handles complex business processes autonomously.',
    color: { primary: 'rgba(127, 156, 245, 0.5)', secondary: 'rgba(99, 102, 241, 0.3)', accent: '#7F9CF5' },
    image: '/project-1.jpg',
  },
  {
    id: 2,
    name: 'DataSync Pro',
    category: 'Data Integration',
    description: 'Real-time data synchronization platform powered by machine learning algorithms.',
    color: { primary: 'rgba(6, 182, 212, 0.5)', secondary: 'rgba(59, 130, 246, 0.3)', accent: '#06B6D4' },
    image: '/project-2.jpg',
  },
  {
    id: 3,
    name: 'ChatAssist',
    category: 'Conversational AI',
    description: 'Advanced customer support chatbot with natural language understanding capabilities.',
    color: { primary: 'rgba(168, 85, 247, 0.5)', secondary: 'rgba(139, 92, 246, 0.3)', accent: '#A855F7' },
    image: '/project-3.jpg',
  },
  {
    id: 4,
    name: 'PredictIQ',
    category: 'Analytics',
    description: 'Predictive analytics dashboard for business intelligence and forecasting.',
    color: { primary: 'rgba(34, 197, 94, 0.5)', secondary: 'rgba(16, 185, 129, 0.3)', accent: '#22C55E' },
    image: '/project-4.jpg',
  },
]

// Dynamic visual that changes based on active project
const ProjectVisual = ({ activeIndex }: { activeIndex: number }) => {
  const currentProject = projects[activeIndex] || projects[0]
  
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05]">
      {/* Animated gradient background */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, ${currentProject.color.primary} 0%, ${currentProject.color.secondary} 30%, transparent 70%)`,
        }}
      />
      
      {/* Rotating orb */}
      <motion.div
        key={`orb-${activeIndex}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative z-10"
      >
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-64 h-64 rounded-full border-2 flex items-center justify-center"
          style={{ borderColor: `${currentProject.color.accent}30` }}
        >
          {/* Inner ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-48 h-48 rounded-full border-2 flex items-center justify-center"
            style={{ borderColor: `${currentProject.color.accent}50` }}
          >
            {/* Core orb */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  `0 0 40px ${currentProject.color.primary}`,
                  `0 0 80px ${currentProject.color.primary}`,
                  `0 0 40px ${currentProject.color.primary}`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-32 h-32 rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${currentProject.color.accent}, ${currentProject.color.primary})`,
              }}
            />
          </motion.div>
        </motion.div>
        
        {/* Floating dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.cos(i * 60 * Math.PI / 180) * 20, 0],
              y: [0, Math.sin(i * 60 * Math.PI / 180) * 20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: currentProject.color.accent,
              left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 45}%`,
              top: `${50 + Math.sin(i * 60 * Math.PI / 180) * 45}%`,
              boxShadow: `0 0 10px ${currentProject.color.accent}`,
            }}
          />
        ))}
      </motion.div>
      
      {/* Project info overlay */}
      <motion.div
        key={`info-${activeIndex}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="absolute bottom-8 left-8 right-8"
      >
        <span 
          className="text-xs font-medium px-3 py-1 rounded-full"
          style={{ 
            backgroundColor: `${currentProject.color.accent}20`,
            color: currentProject.color.accent,
          }}
        >
          {currentProject.category}
        </span>
        <h3 className="text-3xl font-bold text-white mt-3">{currentProject.name}</h3>
        <p className="text-slate-400 mt-2 text-sm">{currentProject.description}</p>
      </motion.div>
    </div>
  )
}

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const projectItemsRef = useRef<HTMLDivElement[]>([])
  const titleRef = useRef<HTMLDivElement>(null)

  // Add ref to project items array
  const addToProjectItemsRef = (el: HTMLDivElement | null) => {
    if (el && !projectItemsRef.current.includes(el)) {
      projectItemsRef.current.push(el)
    }
  }

  // GSAP Sticky Scroll Effect
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        })
      }

      // Project items - each one triggers a change in the visual
      projectItemsRef.current.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveProject(index),
          onEnterBack: () => setActiveProject(index),
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="relative px-6 py-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <div ref={titleRef} className="mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            Our Projects
          </h2>
        </div>

        {/* Sticky Scroll Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Project List (Scrolls normally) */}
          <div ref={leftColumnRef} className="space-y-4">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={addToProjectItemsRef}
                className="group relative"
                onMouseEnter={() => setActiveProject(index)}
              >
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 70,
                    damping: 20,
                  }}
                  className={`py-8 px-6 rounded-2xl cursor-pointer transition-all duration-500 border ${
                    activeProject === index 
                      ? 'bg-white/[0.03] border-deployers-blue/30' 
                      : 'bg-transparent border-transparent hover:bg-white/[0.02]'
                  }`}
                  style={{
                    boxShadow: activeProject === index 
                      ? `0 0 30px ${project.color.primary}, inset 0 0 30px ${project.color.secondary}` 
                      : 'none',
                  }}
                >
                  {/* Project Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span 
                          className="text-4xl font-bold transition-colors duration-300"
                          style={{ 
                            color: activeProject === index ? project.color.accent : 'rgba(255,255,255,0.2)',
                          }}
                        >
                          0{index + 1}
                        </span>
                        <h3 
                          className="text-2xl md:text-3xl font-bold transition-colors duration-300"
                          style={{ 
                            color: activeProject === index ? project.color.accent : 'white',
                          }}
                        >
                          {project.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 ml-14">
                        <span 
                          className="text-xs px-3 py-1 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: activeProject === index ? `${project.color.accent}20` : 'rgba(255,255,255,0.05)',
                            color: activeProject === index ? project.color.accent : 'rgba(148, 163, 184, 1)',
                          }}
                        >
                          {project.category}
                        </span>
                      </div>
                      <p className={`text-sm mt-3 ml-14 max-w-md transition-colors duration-300 ${
                        activeProject === index ? 'text-slate-300' : 'text-slate-500'
                      }`}>
                        {project.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <motion.div
                      animate={{
                        x: activeProject === index ? 5 : 0,
                        opacity: activeProject === index ? 1 : 0.3,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ArrowUpRight 
                        className="w-8 h-8 transition-colors duration-300"
                        style={{ color: activeProject === index ? project.color.accent : 'rgba(127, 156, 245, 0.5)' }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Right Column - Visual (Sticky) */}
          <div className="hidden lg:block">
            <div className="sticky top-32 h-[500px]">
              <AnimatePresence mode="wait">
                <ProjectVisual activeIndex={activeProject} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient effect */}
      <motion.div
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-deployers-blue/10 rounded-full blur-[150px] pointer-events-none"
      />
    </section>
  )
}
