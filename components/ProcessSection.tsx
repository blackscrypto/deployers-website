'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Target, Map, Code, Rocket } from 'lucide-react'
import { useState, useRef, useEffect, useCallback } from 'react'
import { 
  SiSlack, SiDiscord, SiNotion, SiStripe, SiGithub, SiGoogle, 
  SiWhatsapp, SiOpenai, SiZapier, SiAirtable, SiFigma, SiVercel,
  SiHubspot, SiShopify, SiTwilio, SiMailchimp, SiAsana, SiTrello,
  SiDropbox, SiLinkedin
} from 'react-icons/si'

// Sound effects utility
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

// 01. Chat Visual - Messages appear on hover
const ChatVisual = ({ isHovered }: { isHovered: boolean }) => {
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
    // Clear all timeouts when hover state changes
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
    timeoutsRef.current = []

    if (isHovered) {
      setVisibleMessages([])
      setTyping(null)
      
      messages.forEach((msg) => {
        // Show typing indicator
        const typingTimeout = setTimeout(() => {
          if (isHovered) {
            setTyping(msg.side as 'left' | 'right')
            playSound('pop')
          }
        }, msg.delay * 1000)
        timeoutsRef.current.push(typingTimeout)
        
        // Show message
        const messageTimeout = setTimeout(() => {
          if (isHovered) {
            setTyping(null)
            setVisibleMessages(prev => [...prev, msg.id])
            playSound('pop')
          }
        }, (msg.delay + 0.5) * 1000)
        timeoutsRef.current.push(messageTimeout)
      })
    } else {
      setVisibleMessages([])
      setTyping(null)
    }

    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
    }
  }, [isHovered])

  return (
    <div className="relative w-full h-44 bg-gradient-to-br from-white/[0.02] to-transparent rounded-xl overflow-hidden border border-white/[0.05]">
      <div className="absolute inset-0 p-4 space-y-2 overflow-hidden">
        <AnimatePresence>
          {messages.map((msg) => (
            <div key={msg.id}>
              {/* Typing indicator */}
              {typing === msg.side && !visibleMessages.includes(msg.id) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex gap-2 items-start ${msg.side === 'right' ? 'justify-end' : ''}`}
                >
                  <div className={`flex gap-1 p-2 rounded-lg ${msg.side === 'right' ? 'bg-deployers-blue/20' : 'bg-white/[0.05]'}`}>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                        className={`w-1.5 h-1.5 rounded-full ${msg.side === 'right' ? 'bg-deployers-blue' : 'bg-slate-400'}`}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Message */}
              {visibleMessages.includes(msg.id) && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`flex gap-2 items-start ${msg.side === 'right' ? 'justify-end' : ''}`}
                >
                  {msg.side === 'left' && <div className="w-5 h-5 rounded-full bg-deployers-blue/30 flex-shrink-0" />}
                  <div className={`${msg.side === 'right' ? 'bg-deployers-blue/20 rounded-tr-none' : 'bg-white/[0.05] rounded-tl-none'} rounded-lg p-2 text-xs max-w-[75%] ${msg.side === 'right' ? 'text-deployers-light' : 'text-slate-400'}`}>
                    {msg.text}
                  </div>
                  {msg.side === 'right' && <div className="w-5 h-5 rounded-full bg-deployers-blue/50 flex-shrink-0" />}
                </motion.div>
              )}
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

// 02. Logos Marquee Visual
const LogosVisual = ({ isHovered }: { isHovered: boolean }) => {
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null)
  
  // Row 1 logos with real icons
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
  
  // Row 2 logos (different set)
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
    <div className="relative w-full h-44 bg-gradient-to-br from-white/[0.02] to-transparent rounded-xl border border-white/[0.05] overflow-hidden">
      {/* Row 1 - moves right */}
      <div className="absolute top-5 left-0 right-0 h-12">
        <motion.div
          animate={{ x: isHovered ? [0, -640] : 0 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-3"
        >
          {row1.map((logo, i) => (
            <motion.div
              key={`row1-${i}`}
              onMouseEnter={() => {
                setHoveredLogo(`row1-${i}`)
                playSound('hover')
              }}
              onMouseLeave={() => setHoveredLogo(null)}
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`flex-shrink-0 w-10 h-10 rounded-lg border flex items-center justify-center cursor-pointer transition-all duration-200 ${
                hoveredLogo === `row1-${i}`
                  ? 'border-white/30 bg-white/10'
                  : 'border-white/[0.05] bg-white/[0.02]'
              }`}
              style={{
                color: hoveredLogo === `row1-${i}` ? logo.color : 'rgba(255,255,255,0.3)',
                boxShadow: hoveredLogo === `row1-${i}` ? `0 0 20px ${logo.color}40` : 'none',
              }}
            >
              <logo.Icon className="w-5 h-5" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - moves left */}
      <div className="absolute top-[72px] left-0 right-0 h-12">
        <motion.div
          animate={{ x: isHovered ? [-640, 0] : -320 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="flex gap-3"
        >
          {row2.map((logo, i) => (
            <motion.div
              key={`row2-${i}`}
              onMouseEnter={() => {
                setHoveredLogo(`row2-${i}`)
                playSound('hover')
              }}
              onMouseLeave={() => setHoveredLogo(null)}
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`flex-shrink-0 w-10 h-10 rounded-lg border flex items-center justify-center cursor-pointer transition-all duration-200 ${
                hoveredLogo === `row2-${i}`
                  ? 'border-white/30 bg-white/10'
                  : 'border-white/[0.05] bg-white/[0.02]'
              }`}
              style={{
                color: hoveredLogo === `row2-${i}` ? logo.color : 'rgba(255,255,255,0.3)',
                boxShadow: hoveredLogo === `row2-${i}` ? `0 0 20px ${logo.color}40` : 'none',
              }}
            >
              <logo.Icon className="w-5 h-5" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Fade edges */}
      <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" />
    </div>
  )
}

// 03. Roadmap Visual - Progress bar on hover
const RoadmapVisual = ({ isHovered }: { isHovered: boolean }) => {
  const phases = ['Discovery', 'Planning', 'Execution', 'Launch']
  const [progress, setProgress] = useState(0)
  const [activePhase, setActivePhase] = useState(-1)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    // Clear all timers when hover state changes
    if (intervalRef.current) clearInterval(intervalRef.current)
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
    timeoutsRef.current = []

    if (isHovered) {
      setProgress(0)
      setActivePhase(-1)
      
      // Animate progress
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            return 100
          }
          return prev + 2
        })
      }, 40)

      // Activate phases
      phases.forEach((_, i) => {
        const timeout = setTimeout(() => {
          if (isHovered) {
            setActivePhase(i)
            playSound('success')
          }
        }, (i + 1) * 500)
        timeoutsRef.current.push(timeout)
      })
    } else {
      setProgress(0)
      setActivePhase(-1)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
    }
  }, [isHovered])

  return (
    <div className="relative w-full h-44 bg-gradient-to-br from-white/[0.02] to-transparent rounded-xl overflow-hidden border border-white/[0.05] p-4">
      {/* Progress percentage */}
      <div className="text-right mb-2">
        <motion.span 
          className="text-2xl font-bold text-deployers-blue"
          key={progress}
        >
          {progress}%
        </motion.span>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-white/[0.05] rounded-full mb-6 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-deployers-blue to-deployers-light rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
        {/* Glow effect */}
        <motion.div
          className="absolute top-0 h-full w-8 bg-white/50 blur-sm rounded-full"
          style={{ left: `${progress - 4}%` }}
        />
      </div>

      {/* Phases */}
      <div className="flex justify-between">
        {phases.map((phase, i) => (
          <motion.div
            key={phase}
            initial={{ opacity: 0.3 }}
            animate={{ 
              opacity: activePhase >= i ? 1 : 0.3,
              scale: activePhase === i ? 1.1 : 1,
            }}
            className="flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{
                backgroundColor: activePhase >= i ? 'rgba(127, 156, 245, 1)' : 'rgba(255, 255, 255, 0.1)',
                boxShadow: activePhase >= i ? '0 0 15px rgba(127, 156, 245, 0.6)' : 'none',
              }}
              className="w-6 h-6 rounded-full flex items-center justify-center"
            >
              {activePhase >= i && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-white text-xs"
                >
                  ✓
                </motion.span>
              )}
            </motion.div>
            <span className={`text-[10px] ${activePhase >= i ? 'text-deployers-light' : 'text-slate-500'}`}>
              {phase}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Connection lines */}
      <div className="absolute top-[72px] left-[40px] right-[40px] h-[2px] flex justify-between">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="flex-1 mx-1"
            animate={{
              backgroundColor: activePhase > i ? 'rgba(127, 156, 245, 0.5)' : 'rgba(255, 255, 255, 0.05)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// 04. Blocks Visual - Blocks assembling
const BlocksVisual = ({ isHovered }: { isHovered: boolean }) => {
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
    // Clear all timeouts when hover state changes
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
    timeoutsRef.current = []

    if (isHovered) {
      setAssembled(false)
      setConnected(false)
      
      const assembleTimeout = setTimeout(() => {
        if (isHovered) {
          setAssembled(true)
          playSound('whoosh')
        }
      }, 100)
      timeoutsRef.current.push(assembleTimeout)
      
      const connectTimeout = setTimeout(() => {
        if (isHovered) {
          setConnected(true)
          playSound('success')
        }
      }, 800)
      timeoutsRef.current.push(connectTimeout)
    } else {
      setAssembled(false)
      setConnected(false)
    }

    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
    }
  }, [isHovered])

  return (
    <div className="relative w-full h-44 bg-gradient-to-br from-white/[0.02] to-transparent rounded-xl overflow-hidden border border-white/[0.05]">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 150">
          {connected && (
            <>
              <motion.line
                x1="70" y1="55" x2="100" y2="75"
                stroke="rgba(127, 156, 245, 0.5)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.line
                x1="130" y1="55" x2="100" y2="75"
                stroke="rgba(127, 156, 245, 0.5)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
              <motion.line
                x1="70" y1="95" x2="100" y2="75"
                stroke="rgba(127, 156, 245, 0.5)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              />
              <motion.line
                x1="130" y1="95" x2="100" y2="75"
                stroke="rgba(127, 156, 245, 0.5)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              />
            </>
          )}
        </svg>

        {/* Center node */}
        <motion.div
          animate={{
            scale: connected ? [1, 1.2, 1] : 1,
            boxShadow: connected ? '0 0 30px rgba(127, 156, 245, 0.8)' : '0 0 0px rgba(127, 156, 245, 0)',
          }}
          transition={{ duration: 0.5 }}
          className="absolute w-10 h-10 rounded-lg bg-deployers-blue/30 border border-deployers-blue flex items-center justify-center z-10"
        >
          <span className="text-xs font-bold text-white">🔗</span>
        </motion.div>

        {/* Blocks */}
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
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: i * 0.1,
            }}
            className="absolute w-12 h-12 rounded-lg border flex items-center justify-center"
            style={{
              backgroundColor: `${block.color}20`,
              borderColor: `${block.color}50`,
              boxShadow: connected ? `0 0 15px ${block.color}40` : 'none',
            }}
          >
            <span className="text-xs font-bold" style={{ color: block.color }}>
              {block.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// 05. Dashboard Visual - Animated counters
const DashboardVisual = ({ isHovered }: { isHovered: boolean }) => {
  const [efficiency, setEfficiency] = useState(0)
  const [growth, setGrowth] = useState(0)
  const [chartProgress, setChartProgress] = useState(0)
  const [notifications, setNotifications] = useState<string[]>([])
  const intervalsRef = useRef<NodeJS.Timeout[]>([])
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  const notificationsList = ['New client! 🎉', '+$10k revenue', 'Task completed ✓', 'AI deployed 🚀']

  useEffect(() => {
    // Clear all timers when hover state changes
    intervalsRef.current.forEach(interval => clearInterval(interval))
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
    intervalsRef.current = []
    timeoutsRef.current = []

    if (isHovered) {
      setEfficiency(0)
      setGrowth(0)
      setChartProgress(0)
      setNotifications([])

      // Animate efficiency
      const effInterval = setInterval(() => {
        setEfficiency(prev => {
          if (prev >= 98) {
            clearInterval(effInterval)
            return 98
          }
          return prev + 2
        })
      }, 30)
      intervalsRef.current.push(effInterval)

      // Animate growth
      const growthInterval = setInterval(() => {
        setGrowth(prev => {
          if (prev >= 47) {
            clearInterval(growthInterval)
            return 47
          }
          return prev + 1
        })
      }, 40)
      intervalsRef.current.push(growthInterval)

      // Animate chart
      const chartInterval = setInterval(() => {
        setChartProgress(prev => {
          if (prev >= 100) {
            clearInterval(chartInterval)
            return 100
          }
          return prev + 2
        })
      }, 25)
      intervalsRef.current.push(chartInterval)

      // Show notifications
      notificationsList.forEach((notif, i) => {
        const timeout = setTimeout(() => {
          if (isHovered) {
            setNotifications(prev => [...prev, notif])
            playSound('pop')
          }
        }, 500 + i * 600)
        timeoutsRef.current.push(timeout)
      })
    } else {
      setEfficiency(0)
      setGrowth(0)
      setChartProgress(0)
      setNotifications([])
    }

    return () => {
      intervalsRef.current.forEach(interval => clearInterval(interval))
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
    }
  }, [isHovered])

  return (
    <div className="relative w-full h-44 bg-gradient-to-br from-white/[0.02] to-transparent rounded-xl overflow-hidden border border-white/[0.05] p-3">
      <div className="grid grid-cols-3 gap-2 h-full">
        {/* Stats cards */}
        <div className="bg-white/[0.03] rounded-lg p-2 flex flex-col justify-center items-center">
          <motion.div 
            className="text-lg font-bold text-deployers-blue"
            key={efficiency}
          >
            {efficiency}%
          </motion.div>
          <div className="text-[8px] text-slate-500">Efficiency</div>
        </div>
        <div className="bg-white/[0.03] rounded-lg p-2 flex flex-col justify-center items-center">
          <motion.div 
            className="text-lg font-bold text-green-400"
            key={growth}
          >
            +{growth}%
          </motion.div>
          <div className="text-[8px] text-slate-500">Growth</div>
        </div>
        <div className="bg-white/[0.03] rounded-lg p-2 flex flex-col justify-center items-center relative overflow-hidden">
          <div className="text-lg font-bold text-purple-400">24/7</div>
          <div className="text-[8px] text-slate-500">Active</div>
          
          {/* Notifications popup */}
          <AnimatePresence>
            {notifications.slice(-1).map((notif, i) => (
              <motion.div
                key={notif}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="absolute top-1 right-1 text-[6px] bg-green-500/20 text-green-400 px-1 py-0.5 rounded"
              >
                {notif}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mini chart */}
        <div className="col-span-3 bg-white/[0.03] rounded-lg p-2">
          <svg className="w-full h-12" viewBox="0 0 200 40" preserveAspectRatio="none">
            <motion.path
              d="M 0 35 Q 25 30, 50 25 T 100 15 T 150 10 T 200 5"
              fill="none"
              stroke="url(#dashGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: chartProgress / 100 }}
              transition={{ duration: 0.05 }}
            />
            {/* Glow dot at end */}
            {chartProgress > 10 && (
              <motion.circle
                cx={chartProgress * 2}
                cy={35 - (chartProgress * 0.3)}
                r="3"
                fill="#7F9CF5"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
            <defs>
              <linearGradient id="dashGradient" x1="0%" y1="0%" x2="100%" y2="0%">
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

const visualComponents: { [key: string]: React.FC<{ isHovered: boolean }> } = {
  chat: ChatVisual,
  logos: LogosVisual,
  roadmap: RoadmapVisual,
  blocks: BlocksVisual,
  dashboard: DashboardVisual,
}

export default function ProcessSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section id="process" className="relative px-6 py-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", stiffness: 70, damping: 20 }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            Our Process
          </h2>
        </motion.div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, index) => {
            const VisualComponent = visualComponents[step.visual]
            const isHovered = hoveredCard === step.number
            
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 70,
                  damping: 20,
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 20 },
                }}
                onMouseEnter={() => {
                  setHoveredCard(step.number)
                  playSound('hover')
                }}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-white/[0.01] backdrop-blur-sm border border-white/[0.03] rounded-2xl p-6 hover:border-deployers-blue/20 transition-all duration-500"
              >
                {/* Glow effect on hover */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 0.05 : 0,
                  }}
                  className="absolute inset-0 rounded-2xl bg-deployers-blue"
                />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Visual */}
                  <div className="mb-6">
                    <VisualComponent isHovered={isHovered} />
                  </div>

                  {/* Number & Title Row */}
                  <div className="flex items-start gap-4 mb-3">
                    <motion.span
                      animate={{
                        color: isHovered ? 'rgba(127, 156, 245, 0.7)' : 'rgba(127, 156, 245, 0.3)',
                      }}
                      className="text-3xl font-bold transition-colors duration-500"
                    >
                      {step.number}
                    </motion.span>
                    <h3 className="text-xl font-bold text-white group-hover:text-deployers-light transition-colors duration-300 pt-1">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed pl-12">
                    {step.description}
                  </p>
                </div>

                {/* Bottom glow line */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 1 : 0,
                  }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-deployers-blue/50 to-transparent"
                />
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Ambient background effects */}
      <motion.div
        animate={{
          opacity: [0.08, 0.15, 0.08],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-deployers-blue/10 rounded-full blur-[120px] pointer-events-none"
      />
    </section>
  )
}
