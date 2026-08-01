import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, X } from 'lucide-react'

export default function VideoSection() {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  const handlePlay = () => {
    setPlaying(true)
    setTimeout(() => videoRef.current?.play(), 50)
  }

  return (
    <section id="about" className="relative overflow-hidden pb-20 lg:pb-28 transition-colors duration-300">

      {/* ── Background: light orange gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#b45309] via-[#c2410c] to-[#9a3412] dark:from-[#431407] dark:via-[#7c2d12] dark:to-[#571c05]" />

      {/* ── Glow blobs ── */}
      <div className="absolute top-10 -left-16 w-80 h-80 rounded-full bg-orange-300/30 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 -right-16 w-96 h-96 rounded-full bg-amber/35 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-64 rounded-full bg-orange-200/15 blur-[100px] pointer-events-none" />

      {/* Wave divider — matches WhyOMix bg above */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none z-10">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none"
          className="w-full block" style={{ height: '72px', display: 'block' }}>
          <path
            d="M0,0 L0,36 C180,72 360,72 540,48 C720,24 900,0 1080,20 C1260,40 1360,60 1440,52 L1440,0 Z"
            className="fill-mint dark:fill-night"
          />
          <path
            d="M0,0 L0,20 C200,56 440,64 720,36 C1000,8 1240,40 1440,32 L1440,0 Z"
            fill="rgba(255,255,255,0.03)"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-5 pt-24 lg:pt-28">

        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <p className="label">Our Story</p>
          <h2 className="font-display font-bold text-snow"
            style={{ fontSize: 'clamp(2.4rem,5vw,3.8rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            The <span className="text-amber italic">0Mix</span> Journey
          </h2>
          <p className="font-sans font-light text-snow/40 text-base max-w-md mx-auto leading-relaxed">
            From Nepal's Terai fields to your dinner table — how we keep every grain honest.
          </p>
        </div>

        {/* Video player */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden max-w-4xl mx-auto shadow-2xl group"
          style={{ aspectRatio: '16/9' }}>

          <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=85"
            alt="Wheat field at golden hour"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${playing ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />

          {!playing && (
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
          )}

          <video ref={videoRef} src="" playsInline controls={playing}
            poster="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=85"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${playing ? 'opacity-100' : 'opacity-0'}`} />

          {!playing && (
            <button onClick={handlePlay} aria-label="Play video"
              className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-full border-2 border-snow/50 bg-snow/10 backdrop-blur-sm flex items-center justify-center shadow-glow-amber group-hover:border-amber group-hover:bg-amber/20 transition-all duration-300">
                <Play size={30} className="text-snow fill-snow ml-1.5" />
              </motion.div>
              <span className="font-sans font-semibold text-snow/70 text-sm tracking-wide">Watch Our Story</span>
            </button>
          )}

          {playing && (
            <button onClick={() => { setPlaying(false); videoRef.current?.pause() }}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-ink/60 backdrop-blur-sm flex items-center justify-center text-snow hover:bg-ink/80 transition-colors">
              <X size={17} />
            </button>
          )}

          {!playing && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans text-snow/25 text-[10px] tracking-wide">
              Add your video src in VideoSection.jsx
            </p>
          )}
        </motion.div>

        {/* Icons row */}
        <div className="flex items-center justify-center gap-16 mt-12">
          {[['🌾', 'Harvested'], ['⚙️', 'Milled'], ['🏠', 'Delivered']].map(([icon, label]) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span className="text-3xl">{icon}</span>
              <span className="font-sans text-xs font-medium text-snow/50 tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
