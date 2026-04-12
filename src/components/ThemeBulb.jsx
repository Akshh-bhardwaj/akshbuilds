import { useState } from 'react';

export default function ThemeBulb() {
  const [isLight, setIsLight] = useState(() => {
    // Initialize state from DOM on mount
    return document.body.classList.contains('light-mode');
  });
  const [isPulling, setIsPulling] = useState(false);

  const handlePull = () => {
    if (isPulling) return; // Prevent spam
    
    setIsPulling(true);
    
    // Toggle logic happens halfway through the pull animation
    setTimeout(() => {
      const newTheme = !isLight;
      setIsLight(newTheme);
      document.body.classList.toggle('light-mode', newTheme);
    }, 300); // 300ms matches halfway point of pull animation

    // Reset pulling state after animation finishes
    setTimeout(() => {
      setIsPulling(false);
    }, 600); // 600ms total animation duration
  };

  return (
    <div className={`theme-bulb-container ${isPulling ? 'pulling' : ''}`} onClick={handlePull}>
      <div className="wire"></div>
      <div className={`bulb ${isLight ? 'on' : 'off'}`}>
        <i className="fa-solid fa-lightbulb"></i>
      </div>
      <div className="pull-string"></div>
    </div>
  );
}
