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
          color: 0x00d4ff,
          backgroundColor: 0x050505,
          points: 4.00,
          maxDistance: 13.00,
          spacing: 28.00
        });

        // Cap pixel ratio to 1.0 to ensure solid 60fps with zero frame drops
        if (effect?.renderer?.setPixelRatio) {
          effect.renderer.setPixelRatio(1.0);
        }

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
          ? { color: 0x0284c7, backgroundColor: 0xf8fafc, points: 3.00, spacing: 32.00 }
          : { color: 0x00d4ff, backgroundColor: 0x050505, points: 4.00, spacing: 28.00 }
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
        zIndex: -999,
        pointerEvents: 'none',
        WebkitTransform: 'translate3d(0,0,0)',
        transform: 'translate3d(0,0,0)'
      }}
    />
  );
}
