import { motion } from 'framer-motion'

const badges = [
  { icon: '🏛️', label: 'FSSAI Certified' },
  { icon: '🌿', label: '100% Organic' },
  { icon: '🇳🇵', label: 'Made in Nepal' },
  { icon: '🚫', label: 'No Additives' },
  { icon: '♻️', label: 'Eco Packaging' },
  { icon: '🚚', label: '48h Delivery' },
]

export default function TrustBar() {
  return (
    <section className="bg-forest-gradient py-4 overflow-hidden">
      <motion.div
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        initial="hidden" whileInView="show" viewport={{ once: true }}
        className="max-w-6xl mx-auto px-5 flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
        {badges.map((b) => (
          <motion.div key={b.label}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className="flex items-center gap-2 flex-1 justify-center min-w-[100px]">
            <span className="text-lg">{b.icon}</span>
            <span className="text-parchment/90 font-medium text-xs md:text-sm whitespace-nowrap">{b.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
