import { useScrollReveal } from '../hooks/useScrollReveal';
import Navbar from '../components/Navbar';
import OwnerPortfolio from '../components/OwnerPortfolio';
import Footer from '../components/Footer';

export default function About() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 200px)' }}>
        <OwnerPortfolio />
      </main>
      <Footer />
    </>
  );
}
