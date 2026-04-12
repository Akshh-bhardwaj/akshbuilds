// Custom Cursor Glow Effect
const cursorGlow = document.getElementById('cursor-glow');

// Update cursor position
document.addEventListener('mousemove', (e) => {
  // Only update if not on a touch device
  if (window.matchMedia("(pointer: fine)").matches) {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  }
});

// Enlarge cursor on interactive elements
const interactives = document.querySelectorAll('a, button, input, textarea, .tool-card');
interactives.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorGlow.style.width = '400px';
    cursorGlow.style.height = '400px';
    cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.2) 0%, transparent 70%)';
  });
  
  el.addEventListener('mouseleave', () => {
    cursorGlow.style.width = '300px';
    cursorGlow.style.height = '300px';
    cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 70%)';
  });
});

// Sticky Navbar Background
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Scroll Reveal Animation
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

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });
}

// Close mobile menu when clicking a link
navLinksItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
  });
});

// Handle Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Simple visual feedback for form submission
    submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      submitBtn.innerHTML = '<span>Sent Successfully!</span> <i class="fa-solid fa-check"></i>';
      submitBtn.classList.remove('btn-primary');
      submitBtn.style.background = '#00c853'; // Success green
      submitBtn.style.color = '#fff';
      
      contactForm.reset();
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.classList.add('btn-primary');
        submitBtn.style.background = '';
        submitBtn.style.color = '';
        submitBtn.disabled = false;
      }, 3000);
    }, 1500);
  });
}

// Set Current Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();
