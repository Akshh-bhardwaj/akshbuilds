import { useState, useEffect } from 'react';

export default function ThemeBulb() {
  const [isLight, setIsLight] = useState(() => {
    // Restore from localStorage first, fall back to DOM
    const saved = localStorage.getItem('aksh-theme');
    if (saved) {
      const light = saved === 'light';
      document.body.classList.toggle('light-mode', light);
      return light;
    }
    return document.body.classList.contains('light-mode');
  });
  const [isPulling, setIsPulling] = useState(false);

  // Keep body class in sync if state ever drifts
  useEffect(() => {
    document.body.classList.toggle('light-mode', isLight);
  }, [isLight]);

  const handlePull = () => {
    if (isPulling) return; // Prevent spam
    setIsPulling(true);

    // Toggle logic happens halfway through the pull animation
    setTimeout(() => {
      const newTheme = !isLight;
      setIsLight(newTheme);
      document.body.classList.toggle('light-mode', newTheme);
      localStorage.setItem('aksh-theme', newTheme ? 'light' : 'dark');
    }, 300);

    // Reset pulling state after animation finishes
    setTimeout(() => {
      setIsPulling(false);
    }, 600);
  };

  return (
    <div
      className={`theme-bulb-container ${isPulling ? 'pulling' : ''}`}
      onClick={handlePull}
      role="button"
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handlePull()}
    >
      <div className="wire"></div>
      <div className={`bulb ${isLight ? 'on' : 'off'}`}>
        <i className="fa-solid fa-lightbulb"></i>
      </div>
      <div className="pull-string"></div>
    </div>
  );
}
