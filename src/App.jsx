import { Routes, Route } from 'react-router-dom'
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
import WhatsAppButton from './components/WhatsAppButton'
import BackToTop from './components/BackToTop'
import ScrollProgress from './components/ScrollProgress'
import NotFound from './pages/NotFound'

function MainPage() {
  return (
    <>
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

export default function App() {
  const { dark, toggle } = useTheme()

  return (
    <>
      <ScrollProgress />
      <Routes>
        <Route path="/" element={
          <>
            <Navbar dark={dark} toggleTheme={toggle} />
            <MainPage />
          </>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <WhatsAppButton />
      <BackToTop />
    </>
  )
}
