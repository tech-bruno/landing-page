(function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('nav');
  if (!hamburger || !nav) return;

  function closeMenu() {
    hamburger.classList.remove('active');
    nav.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();



(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.querySelector('.header')?.offsetHeight ?? 72;
      const targetTop    = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
})();



(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,      
      rootMargin: '0px 0px -40px 0px' 
    }
  );

  elements.forEach(el => observer.observe(el));
})();



(function initFAQ() {
  const faqItems = document.querySelectorAll('.faq__item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    const answer   = item.querySelector('.faq__answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          otherItem.querySelector('.faq__answer')?.classList.remove('open');
          otherItem.querySelector('.faq__question')?.setAttribute('aria-expanded', 'false');
        }
      });

      
      item.classList.toggle('open', !isOpen);
      answer.classList.toggle('open', !isOpen);
      question.setAttribute('aria-expanded', String(!isOpen));
    });
  });
})();



(function initWhatsAppButton() {
  const btn = document.querySelector('.whatsapp-btn');
  if (!btn) return;

  
  btn.style.opacity    = '0';
  btn.style.transform  = 'translateY(20px) scale(0.9)';
  btn.style.transition = 'opacity 0.4s, transform 0.4s';
  btn.style.pointerEvents = 'none';

  function updateVisibility() {
    const visible = window.scrollY > 300;
    btn.style.opacity       = visible ? '1' : '0';
    btn.style.transform     = visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)';
    btn.style.pointerEvents = visible ? 'auto' : 'none';
  }

  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();
})();



(function initProgressBars() {
  const fills = document.querySelectorAll('.progress-fill');
  if (!fills.length) return;

 
  const targets = Array.from(fills).map(fill => {
    const target = fill.style.width;
    fill.style.width      = '0%';
    fill.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    return { el: fill, target };
  });

  if (!('IntersectionObserver' in window)) {
    targets.forEach(({ el, target }) => { el.style.width = target; });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          
          targets.forEach(({ el, target }, i) => {
            setTimeout(() => { el.style.width = target; }, i * 120);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  const mockup = document.querySelector('.hero__mockup');
  if (mockup) observer.observe(mockup);
})();



(function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  if (!sections.length || !navLinks.length) return;

  const headerHeight = document.querySelector('.header')?.offsetHeight ?? 72;

  function updateActiveLink() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 80;
      if (window.scrollY >= sectionTop) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--color-gold)';
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();
