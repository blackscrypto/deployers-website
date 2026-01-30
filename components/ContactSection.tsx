'use client'

import { motion } from 'framer-motion'
import { Send, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

const projectTypes = [
  'AI Chatbot',
  'Workflow Automation',
  'Data Analysis',
  'Custom AI Agent',
  'Consulting',
  'Training',
  'Other',
]

const budgetRanges = [
  '< $5,000',
  '$5,000 - $15,000',
  '$15,000 - $50,000',
  '$50,000+',
  'Not sure yet',
]

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  const inputClasses = (field: string) => `
    w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-4
    text-white placeholder-slate-500 outline-none
    transition-all duration-300
    ${focusedField === field ? 'border-deployers-blue/50 bg-white/[0.04]' : 'hover:border-white/[0.1]'}
  `

  return (
    <section id="contact" className="relative px-6 py-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", stiffness: 70, damping: 20 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Let's Talk
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Ready to transform your business with AI? Tell us about your project and let's build something amazing together.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm text-slate-400 mb-2">Your Name *</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className={inputClasses('name')}
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <label className="block text-sm text-slate-400 mb-2">Email Address *</label>
              <input
                type="email"
                required
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className={inputClasses('email')}
              />
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm text-slate-400 mb-2">Company</label>
              <input
                type="text"
                placeholder="Your company name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                onFocus={() => setFocusedField('company')}
                onBlur={() => setFocusedField(null)}
                className={inputClasses('company')}
              />
            </motion.div>

            {/* Project Type */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              <label className="block text-sm text-slate-400 mb-2">Project Type *</label>
              <select
                required
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                onFocus={() => setFocusedField('projectType')}
                onBlur={() => setFocusedField(null)}
                className={`${inputClasses('projectType')} cursor-pointer`}
              >
                <option value="" className="bg-midnight-dark">Select a project type</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type} className="bg-midnight-dark">{type}</option>
                ))}
              </select>
            </motion.div>
          </div>

          {/* Budget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <label className="block text-sm text-slate-400 mb-3">Budget Range</label>
            <div className="flex flex-wrap gap-3">
              {budgetRanges.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setFormData({ ...formData, budget: range })}
                  className={`px-4 py-2 rounded-full border text-sm transition-all duration-300 ${
                    formData.budget === range
                      ? 'border-deployers-blue bg-deployers-blue/20 text-deployers-light'
                      : 'border-white/[0.05] text-slate-400 hover:border-white/[0.1] hover:bg-white/[0.02]'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="mb-8"
          >
            <label className="block text-sm text-slate-400 mb-2">Tell us about your project *</label>
            <textarea
              required
              rows={5}
              placeholder="Describe your project, goals, and any specific requirements..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              className={`${inputClasses('message')} resize-none`}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <motion.button
              type="submit"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 50px rgba(127, 156, 245, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-3 px-8 py-4 bg-white text-midnight-dark rounded-full font-bold text-lg shadow-xl hover:shadow-deployers-blue/30 transition-all duration-300"
            >
              Send Message
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Direct Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-slate-500 mb-4">Prefer email?</p>
          <a 
            href="mailto:hello@deployers.ai"
            className="group inline-flex items-center gap-2 text-2xl md:text-3xl font-bold text-white hover:text-deployers-light transition-colors duration-300"
          >
            hello@deployers.ai
            <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
          </a>
        </motion.div>
      </div>

      {/* Ambient effects */}
      <motion.div
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-deployers-blue/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2"
      />
      <motion.div
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"
      />
    </section>
  )
}
