import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, ArrowRight, Wheat } from 'lucide-react'

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const quickLinks = [
  { label: 'Home',        href: '#home' },
  { label: 'Products',    href: '#products' },
  { label: 'Why 0Mix',   href: '#why' },
  { label: 'Our Journey', href: '#about' },
  { label: 'Blog',        href: '#blog' },
]

const support = ['FAQs', 'Shipping Policy', 'Return Policy', 'Track Your Order', 'Contact Us']

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">

      {/* ── Wave divider — matches Testimonials bg above ── */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none z-10">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none"
          className="w-full block" style={{ height: '72px', display: 'block' }}>
          <path
            d="M0,0 L0,36 C180,72 360,72 540,48 C720,24 900,0 1080,20 C1260,40 1360,60 1440,52 L1440,0 Z"
            className="fill-mint dark:fill-night"
          />
          <path
            d="M0,0 L0,20 C200,56 440,64 720,36 C1000,8 1240,40 1440,32 L1440,0 Z"
            fill="rgba(255,255,255,0.08)"
          />
        </svg>
      </div>

      {/* ── Background gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a1a] via-[#7c4a0a] to-[#a86818] dark:from-[#0d1f0d] dark:via-[#4a2a06] dark:to-[#6b4010]" />

      {/* ── Decorative glow blobs ── */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-400/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -left-16 w-80 h-80 rounded-full bg-amber/20 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-orange-300/10 blur-[140px] pointer-events-none" />

      {/* ── Large watermark wheat icon ── */}
      <div className="absolute -bottom-10 right-8 opacity-[0.04] pointer-events-none select-none">
        <Wheat size={320} strokeWidth={0.6} className="text-white" />
      </div>

      {/* ── Top CTA strip ── */}
      <div className="relative border-b border-white/10 pt-12">
        <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-center sm:text-left">
            <h3
              className="font-display font-bold text-white leading-tight"
              style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', letterSpacing: '-0.02em' }}
            >
              Pure Wheat, Right at Your Door
            </h3>
            <p className="font-sans text-white/55 text-sm mt-1">
              Farm-fresh from Terai fields to your kitchen — no middlemen, no compromise.
            </p>
          </div>
          <a
            href="#products"
            onClick={(e) => { e.preventDefault(); scrollTo('#products') }}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-white font-sans font-semibold text-sm px-5 py-2.5 rounded-xl shadow-amber hover:shadow-amber-lg transition-all duration-200 hover:-translate-y-px"
          >
            View Products <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="relative max-w-6xl mx-auto px-5 pt-14 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1 space-y-5">
            {/* Logo */}
            <div className="flex items-start">
              <img
                src="/Main_Logo.png"
                alt="OMix — Pure Wheat"
                style={{ height: 80, width: 'auto', maxWidth: 220, objectFit: 'contain' }}
              />
            </div>

            <p className="font-sans font-light text-white/50 text-xs leading-relaxed">
              100% pure wheat from Nepal's finest farms to your kitchen.
              No preservatives. No compromise. Just honest grain.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {['FSSAI', 'Chemical Free', 'Farm Direct'].map((t) => (
                <span key={t}
                  className="font-sans text-[9px] font-semibold px-2 py-0.5 rounded-full border border-white/20 text-white/50 bg-white/8">
                  {t}
                </span>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex gap-2">
              {[
                { icon: <Facebook size={14} />, label: 'Facebook' },
                { icon: <Instagram size={14} />, label: 'Instagram' },
                { icon: <Youtube size={14} />, label: 'YouTube' },
              ].map((s) => (
                <a key={s.label} href="#" aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white/50 hover:bg-amber hover:border-amber hover:text-white transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-5 h-px bg-amber/60" />
              <h4 className="font-sans text-[10px] font-bold tracking-[0.18em] uppercase text-amber">Navigation</h4>
            </div>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href) }}
                    className="font-sans text-xs text-white/50 hover:text-white flex items-center gap-1.5 group transition-colors duration-150">
                    <span className="w-0 group-hover:w-3 h-px bg-amber transition-all duration-200" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-5 h-px bg-amber/60" />
              <h4 className="font-sans text-[10px] font-bold tracking-[0.18em] uppercase text-amber">Support</h4>
            </div>
            <ul className="space-y-3">
              {support.map((l) => (
                <li key={l}>
                  <a href="#"
                    className="font-sans text-xs text-white/50 hover:text-white flex items-center gap-1.5 group transition-colors duration-150">
                    <span className="w-0 group-hover:w-3 h-px bg-amber transition-all duration-200" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-5 h-px bg-amber/60" />
              <h4 className="font-sans text-[10px] font-bold tracking-[0.18em] uppercase text-amber">Contact</h4>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={12} className="text-amber" />
                </div>
                <span className="font-sans text-xs text-white/50 leading-relaxed">Rangeli-6, Morang, Nepal</span>
              </li>
              <li>
                <a href="tel:+977-0000000000"
                  className="flex items-center gap-3 group">
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 group-hover:bg-amber group-hover:border-amber transition-all duration-200">
                    <Phone size={12} className="text-amber group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-sans text-xs text-white/50 group-hover:text-white transition-colors">+977 XXX-XXXXXXX</span>
                </a>
              </li>
              <li>
                <a href="mailto:hello@0mix.com"
                  className="flex items-center gap-3 group">
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 group-hover:bg-amber group-hover:border-amber transition-all duration-200">
                    <Mail size={12} className="text-amber group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-sans text-xs text-white/50 group-hover:text-white transition-colors">hello@0mix.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[11px] text-white/25">
            © {new Date().getFullYear()} 0Mix Foods Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2 font-sans text-[11px] text-white/25">
            <span className="w-1 h-1 rounded-full bg-amber/40 flex-shrink-0" />
            <p>Crafted with care in Nepal 🇳🇵</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
