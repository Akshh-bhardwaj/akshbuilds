import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Rohan Mehta',
    title: 'Founder, NovaSpark Ventures',
    avatar: 'RM',
    color: 'var(--primary-color)',
    bg: 'rgba(0, 240, 255, 0.1)',
    quote:
      'Aksh delivered a full-stack SaaS dashboard in under 2 weeks that our in-house team estimated would take 2 months. The AI workflow integrations he built saved us 30+ hours per week immediately.',
    stars: 5,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    title: 'CTO, FinEdge Technologies',
    avatar: 'PS',
    color: 'var(--secondary-color)',
    bg: 'rgba(138, 43, 226, 0.1)',
    quote:
      'The backend he architected for us is running 8 months later without a single critical bug. OWASP-compliant, lightning-fast API responses, and clean documentation. Exactly what a startup needs.',
    stars: 5,
  },
  {
    id: 3,
    name: 'Arjun Kapoor',
    title: 'Product Lead, CreatorStack',
    avatar: 'AK',
    color: '#00ff88',
    bg: 'rgba(0, 255, 136, 0.1)',
    quote:
      'Hired Aksh for a rapid UI prototype and got a production-ready React app. His attention to detail on animations and micro-interactions made our investors stop and say "wait, this is your MVP?".',
    stars: 5,
  },
];

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <div className="section-header reveal">
          <h2 className="section-title">
            Client <span className="text-glow">Success Stories</span>
          </h2>
          <p className="section-subtitle">
            Real results from real partnerships — not just code, but impact.
          </p>
        </div>

        <motion.div
          className="testimonials-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              className="testimonial-card glass"
              variants={itemVariants}
            >
              {/* Stars */}
              <div className="testimonial-stars">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <i key={i} className="fa-solid fa-star" style={{ color: '#ffd700', fontSize: '0.9rem' }}></i>
                ))}
              </div>

              {/* Quote */}
              <p className="testimonial-quote">"{t.quote}"</p>

              {/* Author */}
              <div className="testimonial-author">
                <div
                  className="testimonial-avatar"
                  style={{ background: t.bg, color: t.color, border: `1px solid ${t.color}33` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-title">{t.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
