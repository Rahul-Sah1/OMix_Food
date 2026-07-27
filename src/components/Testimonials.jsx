import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '../data/products'

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const timer = useRef(null)

  const reset = () => {
    clearInterval(timer.current)
    timer.current = setInterval(() => go(1), 5500)
  }
  const go = (d) => { setDir(d); setActive((a) => (a + d + testimonials.length) % testimonials.length); reset() }
  useEffect(() => { reset(); return () => clearInterval(timer.current) }, [])

  const variants = {
    enter:  (d) => ({ opacity: 0, x: d > 0 ? 36 : -36 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.42, ease: [0.22,1,0.36,1] } },
    exit:   (d) => ({ opacity: 0, x: d > 0 ? -36 : 36, transition: { duration: 0.25 } }),
  }

  const t = testimonials[active]

  return (
    <section className="relative overflow-hidden pb-20 lg:pb-28 bg-mint dark:bg-night transition-colors duration-300">

      {/* Wave divider — matches Blog linen/white bg above */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none z-10">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none"
          className="w-full block" style={{ height: '72px', display: 'block' }}>
          <path
            d="M0,0 L0,44 C240,72 480,20 720,48 C960,76 1200,28 1440,44 L1440,0 Z"
            className="fill-linen dark:fill-night"
          />
          <path
            d="M0,0 L0,24 C300,60 600,8 900,36 C1100,54 1300,20 1440,30 L1440,0 Z"
            fill="rgba(255,255,255,0.06)"
          />
        </svg>
      </div>
      <div className="max-w-6xl mx-auto px-5 pt-24 lg:pt-28">

        <div className="text-center mb-14 space-y-3">
          <p className="label">Customer Love</p>
          <h2 className="font-display font-bold text-ink dark:text-snow"
            style={{ fontSize: 'clamp(2.4rem,5vw,3.8rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            Families trust <span className="text-forest italic">0Mix</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">

          {/* Main quote card */}
          <div className="bg-sand dark:bg-night-card rounded-3xl border border-ink/6 dark:border-white/6 p-8 md:p-10 relative overflow-hidden min-h-[280px]">
            <span className="absolute top-4 right-8 font-display font-bold leading-none select-none pointer-events-none text-ink/6 dark:text-white/5"
              style={{ fontSize: '10rem' }}>"</span>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={active} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" className="relative z-10">
                <div className="flex gap-0.5 mb-6">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} className="fill-amber text-amber" />)}
                </div>
                <p className="font-display font-semibold text-ink dark:text-snow leading-snug mb-8 italic"
                  style={{ fontSize: 'clamp(1.2rem,2.5vw,1.6rem)', letterSpacing: '-0.01em' }}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-sand dark:border-night" />
                  <div>
                    <p className="font-sans font-bold text-sm text-ink dark:text-snow">{t.name}</p>
                    <p className="font-sans text-xs text-ink/40 dark:text-snow/35">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Side list */}
          <div className="space-y-2">
            {testimonials.map((item, i) => (
              <button key={item.id}
                onClick={() => { setDir(i > active ? 1 : -1); setActive(i); reset() }}
                className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-200 ${
                  i === active
                    ? 'bg-forest border-forest text-white shadow-forest'
                    : 'bg-sand dark:bg-night-card border-ink/6 dark:border-white/6 hover:border-forest/30 dark:hover:border-amber/30'
                }`}>
                <img src={item.avatar} alt={item.name}
                  className="w-9 h-9 rounded-full object-cover flex-shrink-0 border-2 border-white/30" />
                <div className="flex-1 min-w-0">
                  <p className={`font-sans text-xs font-bold truncate ${i === active ? 'text-white' : 'text-ink dark:text-snow'}`}>{item.name}</p>
                  <p className={`font-sans text-[11px] truncate ${i === active ? 'text-white/60' : 'text-ink/40 dark:text-snow/35'}`}>{item.location}</p>
                </div>
                <div className="flex gap-px flex-shrink-0">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} size={9} className={i === active ? 'fill-amber-light text-amber-light' : 'fill-amber text-amber'} />
                  ))}
                </div>
              </button>
            ))}

            <div className="flex gap-2 pt-3">
              <button onClick={() => go(-1)} aria-label="Previous"
                className="w-10 h-10 rounded-xl border-2 border-ink/10 dark:border-white/10 flex items-center justify-center text-ink/45 dark:text-snow/40 hover:border-forest dark:hover:border-amber hover:text-forest dark:hover:text-amber transition-all">
                <ChevronLeft size={17} />
              </button>
              <button onClick={() => go(1)} aria-label="Next"
                className="w-10 h-10 rounded-xl border-2 border-ink/10 dark:border-white/10 flex items-center justify-center text-ink/45 dark:text-snow/40 hover:border-forest dark:hover:border-amber hover:text-forest dark:hover:text-amber transition-all">
                <ChevronRight size={17} />
              </button>
              <div className="flex items-center gap-1.5 ml-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => { setDir(i > active ? 1 : -1); setActive(i); reset() }}
                    className={`rounded-full transition-all duration-250 ${i === active ? 'w-6 h-2 bg-forest dark:bg-amber' : 'w-2 h-2 bg-ink/15 dark:bg-white/15'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
