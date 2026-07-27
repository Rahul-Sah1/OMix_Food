import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import WhyOMix from './components/WhyOMix'
import VideoSection from './components/VideoSection'
import Features from './components/Features'
import Blog from './components/Blog'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

export default function App() {
  const { dark, toggle } = useTheme()

  return (
    <>
      <Navbar dark={dark} toggleTheme={toggle} />
      <main>
        <Hero />
        <ProductGrid />
        <WhyOMix />
        <VideoSection />
        <Features />
        <Blog />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
