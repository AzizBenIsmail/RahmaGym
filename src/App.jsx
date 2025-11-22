import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PWAInstall from './components/PWAInstall'
import { ThemeProvider } from './components/ThemeContext'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <PWAInstall />
      <Header />
      <Hero />
      <About />
      <Services />
      <Pricing />
      <Contact />
      <Footer />
    </ThemeProvider>
  )
}

export default App
