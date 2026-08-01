import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'

const row1 = [1, 2, 3, 4, 5, 6, 7, 8]
const row2 = [9, 10, 11, 12, 13, 14, 15, 8]

function pad(n) {
  return String(n).padStart(2, '0')
}

function ImageCard({ n, priority = false }) {
  return (
    <div className="flex-shrink-0 mx-2.5 group relative overflow-hidden rounded-2xl shadow-lg
      border-2 border-white/60 dark:border-white/10
      hover:border-amber/70 dark:hover:border-amber/50
      hover:shadow-[0_8px_30px_rgba(217,119,6,0.25)]
      transition-all duration-400 ease-out"
      style={{ width: 280, height: 235 }}
    >
      <img
        src={`/customers/Cust_${pad(n)}.png`}
        alt={`Happy OMix customer ${n}`}
        loading={priority ? 'eager' : 'lazy'}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Subtle overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Heart icon on hover */}
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100
        transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <div className="bg-white/90 dark:bg-night-card/90 backdrop-blur-sm rounded-full p-1.5 shadow-md">
          <Heart size={14} className="text-red-500 fill-red-500" />
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({ items, direction = 'left' }) {
  const trackClass = direction === 'left' ? 'marquee-track-left' : 'marquee-track-right'
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden relative">
      <div className={trackClass}>
        {doubled.map((n, i) => (
          <ImageCard key={`${n}-${i}`} n={n} priority={i < 8} />
        ))}
      </div>
    </div>
  )
}

export default function CustomerLove() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-linen dark:bg-night transition-colors duration-300">

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-amber/6 blur-[100px]" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-forest/8 blur-[90px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-mint/40 dark:bg-forest/5 blur-[120px]" />
      </div>

      {/* Section header */}
      <div className="relative max-w-6xl mx-auto px-5 mb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-amber/60" />
            <div className="flex items-center gap-1.5 bg-red-50 dark:bg-red-950/30 border border-red-200/60 dark:border-red-800/30 rounded-full px-3 py-1">
              <Heart size={11} className="text-red-500 fill-red-500 animate-pulse" />
              <span className="font-sans text-[10px] font-bold tracking-[0.18em] uppercase text-red-500 dark:text-red-400">
                Community Love
              </span>
            </div>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-amber/60" />
          </div>

          {/* Heading */}
          <h2
            className="font-display font-bold text-ink dark:text-snow mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', letterSpacing: '-0.03em', lineHeight: 1.15 }}
          >
            The Love Shared by
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-forest via-forest-light to-amber">
              Our Customers
            </span>
          </h2>

          <p className="font-sans text-ink/45 dark:text-snow/40 text-sm leading-relaxed max-w-xl mx-auto">
            Real families, real stories — people who chose OMix and never looked back.
            Their trust is our biggest reward.
          </p>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative space-y-5"
      >
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none
          bg-gradient-to-r from-linen dark:from-night to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none
          bg-gradient-to-l from-linen dark:from-night to-transparent" />

        <MarqueeRow items={row1} direction="left" />
        <MarqueeRow items={row2} direction="right" />
      </motion.div>

      {/* Bottom stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative max-w-4xl mx-auto px-5 mt-14"
      >
        <div className="grid grid-cols-3 gap-4 sm:gap-8 bg-white/70 dark:bg-night-card/60 backdrop-blur-md
          border border-ink/8 dark:border-white/8 rounded-2xl px-6 py-5 shadow-sm">
          {[
            { value: '500+', label: 'Happy Families' },
            { value: '4.9★', label: 'Average Rating' },
            { value: '100%', label: 'Pure & Natural' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display font-bold text-forest dark:text-amber"
                style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', letterSpacing: '-0.02em' }}>
                {s.value}
              </div>
              <div className="font-sans text-[10px] sm:text-xs font-medium text-ink/40 dark:text-snow/35 mt-0.5 tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
