'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Search, GraduationCap, Bot, ArrowUpRight, Check, Zap, AlertCircle, TrendingUp, Target, Sparkles, Trophy, BarChart3 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

// Sound effects utility with different tones per service
const playServiceSound = (type: 'audit' | 'training' | 'solutions' | 'success') => {
  if (typeof window === 'undefined') return
  
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  switch (type) {
    case 'audit':
      // Deep analytical tone
      oscillator.frequency.value = 440
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.03, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15)
      break
    case 'training':
      // Uplifting learning tone
      oscillator.frequency.value = 523.25
      oscillator.type = 'triangle'
      gainNode.gain.setValueAtTime(0.03, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.12)
      break
    case 'solutions':
      // Tech/futuristic tone
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

const services = [
  {
    id: 'audit',
    title: 'Audit & Strategy',
    description: 'We analyze your current processes and identify AI automation opportunities to maximize your ROI.',
    icon: Search,
    color: '#3B82F6', // Blue
    glowColor: 'rgba(59, 130, 246, 0.4)',
    cursor: '🔍',
  },
  {
    id: 'training',
    title: 'Training',
    description: 'Empower your team with hands-on AI training and workshops tailored to your industry.',
    icon: GraduationCap,
    color: '#8B5CF6', // Violet
    glowColor: 'rgba(139, 92, 246, 0.4)',
    cursor: '📚',
  },
  {
    id: 'solutions',
    title: 'AI Solutions',
    description: 'Custom AI agents, chatbots, and automation systems built specifically for your business needs.',
    icon: Bot,
    color: '#06B6D4', // Cyan
    glowColor: 'rgba(6, 182, 212, 0.4)',
    cursor: '🤖',
  },
]

// 1. Audit Visual - Scan/Analyze in real-time
const AuditVisual = ({ isHovered }: { isHovered: boolean }) => {
  const [scanProgress, setScanProgress] = useState(0)
  const [score, setScore] = useState(0)
  const [items, setItems] = useState([
    { id: 1, name: 'Process Efficiency', status: 'pending', value: 0 },
    { id: 2, name: 'Data Quality', status: 'pending', value: 0 },
    { id: 3, name: 'Automation Potential', status: 'pending', value: 0 },
    { id: 4, name: 'Cost Optimization', status: 'pending', value: 0 },
  ])
  const intervalsRef = useRef<NodeJS.Timeout[]>([])
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    intervalsRef.current.forEach(i => clearInterval(i))
    timeoutsRef.current.forEach(t => clearTimeout(t))
    intervalsRef.current = []
    timeoutsRef.current = []

    if (isHovered) {
      setScanProgress(0)
      setScore(0)
      setItems(items.map(item => ({ ...item, status: 'pending', value: 0 })))

      // Scan line animation
      const scanInterval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(scanInterval)
            return 100
          }
          return prev + 2
        })
      }, 30)
      intervalsRef.current.push(scanInterval)

      // Analyze items one by one
      items.forEach((item, index) => {
        const timeout = setTimeout(() => {
          if (isHovered) {
            const value = 60 + Math.floor(Math.random() * 35)
            const status = value > 80 ? 'good' : value > 60 ? 'warning' : 'bad'
            setItems(prev => prev.map((it, i) => 
              i === index ? { ...it, status, value } : it
            ))
            playServiceSound('audit')
          }
        }, 400 + index * 500)
        timeoutsRef.current.push(timeout)
      })

      // Final score
      const scoreTimeout = setTimeout(() => {
        if (isHovered) {
          const scoreInterval = setInterval(() => {
            setScore(prev => {
              if (prev >= 73) {
                clearInterval(scoreInterval)
                playServiceSound('success')
                return 73
              }
              return prev + 1
            })
          }, 20)
          intervalsRef.current.push(scoreInterval)
        }
      }, 2200)
      timeoutsRef.current.push(scoreTimeout)

    } else {
      setScanProgress(0)
      setScore(0)
      setItems(items.map(item => ({ ...item, status: 'pending', value: 0 })))
    }

    return () => {
      intervalsRef.current.forEach(i => clearInterval(i))
      timeoutsRef.current.forEach(t => clearTimeout(t))
    }
  }, [isHovered])

  return (
    <div className="relative w-full h-52 bg-gradient-to-br from-blue-500/[0.03] to-transparent rounded-xl overflow-hidden border border-blue-500/10">
      {/* Scan line */}
      <motion.div
        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        style={{ top: `${scanProgress}%` }}
        animate={{ opacity: scanProgress < 100 ? [0.5, 1, 0.5] : 0 }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />

      <div className="p-4 space-y-2">
        {/* Items being analyzed */}
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: item.status !== 'pending' ? 1 : 0.3 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              {item.status === 'pending' && <div className="w-4 h-4 rounded-full bg-white/10" />}
              {item.status === 'good' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
              {item.status === 'warning' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center">
                  <AlertCircle className="w-3 h-3 text-white" />
                </motion.div>
              )}
              {item.status === 'bad' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 rounded-full bg-red-500" />
              )}
              <span className={`text-xs ${item.status !== 'pending' ? 'text-white' : 'text-slate-500'}`}>
                {item.name}
              </span>
            </div>
            {item.value > 0 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-xs font-bold ${
                  item.value > 80 ? 'text-green-400' : item.value > 60 ? 'text-yellow-400' : 'text-red-400'
                }`}
              >
                {item.value}%
              </motion.span>
            )}
          </motion.div>
        ))}

        {/* AI Readiness Score */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: score > 0 ? 1 : 0 }}
          className="mt-4 pt-3 border-t border-white/10"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">AI Readiness Score</span>
            <motion.span 
              className="text-2xl font-bold text-blue-400"
              animate={{ scale: score === 73 ? [1, 1.1, 1] : 1 }}
            >
              {score}%
            </motion.span>
          </div>
          <div className="h-2 bg-white/5 rounded-full mt-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
              style={{ width: `${score}%` }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// 2. Training Visual - Modules that stack/unlock
const TrainingVisual = ({ isHovered }: { isHovered: boolean }) => {
  const modules = [
    { id: 1, name: 'AI Fundamentals', icon: Target, unlocked: false },
    { id: 2, name: 'Prompt Engineering', icon: Sparkles, unlocked: false },
    { id: 3, name: 'Automation Tools', icon: Zap, unlocked: false },
    { id: 4, name: 'Advanced AI', icon: Trophy, unlocked: false },
  ]

  const [unlockedModules, setUnlockedModules] = useState<number[]>([])
  const [progress, setProgress] = useState(0)
  const [showBadges, setShowBadges] = useState(false)
  const [scrollOffset, setScrollOffset] = useState(0)
  const [finalZoom, setFinalZoom] = useState(false)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])
  const intervalsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    timeoutsRef.current.forEach(t => clearTimeout(t))
    intervalsRef.current.forEach(i => clearInterval(i))
    timeoutsRef.current = []
    intervalsRef.current = []

    if (isHovered) {
      setUnlockedModules([])
      setProgress(0)
      setShowBadges(false)
      setScrollOffset(0)
      setFinalZoom(false)

      // Unlock modules progressively with scroll effect
      modules.forEach((module, index) => {
        const timeout = setTimeout(() => {
          if (isHovered) {
            setUnlockedModules(prev => [...prev, module.id])
            playServiceSound('training')
            // Scroll down progressively (22px per module)
            setScrollOffset(index * 22)
          }
        }, 300 + index * 400)
        timeoutsRef.current.push(timeout)
      })

      // Progress bar
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + 2
        })
      }, 30)
      intervalsRef.current.push(progressInterval)

      // Final zoom out to show everything
      const zoomTimeout = setTimeout(() => {
        if (isHovered) {
          setFinalZoom(true)
          playServiceSound('success')
        }
      }, 1900)
      timeoutsRef.current.push(zoomTimeout)

      // Show badges
      const badgeTimeout = setTimeout(() => {
        if (isHovered) {
          setShowBadges(true)
        }
      }, 2000)
      timeoutsRef.current.push(badgeTimeout)

    } else {
      setUnlockedModules([])
      setProgress(0)
      setShowBadges(false)
      setScrollOffset(0)
      setFinalZoom(false)
    }

    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t))
      intervalsRef.current.forEach(i => clearInterval(i))
    }
  }, [isHovered])

  return (
    <div className="relative w-full h-52 bg-gradient-to-br from-violet-500/[0.03] to-transparent rounded-xl overflow-hidden border border-violet-500/10 p-4">
      <motion.div
        animate={{
          y: finalZoom ? -40 : -scrollOffset,
          scale: finalZoom ? 0.85 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="origin-center"
      >
        {/* Learning Path label */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-slate-400">Learning Path</span>
          <span className="text-xs text-violet-400 font-bold">{progress}%</span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-white/5 rounded-full mb-4 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Modules */}
        <div className="space-y-2">
        {modules.map((module, index) => {
          const isUnlocked = unlockedModules.includes(module.id)
          const ModuleIcon = module.icon
          return (
            <motion.div
              key={module.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ 
                x: isUnlocked ? 0 : -20, 
                opacity: isUnlocked ? 1 : 0.3,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                isUnlocked ? 'bg-violet-500/10 border border-violet-500/20' : 'bg-white/[0.02]'
              }`}
            >
              <motion.div
                animate={{ 
                  scale: isUnlocked ? [1, 1.15, 1] : 1,
                  rotate: isUnlocked ? [0, 5, 0] : 0,
                }}
                className="relative w-6 h-6 flex items-center justify-center"
              >
                {isUnlocked ? (
                  <>
                    {/* Glow effect */}
                    <motion.div
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/50 to-purple-500/50 blur-md"
                    />
                    <ModuleIcon className="w-4 h-4 text-violet-400 relative z-10" style={{ 
                      filter: 'drop-shadow(0 0 4px rgba(139, 92, 246, 0.6))'
                    }} />
                  </>
                ) : (
                  <div className="w-3 h-3 rounded-full bg-white/20 border border-white/30" />
                )}
              </motion.div>
              <span className={`text-xs ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>
                {module.name}
              </span>
              {isUnlocked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto"
                >
                  <Check className="w-4 h-4 text-violet-400" />
                </motion.div>
              )}
            </motion.div>
          )
        })}
        </div>

        {/* Badges earned */}
        <AnimatePresence>
          {showBadges && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-3 right-3 flex gap-2"
          >
            {[Target, Sparkles, Zap, Trophy].map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="relative w-6 h-6 flex items-center justify-center"
              >
                <motion.div
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/60 to-purple-500/60 blur-sm"
                />
                <Icon className="w-4 h-4 text-violet-400 relative z-10" style={{ 
                  filter: 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.8))'
                }} />
              </motion.div>
            ))}
          </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

// 3. AI Solutions Visual - Workflow that builds
const SolutionsVisual = ({ isHovered }: { isHovered: boolean }) => {
  const [stage, setStage] = useState(0) // 0: nothing, 1: input, 2: processing, 3: output
  const [dataFlowing, setDataFlowing] = useState(false)
  const [result, setResult] = useState(false)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    timeoutsRef.current.forEach(t => clearTimeout(t))
    timeoutsRef.current = []

    if (isHovered) {
      setStage(0)
      setDataFlowing(false)
      setResult(false)

      // Stage 1: Input appears
      const t1 = setTimeout(() => {
        if (isHovered) {
          setStage(1)
          playServiceSound('solutions')
        }
      }, 200)
      timeoutsRef.current.push(t1)

      // Stage 2: Processing
      const t2 = setTimeout(() => {
        if (isHovered) {
          setStage(2)
          setDataFlowing(true)
          playServiceSound('solutions')
        }
      }, 600)
      timeoutsRef.current.push(t2)

      // Stage 3: Output
      const t3 = setTimeout(() => {
        if (isHovered) {
          setStage(3)
          playServiceSound('solutions')
        }
      }, 1200)
      timeoutsRef.current.push(t3)

      // Result
      const t4 = setTimeout(() => {
        if (isHovered) {
          setResult(true)
          playServiceSound('success')
        }
      }, 1800)
      timeoutsRef.current.push(t4)

    } else {
      setStage(0)
      setDataFlowing(false)
      setResult(false)
    }

    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t))
    }
  }, [isHovered])

  return (
    <div className="relative w-full h-52 bg-gradient-to-br from-cyan-500/[0.03] to-transparent rounded-xl overflow-hidden border border-cyan-500/10 p-4">
      <div className="flex items-center justify-between h-full">
        {/* Input Block */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ 
            opacity: stage >= 1 ? 1 : 0.2,
            x: stage >= 1 ? 0 : -20,
            scale: stage >= 1 ? 1 : 0.9,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`w-20 h-24 rounded-lg border flex flex-col items-center justify-center gap-1 ${
            stage >= 1 ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-white/[0.02] border-white/10'
          }`}
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            {stage >= 1 && (
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/50 to-blue-500/50 blur-md"
              />
            )}
            <BarChart3 className={`w-5 h-5 relative z-10 ${stage >= 1 ? 'text-cyan-400' : 'text-slate-600'}`} style={{ 
              filter: stage >= 1 ? 'drop-shadow(0 0 4px rgba(6, 182, 212, 0.6))' : 'none'
            }} />
          </div>
          <span className="text-[10px] text-slate-400">Input</span>
          <span className="text-[8px] text-cyan-400">Data</span>
        </motion.div>

        {/* Connection line with gradient flow */}
        <div className="flex-1 h-[2px] mx-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10" />
          {dataFlowing && (
            <motion.div
              animate={{ 
                x: ['-100%', '100%'],
              }}
              transition={{ 
                duration: 1.2, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0 w-full h-full"
              style={{
                background: 'linear-gradient(to right, transparent 0%, rgba(6, 182, 212, 0.8) 50%, transparent 100%)',
              }}
            />
          )}
        </div>

        {/* AI Processing Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: stage >= 2 ? 1 : 0.2,
            scale: stage >= 2 ? 1 : 0.8,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`w-24 h-28 rounded-lg border flex flex-col items-center justify-center gap-1 relative ${
            stage >= 2 ? 'bg-cyan-500/20 border-cyan-500/50' : 'bg-white/[0.02] border-white/10'
          }`}
        >
          {/* Pulsing effect when processing */}
          {stage === 2 && (
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 rounded-lg bg-cyan-500/20"
            />
          )}
          <div className="relative w-10 h-10 flex items-center justify-center">
            {stage >= 2 && (
              <motion.div
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/60 to-blue-500/60 blur-lg"
              />
            )}
            <motion.div
              animate={{ rotate: stage === 2 ? 360 : 0 }}
              transition={{ duration: 2, repeat: stage === 2 ? Infinity : 0, ease: "linear" }}
              className="relative z-10"
            >
              <Bot className={`w-7 h-7 ${stage >= 2 ? 'text-cyan-400' : 'text-slate-600'}`} style={{ 
                filter: stage >= 2 ? 'drop-shadow(0 0 6px rgba(6, 182, 212, 0.8))' : 'none'
              }} />
            </motion.div>
          </div>
          <span className="text-[10px] text-white relative z-10">AI Agent</span>
          {stage === 2 && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-[8px] text-cyan-400"
            >
              Processing...
            </motion.span>
          )}
        </motion.div>

        {/* Connection line with gradient flow */}
        <div className="flex-1 h-[2px] mx-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10" />
          {stage >= 3 && (
            <motion.div
              animate={{ 
                x: ['-100%', '100%'],
              }}
              transition={{ 
                duration: 1.2, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0 w-full h-full"
              style={{
                background: 'linear-gradient(to right, transparent 0%, rgba(34, 197, 94, 0.8) 50%, transparent 100%)',
              }}
            />
          )}
        </div>

        {/* Output Block */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ 
            opacity: stage >= 3 ? 1 : 0.2,
            x: stage >= 3 ? 0 : 20,
            scale: stage >= 3 ? 1 : 0.9,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`w-20 h-24 rounded-lg border flex flex-col items-center justify-center gap-1 ${
            stage >= 3 ? 'bg-green-500/10 border-green-500/30' : 'bg-white/[0.02] border-white/10'
          }`}
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            {stage >= 3 && (
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/50 to-emerald-500/50 blur-md"
              />
            )}
            <Sparkles className={`w-5 h-5 relative z-10 ${stage >= 3 ? 'text-green-400' : 'text-slate-600'}`} style={{ 
              filter: stage >= 3 ? 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.6))' : 'none'
            }} />
          </div>
          <span className="text-[10px] text-slate-400">Output</span>
          <span className="text-[8px] text-green-400">Result</span>
        </motion.div>
      </div>

      {/* Result badge */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1"
          >
            <Check className="w-3 h-3 text-green-400" />
            <span className="text-xs text-green-400 font-medium">Automation Complete</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const visualComponents: { [key: string]: React.FC<{ isHovered: boolean }> } = {
  audit: AuditVisual,
  training: TrainingVisual,
  solutions: SolutionsVisual,
}

export default function ServicesSection() {
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  return (
    <section 
      id="services" 
      className="relative px-6 py-32 bg-[#03060f]"
    >
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
              Our Services
            </h2>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white headline relative">
            Our Services
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const VisualComponent = visualComponents[service.id]
            const isHovered = hoveredService === service.id
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 70,
                  damping: 20,
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 20 },
                }}
                onMouseEnter={() => {
                  setHoveredService(service.id)
                  playServiceSound(service.id as 'audit' | 'training' | 'solutions')
                }}
                onMouseLeave={() => {
                  setHoveredService(null)
                }}
                className="group relative bg-white/[0.01] border border-white/[0.03] rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer"
                style={{
                  borderColor: isHovered ? `${service.color}30` : undefined,
                }}
              >
                {/* Glow effect */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 0.15 : 0,
                  }}
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ backgroundColor: service.color }}
                />

                {/* Visual with parallax effect */}
                <motion.div
                  animate={{
                    y: isHovered ? -5 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="relative"
                >
                  <VisualComponent isHovered={isHovered} />
                </motion.div>
                
                {/* Content */}
                <div className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <h3 
                      className="text-2xl font-bold text-white transition-colors duration-300"
                      style={{ color: isHovered ? service.color : undefined }}
                    >
                      {service.title}
                    </h3>
                    <motion.div
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        x: isHovered ? 0 : -10,
                      }}
                    >
                      <ArrowUpRight className="w-6 h-6" style={{ color: service.color }} />
                    </motion.div>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                {/* Bottom glow line */}
                <motion.div
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ 
                    background: `linear-gradient(to right, transparent, ${service.color}60, transparent)` 
                  }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Ambient effects - different colors */}
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
