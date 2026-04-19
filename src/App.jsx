import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useScrollReveal } from './hooks/useScrollReveal';
import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import ScrollToTop from './components/ScrollToTop';
import Tools from './components/Tools';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Services from './components/Services';
import Learning from './components/Learning';
import Social from './components/Social';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeBulb from './components/ThemeBulb';
import NeuralBg from './components/NeuralBg';

import Admin from './pages/Admin';
import About from './pages/About';
import { Analytics } from '@vercel/analytics/react';

function PortfolioLayout() {
  // Initialize scroll reveal observer
  useScrollReveal();

  return (
    <>
      <ThemeBulb />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Tools />
        <Projects />
        <Testimonials />
        <Services />
        <Learning />
        <Social />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* 3D WebGL Backgound */}
      <NeuralBg />

      <CursorGlow />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<PortfolioLayout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <ScrollToTop />
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
