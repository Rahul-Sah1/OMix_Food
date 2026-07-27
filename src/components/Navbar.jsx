import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon, PhoneCall, Leaf } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'

const navLinks = [
  { label: 'Home',        href: '#home' },
  { label: 'Products',    href: '#products' },
  { label: 'Why 0Mix',   href: '#why' },
  { label: 'Our Journey', href: '#about' },
  { label: 'Blog',        href: '#blog' },
]

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar({ dark, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          bg-linen/98 dark:bg-night/98 backdrop-blur-xl
          border-b border-ink/8 dark:border-white/6
          ${scrolled
            ? 'shadow-[0_4px_32px_rgba(20,83,45,0.10)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] py-2.5'
            : 'py-3.5'}`}
      >
        {/* ── Top accent gradient bar ── */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-forest via-amber to-forest opacity-80" />

        <nav className="max-w-6xl mx-auto px-5 flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('#home') }}
            className="flex-shrink-0">
            <Logo size="sm" dark={dark} />
          </a>

          {/* Desktop nav links — centered */}
          <ul className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(l.href) }}
                  className="font-sans text-sm font-semibold text-ink/70 hover:text-forest dark:text-snow/65 dark:hover:text-amber transition-colors relative group px-3 py-2 rounded-lg hover:bg-forest/5 dark:hover:bg-white/4"
                >
                  {l.label}
                  {/* Gradient underline slide-in */}
                  <span className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-forest to-amber scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              </li>
            ))}
          </ul>

          {/* Right — CTA + theme toggle + hamburger */}
          <div className="flex items-center gap-3 flex-shrink-0">

            {/* Vertical divider */}
            <span className="hidden md:block w-px h-7 bg-gradient-to-b from-transparent via-ink/12 dark:via-white/10 to-transparent" />

            {/* ── Contact Us button — desktop ── */}
            <a
              href="#features"
              onClick={(e) => { e.preventDefault(); scrollTo('#features') }}
              className="hidden md:inline-flex items-center gap-2 relative overflow-hidden
                bg-gradient-to-br from-forest via-forest to-forest-dark
                text-white font-sans font-bold text-sm
                px-5 py-2.5 rounded-xl
                border border-forest-light/25
                shadow-[0_0_18px_rgba(20,83,45,0.45),0_4px_14px_rgba(20,83,45,0.35)]
                hover:shadow-[0_0_28px_rgba(20,83,45,0.7),0_6px_20px_rgba(20,83,45,0.5)]
                hover:-translate-y-0.5 transition-all duration-200 group"
            >
              {/* Shimmer sweep */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent
                -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out" />

              {/* Amber glow dot */}
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber" />
              </span>

              <PhoneCall size={13} className="relative" />
              <span className="relative">Contact Us</span>
            </a>

            {/* Dark / Light toggle pill */}
            <button
              onClick={toggleTheme}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-amber outline-none border ${
                dark
                  ? 'bg-forest border-forest-dark shadow-[0_0_12px_rgba(20,83,45,0.4)]'
                  : 'bg-sand-dark border-ink/15'
              }`}
            >
              <Sun  size={11} className="absolute left-1.5 top-1/2 -translate-y-1/2 text-amber" />
              <Moon size={11} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-snow/50" />
              <motion.span
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center ${
                  dark ? 'left-[calc(100%-1.625rem)]' : 'left-0.5'
                }`}
              >
                {dark
                  ? <Moon size={11} className="text-forest" />
                  : <Sun  size={11} className="text-amber" />}
              </motion.span>
            </button>

            {/* Hamburger — mobile only */}
            <button
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-xl border border-ink/10 dark:border-white/10 hover:bg-forest hover:border-forest hover:text-white dark:hover:bg-forest dark:hover:border-forest transition-all duration-200"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen
                ? <X    size={20} className="text-ink dark:text-snow group-hover:text-white" />
                : <Menu size={20} className="text-ink dark:text-snow" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div key="overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            <motion.nav key="drawer"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-linen dark:bg-night-card flex flex-col shadow-2xl border-l border-ink/8 dark:border-white/6"
            >
              {/* Drawer top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-forest via-amber to-forest" />

              <div className="flex items-center justify-between px-5 py-4 border-b border-ink/8 dark:border-white/6 mt-[2.5px]">
                <Logo size="sm" dark={dark} />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 rounded-lg border border-ink/10 dark:border-white/10 hover:bg-forest hover:border-forest transition-all duration-200 group"
                >
                  <X size={18} className="text-ink dark:text-snow group-hover:text-white" />
                </button>
              </div>

              {/* Leaf decoration */}
              <div className="flex items-center gap-2 px-5 pt-4 pb-1">
                <Leaf size={11} className="text-forest dark:text-amber" />
                <span className="font-sans text-[10px] font-bold tracking-[0.15em] uppercase text-ink/30 dark:text-snow/25">
                  Pure Wheat Since Day One
                </span>
              </div>

              <ul className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(l.href); setMenuOpen(false) }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-semibold text-ink/65 hover:bg-forest hover:text-white dark:text-snow/55 dark:hover:bg-forest dark:hover:text-white transition-all duration-200 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber/40 group-hover:bg-white flex-shrink-0 transition-colors" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="p-4 space-y-2.5 border-t border-ink/8 dark:border-white/6">
                {/* Contact Us — mobile */}
                <a
                  href="#features"
                  onClick={(e) => { e.preventDefault(); scrollTo('#features'); setMenuOpen(false) }}
                  className="relative overflow-hidden flex items-center justify-center gap-2
                    bg-gradient-to-br from-forest via-forest to-forest-dark
                    text-white font-sans font-bold text-sm w-full py-3 rounded-xl
                    shadow-[0_0_18px_rgba(20,83,45,0.45),0_4px_14px_rgba(20,83,45,0.35)]
                    border border-forest-light/25 transition-all group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent
                    -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  <span className="flex h-2 w-2 flex-shrink-0 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber" />
                  </span>
                  <PhoneCall size={15} className="relative" />
                  <span className="relative">Contact Us</span>
                </a>

                {/* Theme toggle row */}
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-sand dark:bg-white/5 font-sans text-sm font-medium text-ink/60 dark:text-snow/50 hover:text-forest dark:hover:text-amber border border-ink/8 dark:border-white/6 transition-colors"
                >
                  <span>{dark ? 'Dark Mode On' : 'Light Mode On'}</span>
                  {dark
                    ? <Moon size={16} className="text-amber" />
                    : <Sun  size={16} className="text-amber" />}
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
