import { motion } from 'framer-motion'
import { ArrowRight, Clock, User } from 'lucide-react'

const posts = [
  {
    id: 1, category: 'Health',
    title: 'Why Stone-Milled Flour is Better for Your Health',
    excerpt: 'Modern roller mills strip away the bran and germ — where 80% of nutrients live. Stone milling keeps everything intact.',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80',
    author: 'Team 0Mix', readTime: '4 min read', date: 'Jul 14, 2025',
  },
  {
    id: 2, category: 'Farming',
    title: "Inside Nepal's Terai Wheat Belt — Where Our Grain Grows",
    excerpt: 'The fertile plains of the Terai have fed families for centuries. We take you to the farms where every 0Mix grain begins.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    author: 'Rahul Sah', readTime: '6 min read', date: 'Jun 28, 2025',
  },
  {
    id: 3, category: 'Kitchen Tips',
    title: 'How to Store Wheat Flour for Maximum Freshness',
    excerpt: 'Freshly milled flour has oils and nutrients that go stale quickly. Here is how to store it right for every roti.',
    image: 'https://images.unsplash.com/photo-1603569259524-637ac1eff8e4?w=600&q=80',
    author: 'Team 0Mix', readTime: '3 min read', date: 'Jun 10, 2025',
  },
]

const catStyle = {
  Health:         'text-forest dark:text-forest-muted bg-forest/8 dark:bg-forest/15 border-forest/20 dark:border-forest/30',
  Farming:        'text-amber-dark dark:text-amber-light bg-amber/10 dark:bg-amber/12 border-amber/20 dark:border-amber/30',
  'Kitchen Tips': 'text-amber dark:text-amber-light bg-amber/8 dark:bg-amber/12 border-amber/15 dark:border-amber/25',
}

export default function Blog() {
  return (
    <section id="blog" className="relative overflow-hidden pb-20 lg:pb-28 bg-linen dark:bg-night transition-colors duration-300">

      {/* ── Wave divider — matches Features sand bg above ── */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none z-10">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none"
          className="w-full block" style={{ height: '72px', display: 'block' }}>
          <path
            d="M0,0 L0,44 C240,72 480,20 720,48 C960,76 1200,28 1440,44 L1440,0 Z"
            className="fill-sand dark:fill-night-section"
          />
          <path
            d="M0,0 L0,24 C300,60 600,8 900,36 C1100,54 1300,20 1440,30 L1440,0 Z"
            fill="rgba(20,83,45,0.04)"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-5 pt-24 lg:pt-28">

        {/* ── Ornamental divider ── */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-forest/20 dark:via-forest/30 to-forest/20 dark:to-forest/30" />
          <div className="flex items-center gap-3 px-5 py-2 rounded-full border border-forest/20 dark:border-forest/25 bg-forest/6 dark:bg-forest/12 shadow-sm">
            <span className="text-base leading-none">🌾</span>
            <span className="font-sans text-[10px] font-bold tracking-[0.22em] uppercase text-forest dark:text-forest-muted">
              Fresh from Our Fields
            </span>
            <span className="text-base leading-none">✍️</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-forest/20 dark:via-forest/30 to-forest/20 dark:to-forest/30" />
        </div>

        {/* ── Section header ── */}
        <div className="text-center mb-14 space-y-4">
          <p className="label">Our Blog</p>
          <h2 className="font-display font-bold text-ink dark:text-snow"
            style={{ fontSize: 'clamp(2.4rem,5vw,3.8rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            Our{' '}
            <span className="text-forest italic">Latest Blogs</span>
          </h2>
          <p className="font-sans font-light text-ink/45 dark:text-snow/40 text-base max-w-md mx-auto">
            Farming wisdom, nutrition science, and kitchen know-how — straight from the source.
          </p>
        </div>

        {/* ── Post cards ── */}
        <motion.div variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <motion.article key={post.id}
              variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22,1,0.36,1] } } }}
              className="bg-white dark:bg-night-card rounded-2xl overflow-hidden border border-ink/6 dark:border-white/6 hover:border-forest/25 dark:hover:border-amber/25 shadow-card hover:shadow-card-lg hover:-translate-y-1 transition-all duration-200 flex flex-col group">

              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img src={post.image} alt={post.title} loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className={`font-sans text-[10px] font-bold px-2.5 py-1 rounded-full border bg-white/90 dark:bg-night-card/90 backdrop-blur-sm ${catStyle[post.category]}`}>
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 gap-3">
                <h3 className="font-display font-bold text-ink dark:text-snow text-xl leading-tight group-hover:text-forest dark:group-hover:text-amber transition-colors"
                  style={{ letterSpacing: '-0.02em' }}>
                  {post.title}
                </h3>
                <p className="font-sans text-xs font-light text-ink/45 dark:text-snow/40 leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-ink/6 dark:border-white/6">
                  <div className="flex items-center gap-3 font-sans text-[10px] text-ink/35 dark:text-snow/30">
                    <span className="flex items-center gap-1"><User size={10} />{post.author}</span>
                    <span className="flex items-center gap-1"><Clock size={10} />{post.readTime}</span>
                  </div>
                  <a href="#" className="flex items-center gap-1 font-sans text-[11px] font-bold text-forest dark:text-amber hover:opacity-70 transition-opacity">
                    Read <ArrowRight size={11} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <a href="#" className="btn-outline">View All Articles <ArrowRight size={15} /></a>
        </div>
      </div>
    </section>
  )
}
