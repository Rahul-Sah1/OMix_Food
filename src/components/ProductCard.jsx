import { useState } from 'react'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProductCard({ product }) {
  const [sel, setSel] = useState(0)
  const s = product.sizes[sel]
  const disc = Math.round(((s.originalPrice - s.price) / s.originalPrice) * 100)

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 340, damping: 22 }}
      className="bg-white dark:bg-night-card rounded-2xl overflow-hidden border border-ink/6 dark:border-white/7 shadow-card hover:shadow-card-lg dark:hover:shadow-card-dark transition-all duration-300 flex flex-col group">

      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img src={product.image} alt={product.name} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />

        <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-start">
          {product.badge
            ? <span className="font-sans text-[10px] font-bold px-2.5 py-1 rounded-lg bg-amber text-white shadow">{product.badge}</span>
            : <span />}
          {disc > 0 && (
            <span className="font-sans text-[10px] font-bold px-2 py-0.5 rounded-lg bg-ink dark:bg-night text-white">-{disc}%</span>
          )}
        </div>

        <div className="absolute bottom-2.5 left-2.5">
          <span className="font-sans text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/90 dark:bg-night-card/80 backdrop-blur-sm text-forest dark:text-forest-muted border border-forest/20">
            🌿 Pure &amp; Natural
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <p className="font-sans text-[10px] font-semibold text-ink/35 dark:text-snow/30 uppercase tracking-widest mb-1">{product.subtitle}</p>
          <h3 className="font-display font-bold text-ink dark:text-snow text-lg leading-tight" style={{ letterSpacing: '-0.02em' }}>{product.name}</h3>
          <p className="font-sans text-[11px] text-ink/40 dark:text-snow/35 mt-1.5 leading-relaxed line-clamp-2">{product.description}</p>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1.5">
          <div className="flex gap-px">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11}
                className={i < Math.floor(product.rating) ? 'fill-amber text-amber' : 'fill-sand-dark text-sand-dark dark:fill-white/10 dark:text-white/10'} />
            ))}
          </div>
          <span className="font-sans text-xs font-semibold text-ink/60 dark:text-snow/55">{product.rating}</span>
          <span className="font-sans text-xs text-ink/30 dark:text-snow/25">({product.reviews})</span>
        </div>

        {/* Size selector */}
        <div>
          <p className="font-sans text-[9px] font-bold text-ink/35 dark:text-snow/30 uppercase tracking-[0.18em] mb-2">Select Pack</p>
          <div className="flex gap-1.5">
            {product.sizes.map((sz, i) => (
              <button key={sz.label} onClick={() => setSel(i)}
                className={`flex-1 py-2 rounded-xl font-sans text-xs font-bold border-2 transition-all duration-150 ${
                  sel === i
                    ? 'bg-forest border-forest text-white shadow-forest'
                    : 'bg-transparent border-ink/12 dark:border-white/10 text-ink/55 dark:text-snow/45 hover:border-forest dark:hover:border-amber'
                }`}>
                {sz.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price row */}
        <div className="flex items-end justify-between pt-2 border-t border-ink/6 dark:border-white/6 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-2xl text-ink dark:text-snow leading-none" style={{ letterSpacing: '-0.03em' }}>₹{s.price}</span>
              <span className="font-sans text-xs text-ink/30 dark:text-snow/25 line-through">₹{s.originalPrice}</span>
            </div>
            <p className="font-sans text-[10px] text-ink/35 dark:text-snow/30 mt-0.5">for {s.label}</p>
          </div>
          <span className="font-sans text-[10px] font-bold text-forest dark:text-amber bg-forest/8 dark:bg-amber/10 px-2.5 py-1 rounded-lg">
            Save {disc}%
          </span>
        </div>
      </div>
    </motion.article>
  )
}
