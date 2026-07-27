export const products = [
  {
    id: 1,
    name: 'Whole Wheat Grains',
    subtitle: 'Unprocessed & Stone-Cleaned',
    description: 'Raw whole wheat grains sourced directly from partner farms in the Terai belt. Ideal for home milling.',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80',
    badge: 'Best Seller',
    sizes: [
      { label: '2 kg',  price: 140, originalPrice: 170 },
      { label: '5 kg',  price: 320, originalPrice: 400 },
      { label: '10 kg', price: 590, originalPrice: 750 },
    ],
    rating: 4.9,
    reviews: 214,
  },
  {
    id: 2,
    name: 'Chakki Fresh Atta',
    subtitle: 'Cold-Pressed Stone Milled',
    description: 'Freshly stone-milled wheat flour that retains all natural bran and nutrients for softer, more nutritious rotis.',
    image: 'https://images.unsplash.com/photo-1603569259524-637ac1eff8e4?w=500&q=80',
    badge: 'Top Rated',
    sizes: [
      { label: '2 kg',  price: 120, originalPrice: 150 },
      { label: '5 kg',  price: 275, originalPrice: 340 },
      { label: '10 kg', price: 520, originalPrice: 650 },
    ],
    rating: 4.8,
    reviews: 387,
  },
  {
    id: 3,
    name: 'Organic Wheat',
    subtitle: 'Certified Chemical-Free',
    description: 'Grown without pesticides or synthetic fertilisers. Verified organic from seed to sack.',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&q=80',
    badge: 'Organic',
    sizes: [
      { label: '2 kg',  price: 180, originalPrice: 220 },
      { label: '5 kg',  price: 420, originalPrice: 520 },
      { label: '10 kg', price: 800, originalPrice: 990 },
    ],
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 4,
    name: 'Multigrain Atta',
    subtitle: 'Wheat + Jowar + Bajra Blend',
    description: 'A wholesome blend of three grains for everyday cooking — more fibre, more nutrition, same great taste.',
    image: 'https://images.unsplash.com/photo-1565299543923-37dd37887442?w=500&q=80',
    badge: 'Popular',
    sizes: [
      { label: '2 kg',  price: 150, originalPrice: 185 },
      { label: '5 kg',  price: 350, originalPrice: 430 },
      { label: '10 kg', price: 660, originalPrice: 820 },
    ],
    rating: 4.8,
    reviews: 203,
  },
]

export const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Kathmandu',
    rating: 5,
    quote: 'The chakki atta from 0Mix has completely changed our rotis. Softer, more fragrant — my children actually ask for second helpings now!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
  },
  {
    id: 2,
    name: 'Ramesh Acharya',
    location: 'Biratnagar',
    rating: 5,
    quote: 'After trying the organic wheat, I can never go back to market flour. You can taste the difference immediately.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
  },
  {
    id: 3,
    name: 'Sunita Gurung',
    location: 'Pokhara',
    rating: 5,
    quote: 'Farm to doorstep in 2 days — I love knowing exactly where my food comes from. The 10 kg pack is perfect value for our family.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80',
  },
  {
    id: 4,
    name: 'Dinesh Thapa',
    location: 'Chitwan',
    rating: 5,
    quote: 'As a fitness enthusiast I care deeply about what I eat. 0Mix whole wheat is now a staple — clean, honest food.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80',
  },
  {
    id: 5,
    name: 'Meena Rai',
    location: 'Jhapa',
    rating: 5,
    quote: 'The multigrain atta is perfect for my diabetic mother. Doctor approved, family loved. Thank you 0Mix!',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&q=80',
  },
]

export const usps = [
  { icon: '🌾', title: '100% Pure Wheat',      desc: 'No blending, no additives. Every grain is exactly what it says on the label.' },
  { icon: '🚜', title: 'Farm to Home',          desc: 'Direct partnerships with farmers across the Terai — no middlemen, no markups.' },
  { icon: '🚫', title: 'No Preservatives',      desc: 'Freshly milled and packed. What you receive is what nature produced.' },
  { icon: '⚙️', title: 'Freshly Milled',        desc: 'Milled within 24 hours of your order for maximum freshness and nutrition.' },
  { icon: '👨‍👩‍👧', title: 'Trusted by Families', desc: 'Over 500 households trust 0Mix for their daily wheat — and growing every week.' },
  { icon: '🌿', title: 'Sustainably Grown',     desc: 'Our partner farmers use responsible practices to protect the soil for generations.' },
]

export const steps = [
  {
    step: '01', icon: '🌾', title: 'Harvesting',
    desc: 'Partner farmers harvest only at peak ripeness, ensuring the grain is at its nutritional best.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80',
  },
  {
    step: '02', icon: '✨', title: 'Cleaning',
    desc: 'Multi-stage stone cleaning removes all impurities without chemical treatment.',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80',
  },
  {
    step: '03', icon: '⚙️', title: 'Milling',
    desc: 'Cold-pressed chakki milling preserves all the bran, germ, and nutrients intact.',
    image: 'https://images.unsplash.com/photo-1603569259524-637ac1eff8e4?w=400&q=80',
  },
  {
    step: '04', icon: '📦', title: 'Packaging',
    desc: 'Sealed in food-grade, eco-friendly packaging within hours of milling.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  },
  {
    step: '05', icon: '🚚', title: 'Delivery',
    desc: 'Direct to your doorstep in 24–48 hours. Fresh, pure, and always on time.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
  },
]
