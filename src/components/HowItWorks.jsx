import { motion } from 'framer-motion'
import { steps } from '../data/products'
import { ArrowRight } from 'lucide-react'

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function HowItWorks() {
  return (
    <section id="process" className="py-16 lg:py-24 bg-parchment overflow-hidden">
      <div className="max-w-6xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-12 space-y-3 max-w-xl mx-auto">
          <p className="section-label">Our Process</p>
          <h2 className="section-title">
            From farm to <span className="text-forest">your table</span>
          </h2>
          <p className="section-body text-sm mx-auto">
            Five careful steps between the field and your kitchen —
            each one done with the attention a family would give their own food.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* connector line desktop */}
          <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-stone-darker to-transparent" />

          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
            {steps.map((step, idx) => (
              <motion.div key={step.step}
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="flex flex-col items-center text-center group">

                {/* Icon */}
                <div className="relative z-10 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-stone-darker/40 shadow-card group-hover:border-gold group-hover:shadow-gold transition-all duration-200 flex items-center justify-center text-xl mx-auto">
                    {step.icon}
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gold text-ink text-[9px] font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>

                {/* Image */}
                <div className="w-full aspect-video md:aspect-square rounded-xl overflow-hidden mb-3 shadow-card">
                  <img src={step.image} alt={step.title} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>

                {/* Mobile arrow */}
                {idx < steps.length - 1 && (
                  <div className="md:hidden text-stone-darker mb-3">
                    <ArrowRight size={18} className="rotate-90 mx-auto" />
                  </div>
                )}

                <h3 className="font-display font-semibold text-ink text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-ink/40 leading-relaxed font-light">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.3 }} className="text-center mt-12">
          <a href="#products"
            onClick={(e) => { e.preventDefault(); scrollTo('#products') }}
            className="btn-gold">
            Order Fresh Today <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
