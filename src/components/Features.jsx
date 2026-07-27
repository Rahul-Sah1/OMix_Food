import { motion } from 'framer-motion'

const features = [
  {
    icon: '⚙️',
    image: 'https://images.unsplash.com/photo-1603569259524-637ac1eff8e4?w=600&q=80',
    title: 'Natural Process',
    subtitle: 'Minimal Processing, Maximum Nutrition',
    body: 'Our products go through minimal processing to retain their natural taste and nutrition. Fresh, simple, and healthy — just the way nature intended.',
    accent: 'forest',
  },
  {
    icon: '🌾',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80',
    title: 'Natural Products',
    subtitle: 'Certified Chemical-Free Grains',
    body: 'We source only certified Natural grains and essentials — free from harmful chemicals and pesticides. Purity and health go hand in hand.',
    accent: 'amber',
  },
  {
    icon: '🔬',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&q=80',
    title: 'Biologically Safe',
    subtitle: 'Tested for Your Family\'s Health',
    body: 'Every product is carefully handled and tested to ensure it meets strict biological safety standards for your family\'s health and well-being.',
    accent: 'forest',
  },
]

const accentClasses = {
  forest: {
    badge:  'bg-forest/8 text-forest border-forest/20 dark:bg-forest/15 dark:text-forest-muted dark:border-forest/25',
    iconBg: 'bg-forest/10 dark:bg-forest/15',
    bar:    'bg-forest',
    glow:   'group-hover:shadow-forest',
  },
  amber: {
    badge:  'bg-amber/8 text-amber-dark border-amber/20 dark:bg-amber/10 dark:text-amber-light dark:border-amber/25',
    iconBg: 'bg-amber/10 dark:bg-amber/12',
    bar:    'bg-amber',
    glow:   'group-hover:shadow-amber',
  },
}

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden pb-20 lg:pb-28 bg-sand dark:bg-night-section transition-colors duration-300">

      {/* Wave divider — matches VideoSection dark gradient above */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none z-10">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none"
          className="w-full block" style={{ height: '72px', display: 'block' }}>
          <path
            d="M0,0 L0,36 C180,72 360,72 540,48 C720,24 900,0 1080,20 C1260,40 1360,60 1440,52 L1440,0 Z"
            fill="#062212"
          />
          <path
            d="M0,0 L0,20 C200,56 440,64 720,36 C1000,8 1240,40 1440,32 L1440,0 Z"
            fill="rgba(124,45,18,0.35)"
          />
        </svg>
      </div>
      <div className="max-w-6xl mx-auto px-5 pt-24 lg:pt-28">

        {/* Header */}
        <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
          <p className="label">Our Premium Features</p>
          <h2
            className="font-display font-bold text-ink dark:text-snow"
            style={{ fontSize: 'clamp(2.4rem,5vw,3.8rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
          >
            Why Every Grain{' '}
            <span className="text-forest italic">Matters to Us</span>
          </h2>
          <p className="font-sans font-light text-ink/45 dark:text-snow/40 text-base leading-relaxed">
            0Mix brings you handpicked groceries with a focus on freshness, health, and
            doorstep convenience.
          </p>
        </div>

        {/* Feature cards */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((f) => {
            const ac = accentClasses[f.accent]
            return (
              <motion.div
                key={f.title}
                variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
                className={`bg-white dark:bg-night-card rounded-3xl overflow-hidden border border-ink/6 dark:border-white/7 shadow-card hover:shadow-card-lg ${ac.glow} hover:-translate-y-2 transition-all duration-300 flex flex-col group`}
              >
                {/* Image area */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={f.image}
                    alt={f.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent" />

                  {/* Icon badge */}
                  <div className={`absolute top-4 left-4 w-10 h-10 rounded-2xl ${ac.iconBg} backdrop-blur-sm border border-white/20 flex items-center justify-center text-xl`}>
                    {f.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 gap-4">

                  {/* Top accent bar */}
                  <div className={`w-10 h-1 rounded-full ${ac.bar}`} />

                  {/* Titles */}
                  <div className="space-y-1">
                    <h3
                      className="font-display font-bold text-ink dark:text-snow text-xl"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {f.title}
                    </h3>
                    <p className={`font-sans text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded-md inline-block border ${ac.badge}`}>
                      {f.subtitle}
                    </p>
                  </div>

                  {/* Body */}
                  <p className="font-sans font-light text-sm text-ink/55 dark:text-snow/45 leading-relaxed flex-1">
                    {f.body}
                  </p>

                  {/* Bottom detail row */}
                  <div className="flex items-center gap-2 pt-3 border-t border-ink/6 dark:border-white/6">
                    <span className={`w-2 h-2 rounded-full ${ac.bar} flex-shrink-0`} />
                    <span className="font-sans text-xs font-medium text-ink/40 dark:text-snow/35">
                      Verified &amp; quality-checked at every step
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
