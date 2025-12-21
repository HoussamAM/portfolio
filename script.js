// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Particle System - Optimized with CSS Variables
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Generate random values for CSS variables
    const size = Math.random() * 4 + 1;
    const color = Math.random() > 0.5 ? '#00ffff' : '#ff0080';
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const moveX = (Math.random() * 200 - 100);
    const moveY = (Math.random() * 200 - 100);
    const scaleMid = Math.random() * 0.5 + 0.5;
    const duration = Math.random() * 20 + 10;
    const opacityStart = Math.random() * 0.5 + 0.2;
    const opacityMid = Math.random() * 0.8 + 0.2;
    const glowSize = Math.random() * 10 + 5;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      left: ${startX}%;
      top: ${startY}%;
      opacity: ${opacityStart};
      box-shadow: 0 0 ${glowSize}px ${color};
      --move-x: ${moveX}px;
      --move-y: ${moveY}px;
      --scale-mid: ${scaleMid};
      --opacity-start: ${opacityStart};
      --opacity-mid: ${opacityMid};
      animation: particleFloat ${duration}s infinite;
      pointer-events: none;
    `;

    particlesContainer.appendChild(particle);
  }
}

// Generate and animate wanted stars
// Star rating logic: Direct star count (0-5 whole stars only)
// Examples: 5 = 5 stars, 4 = 4 stars, 2 = 2 stars
function generateWantedStars() {
  const starContainers = document.querySelectorAll('.wanted-stars');
  
  starContainers.forEach(container => {
    const starCount = parseInt(container.getAttribute('data-level'));
    const totalStars = 5;
    
    // Clear existing stars
    container.innerHTML = '';
    
    // Generate filled stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('span');
      star.className = 'star filled';
      star.textContent = '★';
      star.style.animationDelay = `${i * 0.1}s`;
      container.appendChild(star);
    }
    
    // Generate empty stars
    const emptyStars = totalStars - starCount;
    for (let i = 0; i < emptyStars; i++) {
      const star = document.createElement('span');
      star.className = 'star empty';
      star.textContent = '★';
      star.style.animationDelay = `${(starCount + i) * 0.1}s`;
      container.appendChild(star);
    }
  });
}

// Animate wanted stars on scroll
function animateWantedStars() {
  const starContainers = document.querySelectorAll('.wanted-stars');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.3 });

  starContainers.forEach(container => observer.observe(container));
}

// Add parallax effect to hero - Optimized with requestAnimationFrame
function initParallax() {
  const hero = document.getElementById('hero');
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
}

// Add glow effect to navigation on scroll - Optimized with requestAnimationFrame
function initNavGlow() {
  const nav = document.querySelector('.hud-nav');
  let lastScroll = 0;
  let ticking = false;

  function updateNavGlow() {
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100 && scrolled > lastScroll) {
      nav.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.5)';
    } else {
      nav.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
    }
    
    lastScroll = scrolled;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavGlow);
      ticking = true;
    }
  });
}

// Add random glitch effects to title
function randomGlitch() {
  const glitch = document.querySelector('.glitch');
  if (!glitch) return;

  setInterval(() => {
    if (Math.random() > 0.7) {
      glitch.style.animation = 'none';
      setTimeout(() => {
        glitch.style.animation = 'glitch 3s infinite';
      }, 10);
    }
  }, 3000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  generateWantedStars();
  animateWantedStars();
  initParallax();
  initNavGlow();
  randomGlitch();
  initSoundEffects();

  // Add entrance animations to sections
  const sections = document.querySelectorAll('.section-gta');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
  });
});

// Add keyboard navigation effect
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.body.style.filter = 'blur(0px)';
  }
});

// Sound Effects System using Web Audio API
let audioContext = null;

function initAudioContext() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) {
    console.log('Web Audio API not supported');
  }
}

function playBlipSound(frequency = 800, duration = 50, volume = 0.1) {
  if (!audioContext) {
    initAudioContext();
    if (!audioContext) return;
  }

  // Resume audio context if suspended (browser autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration / 1000);
}

function playHoverSound() {
  playBlipSound(1000, 30, 0.08);
}

function playClickSound() {
  playBlipSound(600, 60, 0.12);
}

// Initialize sound effects for interactive elements
function initSoundEffects() {
  // Add sound to navigation links
  const navLinks = document.querySelectorAll('.hud-link');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', playHoverSound);
    link.addEventListener('click', playClickSound);
  });

  // Add sound to buttons
  const buttons = document.querySelectorAll('.btn-gta');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', playHoverSound);
    button.addEventListener('click', playClickSound);
  });

  // Add sound to project cards
  const projectCards = document.querySelectorAll('.project-card-gta');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => playBlipSound(900, 40, 0.06));
  });

  // Initialize audio context on first user interaction
  document.addEventListener('click', initAudioContext, { once: true });
  document.addEventListener('mouseenter', initAudioContext, { once: true });
}
