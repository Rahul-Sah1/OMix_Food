import { motion } from 'framer-motion'

const cards = [
  {
    number: '01',
    title: 'Our Mission',
    nepali: 'हाम्रो प्रतिबद्धता सरल छ – खेतबाट तपाईंको घरसम्म शुद्धता र स्वास्थ्य प्रदान गर्ने।',
    body: 'At our core, we are driven by a simple promise — Delivering Purity and Health from the farm to your home.',
    tags: ['100% Fresh and Healthy', 'Wide Range of Daily Essentials'],
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80',
    icon: '🌾',
  },
  {
    number: '02',
    title: 'Handpicked Harvests',
    nepali: 'कृषि र अन्न व्यवसायमा लामो अनुभवका साथ, हामी गुणस्तर के हो भन्ने राम्रोसँग बुझ्छौं।',
    body: 'With years of rich experience in farming, we understand what truly defines quality.',
    tags: ['🏅 Quality You Can Trust'],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80',
    icon: '🤝',
  },
  {
    number: '03',
    title: 'Preserving Nature',
    nepali: 'हामी देशभरका भरपर्दा किसानहरूबाट मात्र उत्कृष्ट वस्तुहरू संकलन गर्छौं।',
    body: 'We source only the best from trusted farms and process them using traditional methods.',
    tags: ['🌿 Natural Methods'],
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&q=80',
    icon: '🌿',
  },
  {
    number: '04',
    title: 'Fresh Delivery',
    nepali: 'हाम्रा उत्पादनहरू वातावरणमैत्री प्याकेजिङमा ताजा अवस्थामा तपाईंको घरसम्म पुर्‍याइन्छन्।',
    body: 'Our products are delivered fresh to your doorstep in sustainable, quality packaging.',
    tags: ['🌿 Freshness Delivered', '♻️ Eco-Friendly Packaging'],
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80',
    icon: '🚚',
  },
]

export default function WhyOMix() {
  return (
    <section id="why" className="relative overflow-hidden pb-20 lg:pb-28 bg-mint dark:bg-night transition-colors duration-300">

      {/* Wave divider — matches ProductGrid sand bg above */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none z-10">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none"
          className="w-full block" style={{ height: '72px', display: 'block' }}>
          <path
            d="M0,0 L0,44 C240,72 480,20 720,48 C960,76 1200,28 1440,44 L1440,0 Z"
            className="fill-sand dark:fill-night-section"
          />
          <path
            d="M0,0 L0,24 C300,60 600,8 900,36 C1100,54 1300,20 1440,30 L1440,0 Z"
            fill="rgba(255,255,255,0.06)"
          />
        </svg>
      </div>
      <div className="max-w-6xl mx-auto px-5 pt-24 lg:pt-28">

        {/* Header */}
        <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
          <p className="label">Why Choose Us</p>
          <h2
            className="font-display font-bold text-ink dark:text-snow"
            style={{ fontSize: 'clamp(2.4rem,5vw,3.8rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
          >
            Bringing Nature's Goodness{' '}
            <span className="text-forest italic">Closer to You</span>
          </h2>
          <p className="font-sans font-light text-ink/45 dark:text-snow/40 text-base leading-relaxed">
            From farm partnerships built on trust to eco-friendly doorstep delivery — every step
            we take is guided by one purpose.
          </p>
        </div>

        {/* Cards grid */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {cards.map((card) => (
            <motion.div
              key={card.number}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}
              className="bg-white dark:bg-night-card rounded-2xl overflow-hidden border border-ink/6 dark:border-white/7 shadow-card hover:shadow-card-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
            >
              {/* Card image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                />
                {/* Overlay with number */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-amber flex items-center justify-center shadow">
                  <span className="font-sans text-xs font-bold text-white">{card.number}</span>
                </div>
                <div className="absolute bottom-3 right-3 text-2xl">{card.icon}</div>
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col flex-1 gap-3">
                {/* Title */}
                <h3
                  className="font-display font-bold text-ink dark:text-snow text-lg leading-tight"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {card.title}
                </h3>

                {/* English body */}
                <p className="font-sans text-sm font-light text-ink/60 dark:text-snow/50 leading-relaxed">
                  {card.body}
                </p>

                {/* Divider */}
                <div className="w-8 h-0.5 bg-amber rounded-full" />

                {/* Nepali text */}
                <p className="font-sans text-xs text-ink/40 dark:text-snow/35 leading-relaxed italic">
                  {card.nepali}
                </p>

                {/* Tags */}
                {card.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-sans text-[10px] font-semibold px-2.5 py-1 rounded-full bg-forest/8 dark:bg-amber/10 text-forest dark:text-amber border border-forest/15 dark:border-amber/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-14 bg-forest rounded-3xl px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { value: '500+', label: 'Happy Families' },
            { value: '50+',  label: 'Partner Farms'  },
            { value: '24h',  label: 'Milled to Order' },
            { value: '100%', label: 'Chemical Free'  },
          ].map((s) => (
            <div key={s.label}>
              <p
                className="font-display font-bold text-amber"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.03em' }}
              >
                {s.value}
              </p>
              <p className="font-sans text-xs font-medium text-white/50 mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
