import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { products } from '../data/products'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22,1,0.36,1] } } }

export default function ProductGrid() {
  return (
    <section id="products" className="relative overflow-hidden pb-20 lg:pb-28 bg-sand dark:bg-night-section transition-colors duration-300">

      {/* Wave divider — matches Hero bg above */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none z-10">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none"
          className="w-full block" style={{ height: '72px', display: 'block' }}>
          <path
            d="M0,0 L0,36 C180,72 360,72 540,48 C720,24 900,0 1080,20 C1260,40 1360,60 1440,52 L1440,0 Z"
            className="fill-mint dark:fill-night"
          />
          <path
            d="M0,0 L0,20 C200,56 440,64 720,36 C1000,8 1240,40 1440,32 L1440,0 Z"
            fill="rgba(255,255,255,0.05)"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-5 pt-24 lg:pt-28">

        {/* Centered header */}
        <div className="text-center mb-14 space-y-4">
          <p className="label">Our Products</p>
          <h2 className="font-display font-bold text-ink dark:text-snow mx-auto"
            style={{ fontSize: 'clamp(2.8rem,6vw,4.4rem)', lineHeight: 1.04, letterSpacing: '-0.03em' }}>
            Our wheat,{' '}
            <span className="text-forest italic">your choice of pack</span>
          </h2>
          <p className="font-sans font-light text-ink/45 dark:text-snow/40 text-base max-w-sm mx-auto">
            Available in 2 kg, 5 kg and 10 kg — pick the size that fits your family.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="w-12 h-px bg-ink/10 dark:bg-white/8" />
            <span className="text-amber text-xl">🌾</span>
            <span className="w-12 h-px bg-ink/10 dark:bg-white/8" />
          </div>
        </div>

        {/* Grid */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <motion.div key={p.id} variants={item}><ProductCard product={p} /></motion.div>
          ))}
        </motion.div>

        {/* Info strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {['Free delivery above ₹499', 'Freshly milled to order', 'Secure payment'].map((t) => (
            <span key={t} className="flex items-center gap-2 font-sans text-xs text-ink/35 dark:text-snow/30">
              <span className="w-1.5 h-1.5 rounded-full bg-amber inline-block flex-shrink-0" />{t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
