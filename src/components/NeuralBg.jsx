import { useState, useEffect, useRef } from 'react';

export default function NeuralBg() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  // Initialize the WebGL engine after global engines load
  useEffect(() => {
    // Check if scripts have naturally loaded on window
    const initVanta = () => {
      if (!vantaEffect && window.VANTA && window.VANTA.NET) {
        setVantaEffect(window.VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x00f0ff,
          backgroundColor: 0x050505,
          points: 12.00,
          maxDistance: 22.00,
          spacing: 16.00
        }));
      }
    };

    // Minor timeout ensures the window context is totally clear for CDNs
    const timer = setTimeout(initVanta, 100);

    return () => {
      clearTimeout(timer);
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  // Deep listener hooked to the body class to dynamically transition the WebGL colors
  useEffect(() => {
    if (!vantaEffect) return;

    const updateEngineColors = () => {
      const isLight = document.body.classList.contains('light-mode');
      if (isLight) {
        vantaEffect.setOptions({
          color: 0x0088ff,
          backgroundColor: 0xe0e6ed
        });
      } else {
        vantaEffect.setOptions({
          color: 0x00f0ff,
          backgroundColor: 0x050505
        });
      }
    };

    // Run once on mount
    updateEngineColors();

    const observer = new MutationObserver(updateEngineColors);
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
        pointerEvents: 'none' // Ensures users can still click links behind the canvas
      }} 
    />
  );
}
