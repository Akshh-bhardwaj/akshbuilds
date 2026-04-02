import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursorGlow = cursorRef.current;
    if (!cursorGlow) return;

    // Update cursor position
    const handleMouseMove = (e) => {
      if (window.matchMedia("(pointer: fine)").matches) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Enlarge cursor on interactive elements
    const handleMouseEnter = () => {
      cursorGlow.style.width = '400px';
      cursorGlow.style.height = '400px';
      cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.2) 0%, transparent 70%)';
    };

    const handleMouseLeave = () => {
      cursorGlow.style.width = '300px';
      cursorGlow.style.height = '300px';
      cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 70%)';
    };

    const interactives = document.querySelectorAll('a, button, input, textarea, .tool-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return <div className="cursor-glow" id="cursor-glow" ref={cursorRef}></div>;
}
