'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

const projects = [
  {
    id: 1,
    name: 'AutoFlow',
    category: 'AI Agent',
    description: 'Intelligent workflow automation agent that handles complex business processes autonomously.',
  },
  {
    id: 2,
    name: 'DataSync Pro',
    category: 'Data Integration',
    description: 'Real-time data synchronization platform powered by machine learning algorithms.',
  },
  {
    id: 3,
    name: 'ChatAssist',
    category: 'Conversational AI',
    description: 'Advanced customer support chatbot with natural language understanding capabilities.',
  },
  {
    id: 4,
    name: 'PredictIQ',
    category: 'Analytics',
    description: 'Predictive analytics dashboard for business intelligence and forecasting.',
  },
]

// Dynamic visual orb that changes based on hovered project
const ProjectVisual = ({ activeProject }: { activeProject: number | null }) => {
  const colors = [
    { primary: 'rgba(127, 156, 245, 0.4)', secondary: 'rgba(99, 102, 241, 0.2)' },
    { primary: 'rgba(6, 182, 212, 0.4)', secondary: 'rgba(59, 130, 246, 0.2)' },
    { primary: 'rgba(168, 85, 247, 0.4)', secondary: 'rgba(139, 92, 246, 0.2)' },
    { primary: 'rgba(34, 197, 94, 0.4)', secondary: 'rgba(16, 185, 129, 0.2)' },
  ]

  const currentColor = activeProject !== null ? colors[activeProject] : colors[0]

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer glow */}
      <motion.div
        animate={{
          scale: activeProject !== null ? [1, 1.15, 1] : [1, 1.05, 1],
          opacity: activeProject !== null ? [0.3, 0.6, 0.3] : [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute w-72 h-72 rounded-full blur-[80px]"
        style={{ background: currentColor.secondary }}
      />
      
      {/* Main orb */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="relative w-48 h-48"
      >
        {/* Orb layers */}
        <motion.div
          animate={{ scale: activeProject !== null ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(ellipse at 30% 30%, ${currentColor.primary}, transparent 70%)`,
            filter: 'blur(20px)',
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border border-white/10"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-8 rounded-full border border-white/20"
        />
        
        {/* Core */}
        <div 
          className="absolute inset-12 rounded-full"
          style={{
            background: `radial-gradient(circle at 40% 40%, ${currentColor.primary}, transparent)`,
          }}
        />
        
        {/* Highlight */}
        <div className="absolute top-8 left-8 w-8 h-8 rounded-full bg-white/20 blur-md" />
      </motion.div>
      
      {/* Floating particles */}
      <AnimatePresence>
        {activeProject !== null && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0],
                  x: Math.cos(i * 60 * (Math.PI / 180)) * 100,
                  y: Math.sin(i * 60 * (Math.PI / 180)) * 100,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className="absolute w-2 h-2 rounded-full"
                style={{ background: currentColor.primary }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <section id="projects" className="relative px-6 py-20 bg-[#03060f]">
      {/* Smooth gradient fade-out at the bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(3, 6, 15, 0.5) 40%, rgba(3, 6, 15, 1) 100%)',
        }}
      />
      
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", stiffness: 70, damping: 20 }}
          className="mb-20 relative"
        >
          {/* Shine effect overlay */}
          <div className="absolute inset-0 pointer-events-none select-none z-10" aria-hidden="true">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold headline text-shine-effect">
              Our Projects
            </h2>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white headline relative">
            Our Projects
          </h2>
        </motion.div>

        {/* Projects Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Project List */}
          <div className="space-y-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 70,
                  damping: 20,
                }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative"
              >
                <div className="flex items-center justify-between py-6 px-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/[0.02]">
                  {/* Project Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-deployers-light transition-colors duration-300">
                        {project.name}
                      </h3>
                      <span className="text-xs px-3 py-1 rounded-full bg-white/[0.05] text-slate-400 group-hover:bg-deployers-blue/20 group-hover:text-deployers-light transition-all duration-300">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm max-w-md group-hover:text-slate-400 transition-colors duration-300">
                      {project.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    initial={{ x: 0, opacity: 0.5 }}
                    animate={{
                      x: hoveredProject === index ? 5 : 0,
                      opacity: hoveredProject === index ? 1 : 0.5,
                    }}
                    className="flex-shrink-0"
                  >
                    <ArrowUpRight className="w-6 h-6 text-deployers-blue" />
                  </motion.div>
                </div>
                
                {/* Separator line */}
                <div className="h-[1px] bg-white/[0.05] group-hover:bg-deployers-blue/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Visual Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring" }}
            className="hidden lg:block h-[500px]"
          >
            <ProjectVisual activeProject={hoveredProject} />
          </motion.div>
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
