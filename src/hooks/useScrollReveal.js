import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optional: stop observing once revealed
          // revealObserver.unobserve(entry.target);
        }
      });
    };

    const revealOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });

    return () => {
      revealElements.forEach(el => {
        revealObserver.unobserve(el);
      });
    };
  }, []);
}
