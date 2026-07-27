export default function Logo({ size = 'md', dark = false }) {
  const h = { sm: 'h-9', md: 'h-11', lg: 'h-13' }[size]
  const text = { sm: 'text-xl', md: 'text-2xl', lg: 'text-3xl' }[size]
  const sub  = { sm: 'text-[7px]', md: 'text-[8px]', lg: 'text-[9px]' }[size]

  return (
    <div className={`flex items-center gap-2.5 ${h}`}>
      {/* SVG wheat icon */}
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto flex-shrink-0" aria-hidden="true">
        <circle cx="20" cy="20" r="20" fill="#14532D" />
        <line x1="20" y1="32" x2="20" y2="10" stroke="#F4F0E8" strokeWidth="1.6" strokeLinecap="round" />
        <ellipse cx="20" cy="11" rx="3.2" ry="4.5" fill="#D97706" />
        <ellipse cx="15.5" cy="15" rx="2.6" ry="3.8" fill="#D97706" transform="rotate(-28 15.5 15)" />
        <ellipse cx="14"   cy="20" rx="2.4" ry="3.5" fill="#D97706" transform="rotate(-22 14 20)" />
        <ellipse cx="14.5" cy="25" rx="2.2" ry="3.2" fill="#D97706" transform="rotate(-16 14.5 25)" />
        <ellipse cx="24.5" cy="15" rx="2.6" ry="3.8" fill="#D97706" transform="rotate(28 24.5 15)" />
        <ellipse cx="26"   cy="20" rx="2.4" ry="3.5" fill="#D97706" transform="rotate(22 26 20)" />
        <ellipse cx="25.5" cy="25" rx="2.2" ry="3.2" fill="#D97706" transform="rotate(16 25.5 25)" />
        <path d="M20 32 Q17 35 15 34" stroke="#F4F0E8" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5"/>
        <path d="M20 32 Q23 35 25 34" stroke="#F4F0E8" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5"/>
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col leading-none gap-0.5">
        <span className={`font-display font-bold tracking-tight ${text} ${dark ? 'text-snow' : 'text-ink'}`}
          style={{ letterSpacing: '-0.03em' }}>
          0<span className="text-forest">Mix</span>
        </span>
        <span className={`font-sans font-semibold tracking-[0.2em] uppercase text-amber ${sub}`}>
          Pure Wheat
        </span>
      </div>
    </div>
  )
}
