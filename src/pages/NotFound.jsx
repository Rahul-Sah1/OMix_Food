import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-hero-light dark:bg-night flex items-center justify-center px-5 transition-colors">
      {/* Background blobs */}
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-amber/8 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full bg-forest/14 blur-[110px] pointer-events-none" />

      <div className="text-center max-w-md relative z-10">
        {/* Big 404 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <p className="font-display font-bold text-forest/15 dark:text-forest/10 select-none"
            style={{ fontSize: 'clamp(8rem,20vw,14rem)', lineHeight: 1, letterSpacing: '-0.05em' }}>
            404
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="-mt-8 space-y-4">

          <div className="text-5xl">🌾</div>

          <h1 className="font-display font-bold text-ink dark:text-snow"
            style={{ fontSize: 'clamp(1.5rem,4vw,2.2rem)', letterSpacing: '-0.02em' }}>
            Page Not Found
          </h1>

          <p className="font-sans text-ink/50 dark:text-snow/45 text-base leading-relaxed">
            Looks like this page got lost in the wheat fields. Let's get you back home.
          </p>

          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Link to="/"
              className="inline-flex items-center gap-2 font-sans font-bold text-sm
                bg-gradient-to-br from-forest to-forest-dark text-white
                px-6 py-3 rounded-xl
                shadow-[0_0_20px_rgba(20,83,45,0.4),0_4px_14px_rgba(20,83,45,0.3)]
                hover:shadow-[0_0_32px_rgba(20,83,45,0.6),0_6px_20px_rgba(20,83,45,0.45)]
                hover:-translate-y-0.5 transition-all duration-200">
              <Home size={16} />
              Go Home
            </Link>
            <button onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 font-sans font-semibold text-sm
                border border-ink/15 dark:border-white/12 text-ink/70 dark:text-snow/60
                px-6 py-3 rounded-xl hover:border-forest/30 hover:text-forest
                dark:hover:border-amber/30 dark:hover:text-amber
                transition-all duration-200">
              <ArrowLeft size={16} />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
