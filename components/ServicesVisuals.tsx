'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, Zap, AlertCircle, Target, Sparkles, Trophy, BarChart3, Bot } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

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

export function AuditVisual({ isHovered }: { isHovered: boolean }) {
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
    intervalsRef.current.forEach((i) => clearInterval(i))
    timeoutsRef.current.forEach((t) => clearTimeout(t))
    intervalsRef.current = []
    timeoutsRef.current = []
    if (isHovered) {
      setScanProgress(0)
      setScore(0)
      setItems((prev) => prev.map((item) => ({ ...item, status: 'pending', value: 0 })))
      const scanInterval = setInterval(() => {
        setScanProgress((prev) => (prev >= 100 ? (clearInterval(scanInterval!), 100) : prev + 2))
      }, 30)
      intervalsRef.current.push(scanInterval)
      items.forEach((item, index) => {
        const timeout = setTimeout(() => {
          if (isHovered) {
            const value = 60 + Math.floor(Math.random() * 35)
            const status = value > 80 ? 'good' : value > 60 ? 'warning' : 'bad'
            setItems((prev) => prev.map((it, i) => (i === index ? { ...it, status, value } : it)))
            playServiceSound('audit')
          }
        }, 400 + index * 500)
        timeoutsRef.current.push(timeout)
      })
      const scoreTimeout = setTimeout(() => {
        if (isHovered) {
          const scoreInterval = setInterval(() => {
            setScore((prev) => (prev >= 73 ? (clearInterval(scoreInterval!), playServiceSound('success'), 73) : prev + 1))
          }, 20)
          intervalsRef.current.push(scoreInterval)
        }
      }, 2200)
      timeoutsRef.current.push(scoreTimeout)
    } else {
      setScanProgress(0)
      setScore(0)
      setItems((prev) => prev.map((item) => ({ ...item, status: 'pending', value: 0 })))
    }
    return () => {
      intervalsRef.current.forEach((i) => clearInterval(i))
      timeoutsRef.current.forEach((t) => clearTimeout(t))
    }
  }, [isHovered])

  return (
    <div className="relative w-full h-52 bg-gradient-to-br from-blue-500/[0.03] to-transparent rounded-xl overflow-hidden border border-blue-500/10">
      <motion.div
        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        style={{ top: `${scanProgress}%` }}
        animate={{ opacity: scanProgress < 100 ? [0.5, 1, 0.5] : 0 }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
      <div className="p-4 space-y-2">
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
              <span className={`text-xs ${item.status !== 'pending' ? 'text-white' : 'text-slate-500'}`}>{item.name}</span>
            </div>
            {item.value > 0 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-xs font-bold ${item.value > 80 ? 'text-green-400' : item.value > 60 ? 'text-yellow-400' : 'text-red-400'}`}
              >
                {item.value}%
              </motion.span>
            )}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: score > 0 ? 1 : 0 }}
          className="mt-4 pt-3 border-t border-white/10"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">AI Readiness Score</span>
            <motion.span className="text-2xl font-bold text-blue-400" animate={{ scale: score === 73 ? [1, 1.1, 1] : 1 }}>
              {score}%
            </motion.span>
          </div>
          <div className="h-2 bg-white/5 rounded-full mt-2 overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{ width: `${score}%` }} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export function TrainingVisual({ isHovered }: { isHovered: boolean }) {
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
    timeoutsRef.current.forEach((t) => clearTimeout(t))
    intervalsRef.current.forEach((i) => clearInterval(i))
    timeoutsRef.current = []
    intervalsRef.current = []
    if (isHovered) {
      setUnlockedModules([])
      setProgress(0)
      setShowBadges(false)
      setScrollOffset(0)
      setFinalZoom(false)
      modules.forEach((module, index) => {
        const timeout = setTimeout(() => {
          if (isHovered) {
            setUnlockedModules((prev) => [...prev, module.id])
            playServiceSound('training')
            setScrollOffset(index * 22)
          }
        }, 300 + index * 400)
        timeoutsRef.current.push(timeout)
      })
      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? (clearInterval(progressInterval!), 100) : prev + 2))
      }, 30)
      intervalsRef.current.push(progressInterval)
      timeoutsRef.current.push(setTimeout(() => isHovered && (setFinalZoom(true), playServiceSound('success')), 1900))
      timeoutsRef.current.push(setTimeout(() => isHovered && setShowBadges(true), 2000))
    } else {
      setUnlockedModules([])
      setProgress(0)
      setShowBadges(false)
      setScrollOffset(0)
      setFinalZoom(false)
    }
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t))
      intervalsRef.current.forEach((i) => clearInterval(i))
    }
  }, [isHovered])

  return (
    <div className="relative w-full h-52 bg-gradient-to-br from-violet-500/[0.03] to-transparent rounded-xl overflow-hidden border border-violet-500/10 p-4">
      <motion.div
        animate={{ y: finalZoom ? -40 : -scrollOffset, scale: finalZoom ? 0.85 : 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="origin-center"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-slate-400">Learning Path</span>
          <span className="text-xs text-violet-400 font-bold">{progress}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full mb-4 overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <div className="space-y-2">
          {modules.map((module) => {
            const isUnlocked = unlockedModules.includes(module.id)
            const ModuleIcon = module.icon
            return (
              <motion.div
                key={module.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: isUnlocked ? 0 : -20, opacity: isUnlocked ? 1 : 0.3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`flex items-center gap-3 p-2 rounded-lg ${isUnlocked ? 'bg-violet-500/10 border border-violet-500/20' : 'bg-white/[0.02]'}`}
              >
                {isUnlocked ? (
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <motion.div animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/50 to-purple-500/50 blur-md" />
                    <ModuleIcon className="w-4 h-4 text-violet-400 relative z-10" style={{ filter: 'drop-shadow(0 0 4px rgba(139, 92, 246, 0.6))' }} />
                  </div>
                ) : (
                  <div className="w-3 h-3 rounded-full bg-white/20 border border-white/30" />
                )}
                <span className={`text-xs flex-1 ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>{module.name}</span>
                {isUnlocked && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto">
                    <Check className="w-4 h-4 text-violet-400" />
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
        <AnimatePresence>
          {showBadges && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute bottom-3 right-3 flex gap-2">
              {[Target, Sparkles, Zap, Trophy].map((Icon, i) => (
                <motion.div key={i} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: i * 0.1, type: 'spring' }} className="relative w-6 h-6 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-violet-400" style={{ filter: 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.8))' }} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export function SolutionsVisual({ isHovered }: { isHovered: boolean }) {
  const [stage, setStage] = useState(0)
  const [dataFlowing, setDataFlowing] = useState(false)
  const [result, setResult] = useState(false)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    timeoutsRef.current.forEach((t) => clearTimeout(t))
    timeoutsRef.current = []
    if (isHovered) {
      setStage(0)
      setDataFlowing(false)
      setResult(false)
      timeoutsRef.current.push(setTimeout(() => isHovered && (setStage(1), playServiceSound('solutions')), 200))
      timeoutsRef.current.push(setTimeout(() => isHovered && (setStage(2), setDataFlowing(true), playServiceSound('solutions')), 600))
      timeoutsRef.current.push(setTimeout(() => isHovered && (setStage(3), playServiceSound('solutions')), 1200))
      timeoutsRef.current.push(setTimeout(() => isHovered && (setResult(true), playServiceSound('success')), 1800))
    } else {
      setStage(0)
      setDataFlowing(false)
      setResult(false)
    }
    return () => timeoutsRef.current.forEach((t) => clearTimeout(t))
  }, [isHovered])

  return (
    <div className="relative w-full h-52 bg-gradient-to-br from-cyan-500/[0.03] to-transparent rounded-xl overflow-hidden border border-cyan-500/10 p-4">
      <div className="flex items-center justify-between h-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: stage >= 1 ? 1 : 0.2, x: stage >= 1 ? 0 : -20, scale: stage >= 1 ? 1 : 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`w-20 h-24 rounded-lg border flex flex-col items-center justify-center gap-1 ${stage >= 1 ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-white/[0.02] border-white/10'}`}
        >
          <BarChart3 className={`w-5 h-5 ${stage >= 1 ? 'text-cyan-400' : 'text-slate-600'}`} style={{ filter: stage >= 1 ? 'drop-shadow(0 0 4px rgba(6, 182, 212, 0.6))' : 'none' }} />
          <span className="text-[10px] text-slate-400">Input</span>
          <span className="text-[8px] text-cyan-400">Data</span>
        </motion.div>
        <div className="flex-1 h-[2px] mx-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10" />
          {dataFlowing && (
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 w-full h-full"
              style={{ background: 'linear-gradient(to right, transparent 0%, rgba(6, 182, 212, 0.8) 50%, transparent 100%)' }}
            />
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: stage >= 2 ? 1 : 0.2, scale: stage >= 2 ? 1 : 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`w-24 h-28 rounded-lg border flex flex-col items-center justify-center gap-1 relative ${stage >= 2 ? 'bg-cyan-500/20 border-cyan-500/50' : 'bg-white/[0.02] border-white/10'}`}
        >
          {stage === 2 && (
            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }} transition={{ duration: 1, repeat: Infinity }} className="absolute inset-0 rounded-lg bg-cyan-500/20" />
          )}
          <motion.div animate={{ rotate: stage === 2 ? 360 : 0 }} transition={{ duration: 2, repeat: stage === 2 ? Infinity : 0, ease: 'linear' }} className="relative z-10">
            <Bot className={`w-7 h-7 ${stage >= 2 ? 'text-cyan-400' : 'text-slate-600'}`} style={{ filter: stage >= 2 ? 'drop-shadow(0 0 6px rgba(6, 182, 212, 0.8))' : 'none' }} />
          </motion.div>
          <span className="text-[10px] text-white relative z-10">AI Agent</span>
          {stage === 2 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.5, repeat: Infinity }} className="text-[8px] text-cyan-400">Processing...</motion.span>}
        </motion.div>
        <div className="flex-1 h-[2px] mx-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10" />
          {stage >= 3 && (
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 w-full h-full"
              style={{ background: 'linear-gradient(to right, transparent 0%, rgba(34, 197, 94, 0.8) 50%, transparent 100%)' }}
            />
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: stage >= 3 ? 1 : 0.2, x: stage >= 3 ? 0 : 20, scale: stage >= 3 ? 1 : 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`w-20 h-24 rounded-lg border flex flex-col items-center justify-center gap-1 ${stage >= 3 ? 'bg-green-500/10 border-green-500/30' : 'bg-white/[0.02] border-white/10'}`}
        >
          <Sparkles className={`w-5 h-5 ${stage >= 3 ? 'text-green-400' : 'text-slate-600'}`} style={{ filter: stage >= 3 ? 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.6))' : 'none' }} />
          <span className="text-[10px] text-slate-400">Output</span>
          <span className="text-[8px] text-green-400">Result</span>
        </motion.div>
      </div>
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1">
            <Check className="w-3 h-3 text-green-400" />
            <span className="text-xs text-green-400 font-medium">Automation Complete</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
