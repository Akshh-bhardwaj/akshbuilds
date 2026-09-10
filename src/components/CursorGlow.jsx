import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Only run on desktop devices with a fine pointer
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cursorGlow = cursorRef.current;
    if (!cursorGlow) return;

    let mouseX = -500;
    let mouseY = -500;
    let currentX = -500;
    let currentY = -500;
    let isHovered = false;
    let rafId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Smooth lerp frame loop
    const tick = () => {
      // Smooth interpolation for luxury feel with zero stutter
      currentX += (mouseX - currentX) * 0.25;
      currentY += (mouseY - currentY) * 0.25;

      const scale = isHovered ? 1.25 : 1;
      cursorGlow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${scale})`;

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Efficient delegated listener for hover states
    const onMouseOver = (e) => {
      if (e.target.closest('a, button, input, textarea, [role="button"], .tool-card, .proj-card, .note-module-card')) {
        isHovered = true;
        cursorGlow.style.opacity = '1';
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, input, textarea, [role="button"], .tool-card, .proj-card, .note-module-card')) {
        isHovered = false;
        cursorGlow.style.opacity = '0.75';
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return <div className="cursor-glow" id="cursor-glow" ref={cursorRef} style={{ opacity: 0.75 }} />;
}
