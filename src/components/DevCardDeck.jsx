import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  {
    id: 0,
    tab: 'Discovery',
    icon: 'fa-solid fa-compass',
    color: '#00d4ff',
    title: 'Understand the Problem',
    items: [
      { label: 'Requirements', value: 'Scope, goals & constraints' },
      { label: 'Research', value: 'Market fit & technical feasibility' },
      { label: 'Timeline', value: 'Milestones & delivery dates' },
    ],
    cta: 'Start Building',
    ctaIcon: 'fa-solid fa-arrow-right',
  },
  {
    id: 1,
    tab: 'Build',
    icon: 'fa-solid fa-code',
    color: '#a855f7',
    title: 'Design, Develop, Iterate',
    items: [
      { label: 'Architecture', value: 'Clean, scalable foundations' },
      { label: 'Development', value: 'Incremental builds with demos' },
      { label: 'Testing', value: 'Automated tests at every step' },
    ],
    cta: 'Ship It',
    ctaIcon: 'fa-solid fa-rocket',
  },
  {
    id: 2,
    tab: 'Ship',
    icon: 'fa-solid fa-paper-plane',
    color: '#10b981',
    title: 'Deploy & Hand Off',
    items: [
      { label: 'Deploy', value: 'CI/CD pipeline, zero downtime' },
      { label: 'Docs', value: 'Clean handoff documentation' },
      { label: 'Support', value: 'Post-launch monitoring & fixes' },
    ],
    cta: 'Start Over',
    ctaIcon: 'fa-solid fa-rotate-left',
  },
];

export default function DevCardDeck() {
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS[activeStep];

  const handleCta = () => {
    setActiveStep((activeStep + 1) % STEPS.length);
  };

  return (
    <div className="process-card glass" style={{ overflow: 'hidden' }}>

      {/* Top accent bar */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, ${STEPS[0].color}, ${STEPS[1].color}, ${STEPS[2].color})`,
        opacity: 0.7,
      }} />

      {/* Step indicators */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px 24px 0',
        gap: 8,
      }}>
        {STEPS.map((s, i) => {
          const isActive = activeStep === s.id;
          const isPast = i < activeStep;
          return (
            <button
              key={s.id}
              onClick={() => setActiveStep(s.id)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 7,
                padding: '10px 12px',
                borderRadius: 10,
                border: isActive ? `1px solid ${s.color}40` : '1px solid transparent',
                background: isActive ? `${s.color}12` : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.76rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? s.color : isPast ? 'var(--text-main)' : 'var(--text-muted)',
              }}
            >
              <i className={s.icon} style={{ fontSize: '0.72rem' }} />
              {s.tab}
            </button>
          );
        })}
      </div>

      {/* Progress dots */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        padding: '12px 24px 0',
      }}>
        {STEPS.map((s, i) => (
          <div key={s.id} style={{
            flex: 1,
            height: 3,
            borderRadius: 2,
            background: i <= activeStep ? s.color : 'var(--glass-border)',
            transition: 'background 0.3s ease',
            opacity: i <= activeStep ? 0.8 : 0.4,
          }} />
        ))}
      </div>

      {/* Content area */}
      <div style={{ padding: '20px 24px 24px', minHeight: 220 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Step title */}
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.15rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <span style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: `${step.color}15`,
                border: `1px solid ${step.color}30`,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                color: step.color,
                flexShrink: 0,
              }}>
                {activeStep + 1}
              </span>
              {step.title}
            </div>

            {/* Info rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {step.items.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 10,
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--glass-border)',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: step.color,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                  }}>
                    {item.label}
                  </span>
                  <span style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                  }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={handleCta}
              style={{
                width: '100%',
                padding: '11px 16px',
                borderRadius: 10,
                border: `1px solid ${step.color}40`,
                background: `${step.color}10`,
                color: step.color,
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.88rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${step.color}20`;
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = `${step.color}10`;
                e.currentTarget.style.transform = 'none';
              }}
            >
              {step.cta}
              <i className={step.ctaIcon} style={{ fontSize: '0.72rem' }} />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
