import { useState, useEffect, useRef } from 'react';

// Track if scripts have already been injected globally (survive HMR re-renders)
let scriptsInjected = false;
let scriptsReady = false;
const readyCallbacks = [];

function onScriptsReady(cb) {
  if (scriptsReady) { cb(); return; }
  readyCallbacks.push(cb);
}

function loadScriptsDynamically() {
  if (scriptsInjected) return;
  scriptsInjected = true;

  const threeScript = document.createElement('script');
  threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
  threeScript.async = true;

  threeScript.onload = () => {
    const vantaScript = document.createElement('script');
    vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js';
    vantaScript.async = true;

    vantaScript.onload = () => {
      scriptsReady = true;
      readyCallbacks.forEach((cb) => cb());
      readyCallbacks.length = 0;
    };

    document.head.appendChild(vantaScript);
  };

  document.head.appendChild(threeScript);
}

export default function NeuralBg() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    // Skip entirely on mobile — saves resources and TBT
    if (window.innerWidth < 768) return;

    // Wait until the browser is idle / page has settled (1.5s delay after mount)
    // This keeps the main thread clear during LCP / FCP
    let idleTimer;
    let cancelled = false;

    const initVanta = () => {
      if (cancelled || !vantaRef.current) return;
      onScriptsReady(() => {
        if (cancelled || !vantaRef.current || !window.VANTA?.NET) return;
        const effect = window.VANTA.NET({
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
          points: 8.00,       // Reduced from 10 → less GPU load
          maxDistance: 20.00,
          spacing: 20.00      // Slightly larger spacing → fewer lines to draw
        });
        setVantaEffect(effect);
      });
      loadScriptsDynamically();
    };

    // Use requestIdleCallback if available, otherwise fall back to setTimeout
    if ('requestIdleCallback' in window) {
      idleTimer = window.requestIdleCallback(initVanta, { timeout: 2000 });
    } else {
      idleTimer = setTimeout(initVanta, 1500);
    }

    return () => {
      cancelled = true;
      if ('requestIdleCallback' in window && typeof idleTimer === 'number') {
        window.cancelIdleCallback(idleTimer);
      } else {
        clearTimeout(idleTimer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // Update colors when theme changes
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
