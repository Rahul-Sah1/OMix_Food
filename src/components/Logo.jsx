export default function Logo({ size = 'md', dark = false }) {
  const heights = { sm: 68, md: 80, lg: 96 }
  const h = heights[size]

  return (
    <img
      src="/Main_Logo.png"
      alt="OMix — Pure Wheat"
      style={{
        height: h,
        width: 'auto',
        maxWidth: size === 'sm' ? 220 : 260,
        display: 'block',
        objectFit: 'contain',
      }}
    />
  )
}
