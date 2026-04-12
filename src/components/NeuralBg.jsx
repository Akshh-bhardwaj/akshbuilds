import { useState, useEffect, useRef } from 'react';

export default function NeuralBg() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    // Skip on mobile — saves ~26s of blocking time on mobile
    if (window.innerWidth < 768) return;

    let attempts = 0;
    const maxAttempts = 20;

    // Poll for deferred scripts to load (they use defer, so not instant)
    const tryInit = () => {
      if (window.VANTA && window.VANTA.NET && vantaRef.current) {
        setVantaEffect(
          window.VANTA.NET({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: false,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x00f0ff,
            backgroundColor: 0x050505,
            points: 10.00,
            maxDistance: 20.00,
            spacing: 18.00
          })
        );
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(tryInit, 300);
      }
    };

    // Start polling after a short delay to let deferred scripts load
    const timer = setTimeout(tryInit, 500);

    return () => {
      clearTimeout(timer);
      if (vantaEffect) vantaEffect.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update colors on theme change
  useEffect(() => {
    if (!vantaEffect) return;

    const updateColors = () => {
      const isLight = document.body.classList.contains('light-mode');
      vantaEffect.setOptions(
        isLight
          ? { color: 0x0088ff, backgroundColor: 0xe0e6ed }
          : { color: 0x00f0ff, backgroundColor: 0x050505 }
      );
    };

    updateColors();
    const observer = new MutationObserver(updateColors);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        pointerEvents: 'none'
      }}
    />
  );
}
