'use client'

import { motion } from 'framer-motion'
import { Bot, Workflow, Zap, Brain, LineChart, Shield } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function BentoGrid() {
  const services = [
    {
      icon: Bot,
      title: 'AI Chatbots',
      description: 'Intelligent conversational AI that understands context and delivers human-like interactions.',
      className: 'md:col-span-2'
    },
    {
      icon: Workflow,
      title: 'Workflow Automation',
      description: 'Streamline operations with custom automation pipelines.',
      className: 'md:col-span-1'
    },
    {
      icon: Brain,
      title: 'Machine Learning',
      description: 'Custom ML models trained on your data for predictive insights.',
      className: 'md:col-span-1'
    },
    {
      icon: Zap,
      title: 'API Integration',
      description: 'Seamlessly connect your tools and automate data flow between platforms.',
      className: 'md:col-span-2'
    },
    {
      icon: LineChart,
      title: 'Analytics & Reporting',
      description: 'Real-time dashboards and automated reporting systems.',
      className: 'md:col-span-1'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and compliance-ready infrastructure.',
      className: 'md:col-span-2'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <section id="services" className="relative px-6 pt-32 pb-32 bg-transparent z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 20
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-deployers-blue/30 backdrop-blur-sm mb-6"
          >
            <Zap className="w-4 h-4 text-deployers-blue" />
            <span className="text-sm text-slate-300 font-medium">Our Services</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Built for the Future
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Cutting-edge AI solutions designed to transform your business operations
          </p>
        </ScrollReveal>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 70,
                      damping: 20
                    }
                  }
                }}
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(127, 156, 245, 0.8)",
                  backgroundColor: "rgba(127, 156, 245, 0.05)",
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }
                }}
                className={`group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:shadow-2xl hover:shadow-deployers-blue/20 transition-all duration-300 cursor-pointer ${service.className}`}
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-deployers-blue opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 rounded-2xl bg-deployers-blue/20 border border-deployers-blue/30 flex items-center justify-center mb-6 group-hover:bg-deployers-blue/30 transition-colors duration-300"
                  >
                    <Icon className="w-7 h-7 text-deployers-blue" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-deployers-blue-light transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
