/* ================================================================
   HEBRON AUTOMOTIVE — Shared JavaScript
   All pages share this file.
   ================================================================ */

(function () {
  'use strict';

  // ── SCROLL PROGRESS BAR ─────────────────────────────────────────
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const total = document.body.scrollHeight - window.innerHeight;
      progressBar.style.width = total > 0 ? (window.scrollY / total * 100) + '%' : '0%';
    }, { passive: true });
  }

  // ── NAVBAR ELEVATION ────────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('elevated', window.scrollY > 20);
    }, { passive: true });
  }

  // ── MOBILE NAV ──────────────────────────────────────────────────
  const toggle  = document.getElementById('nav-toggle');
  const navLinks= document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open.toString());
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!navLinks.contains(e.target) && !toggle.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ── SMOOTH SCROLL ───────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── BACK TO TOP ─────────────────────────────────────────────────
  const backTop = document.getElementById('back-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── SCROLL REVEAL ───────────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .reveal-scale');
  if (revealEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => obs.observe(el));
  }

  // ── COUNTER ANIMATION ───────────────────────────────────────────
  const counters = document.querySelectorAll('.counter[data-target]');
  if (counters.length) {
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const isFloat = el.dataset.float === 'true';
        const dur = 2000;
        const start = performance.now();
        function tick(now) {
          const t = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          el.textContent = isFloat ? (ease * target).toFixed(1) : Math.floor(ease * target);
          if (t < 1) requestAnimationFrame(tick);
          else el.textContent = isFloat ? target.toFixed(1) : target;
        }
        requestAnimationFrame(tick);
        cObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cObs.observe(el));
  }

  // ── BUTTON RIPPLE ───────────────────────────────────────────────
  document.querySelectorAll('.btn-ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const r = document.createElement('span');
      r.className = 'ripple';
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px;`;
      btn.appendChild(r);
      setTimeout(() => r.remove(), 700);
    });
  });

  // ── FAQ ACCORDION ───────────────────────────────────────────────
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ── HERO GSAP ANIMATIONS ─────────────────────────────────────────
  if (window.gsap && document.querySelector('.hero')) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-eyebrow', { opacity: 0, y: 18, duration: .7, delay: .2, ease: 'power2.out' });
    gsap.from('.hero h1',      { opacity: 0, y: 28, duration: .8, delay: .4, ease: 'power2.out' });
    gsap.from('.hero-desc',    { opacity: 0, y: 18, duration: .7, delay: .6, ease: 'power2.out' });
    gsap.from('.hero-actions', { opacity: 0, y: 16, duration: .6, delay: .8, ease: 'power2.out' });
    gsap.from('.hero-scroll',  { opacity: 0, duration: .5, delay: 1.2 });

    // Subtle parallax on hero image only
    gsap.to('.hero-bg img', {
      yPercent: 12, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
    });

    // Trust bar stagger
    gsap.from('.trust-item', {
      opacity: 0, y: 14, stagger: .07, duration: .5, ease: 'power2.out',
      scrollTrigger: { trigger: '.trust-bar', start: 'top 90%', once: true }
    });
  }

  // ── PRODUCT MODAL ───────────────────────────────────────────────
  const modal = document.getElementById('product-modal');
  if (modal) {
    const overlay = modal;
    // Open
    document.querySelectorAll('[data-modal]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.modal;
        const data = PRODUCTS_DATA && PRODUCTS_DATA[id];
        if (!data) return;
        document.getElementById('modal-title').textContent = data.name;
        document.getElementById('modal-img').src = data.img;
        document.getElementById('modal-img').alt = data.name;
        document.getElementById('modal-cat').textContent = data.category;
        document.getElementById('modal-desc').textContent = data.description;
        document.getElementById('modal-process').textContent = data.process;
        document.getElementById('modal-material').textContent = data.material;
        document.getElementById('modal-finish').textContent = data.finish;
        document.getElementById('modal-tolerance').textContent = data.tolerance;
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    // Close
    document.getElementById('modal-close')?.addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    function closeModal() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // ── GALLERY LIGHTBOX ────────────────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg  = document.getElementById('lb-img');
    const lbCap  = document.getElementById('lb-caption');
    let items = [], currentIdx = 0;

    function openLightbox(idx) {
      currentIdx = idx;
      lbImg.src = items[idx].src;
      lbCap.textContent = items[idx].caption || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    function navigate(dir) {
      currentIdx = (currentIdx + dir + items.length) % items.length;
      lbImg.style.opacity = '0';
      setTimeout(() => {
        lbImg.src = items[currentIdx].src;
        lbCap.textContent = items[currentIdx].caption || '';
        lbImg.style.opacity = '1';
      }, 150);
    }

    window.initGallery = function (galleryItems) {
      items = galleryItems;
      document.querySelectorAll('.gallery-item[data-idx]').forEach(item => {
        item.addEventListener('click', () => openLightbox(parseInt(item.dataset.idx)));
      });
    };

    document.getElementById('lb-close')?.addEventListener('click', closeLightbox);
    document.getElementById('lb-prev')?.addEventListener('click', () => navigate(-1));
    document.getElementById('lb-next')?.addEventListener('click', () => navigate(1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'ArrowLeft')  navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'Escape')     closeLightbox();
    });
  }

  // ── GALLERY FILTER ──────────────────────────────────────────────
  document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.gallery-item[data-cat],.product-card[data-cat]').forEach(item => {
        const match = filter === 'all' || item.dataset.cat === filter;
        item.style.display = match ? '' : 'none';
      });
    });
  });

  // ── PRODUCT SEARCH ──────────────────────────────────────────────
  const searchInput = document.getElementById('product-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const val = searchInput.value.toLowerCase();
      document.querySelectorAll('.product-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(val) ? '' : 'none';
      });
    });
  }

  // ── CONTACT FORM (contact.html) ─────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(contactForm)) return;
      const name    = contactForm.querySelector('#f-name').value.trim();
      const email   = contactForm.querySelector('#f-email').value.trim();
      const company = contactForm.querySelector('#f-company')?.value.trim() || '';
      const phone   = contactForm.querySelector('#f-phone')?.value.trim() || '';
      const subject = contactForm.querySelector('#f-subject')?.value || 'General Inquiry';
      const message = contactForm.querySelector('#f-message').value.trim();

      const body = [
        `Name: ${name}`,
        company ? `Company: ${company}` : '',
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : '',
        '',
        message
      ].filter(Boolean).join('\n');

      window.location.href = `mailto:info@hebronautomotive.com?subject=[Hebron Inquiry] ${subject}&body=${encodeURIComponent(body)}`;

      // Show success
      contactForm.style.display = 'none';
      const suc = document.getElementById('contact-success');
      if (suc) { suc.classList.add('show'); }
    });
  }

  // ── INTERNSHIP FORM ─────────────────────────────────────────────
  const internForm = document.getElementById('internship-form');
  if (internForm) {
    // File upload label
    const fileInput = document.getElementById('f-resume');
    if (fileInput) {
      fileInput.addEventListener('change', () => {
        const label = document.getElementById('file-label');
        if (label && fileInput.files.length) {
          label.textContent = `✓ ${fileInput.files[0].name}`;
          label.closest('.file-upload').classList.add('has-file');
        }
      });
    }

    internForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(internForm)) return;
      internForm.style.display = 'none';
      const suc = document.getElementById('intern-success');
      if (suc) { suc.classList.add('show'); }
    });
  }

  // ── FORM VALIDATION ─────────────────────────────────────────────
  function validateForm(form) {
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const errEl = form.querySelector(`[data-for="${field.id}"]`);
      const isEmpty = !field.value.trim();
      field.classList.toggle('error', isEmpty);
      if (errEl) errEl.classList.toggle('show', isEmpty);
      if (isEmpty) valid = false;

      // Email
      if (!isEmpty && field.type === 'email') {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        field.classList.toggle('error', !ok);
        if (errEl) errEl.classList.toggle('show', !ok);
        if (!ok) valid = false;
      }
    });
    return valid;
  }

})();
