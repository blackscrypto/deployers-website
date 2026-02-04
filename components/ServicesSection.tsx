'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Search, GraduationCap, Bot, ChevronRight } from 'lucide-react'
import { AuditVisual, TrainingVisual, SolutionsVisual } from './ServicesVisuals'
import { useState, useCallback, useRef } from 'react'
import Tilt from 'react-parallax-tilt'

const playServiceSound = (type: 'audit' | 'training' | 'solutions' | 'success') => {
  if (typeof window === 'undefined') return
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  switch (type) {
    case 'audit':
      oscillator.frequency.value = 440
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.03, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15)
      break
    case 'training':
      oscillator.frequency.value = 523.25
      oscillator.type = 'triangle'
      gainNode.gain.setValueAtTime(0.03, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.12)
      break
    case 'solutions':
      oscillator.frequency.setValueAtTime(300, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1)
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.025, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15)
      break
    case 'success':
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1)
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.04, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2)
      break
  }
  oscillator.start()
  oscillator.stop(audioContext.currentTime + 0.2)
}

const services: {
  id: string
  title: string
  description: string
  icon: typeof Search
  color: string
  glowColor: string
  detailParagraph: string
  bullets: string[]
}[] = [
  {
    id: 'audit',
    title: 'Audit & Strategy',
    description: 'We analyze your current processes and identify AI automation opportunities.',
    icon: Search,
    color: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    detailParagraph:
      'Our experts map your workflows, data flows, and pain points to build a clear roadmap for AI adoption. We quantify ROI and prioritize quick wins.',
    bullets: ['Process & data audit', 'AI readiness assessment', 'ROI modeling', 'Roadmap & priorities'],
  },
  {
    id: 'training',
    title: 'Training',
    description: 'Hands-on AI training and workshops tailored to your industry.',
    icon: GraduationCap,
    color: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    detailParagraph:
      'From prompt engineering to automation tools, we upskill your team so they can leverage AI safely and effectively every day.',
    bullets: ['AI fundamentals', 'Prompt engineering', 'Tool workshops', 'Certification paths'],
  },
  {
    id: 'solutions',
    title: 'AI Solutions',
    description: 'Custom AI agents, chatbots, and automation built for your business.',
    icon: Bot,
    color: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    detailParagraph:
      'We design, build, and deploy AI agents and automation that integrate with your stack. From chatbots to workflow engines, we ship production-ready systems.',
    bullets: ['Custom AI agents', 'Chatbots & assistants', 'Workflow automation', 'API integrations'],
  },
]

const visualComponents: Record<string, React.FC<{ isHovered: boolean }>> = {
  audit: AuditVisual,
  training: TrainingVisual,
  solutions: SolutionsVisual,
}

const CARD_HEIGHT = 520

function ServiceCard({
  service,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: {
  service: (typeof services)[0]
  index: number
  isHovered: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
}) {
  const Icon = service.icon
  const VisualComponent = visualComponents[service.id]

  return (
    <motion.div
      layout={false}
      className="h-full w-full min-w-0"
      initial={false}
      animate={{
        scale: isHovered ? 1.02 : 1,
        opacity: 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <Tilt
        tiltMaxAngleX={6}
        tiltMaxAngleY={6}
        perspective={1000}
        scale={1}
        glareEnable
        glareMaxOpacity={0.08}
        glareColor="white"
        glarePosition="all"
        glareBorderRadius="12px"
        className="h-full w-full"
      >
        <motion.div
          className={`relative flex h-full flex-col overflow-hidden rounded-xl border cursor-pointer transition-all duration-300 service-card ${isHovered ? 'service-card-hover' : ''}`}
          style={{ minHeight: CARD_HEIGHT }}
          initial={{ opacity: 1, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 70, damping: 24, delay: index * 0.08 }}
        >
          {/* Même effet que Our Process : overlay coloré à faible opacité au survol (bleu / violet / cyan) */}
          <motion.div
            animate={{ opacity: isHovered ? 0.06 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ backgroundColor: service.color }}
          />

          {/* Content — fixed structure, no layout shift */}
          <div className="relative z-10 flex flex-1 flex-col p-6 min-h-0">
            {/* Header: always visible */}
            <div className="flex flex-shrink-0 flex-col items-center justify-center min-h-[140px] text-center">
              <div
                className="flex items-center justify-center w-14 h-14 rounded-xl mb-3"
                style={{ backgroundColor: `${service.color}20`, color: service.color }}
              >
                <Icon className="w-7 h-7" style={{ color: service.color }} />
              </div>
              <h3 className="text-xl font-bold text-theme-text">{service.title}</h3>
              <AnimatePresence mode="wait">
                {!isHovered ? (
                  <motion.p
                    key="short"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-theme-text-muted text-sm mt-1 max-w-xs"
                  >
                    {service.description}
                  </motion.p>
                ) : (
                  <motion.div
                    key="explore"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 flex items-center gap-2 text-theme-text"
                  >
                    <span className="text-sm font-medium">Explore</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Visual slot — fixed height, content reveal */}
            <div className="flex-shrink-0 w-full" style={{ height: 208 }}>
              <AnimatePresence mode="wait">
                {isHovered ? (
                  <motion.div
                    key="visual"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full"
                  >
                    <VisualComponent isHovered={true} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Detail + bullets — fixed height, content reveal */}
            <div className="flex-shrink-0 min-h-[140px] mt-2">
              <AnimatePresence mode="wait">
                {isHovered ? (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.35, delay: 0.05 }}
                    className="flex flex-col gap-3"
                  >
                    <p className="text-theme-text-muted text-sm leading-relaxed">{service.detailParagraph}</p>
                    <ul className="space-y-1.5">
                      {service.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-theme-text-muted">
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: service.color }}
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom accent line — même effet que Our Process (dégradé + glow), couleur par service */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-xl transition-opacity duration-500"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
              boxShadow: isHovered ? `0 0 12px ${service.glowColor}` : 'none',
            }}
          />
        </motion.div>
      </Tilt>
    </motion.div>
  )
}

const LEAVE_DELAY_MS = 80

export default function ServicesSection() {
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleHoverStart = useCallback((id: string) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current)
      leaveTimeoutRef.current = null
    }
    setHoveredService(id)
    playServiceSound(id as 'audit' | 'training' | 'solutions')
  }, [])

  const handleHoverEnd = useCallback(() => {
    leaveTimeoutRef.current = setTimeout(() => {
      leaveTimeoutRef.current = null
      setHoveredService(null)
    }, LEAVE_DELAY_MS)
  }, [])

  return (
    <section id="services" className="relative px-6 py-32 bg-theme-section overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10" style={{ background: 'var(--theme-hero-fade)' }} />

      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 1, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 65, damping: 22 }}
          className="mb-20 relative inline-block"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-theme-text headline">
            Our Services
          </h2>
          <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-deployers-blue to-transparent rounded-full shadow-[0_0_12px_rgba(127,156,245,0.5)]" aria-hidden="true" />
        </motion.div>

        {/* Fixed grid: 3 equal columns — no flex growth = no layout jump */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isHovered={hoveredService === service.id}
              onHoverStart={() => handleHoverStart(service.id)}
              onHoverEnd={handleHoverEnd}
            />
          ))}
        </div>
      </div>

      <motion.div
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 11, repeat: Infinity, delay: 4 }}
        className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[150px] pointer-events-none"
      />
    </section>
  )
}
