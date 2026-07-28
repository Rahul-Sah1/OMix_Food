import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, ShoppingBag, Plus, Minus } from 'lucide-react'

const WA_ICON = (
  <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.004 2C8.28 2 2 8.28 2 16.004c0 2.464.663 4.842 1.918 6.917L2 30l7.268-1.886A13.96 13.96 0 0 0 16.004 30C23.72 30 30 23.72 30 16.004 30 8.28 23.72 2 16.004 2zm0 25.555a11.56 11.56 0 0 1-6.03-1.692l-.433-.257-4.312 1.12 1.148-4.195-.283-.45a11.587 11.587 0 0 1-1.753-6.077c0-6.396 5.207-11.6 11.6-11.6 6.396 0 11.6 5.204 11.6 11.6.003 6.396-5.2 11.55-11.537 11.55zm6.364-8.668c-.347-.175-2.058-1.015-2.377-1.132-.32-.117-.552-.175-.784.175s-.899 1.132-1.103 1.366c-.203.232-.406.261-.752.087-.347-.175-1.463-.54-2.786-1.72-1.03-.917-1.726-2.05-1.928-2.397-.203-.347-.022-.535.152-.707.157-.156.347-.406.52-.609.175-.203.232-.347.348-.58.116-.232.058-.435-.03-.609-.087-.175-.784-1.887-1.074-2.582-.284-.678-.57-.587-.784-.597l-.667-.013c-.232 0-.609.087-.928.435-.319.347-1.218 1.19-1.218 2.902s1.248 3.365 1.421 3.597c.175.232 2.455 3.748 5.951 5.256.832.36 1.481.574 1.987.734.834.265 1.595.228 2.196.138.67-.1 2.058-.84 2.348-1.653.29-.81.29-1.506.203-1.653-.086-.145-.319-.232-.667-.406z"/>
  </svg>
)

const WA_NUMBER = '916378817839'

const CATALOG = [
  {
    id: 'packets',
    label: 'Packets',
    desc: '2 kg per packet',
    emoji: '📦',
    unitWeight: 2,
    unitLabel: 'pkt',
    color: 'green',
    variants: [
      { id: 'orig-pkt',  name: 'Original', tag: '100% Natural' },
      { id: 'prem-pkt',  name: 'Premium',  tag: 'Extra Fine'   },
    ],
  },
  {
    id: 'boras',
    label: 'Bora / Sack',
    desc: '25 kg · 15 packets',
    emoji: '🌾',
    unitWeight: 25,
    unitLabel: 'bora',
    color: 'amber',
    variants: [
      { id: 'orig-bora', name: 'Original', tag: '100% Natural' },
      { id: 'prem-bora', name: 'Premium',  tag: 'Extra Fine'   },
    ],
  },
]

const initQty = () => {
  const q = {}
  CATALOG.forEach(c => c.variants.forEach(v => { q[v.id] = 0 }))
  return q
}

function buildMessage(form, qty) {
  const SEP = '――――――――――――――――――――'
  const lines = []

  lines.push('🌾 *NEW ORDER — 0MIX WHEAT* 🌾')
  lines.push(SEP)
  lines.push('')
  lines.push(`👤  *Name*    ${form.name}`)
  lines.push(`📞  *Phone*   ${form.phone}`)
  lines.push(`🏪  *Store*   ${form.store}`)
  lines.push('')
  lines.push(SEP)

  let totalKg = 0

  CATALOG.forEach(cat => {
    const picked = cat.variants.filter(v => qty[v.id] > 0)
    if (!picked.length) return
    lines.push('')
    lines.push(`${cat.emoji} *${cat.label.toUpperCase()}* _( ${cat.desc} )_`)
    picked.forEach(v => {
      const kg = qty[v.id] * cat.unitWeight
      totalKg += kg
      lines.push(`   ✅  ${v.name} Wheat  ×  ${qty[v.id]}  =  *${kg} kg*`)
    })
  })

  lines.push('')
  lines.push(SEP)
  lines.push('')
  lines.push(`⚖️  *Total Weight  →  ${totalKg} kg*`)
  lines.push(`💳  _Payment collected on delivery_`)
  if (form.notes) {
    lines.push('')
    lines.push(`📝  _Note: ${form.notes}_`)
  }
  lines.push('')
  lines.push(SEP)
  lines.push('_0Mix Foods · omixfood.com_ 🌿')

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
}

function ProductCard({ variant, cat, qty, onDec, onInc }) {
  const q = qty[variant.id] || 0
  const isGreen = cat.color === 'green'
  const selected = q > 0

  return (
    <div className={`relative rounded-2xl border-2 transition-all duration-200 overflow-hidden
      ${selected
        ? isGreen
          ? 'border-forest bg-forest/5 dark:bg-forest/10 dark:border-forest/70'
          : 'border-amber bg-amber/5 dark:bg-amber/10 dark:border-amber/70'
        : 'border-ink/8 dark:border-white/8 bg-white dark:bg-white/3 hover:border-ink/20 dark:hover:border-white/15'
      }`}>

      {/* Selected glow */}
      {selected && (
        <div className={`absolute inset-0 opacity-20 pointer-events-none
          ${isGreen ? 'bg-gradient-to-br from-forest/30 to-transparent' : 'bg-gradient-to-br from-amber/30 to-transparent'}`} />
      )}

      <div className="relative p-3 flex flex-col gap-2">

        {/* Tag pill */}
        <span className={`self-start font-sans text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full
          ${selected
            ? isGreen ? 'bg-forest/15 text-forest dark:text-emerald-400' : 'bg-amber/15 text-amber-700 dark:text-amber'
            : 'bg-ink/6 dark:bg-white/6 text-ink/40 dark:text-snow/35'
          }`}>
          {variant.tag}
        </span>

        {/* Name */}
        <div>
          <p className={`font-sans font-bold text-sm leading-tight transition-colors
            ${selected ? 'text-ink dark:text-snow' : 'text-ink/60 dark:text-snow/45'}`}>
            {variant.name}
          </p>
          <p className="font-sans text-[10px] text-ink/35 dark:text-snow/25">Wheat</p>
        </div>

        {/* Weight badge when selected */}
        <AnimatePresence>
          {selected && (
            <motion.p
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className={`font-sans font-bold text-xs ${isGreen ? 'text-forest dark:text-emerald-400' : 'text-amber-700 dark:text-amber'}`}>
              {q * cat.unitWeight} kg
            </motion.p>
          )}
        </AnimatePresence>

        {/* Stepper */}
        <div className="flex items-center justify-between mt-1">
          <button type="button" onClick={onDec} disabled={q === 0}
            className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all active:scale-90
              ${q === 0
                ? 'border-ink/10 dark:border-white/8 opacity-25 cursor-not-allowed'
                : isGreen
                  ? 'border-forest/40 text-forest dark:text-emerald-400 hover:bg-forest/10'
                  : 'border-amber/40 text-amber hover:bg-amber/10'
              }`}>
            <Minus size={10} />
          </button>

          <span className={`font-display font-bold text-base tabular-nums w-6 text-center
            ${q > 0
              ? isGreen ? 'text-forest dark:text-emerald-400' : 'text-amber-700 dark:text-amber'
              : 'text-ink/20 dark:text-snow/15'}`}>
            {q}
          </span>

          <button type="button" onClick={onInc}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90
              ${isGreen
                ? 'bg-forest text-white hover:bg-forest-dark shadow-[0_2px_8px_rgba(20,83,45,0.4)]'
                : 'bg-amber text-white hover:bg-amber/90 shadow-[0_2px_8px_rgba(217,119,6,0.4)]'
              }`}>
            <Plus size={10} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function WhatsAppButton() {
  const [open, setOpen]           = useState(false)
  const [form, setForm]           = useState({ name: '', phone: '', store: '', notes: '' })
  const [qty, setQty]             = useState(initQty)
  const [errors, setErrors]       = useState({})
  const [showTooltip, setShowTooltip] = useState(false)
  const tooltipTimer              = useRef(null)

  // Show tooltip 2.5s after page load, auto-hide after 9s
  useEffect(() => {
    const show = setTimeout(() => setShowTooltip(true), 2500)
    const hide = setTimeout(() => setShowTooltip(false), 11500)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const changeQty = (id, d) =>
    setQty(p => ({ ...p, [id]: Math.max(0, (p[id] || 0) + d) }))

  function validate() {
    const e = {}
    if (!form.name.trim())  e.name  = 'Required'
    if (!form.phone.trim()) e.phone = 'Required'
    if (!form.store.trim()) e.store = 'Required'
    if (!Object.values(qty).some(q => q > 0)) e.items = 'Select at least one product'
    return e
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    window.open(buildMessage(form, qty), '_blank', 'noopener')
    setOpen(false)
    setForm({ name: '', phone: '', store: '', notes: '' })
    setQty(initQty())
    setErrors({})
  }

  const totalKg = CATALOG.reduce((s, cat) =>
    s + cat.variants.reduce((ss, v) => ss + (qty[v.id] || 0) * cat.unitWeight, 0), 0)

  const inp = (err) =>
    `w-full font-sans text-sm px-3.5 py-2.5 rounded-xl border transition-all duration-200
    bg-ink/[0.03] dark:bg-white/[0.04] text-ink dark:text-snow
    placeholder-ink/30 dark:placeholder-snow/25
    focus:outline-none focus:bg-white dark:focus:bg-white/8
    ${err ? 'border-red-400/60' : 'border-ink/10 dark:border-white/8 focus:border-forest/40 dark:focus:border-amber/30'}`

  return (
    <>
      {/* ── Sticky mobile Order Now bar ───────────────────────────────── */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 22 }}
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2">
        <button
          onClick={() => { setOpen(true); setShowTooltip(false) }}
          className="w-full flex items-center justify-center gap-3
            bg-[#25D366] hover:bg-[#20c45e] text-white
            font-sans font-bold text-[15px]
            py-4 rounded-2xl
            shadow-[0_-4px_30px_rgba(37,211,102,0.45)]
            active:scale-[0.98] transition-all duration-150
            relative overflow-hidden group">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
            -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          {WA_ICON}
          <span className="relative">Order Now on WhatsApp</span>
          {/* live dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white/90" />
          </span>
        </button>
      </motion.div>

      {/* ── Desktop floating button + tooltip ────────────────────────── */}
      <div className="hidden sm:block fixed bottom-6 right-6 z-50">

        {/* Tooltip speech bubble — flashes on appear */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 8 }}
              animate={{
                opacity: 1, scale: [0.8, 1.05, 1],
                y: 0,
                transition: { duration: 0.4 }
              }}
              exit={{ opacity: 0, scale: 0.85, y: 6, transition: { duration: 0.2 } }}
              className="absolute bottom-[72px] right-0 mb-1">

              {/* Flash pulse wrapper */}
              <motion.div
                animate={{ scale: [1, 1.04, 1, 1.04, 1, 1.02, 1] }}
                transition={{ delay: 0.4, duration: 1.6, times: [0,.2,.4,.6,.8,.9,1] }}>

                <div className="relative bg-white dark:bg-[#1a2018] rounded-2xl rounded-br-sm
                  px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.18)] border border-ink/8 dark:border-white/8
                  min-w-[170px]">

                  {/* Dismiss */}
                  <button onClick={() => setShowTooltip(false)}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-ink/10 dark:bg-white/15
                      flex items-center justify-center hover:bg-ink/20 transition">
                    <X size={10} className="text-ink/60 dark:text-snow/60" />
                  </button>

                  <p className="font-sans font-bold text-sm text-ink dark:text-snow whitespace-nowrap">
                    🛒 Order Now Online!
                  </p>
                  <p className="font-sans text-[10px] text-ink/45 dark:text-snow/35 mt-0.5">
                    Pay on delivery · No advance
                  </p>

                  {/* Tail pointing down-right */}
                  <div className="absolute -bottom-[7px] right-4 w-3.5 h-3.5
                    bg-white dark:bg-[#1a2018]
                    border-b border-r border-ink/8 dark:border-white/8
                    rotate-45" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating button */}
        <motion.button
          onClick={() => { setOpen(true); setShowTooltip(false) }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full flex items-center justify-center relative
            bg-[#25D366] shadow-[0_4px_24px_rgba(37,211,102,0.5)] hover:shadow-[0_6px_32px_rgba(37,211,102,0.7)]
            transition-shadow"
          aria-label="Order on WhatsApp">
          <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.004 2C8.28 2 2 8.28 2 16.004c0 2.464.663 4.842 1.918 6.917L2 30l7.268-1.886A13.96 13.96 0 0 0 16.004 30C23.72 30 30 23.72 30 16.004 30 8.28 23.72 2 16.004 2zm0 25.555a11.56 11.56 0 0 1-6.03-1.692l-.433-.257-4.312 1.12 1.148-4.195-.283-.45a11.587 11.587 0 0 1-1.753-6.077c0-6.396 5.207-11.6 11.6-11.6 6.396 0 11.6 5.204 11.6 11.6.003 6.396-5.2 11.55-11.537 11.55zm6.364-8.668c-.347-.175-2.058-1.015-2.377-1.132-.32-.117-.552-.175-.784.175s-.899 1.132-1.103 1.366c-.203.232-.406.261-.752.087-.347-.175-1.463-.54-2.786-1.72-1.03-.917-1.726-2.05-1.928-2.397-.203-.347-.022-.535.152-.707.157-.156.347-.406.52-.609.175-.203.232-.347.348-.58.116-.232.058-.435-.03-.609-.087-.175-.784-1.887-1.074-2.582-.284-.678-.57-.587-.784-.597l-.667-.013c-.232 0-.609.087-.928.435-.319.347-1.218 1.19-1.218 2.902s1.248 3.365 1.421 3.597c.175.232 2.455 3.748 5.951 5.256.832.36 1.481.574 1.987.734.834.265 1.595.228 2.196.138.67-.1 2.058-.84 2.348-1.653.29-.81.29-1.506.203-1.653-.086-.145-.319-.232-.667-.406z"/>
          </svg>
          <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-30" />
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 32 }}
              className="fixed inset-x-0 bottom-0 z-50
                sm:inset-auto sm:bottom-24 sm:right-6
                w-full sm:w-[24rem]
                bg-[#f9faf7] dark:bg-[#0f1410]
                rounded-t-[28px] sm:rounded-[24px]
                shadow-[0_-20px_70px_rgba(0,0,0,0.25)] dark:shadow-[0_-20px_70px_rgba(0,0,0,0.6)]
                border-t sm:border border-forest/10 dark:border-forest/20
                flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden">

              {/* Drag pill */}
              <div className="sm:hidden pt-3 pb-1 flex justify-center flex-shrink-0">
                <div className="w-9 h-1 rounded-full bg-ink/15 dark:bg-white/12" />
              </div>

              {/* Header */}
              <div className="flex-shrink-0 px-5 pt-2 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E]
                      flex items-center justify-center shadow-[0_4px_14px_rgba(37,211,102,0.45)]">
                      <ShoppingBag size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-sans font-bold text-base text-ink dark:text-snow leading-tight">
                        Place Order
                      </p>
                      <p className="font-sans text-[11px] text-ink/40 dark:text-snow/30 mt-0.5">
                        Pay on delivery · No advance
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setOpen(false)}
                    className="mt-1 w-8 h-8 rounded-full bg-ink/6 dark:bg-white/8
                      hover:bg-ink/12 dark:hover:bg-white/14 flex items-center justify-center transition">
                    <X size={15} className="text-ink/50 dark:text-snow/50" />
                  </button>
                </div>
              </div>

              {/* Scrollable content */}
              <form onSubmit={handleSubmit}
                className="flex-1 overflow-y-auto px-5 pb-6 space-y-5">

                {/* ── Contact info ── */}
                <div className="bg-white dark:bg-white/4 rounded-2xl border border-ink/8 dark:border-white/6 overflow-hidden divide-y divide-ink/6 dark:divide-white/5">
                  {[
                    { key: 'name',  placeholder: 'Your Name',    type: 'text' },
                    { key: 'phone', placeholder: 'Phone Number', type: 'tel'  },
                    { key: 'store', placeholder: 'Store Name',   type: 'text' },
                  ].map(({ key, placeholder, type }) => (
                    <div key={key} className="relative">
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[key]}
                        onChange={e => {
                          setForm(f => ({ ...f, [key]: e.target.value }))
                          if (errors[key]) setErrors(er => ({ ...er, [key]: '' }))
                        }}
                        className={`w-full font-sans text-sm px-4 py-3 bg-transparent
                          text-ink dark:text-snow placeholder-ink/30 dark:placeholder-snow/25
                          focus:outline-none focus:bg-forest/3 dark:focus:bg-forest/8 transition-colors
                          ${errors[key] ? 'placeholder-red-400/70' : ''}`}
                      />
                      {errors[key] && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2
                          font-sans text-[10px] font-semibold text-red-500">
                          {errors[key]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* ── Product sections ── */}
                {CATALOG.map(cat => (
                  <div key={cat.id}>
                    {/* Section label */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg leading-none">{cat.emoji}</span>
                      <div>
                        <p className="font-sans font-bold text-sm text-ink dark:text-snow">{cat.label}</p>
                        <p className="font-sans text-[10px] text-ink/40 dark:text-snow/30">{cat.desc}</p>
                      </div>
                    </div>

                    {/* 2-column card grid */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {cat.variants.map(v => (
                        <ProductCard
                          key={v.id}
                          variant={v}
                          cat={cat}
                          qty={qty}
                          onDec={() => changeQty(v.id, -1)}
                          onInc={() => changeQty(v.id, 1)}
                        />
                      ))}
                    </div>
                  </div>
                ))}

                {errors.items && (
                  <p className="text-red-500 text-xs -mt-2 pl-1">{errors.items}</p>
                )}

                {/* ── Order summary ── */}
                <AnimatePresence>
                  {totalKg > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      className="rounded-2xl overflow-hidden">
                      <div className="bg-gradient-to-r from-forest via-forest to-[#166534]
                        px-4 py-3.5 flex items-center justify-between
                        shadow-[0_4px_20px_rgba(20,83,45,0.35)]">
                        <div>
                          <p className="font-sans text-[10px] text-white/60 font-medium">Your Order</p>
                          <p className="font-display font-bold text-white text-xl leading-none mt-0.5"
                            style={{ letterSpacing: '-0.02em' }}>
                            {totalKg} kg
                          </p>
                        </div>
                        <div className="w-px h-8 bg-white/20" />
                        <div className="text-right">
                          <p className="font-sans text-[10px] text-white/60">Items</p>
                          <p className="font-sans font-bold text-white text-lg leading-none mt-0.5">
                            {Object.values(qty).filter(q => q > 0).length} type{Object.values(qty).filter(q => q > 0).length !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <div className="text-3xl">🌾</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Notes ── */}
                <textarea
                  rows={2}
                  placeholder="Any notes? (optional)"
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  className="w-full font-sans text-sm px-4 py-3 resize-none
                    bg-white dark:bg-white/4 rounded-2xl
                    border border-ink/8 dark:border-white/6
                    text-ink dark:text-snow placeholder-ink/30 dark:placeholder-snow/25
                    focus:outline-none focus:border-forest/35 dark:focus:border-amber/30
                    transition-colors duration-200" />

                {/* ── Submit ── */}
                <button type="submit"
                  className="w-full flex items-center justify-center gap-2.5
                    font-sans font-bold text-[15px] text-white
                    bg-[#25D366] hover:bg-[#20c45e] rounded-2xl py-4
                    shadow-[0_4px_24px_rgba(37,211,102,0.45)]
                    hover:shadow-[0_8px_32px_rgba(37,211,102,0.6)]
                    hover:-translate-y-0.5 transition-all duration-200
                    relative overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent
                    -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white relative" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.004 2C8.28 2 2 8.28 2 16.004c0 2.464.663 4.842 1.918 6.917L2 30l7.268-1.886A13.96 13.96 0 0 0 16.004 30C23.72 30 30 23.72 30 16.004 30 8.28 23.72 2 16.004 2zm0 25.555a11.56 11.56 0 0 1-6.03-1.692l-.433-.257-4.312 1.12 1.148-4.195-.283-.45a11.587 11.587 0 0 1-1.753-6.077c0-6.396 5.207-11.6 11.6-11.6 6.396 0 11.6 5.204 11.6 11.6.003 6.396-5.2 11.55-11.537 11.55zm6.364-8.668c-.347-.175-2.058-1.015-2.377-1.132-.32-.117-.552-.175-.784.175s-.899 1.132-1.103 1.366c-.203.232-.406.261-.752.087-.347-.175-1.463-.54-2.786-1.72-1.03-.917-1.726-2.05-1.928-2.397-.203-.347-.022-.535.152-.707.157-.156.347-.406.52-.609.175-.203.232-.347.348-.58.116-.232.058-.435-.03-.609-.087-.175-.784-1.887-1.074-2.582-.284-.678-.57-.587-.784-.597l-.667-.013c-.232 0-.609.087-.928.435-.319.347-1.218 1.19-1.218 2.902s1.248 3.365 1.421 3.597c.175.232 2.455 3.748 5.951 5.256.832.36 1.481.574 1.987.734.834.265 1.595.228 2.196.138.67-.1 2.058-.84 2.348-1.653.29-.81.29-1.506.203-1.653-.086-.145-.319-.232-.667-.406z"/>
                  </svg>
                  <span className="relative">Send Order on WhatsApp</span>
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
