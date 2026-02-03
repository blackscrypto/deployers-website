'use client'

import { motion, useScroll, useTransform, AnimatePresence, type MotionValue } from 'framer-motion'
import { MessageSquare, Target, Map, Code, Rocket } from 'lucide-react'
import {
  SiSlack,
  SiDiscord,
  SiNotion,
  SiStripe,
  SiGithub,
  SiGoogle,
  SiWhatsapp,
  SiOpenai,
  SiZapier,
  SiAirtable,
  SiFigma,
  SiVercel,
  SiHubspot,
  SiShopify,
  SiTwilio,
  SiMailchimp,
  SiAsana,
  SiTrello,
  SiDropbox,
  SiLinkedin,
} from 'react-icons/si'
import { useRef, useState, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'

const playSound = (type: 'hover' | 'success' | 'pop' | 'whoosh') => {
  if (typeof window === 'undefined') return
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  switch (type) {
    case 'hover':
      oscillator.frequency.value = 800
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.03, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1)
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.1)
      break
    case 'pop':
      oscillator.frequency.value = 600
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08)
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.08)
      break
    case 'success':
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1)
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.04, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2)
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.2)
      break
    case 'whoosh':
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.15)
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.02, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15)
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.15)
      break
  }
}

const processSteps = [
  {
    number: '01',
    title: 'Contact',
    description: 'We start with a discovery call to understand your business needs and challenges.',
    icon: MessageSquare,
    visual: 'chat',
  },
  {
    number: '02',
    title: 'Consulting',
    description: 'Our experts analyze your processes and identify AI automation opportunities.',
    icon: Target,
    visual: 'logos',
  },
  {
    number: '03',
    title: 'Roadmap',
    description: 'We create a detailed implementation plan tailored to your goals and timeline.',
    icon: Map,
    visual: 'roadmap',
  },
  {
    number: '04',
    title: 'Integration & Development',
    description: 'Our team builds and integrates AI solutions seamlessly into your workflow.',
    icon: Code,
    visual: 'blocks',
  },
  {
    number: '05',
    title: 'Become an AI Leader',
    description: 'Transform your business with cutting-edge AI automation and scale effortlessly.',
    icon: Rocket,
    visual: 'dashboard',
  },
]

// 01. Chat Visual
const ChatVisual = ({ isHovered }: { isHovered: boolean; scrollProgress?: MotionValue<number> }) => {
  const messages = [
    { id: 1, side: 'left', text: 'How can AI help my business?', delay: 0 },
    { id: 2, side: 'right', text: 'Let me analyze your workflow...', delay: 0.8 },
    { id: 3, side: 'left', text: "That sounds great!", delay: 1.6 },
    { id: 4, side: 'right', text: "Let's schedule a call! 🚀", delay: 2.4 },
  ]
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [typing, setTyping] = useState<'left' | 'right' | null>(null)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    timeoutsRef.current.forEach((t) => clearTimeout(t))
    timeoutsRef.current = []
    if (isHovered) {
      setVisibleMessages([])
      setTyping(null)
      messages.forEach((msg) => {
        const typingT = setTimeout(() => {
          if (isHovered) setTyping(msg.side as 'left' | 'right')
        }, msg.delay * 1000)
        timeoutsRef.current.push(typingT)
        const msgT = setTimeout(() => {
          if (isHovered) {
            setTyping(null)
            setVisibleMessages((prev) => [...prev, msg.id])
            playSound('pop')
          }
        }, (msg.delay + 0.5) * 1000)
        timeoutsRef.current.push(msgT)
      })
    } else {
      setVisibleMessages([])
      setTyping(null)
    }
    return () => timeoutsRef.current.forEach((t) => clearTimeout(t))
  }, [isHovered])

  return (
    <div className="process-visual-box relative w-full h-44 rounded-xl overflow-hidden">
      <div className="absolute inset-0 p-4 space-y-2 overflow-hidden">
        <AnimatePresence>
          {messages.map((msg) => (
            <div key={msg.id}>
              {typing === msg.side && !visibleMessages.includes(msg.id) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex gap-2 items-start ${msg.side === 'right' ? 'justify-end' : ''}`}
                >
                  <div className={`flex gap-1 p-2 rounded-lg ${msg.side === 'right' ? 'bg-deployers-blue/40' : 'bg-deployers-blue/15'}`}>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                        className={`w-1.5 h-1.5 rounded-full ${msg.side === 'right' ? 'bg-deployers-blue' : 'bg-deployers-blue/70'}`}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              {visibleMessages.includes(msg.id) && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`flex gap-2 items-start ${msg.side === 'right' ? 'justify-end' : ''}`}
                >
                  {msg.side === 'left' && <div className="w-5 h-5 rounded-full bg-deployers-blue/40 flex-shrink-0" />}
                  <div className={`${msg.side === 'right' ? 'bg-deployers-blue/40 rounded-tr-none' : 'bg-deployers-blue/15 rounded-tl-none'} rounded-lg p-2 text-xs max-w-[75%] ${msg.side === 'right' ? 'text-white' : 'text-theme-text-muted'}`}>
                    {msg.text}
                  </div>
                  {msg.side === 'right' && <div className="w-5 h-5 rounded-full bg-deployers-blue/60 flex-shrink-0" />}
                </motion.div>
              )}
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

// 02. Logos Visual
const LogosVisual = ({ isHovered, scrollProgress }: { isHovered: boolean; scrollProgress?: MotionValue<number> }) => {
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null)
  const { theme } = useTheme()
  const isLight = theme === 'light'
  // Ligne plus rapide : atteint 100% à 35% du scroll (quand tu dépasses le 2e container elle est déjà passée)
  const lineX = scrollProgress ? useTransform(scrollProgress, [0, 0.35], ['0%', '100%']) : null
  const logosRow1 = [
    { name: 'OpenAI', Icon: SiOpenai, color: '#10a37f' },
    { name: 'Slack', Icon: SiSlack, color: '#4A154B' },
    { name: 'Stripe', Icon: SiStripe, color: '#635bff' },
    { name: 'GitHub', Icon: SiGithub, color: '#ffffff' },
    { name: 'Discord', Icon: SiDiscord, color: '#5865F2' },
    { name: 'Notion', Icon: SiNotion, color: '#ffffff' },
    { name: 'Vercel', Icon: SiVercel, color: '#ffffff' },
    { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
    { name: 'Google', Icon: SiGoogle, color: '#4285F4' },
    { name: 'WhatsApp', Icon: SiWhatsapp, color: '#25D366' },
  ]
  const logosRow2 = [
    { name: 'Zapier', Icon: SiZapier, color: '#FF4A00' },
    { name: 'Airtable', Icon: SiAirtable, color: '#18BFFF' },
    { name: 'HubSpot', Icon: SiHubspot, color: '#FF7A59' },
    { name: 'Shopify', Icon: SiShopify, color: '#96BF48' },
    { name: 'Twilio', Icon: SiTwilio, color: '#F22F46' },
    { name: 'Mailchimp', Icon: SiMailchimp, color: '#FFE01B' },
    { name: 'Asana', Icon: SiAsana, color: '#F06A6A' },
    { name: 'Trello', Icon: SiTrello, color: '#0052CC' },
    { name: 'Dropbox', Icon: SiDropbox, color: '#0061FF' },
    { name: 'LinkedIn', Icon: SiLinkedin, color: '#0A66C2' },
  ]
  const row1 = [...logosRow1, ...logosRow1, ...logosRow1]
  const row2 = [...logosRow2, ...logosRow2, ...logosRow2]

  return (
    <div className="process-visual-box logos-marquee-container relative w-full h-52 rounded-xl overflow-hidden flex flex-col items-center justify-center py-2">
      {/* Row 1: infinite scroll right → left, never stops — hauteur pour logo + scale + glow */}
      <div className="w-full h-[5.5rem] overflow-hidden flex items-center justify-center shrink-0">
        <div className="overflow-hidden h-full w-full flex items-center justify-center">
          <div key="logos-row1" className="logos-marquee-row1 flex gap-3 w-max items-center py-4" style={{ width: 'max-content' }}>
            {row1.map((logo, i) => {
              const key = `r1-${i}`
              const isLogoHovered = hoveredLogo === key
              return (
                <motion.div
                  key={key}
                  onMouseEnter={() => setHoveredLogo(key)}
                  onMouseLeave={() => setHoveredLogo(null)}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={`flex-shrink-0 w-10 h-10 rounded-lg border flex items-center justify-center cursor-pointer transition-colors duration-200 ${
                    isLogoHovered ? 'border-deployers-blue/50 bg-deployers-blue/20' : 'border-white/20 bg-white/[0.08]'
                  }`}
                  style={{
                    color: isLogoHovered ? logo.color : (isLight ? logo.color : 'rgba(255,255,255,0.65)'),
                    opacity: isLogoHovered ? 1 : (isLight ? 0.85 : 1),
                    boxShadow: isLogoHovered ? `0 0 24px ${logo.color}60` : (isLight ? `0 1px 4px ${logo.color}25` : '0 2px 8px rgba(0,0,0,0.15)'),
                  }}
                >
                  <logo.Icon className="w-5 h-5" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
      {/* Ligne glow entre les deux lignes — se déplace de gauche à droite avec le scroll */}
      <div className="h-4 shrink-0 relative flex items-center justify-center w-full px-2">
        <div
          className="absolute left-0 right-0 h-[2px] rounded-full opacity-70"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(127, 156, 245, 0.8) 50%, transparent 100%)',
            boxShadow: '0 0 12px rgba(127, 156, 245, 0.4)',
          }}
        />
        {lineX && (
          <motion.div
            className="absolute h-[3px] w-20 rounded-full pointer-events-none"
            style={{
              left: lineX,
              transform: 'translateX(-50%)',
              background: 'linear-gradient(90deg, transparent, rgba(127, 156, 245, 0.9), transparent)',
              boxShadow: '0 0 16px rgba(127, 156, 245, 0.6), 0 0 32px rgba(127, 156, 245, 0.3)',
            }}
          />
        )}
      </div>
      {/* Row 2: infinite scroll left → right, never stops */}
      <div className="w-full h-[5.5rem] overflow-hidden flex items-center justify-center shrink-0">
        <div className="overflow-hidden h-full w-full flex items-center justify-center">
          <div key="logos-row2" className="logos-marquee-row2 flex gap-3 w-max items-center py-4" style={{ width: 'max-content' }}>
          {row2.map((logo, i) => {
            const key = `r2-${i}`
            const isLogoHovered = hoveredLogo === key
            return (
              <motion.div
                key={key}
                onMouseEnter={() => setHoveredLogo(key)}
                onMouseLeave={() => setHoveredLogo(null)}
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`flex-shrink-0 w-10 h-10 rounded-lg border flex items-center justify-center cursor-pointer transition-colors duration-200 ${
                  isLogoHovered ? 'border-deployers-blue/50 bg-deployers-blue/20' : 'border-white/20 bg-white/[0.08]'
                }`}
                style={{
                  color: isLogoHovered ? logo.color : (isLight ? logo.color : 'rgba(255,255,255,0.65)'),
                  opacity: isLogoHovered ? 1 : (isLight ? 0.85 : 1),
                  boxShadow: isLogoHovered ? `0 0 24px ${logo.color}60` : (isLight ? `0 1px 4px ${logo.color}25` : '0 2px 8px rgba(0,0,0,0.15)'),
                }}
              >
                <logo.Icon className="w-5 h-5" />
              </motion.div>
            )
          })}
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-8 h-full z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--theme-process-visual-edge) 0%, transparent 100%)' }} />
      <div className="absolute top-0 right-0 w-8 h-full z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--theme-process-visual-edge) 0%, transparent 100%)' }} />
    </div>
  )
}

// 03. Roadmap Visual
const RoadmapVisual = ({ isHovered }: { isHovered: boolean; scrollProgress?: MotionValue<number> }) => {
  const phases = ['Discovery', 'Planning', 'Execution', 'Launch']
  const [progress, setProgress] = useState(0)
  const [activePhase, setActivePhase] = useState(-1)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    timeoutsRef.current.forEach((t) => clearTimeout(t))
    timeoutsRef.current = []
    if (isHovered) {
      setProgress(0)
      setActivePhase(-1)
      intervalRef.current = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? (clearInterval(intervalRef.current!), 100) : prev + 2))
      }, 40)
      phases.forEach((_, i) => {
        const t = setTimeout(() => {
          if (isHovered) {
            setActivePhase(i)
            playSound('success')
          }
        }, (i + 1) * 500)
        timeoutsRef.current.push(t)
      })
    } else {
      setProgress(0)
      setActivePhase(-1)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      timeoutsRef.current.forEach((t) => clearTimeout(t))
    }
  }, [isHovered])

  return (
    <div className="process-visual-box relative w-full h-44 rounded-xl overflow-hidden p-4">
      <div className="text-right mb-2">
        <motion.span className="text-2xl font-bold text-deployers-blue" key={progress}>{progress}%</motion.span>
      </div>
      <div className="relative h-2 bg-deployers-blue/20 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-deployers-blue to-deployers-light rounded-full shadow-[0_0_12px_rgba(127,156,245,0.5)]"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <div className="flex justify-between">
        {phases.map((phase, i) => (
          <motion.div
            key={phase}
            animate={{
              opacity: activePhase >= i ? 1 : 0.3,
              scale: activePhase === i ? 1.1 : 1,
            }}
            className="flex flex-col items-center gap-2"
          >
<motion.div
            animate={{
              backgroundColor: activePhase >= i ? 'rgba(127, 156, 245, 1)' : 'rgba(127, 156, 245, 0.2)',
              boxShadow: activePhase >= i ? '0 0 18px rgba(127, 156, 245, 0.7)' : '0 0 0 1px rgba(127, 156, 245, 0.25)',
            }}
            className="w-6 h-6 rounded-full flex items-center justify-center"
          >
            {activePhase >= i && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-white text-xs">✓</motion.span>}
            </motion.div>
            <span className={`text-[10px] font-medium ${activePhase >= i ? 'text-deployers-light' : 'text-theme-text-muted'}`}>{phase}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// 04. Blocks Visual
const BlocksVisual = ({ isHovered }: { isHovered: boolean; scrollProgress?: MotionValue<number> }) => {
  const blocks = [
    { id: 1, label: 'API', color: '#7F9CF5', x: -80, y: -40 },
    { id: 2, label: 'AI', color: '#10a37f', x: 80, y: -40 },
    { id: 3, label: 'DB', color: '#FF6B6B', x: -80, y: 40 },
    { id: 4, label: 'UI', color: '#9B59B6', x: 80, y: 40 },
  ]
  const [assembled, setAssembled] = useState(false)
  const [connected, setConnected] = useState(false)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    timeoutsRef.current.forEach((t) => clearTimeout(t))
    timeoutsRef.current = []
    if (isHovered) {
      setAssembled(false)
      setConnected(false)
      timeoutsRef.current.push(setTimeout(() => isHovered && (setAssembled(true), playSound('whoosh')), 100))
      timeoutsRef.current.push(setTimeout(() => isHovered && (setConnected(true), playSound('success')), 800))
    } else {
      setAssembled(false)
      setConnected(false)
    }
    return () => timeoutsRef.current.forEach((t) => clearTimeout(t))
  }, [isHovered])

  return (
    <div className="process-visual-box relative w-full h-44 rounded-xl overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 150">
          {connected && (
            <>
              <motion.line x1="70" y1="55" x2="100" y2="75" stroke="rgba(127, 156, 245, 0.85)" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
              <motion.line x1="130" y1="55" x2="100" y2="75" stroke="rgba(127, 156, 245, 0.85)" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.1 }} />
              <motion.line x1="70" y1="95" x2="100" y2="75" stroke="rgba(127, 156, 245, 0.85)" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.2 }} />
              <motion.line x1="130" y1="95" x2="100" y2="75" stroke="rgba(127, 156, 245, 0.85)" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.3 }} />
            </>
          )}
        </svg>
        <motion.div
          animate={{ scale: connected ? [1, 1.2, 1] : 1, boxShadow: connected ? '0 0 32px rgba(127, 156, 245, 0.9)' : '0 4px 12px rgba(127, 156, 245, 0.25)' }}
          transition={{ duration: 0.5 }}
          className="absolute w-10 h-10 rounded-lg bg-deployers-blue/50 border-2 border-deployers-blue flex items-center justify-center z-10"
        >
          <span className="text-xs font-bold text-white">🔗</span>
        </motion.div>
        {blocks.map((block, i) => (
          <motion.div
            key={block.id}
            initial={{ x: block.x * 2, y: block.y * 2, opacity: 0, scale: 0.5 }}
            animate={{
              x: assembled ? block.x * 0.5 : block.x * 2,
              y: assembled ? block.y * 0.5 : block.y * 2,
              opacity: assembled ? 1 : 0,
              scale: assembled ? 1 : 0.5,
              rotate: assembled ? 0 : 180,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.1 }}
            className="absolute w-12 h-12 rounded-lg border flex items-center justify-center"
            style={{
              backgroundColor: `${block.color}35`,
              borderColor: `${block.color}80`,
              borderWidth: '2px',
              boxShadow: connected ? `0 0 20px ${block.color}60` : `0 2px 8px ${block.color}25`,
            }}
          >
            <span className="text-xs font-bold" style={{ color: block.color }}>{block.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// 05. Dashboard Visual
const DashboardVisual = ({ isHovered }: { isHovered: boolean; scrollProgress?: MotionValue<number> }) => {
  const [efficiency, setEfficiency] = useState(0)
  const [growth, setGrowth] = useState(0)
  const [chartProgress, setChartProgress] = useState(0)
  const [notifications, setNotifications] = useState<string[]>([])
  const intervalsRef = useRef<NodeJS.Timeout[]>([])
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])
  const notificationsList = ['New client! 🎉', '+$10k revenue', 'Task completed ✓', 'AI deployed 🚀']

  useEffect(() => {
    intervalsRef.current.forEach((i) => clearInterval(i))
    timeoutsRef.current.forEach((t) => clearTimeout(t))
    intervalsRef.current = []
    timeoutsRef.current = []
    if (isHovered) {
      setEfficiency(0)
      setGrowth(0)
      setChartProgress(0)
      setNotifications([])
      const effId = setInterval(() => {
        setEfficiency((p) => {
          if (p >= 98) {
            clearInterval(effId)
            return 98
          }
          return p + 2
        })
      }, 30)
      const growthId = setInterval(() => {
        setGrowth((p) => {
          if (p >= 47) {
            clearInterval(growthId)
            return 47
          }
          return p + 1
        })
      }, 40)
      const chartId = setInterval(() => {
        setChartProgress((p) => {
          if (p >= 100) {
            clearInterval(chartId)
            return 100
          }
          return p + 2
        })
      }, 25)
      intervalsRef.current.push(effId, growthId, chartId)
      notificationsList.forEach((notif, i) => {
        timeoutsRef.current.push(setTimeout(() => isHovered && setNotifications((prev) => [...prev, notif]), 500 + i * 600))
      })
    } else {
      setEfficiency(0)
      setGrowth(0)
      setChartProgress(0)
      setNotifications([])
    }
    return () => {
      intervalsRef.current.forEach((i) => clearInterval(i))
      timeoutsRef.current.forEach((t) => clearTimeout(t))
    }
  }, [isHovered])

  return (
    <div className="process-visual-box relative w-full h-44 rounded-xl overflow-hidden p-3">
      <div className="grid grid-cols-3 gap-2 h-full">
        <div className="bg-deployers-blue/15 rounded-lg p-2 flex flex-col justify-center items-center border border-deployers-blue/25">
          <motion.div className="text-lg font-bold text-deployers-blue drop-shadow-[0_0_8px_rgba(127,156,245,0.5)]" key={efficiency}>{efficiency}%</motion.div>
          <div className="text-[8px] text-theme-text-muted font-medium">Efficiency</div>
        </div>
        <div className="bg-emerald-500/15 rounded-lg p-2 flex flex-col justify-center items-center border border-emerald-500/25">
          <motion.div className="text-lg font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" key={growth}>+{growth}%</motion.div>
          <div className="text-[8px] text-theme-text-muted font-medium">Growth</div>
        </div>
        <div className="bg-violet-500/15 rounded-lg p-2 flex flex-col justify-center items-center relative overflow-hidden border border-violet-500/25">
          <div className="text-lg font-bold text-violet-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]">24/7</div>
          <div className="text-[8px] text-theme-text-muted font-medium">Active</div>
          <AnimatePresence>
            {notifications.slice(-1).map((notif) => (
              <motion.div key={notif} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="absolute top-1 right-1 text-[6px] bg-emerald-500/35 text-emerald-300 font-medium px-1 py-0.5 rounded border border-emerald-500/40">
                {notif}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="col-span-3 bg-deployers-blue/10 rounded-lg p-2 border border-deployers-blue/20">
          <svg className="w-full h-12" viewBox="0 0 200 40" preserveAspectRatio="none">
            <motion.path
              d="M 0 35 Q 25 30, 50 25 T 100 15 T 150 10 T 200 5"
              fill="none"
              stroke="url(#dashGrad)"
              strokeWidth="2.5"
              style={{ filter: 'drop-shadow(0 0 6px rgba(127, 156, 245, 0.5))' }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: chartProgress / 100 }}
              transition={{ duration: 0.05 }}
            />
            <defs>
              <linearGradient id="dashGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7F9CF5" />
                <stop offset="100%" stopColor="#9EB3FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}

const visualComponents: Record<string, React.FC<{ isHovered: boolean; scrollProgress?: MotionValue<number> }>> = {
  chat: ChatVisual,
  logos: LogosVisual,
  roadmap: RoadmapVisual,
  blocks: BlocksVisual,
  dashboard: DashboardVisual,
}

// Glassmorphism process card with visual
function ProcessCard({
  step,
  index,
  fullWidth,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  scrollProgress,
}: {
  step: (typeof processSteps)[0]
  index: number
  fullWidth?: boolean
  isHovered?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  scrollProgress?: MotionValue<number>
}) {
  const Icon = step.icon
  const VisualComponent = visualComponents[step.visual]
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => {
        onMouseEnter?.()
        playSound('hover')
      }}
      onMouseLeave={onMouseLeave}
      whileHover={fullWidth ? undefined : { y: -8, transition: { duration: 0.3, type: 'spring', stiffness: 300, damping: 20 } }}
      className={`group relative rounded-2xl p-6 flex flex-col process-card backdrop-blur-[20px] ${
        fullWidth ? 'w-full min-h-[320px]' : 'flex-shrink-0 w-[340px] md:w-[380px] min-h-[420px]'
      }`}
    >
      <motion.div animate={{ opacity: isHovered ? 0.05 : 0 }} className="absolute inset-0 rounded-2xl bg-deployers-blue pointer-events-none" />
      <div className="relative z-10 mb-4">
        <VisualComponent isHovered={!!isHovered} scrollProgress={scrollProgress} />
      </div>
      <div className="flex items-start gap-4 mb-3">
        <motion.span
          animate={{ color: isHovered ? 'rgba(127, 156, 245, 0.95)' : 'rgba(127, 156, 245, 0.55)' }}
          className="text-3xl font-bold transition-colors duration-500 tabular-nums drop-shadow-[0_0_8px_rgba(127,156,245,0.3)]"
        >
          {step.number}
        </motion.span>
        <h3 className="text-xl font-bold text-theme-text group-hover:text-deployers-light transition-colors duration-300 pt-1 headline">
          {step.title}
        </h3>
      </div>
      <p className="text-theme-text-muted text-sm leading-relaxed pl-12 flex-1">{step.description}</p>
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-deployers-blue to-transparent rounded-b-2xl shadow-[0_0_12px_rgba(127,156,245,0.5)]"
      />
    </motion.div>
  )
}

// Desktop: Cinematic horizontal scroll with pinning
function ProcessSectionDesktop() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Foreground: cards move at full speed (right to left)
  const cardX = useTransform(scrollYProgress, [0, 1], [0, -2200])
  // Background layers at different speeds for parallax depth
  const bgXSlow = useTransform(scrollYProgress, [0, 1], [0, -350])
  const bgXMid = useTransform(scrollYProgress, [0, 1], [0, -700])
  const bgXFast = useTransform(scrollYProgress, [0, 1], [0, -180])
  // L-line: point de départ ancré au bord droit de la carte 5 (même cardX), le tracé se dessine au scroll
  const lLineOpacity = useTransform(scrollYProgress, [0.7, 0.78], [0, 1])
  const lLineDraw = useTransform(scrollYProgress, [0.72, 1], [1, 0])
  // Bord droit carte 5 ≈ 50vw - 180 + 4*(380+32) + 380 = 50vw + 1848 (en px depuis centre)
  const lLineOriginX = 1848

  return (
    <div ref={sectionRef} className="relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-theme-section">
        {/* Section title - fixed at top */}
        <div className="absolute top-0 left-0 right-0 z-20 px-6 pt-12 md:pt-16">
          <div className="max-w-7xl mx-auto flex justify-between items-start">
            <div className="relative">
              <div className="absolute inset-0 pointer-events-none select-none z-10" aria-hidden="true">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold headline text-shine-effect">
                  Our Process
                </h2>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-theme-text headline relative">
                Our Process
              </h2>
            </div>
            <p className="text-theme-text-muted text-sm hidden md:block max-w-[200px]">
              Scroll to explore
            </p>
          </div>
        </div>

        {/* Parallax background layers */}
        <div className="absolute inset-0">
          <motion.div style={{ x: bgXSlow }} className="absolute inset-0 pointer-events-none overflow-hidden">
            {['01', '02', '03', '04', '05'].map((num, i) => (
              <div
                key={num}
                className="absolute font-black text-[clamp(5rem,16vw,12rem)] leading-none tracking-tighter select-none"
                style={{ left: `${6 + i * 16}%`, top: `${12 + (i % 3) * 28}%`, color: 'var(--theme-process-numbers)' }}
              >
                {num}
              </div>
            ))}
          </motion.div>
          <motion.div style={{ x: bgXMid }} className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="absolute w-[200%] h-full" viewBox="0 0 800 400" fill="none" style={{ opacity: 'var(--theme-process-grid-opacity)' }}>
              <defs>
                <pattern id="process-grid" width="80" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 40" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#process-grid)" />
            </svg>
            <div className="absolute left-[28%] top-[18%] w-44 h-24 border border-white/[0.06] rounded-lg" />
            <div className="absolute left-[52%] top-[58%] w-28 h-28 border border-white/[0.05] rounded-full" />
            <div className="absolute left-[72%] top-[22%] w-36 h-18 border border-white/[0.05] rounded" />
          </motion.div>
          <motion.div style={{ x: bgXFast }} className="absolute inset-0 pointer-events-none overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className="absolute text-xl font-mono font-bold"
                style={{ color: 'var(--theme-process-numbers)', left: `${8 + (i - 1) * 16}%`, top: `${18 + (i % 5) * 16}%` }}
              >
                0{i}
              </span>
            ))}
          </motion.div>
        </div>

        {/* L-line: point de départ fixe (ancré au bord droit de la carte 5), seul le tracé se dessine au scroll */}
        <motion.div
          style={{
            opacity: lLineOpacity,
            left: '50%',
            marginLeft: lLineOriginX,
            width: '100vw',
            x: cardX,
          }}
          className="absolute bottom-0 pointer-events-none z-0"
          aria-hidden
        >
          <svg
            className="w-full h-[65vh] min-h-[280px]"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ display: 'block' }}
          >
            <defs>
              {/* Même style que la ligne entre les logos (conteneur 2) : transparent → lumineux → transparent */}
              <linearGradient id="l-line-grad" x1="0" y1="48" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(127, 156, 245, 0)" />
                <stop offset="12%" stopColor="rgba(127, 156, 245, 0.4)" />
                <stop offset="50%" stopColor="rgba(127, 156, 245, 0.9)" />
                <stop offset="88%" stopColor="rgba(127, 156, 245, 0.4)" />
                <stop offset="100%" stopColor="rgba(127, 156, 245, 0)" />
              </linearGradient>
              {/* Glow comme conteneur 2 : 0 0 16px + 0 0 32px */}
              <filter id="l-line-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
                <feMerge result="blur">
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* L: même rendu que le trait entre les logos (conteneur 2) */}
            <motion.path
              d="M 0 48 L 100 48 L 100 100"
              fill="none"
              stroke="url(#l-line-grad)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1"
              pathLength={1}
              style={{
                strokeDashoffset: lLineDraw,
                filter: 'url(#l-line-glow)',
              }}
            />
          </svg>
        </motion.div>

        {/* Foreground: horizontal card strip (au-dessus de la ligne) */}
        <div className="absolute inset-0 flex items-center z-10">
          <motion.div
            style={{ x: cardX }}
            className="flex gap-6 md:gap-8 pl-[max(1.5rem,calc(50vw-180px))] pr-8"
          >
            {processSteps.map((step, index) => (
              <ProcessCard
                key={step.number}
                step={step}
                index={index}
                isHovered={hoveredCard === step.number}
                onMouseEnter={() => setHoveredCard(step.number)}
                onMouseLeave={() => setHoveredCard(null)}
                scrollProgress={scrollYProgress}
              />
            ))}
          </motion.div>
        </div>

        {/* Gradient fades on edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 md:w-32 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to right, var(--theme-section) 0%, transparent 100%)',
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 md:w-32 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to left, var(--theme-section) 0%, transparent 100%)',
          }}
        />
      </div>
    </div>
  )
}

// Mobile: Clean vertical stack
function ProcessSectionMobile() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  return (
    <section id="process" className="relative px-6 py-20 bg-theme-section md:hidden">
      <div className="max-w-2xl mx-auto">
        <div className="relative mb-16">
          <div className="absolute inset-0 pointer-events-none select-none z-10" aria-hidden="true">
            <h2 className="text-5xl font-bold headline text-shine-effect">Our Process</h2>
          </div>
          <h2 className="text-5xl font-bold text-theme-text headline relative">Our Process</h2>
        </div>
        <div className="space-y-6">
          {processSteps.map((step, index) => (
            <ProcessCard
              key={step.number}
              step={step}
              index={index}
              fullWidth
              isHovered={hoveredCard === step.number}
              onMouseEnter={() => setHoveredCard(step.number)}
              onMouseLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}


export default function ProcessSection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) {
    return <ProcessSectionMobile />
  }

  return (
    <section id="process" className="relative bg-theme-section">
      <ProcessSectionDesktop />
    </section>
  )
}
