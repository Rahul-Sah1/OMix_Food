import { motion } from 'framer-motion'
import { ArrowRight, Star, ChevronDown, ShieldCheck } from 'lucide-react'

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
})

const freshLabel = `Fresh · ${new Date().toLocaleString('default', { month: 'short' })} ${new Date().getFullYear()}`

const pills = [
  { icon: '✓',  label: 'FSSAI Approved',   color: 'text-forest dark:text-forest-muted' },
  { icon: '🌿', label: 'No Preservatives', color: 'text-forest dark:text-forest-muted' },
  { icon: '🚜', label: 'Farm Direct',      color: 'text-amber' },
  { icon: '🏠', label: '500+ Families',   color: 'text-amber' },
  { icon: '🌾', label: freshLabel,         color: 'text-forest dark:text-forest-muted' },
]

export default function Hero() {
  return (
    <section id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-hero-light dark:bg-none dark:bg-night pt-28 pb-24 transition-colors duration-300">

      {/* ── Subtle dot-grid watermark ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035] dark:opacity-[0.025]"
        xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="hero-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#14532D" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>

      {/* ── Blob accents ── */}
      <div className="absolute -top-32 right-0 w-[560px] h-[560px] rounded-full bg-amber/8 dark:bg-amber/6 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-[420px] h-[420px] rounded-full bg-forest/14 dark:bg-forest/12 blur-[110px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full bg-mint dark:bg-forest/6 blur-[90px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-forest/6 blur-[60px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ──────────── LEFT ──────────── */}
        <div className="space-y-7 relative z-10">

          {/* Decorated label */}
          <motion.div {...up(0)} className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-8 h-px bg-gradient-to-r from-forest to-transparent" />
              <span className="w-2 h-2 rounded-full bg-forest" />
            </div>
            <p className="label">Farm-to-Home Wheat Delivery</p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber" />
              <span className="w-8 h-px bg-gradient-to-l from-amber to-transparent" />
            </div>
          </motion.div>

          {/* Heading with decorated "Purity" */}
          <motion.h1 {...up(0.07)}
            className="font-display font-bold text-ink dark:text-snow"
            style={{ fontSize: 'clamp(2.8rem,6vw,5rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            Delivering{' '}
            <span className="relative inline-block text-forest italic">
              Purity
              {/* Curved amber underline */}
              <svg className="absolute -bottom-1 left-0 w-full overflow-visible" viewBox="0 0 110 10"
                preserveAspectRatio="none" fill="none" aria-hidden="true">
                <path d="M2 7 Q28 2 55 6 Q82 10 108 5"
                  stroke="#D97706" strokeWidth="2.8" strokeLinecap="round" />
              </svg>
            </span>{' '}
            &amp; Health
          </motion.h1>

          {/* Subtext */}
          <motion.p {...up(0.14)}
            className="font-sans font-light text-ink/50 dark:text-snow/45 text-lg leading-relaxed max-w-md">
            From trusted farms to your healthy home. Experience the finest Natural products,
            carefully sourced and delivered fresh to your doorstep.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div {...up(0.2)} className="flex flex-wrap gap-3">
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('#about') }}
              className="inline-flex items-center gap-2 font-sans font-bold text-sm tracking-wide
                bg-gradient-to-br from-forest via-forest to-forest-dark text-white
                px-6 py-3 rounded-xl
                shadow-[0_0_20px_rgba(20,83,45,0.45),0_4px_14px_rgba(20,83,45,0.35)]
                hover:shadow-[0_0_32px_rgba(20,83,45,0.65),0_6px_20px_rgba(20,83,45,0.5)]
                border border-forest-light/20
                hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent
                -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <span className="relative">Our Story</span>
              <ArrowRight size={16} className="relative" />
            </a>
            <a href="#products" onClick={(e) => { e.preventDefault(); scrollTo('#products') }}
              className="btn-outline">
              View Products
            </a>
          </motion.div>

          {/* Trust pills */}
          <motion.div {...up(0.26)} className="flex flex-wrap gap-2">
            {pills.map((p) => (
              <span key={p.label}
                className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold
                  text-ink/55 dark:text-snow/40 border border-ink/10 dark:border-snow/10
                  bg-white/50 dark:bg-white/4 backdrop-blur-sm
                  rounded-full px-3 py-1 hover:border-forest/30 dark:hover:border-amber/30 transition-colors">
                <span className={`text-[10px] ${p.color}`}>{p.icon}</span>
                {p.label}
              </span>
            ))}
          </motion.div>

          {/* Social proof — frosted card */}
          <motion.div {...up(0.3)}
            className="inline-flex items-center gap-4 bg-white/65 dark:bg-night-card/70
              backdrop-blur-md border border-ink/8 dark:border-white/8
              rounded-2xl px-5 py-3 shadow-card">
            <div className="flex -space-x-2">
              {[
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80',
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80',
              ].map((src, i) => (
                <img key={i} src={src} alt="customer"
                  className="w-9 h-9 rounded-full border-2 border-white dark:border-night-card object-cover" />
              ))}
            </div>
            <div className="border-l border-ink/10 dark:border-white/10 pl-4">
              <div className="flex gap-px mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} className="fill-amber text-amber" />
                ))}
              </div>
              <p className="font-sans text-xs font-semibold text-ink/60 dark:text-snow/50">
                4.9 · <span className="text-forest dark:text-amber font-bold">500+</span> happy families
              </p>
            </div>
          </motion.div>
        </div>

        {/* ──────────── RIGHT ──────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden md:block">

          {/* Decorative gradient rings behind image */}
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-forest/10 via-mint/60 to-amber/8 dark:from-forest/15 dark:via-transparent dark:to-amber/8 blur-sm" />
          <div className="absolute -inset-3 rounded-[2rem] border border-forest/12 dark:border-forest/20" />
          <div className="absolute -inset-1 rounded-[1.8rem] border border-forest/6 dark:border-forest/10" />

          {/* Main image */}
          <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(20,83,45,0.25),0_8px_24px_rgba(20,83,45,0.15)]"
            style={{ aspectRatio: '5/6' }}>
            <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700&q=85"
              alt="Golden wheat grains" className="w-full h-full object-cover"
              loading="eager" fetchPriority="high" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
            {/* Bottom label on image */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="font-sans text-[10px] font-bold text-white/80 bg-ink/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/15">
                🌾 Freshly Milled to Order
              </span>
            </div>
          </div>

          {/* Small inset image — top right */}
          <div className="absolute -top-5 -right-5 w-36 h-36 rounded-2xl overflow-hidden
            shadow-[0_8px_32px_rgba(20,83,45,0.25)] border-4 border-white dark:border-night">
            <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&q=80"
              alt="Wheat field" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/30 to-transparent" />
          </div>

          {/* Floating badge — FSSAI top-left */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.3 }}
            className="absolute -top-4 left-6 bg-white dark:bg-night-card rounded-xl
              shadow-[0_4px_20px_rgba(20,83,45,0.2)] border border-forest/15 dark:border-white/8
              px-3 py-2 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-forest/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={14} className="text-forest" />
            </div>
            <div>
              <p className="font-sans text-[9px] text-ink/40 dark:text-snow/35 font-medium leading-none">Certified</p>
              <p className="font-sans font-bold text-xs text-ink dark:text-snow leading-tight">FSSAI</p>
            </div>
          </motion.div>

          {/* Floating stat — left (Partner Farms) */}
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            className="absolute -left-10 bottom-20 bg-white dark:bg-night-card rounded-2xl
              shadow-[0_8px_32px_rgba(20,83,45,0.18),0_2px_8px_rgba(20,83,45,0.1)]
              border border-forest/12 dark:border-white/6
              px-4 py-3 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-forest/15 to-mint flex items-center justify-center text-xl flex-shrink-0">
              🌾
            </div>
            <div>
              <p className="font-sans text-[10px] text-ink/40 dark:text-snow/35 font-medium">Partner Farms</p>
              <p className="font-display font-bold text-2xl text-ink dark:text-snow leading-none"
                style={{ letterSpacing: '-0.03em' }}>50+</p>
            </div>
          </motion.div>

          {/* Floating stat — right (Purity) */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ repeat: Infinity, duration: 6.5, ease: 'easeInOut', delay: 0.6 }}
            className="absolute right-0 bottom-40 rounded-2xl overflow-hidden
              bg-gradient-to-br from-forest to-forest-dark
              shadow-[0_0_24px_rgba(20,83,45,0.5),0_6px_20px_rgba(20,83,45,0.35)]
              border border-forest-light/20 px-5 py-3 text-white">
            {/* Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite]" />
            <p className="font-sans text-[10px] opacity-65 font-medium relative">Purity Guarantee</p>
            <p className="font-display font-bold text-3xl leading-none relative"
              style={{ letterSpacing: '-0.03em' }}>100%</p>
            <p className="font-sans text-[9px] text-amber font-semibold mt-0.5 relative">Chemical Free ✓</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button onClick={() => scrollTo('#products')}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5
          text-ink/25 dark:text-snow/20 hover:text-forest dark:hover:text-amber transition-colors group"
        aria-label="Scroll down">
        <span className="font-sans text-[10px] font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
          Explore
        </span>
        <ChevronDown size={20} className="animate-bounce" />
      </motion.button>
    </section>
  )
}
