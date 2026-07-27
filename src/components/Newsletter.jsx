import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email.')
      return
    }
    setError('')
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="py-14 lg:py-20 bg-forest-gradient">
      <div className="max-w-xl mx-auto px-5 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="space-y-5">

          <p className="section-label text-gold-muted">Exclusive Offers</p>

          <h2 className="font-display font-semibold text-parchment leading-tight"
            style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', letterSpacing: '-0.015em' }}>
            Get 10% off your first order
          </h2>

          <p className="text-parchment/50 text-sm font-light leading-relaxed">
            Farm updates, seasonal harvests, and exclusive discounts — no spam, ever.
          </p>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-parchment text-forest px-6 py-2.5 rounded-xl font-semibold text-sm shadow">
              <Check size={16} /> You're in! Check your inbox.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <div className="flex-1">
                <input type="email" value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  placeholder="Your email address"
                  aria-label="Email address"
                  className="w-full px-4 py-3 rounded-xl border border-parchment/20 bg-parchment/10 text-parchment placeholder:text-parchment/30 focus:outline-none focus:border-gold focus:bg-parchment/15 transition-all text-sm" />
                {error && <p className="text-gold-muted text-xs mt-1.5 text-left">{error}</p>}
              </div>
              <button type="submit"
                className="bg-gold hover:bg-gold-dark text-ink font-semibold text-sm px-5 py-3 rounded-xl shadow-gold hover:shadow-gold-lg transition-all duration-200 whitespace-nowrap hover:-translate-y-px">
                Subscribe <ArrowRight size={15} className="inline ml-1" />
              </button>
            </form>
          )}

          <p className="text-parchment/25 text-[11px]">
            No spam. Unsubscribe any time.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
