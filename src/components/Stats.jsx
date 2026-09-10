import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: 40,  suffix: '+', label: 'Projects Shipped',    mono: 'projects_shipped' },
  { value: 19,  suffix: '',  label: 'GitHub Repos',        mono: 'public_repos' },
  { value: 30,  suffix: '+', label: 'GitHub Stars',        mono: 'total_stars' },
  { value: 73,  suffix: '',  label: 'GitHub Followers',    mono: 'followers' },
];

function CountUp({ target, suffix, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <div className="container">
      <motion.div
        className="stats-banner"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {STATS.map((s) => (
          <div key={s.label} className="stat-item">
            <div className="stat-number">
              <CountUp target={s.value} suffix={s.suffix} />
            </div>
            <div className="stat-label">{s.mono}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
