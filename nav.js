/* ================================================================
   HEBRON AUTOMOTIVE — Navigation & Interactions v2
   Fullscreen overlay menu, loader, page transitions, favicon
   ================================================================ */

(function () {
  'use strict';

  /* ── DETERMINE ACTIVE PAGE ──────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const pageMap = {
    'index.html':      0,
    '':                0,
    'about.html':      1,
    'services.html':   2,
    'products.html':   3,
    'gallery.html':    4,
    'internship.html': 5,
    'careers.html':    6,
    'contact.html':    7,
  };

  /* ── BUILD SHARED MARKUP ────────────────────────────────────── */
  function buildLoader() {
    const d = document.createElement('div');
    d.id = 'loader';
    d.innerHTML = `
      <div class="loader-logo-wrap">
        <div class="loader-logo-bg"></div>
        <div class="loader-logo-fill"></div>
        <img src="hebron_logo.jpg" alt="Hebron Automotive" class="loader-logo-img" />
        <div class="loader-logo-shine"></div>
      </div>
      <div class="loader-brand">
        <div class="loader-brand-name">HEBRON</div>
        <div class="loader-tagline">Engineering Precision. Delivering Excellence.</div>
      </div>
      <div class="loader-bar-wrap"><div class="loader-bar-fill"></div></div>
    `;
    return d;
  }

  function buildMenuOverlay() {
    const d = document.createElement('div');
    d.className = 'menu-overlay';
    d.id = 'menu-overlay';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-modal', 'true');
    d.setAttribute('aria-label', 'Main navigation menu');

    const links = [
      { href: 'index.html',      label: 'Home',       num: '01' },
      { href: 'about.html',      label: 'About Us',   num: '02' },
      { href: 'services.html',   label: 'Services',   num: '03' },
      { href: 'products.html',   label: 'Products',   num: '04' },
      { href: 'gallery.html',    label: 'Gallery',    num: '05' },
      { href: 'internship.html', label: 'Internship', num: '06' },
      { href: 'careers.html',    label: 'Careers',    num: '07' },
      { href: 'contact.html',    label: 'Contact',    num: '08' },
    ];

    const navItems = links.map((l, i) => {
      const isActive = (l.href === currentPage || (currentPage === '' && l.href === 'index.html'));
      return `<a href="${l.href}" ${isActive ? 'class="active"' : ''}>
        <span class="menu-num">${l.num}</span>
        ${l.label}
      </a>`;
    }).join('');

    d.innerHTML = `
      <div class="menu-overlay-bg"></div>
      <div class="menu-overlay-pattern"></div>
      <button class="menu-close-btn" id="menu-close-btn" aria-label="Close navigation menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <div class="menu-inner">
        <nav class="menu-nav" aria-label="Fullscreen navigation">
          ${navItems}
        </nav>
        <div class="menu-footer">
          <div class="menu-contact-links">
            <a href="tel:+916381100663">+91 63811 00663</a>
            <a href="mailto:info@hebronautomotive.com">info@hebronautomotive.com</a>
            <a href="https://wa.me/919442619772" target="_blank" rel="noopener">WhatsApp</a>
          </div>
          <div class="menu-cert-badges">
            <span class="menu-cert-badge">IATF 16949:2016</span>
            <span class="menu-cert-badge">ISO 9001:2015</span>
          </div>
        </div>
      </div>
    `;
    return d;
  }

  function buildMenuBtn() {
    const btn = document.createElement('button');
    btn.className = 'menu-btn';
    btn.id = 'menu-btn';
    btn.setAttribute('aria-label', 'Toggle navigation menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = `
      <span class="mb-line"></span>
      <span class="mb-line"></span>
      <span class="mb-line"></span>
    `;
    return btn;
  }

  function buildPageTransition() {
    const d = document.createElement('div');
    d.className = 'page-transition';
    d.id = 'page-transition';
    return d;
  }

  function buildFaviconCanvas() {
    const c = document.createElement('canvas');
    c.id = 'favicon-canvas';
    c.width = 64;
    c.height = 64;
    return c;
  }

  /* ── INJECT INTO DOM ────────────────────────────────────────── */
  document.body.insertAdjacentElement('afterbegin', buildLoader());
  document.body.insertAdjacentElement('afterbegin', buildMenuOverlay());
  document.body.insertAdjacentElement('afterbegin', buildPageTransition());
  document.body.appendChild(buildFaviconCanvas());

  /* Inject menu button into existing navbar */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const container = navbar.querySelector('.container');
    if (container) {
      const menuBtn = buildMenuBtn();
      container.appendChild(menuBtn);
    }
    // Hide old toggle
    const oldToggle = document.getElementById('nav-toggle');
    if (oldToggle) oldToggle.style.display = 'none';
  }

  /* ── LOADER ─────────────────────────────────────────────────── */
  const loader = document.getElementById('loader');
  function dismissLoader() {
    if (!loader) return;
    loader.classList.add('done');
    setTimeout(() => loader.remove(), 700);
  }
  // Dismiss after 2.5s or on window load (whichever is later, max 2.8s)
  let loaderDone = false;
  window.addEventListener('load', () => {
    const minDelay = 2500;
    const elapsed = performance.now();
    const wait = Math.max(0, minDelay - elapsed);
    setTimeout(() => { loaderDone = true; dismissLoader(); }, wait);
  });
  setTimeout(() => { if (!loaderDone) { loaderDone = true; dismissLoader(); } }, 2800);

  /* ── MENU OPEN / CLOSE ──────────────────────────────────────── */
  const overlay = document.getElementById('menu-overlay');
  const menuBtn = document.getElementById('menu-btn');
  let menuOpen = false;

  function openMenu() {
    menuOpen = true;
    overlay.classList.add('open');
    menuBtn.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Trap focus
    setTimeout(() => {
      const first = overlay.querySelector('a, button');
      if (first) first.focus();
    }, 400);
  }

  function closeMenu() {
    menuOpen = false;
    overlay.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    menuBtn.focus();
  }

  menuBtn?.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());
  document.getElementById('menu-close-btn')?.addEventListener('click', closeMenu);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });

  /* Close menu on link click — with page transition */
  overlay?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) { closeMenu(); return; }
      // Same page: just close
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        closeMenu(); return;
      }
      e.preventDefault();
      closeMenu();
      // Page transition
      const pt = document.getElementById('page-transition');
      if (pt) {
        pt.classList.add('enter');
        setTimeout(() => { window.location.href = href; }, 320);
      } else {
        window.location.href = href;
      }
    });
  });

  /* Page exit animation on all internal links */
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
        href.startsWith('tel:') || href.startsWith('http') ||
        link.target === '_blank') return;
    // Same page hash
    if (href === currentPage) return;
    e.preventDefault();
    const pt = document.getElementById('page-transition');
    if (pt) {
      pt.classList.add('enter');
      setTimeout(() => { window.location.href = href; }, 300);
    } else {
      window.location.href = href;
    }
  });

  /* Exit animation cleanup on arrival */
  window.addEventListener('pageshow', () => {
    const pt = document.getElementById('page-transition');
    if (pt) {
      pt.classList.remove('enter');
      pt.classList.add('exit');
      setTimeout(() => pt.classList.remove('exit'), 500);
    }
  });

  /* ── ANIMATED FAVICON (real logo + continuous shine) ────────── */
  function animateFavicon() {
    const canvas = document.getElementById('favicon-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const link = document.querySelector("link[rel~='icon']") || (() => {
      const l = document.createElement('link');
      l.rel = 'icon'; l.type = 'image/png';
      document.head.appendChild(l); return l;
    })();

    const logoImg = new Image();
    logoImg.src = 'hebron_logo.jpg';
    logoImg.onload = function () {
      let frame = 0;
      function draw() {
        ctx.clearRect(0, 0, 64, 64);

        // White circular base
        ctx.beginPath();
        ctx.arc(32, 32, 32, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Draw logo clipped to circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(32, 32, 31, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(logoImg, 1, 1, 62, 62);
        ctx.restore();

        // Continuous diagonal shine sweep (repeats every 180 frames ~3s)
        const phase = (frame % 180) / 180;
        const shineX = -64 + phase * 192;
        const grad = ctx.createLinearGradient(shineX, 0, shineX + 48, 64);
        grad.addColorStop(0,   'rgba(255,255,255,0)');
        grad.addColorStop(0.4, 'rgba(255,255,255,0)');
        grad.addColorStop(0.5, 'rgba(255,255,255,0.45)');
        grad.addColorStop(0.6, 'rgba(255,255,255,0)');
        grad.addColorStop(1,   'rgba(255,255,255,0)');
        ctx.save();
        ctx.beginPath();
        ctx.arc(32, 32, 31, 0, Math.PI * 2);
        ctx.clip();
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
        ctx.restore();

        // Subtle blue outer ring
        ctx.beginPath();
        ctx.arc(32, 32, 31, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0,87,184,0.35)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Pulsing glow ring
        const glow = Math.sin((frame % 90) / 90 * Math.PI);
        if (glow > 0.05) {
          ctx.beginPath();
          ctx.arc(32, 32, 31, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,130,255,${glow * 0.4})`;
          ctx.lineWidth = 3;
          ctx.stroke();
        }

        if (link) link.href = canvas.toDataURL('image/png');
        frame++;
        requestAnimationFrame(draw);
      }
      draw();
    };
    logoImg.onerror = function () {
      // Fallback: plain blue circle with H
      ctx.beginPath(); ctx.arc(32,32,32,0,Math.PI*2);
      ctx.fillStyle = '#0057B8'; ctx.fill();
      ctx.font = 'bold 34px Arial'; ctx.fillStyle = '#fff';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('H', 32, 34);
      if (link) link.href = canvas.toDataURL('image/png');
    };
  }

  window.addEventListener('load', animateFavicon);


  /* ── SCROLL PROGRESS ────────────────────────────────────────── */
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const total = document.body.scrollHeight - window.innerHeight;
      progressBar.style.width = total > 0 ? (window.scrollY / total * 100) + '%' : '0%';
    }, { passive: true });
  }

  /* ── NAVBAR SCROLL STATE ────────────────────────────────────── */
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('elevated', window.scrollY > 20);
    }, { passive: true });
  }

  /* ── COUNTER ANIMATION ──────────────────────────────────────── */
  const counters = document.querySelectorAll('.counter[data-target]');
  if (counters.length) {
    const cObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const dur = 2000;
        const start = performance.now();
        function tick(now) {
          const t = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.floor(ease * target) + suffix;
          if (t < 1) requestAnimationFrame(tick);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(tick);
        cObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cObs.observe(el));
  }

  /* ── SCROLL REVEAL ──────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .reveal-scale');
  if (revealEls.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => obs.observe(el));
  }

  /* ── BACK TO TOP ────────────────────────────────────────────── */
  const backTop = document.getElementById('back-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── SMOOTH SCROLL (for # links) ───────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── FAQ ACCORDION ──────────────────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ── BUTTON RIPPLE ──────────────────────────────────────────── */
  document.querySelectorAll('.btn-ripple, .btn-blue, .btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const r = document.createElement('span');
      r.className = 'ripple';
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;position:absolute;border-radius:50%;background:rgba(255,255,255,.3);transform:scale(0);animation:rippleAnim .6s linear;pointer-events:none`;
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(r);
      setTimeout(() => r.remove(), 700);
    });
  });

  /* ── GALLERY LIGHTBOX (for gallery.html) ────────────────────── */
  window.initGallery = function(items) {
    let currentIdx = 0;
    const lightbox = document.getElementById('lightbox');
    const lbImg    = document.getElementById('lb-img');
    const lbCap    = document.getElementById('lb-caption');

    function open(idx) {
      currentIdx = idx;
      lbImg.src = items[idx].src;
      if (lbCap) lbCap.textContent = items[idx].caption || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    function nav(dir) {
      currentIdx = (currentIdx + dir + items.length) % items.length;
      lbImg.style.opacity = '0';
      setTimeout(() => {
        lbImg.src = items[currentIdx].src;
        if (lbCap) lbCap.textContent = items[currentIdx].caption || '';
        lbImg.style.opacity = '1';
      }, 150);
    }

    document.querySelectorAll('.gallery-item[data-idx]').forEach(item => {
      item.addEventListener('click', () => open(parseInt(item.dataset.idx)));
    });
    document.getElementById('lb-close')?.addEventListener('click', close);
    document.getElementById('lb-prev')?.addEventListener('click', () => nav(-1));
    document.getElementById('lb-next')?.addEventListener('click', () => nav(1));
    lightbox?.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', e => {
      if (!lightbox?.classList.contains('open')) return;
      if (e.key === 'ArrowLeft')  nav(-1);
      if (e.key === 'ArrowRight') nav(1);
      if (e.key === 'Escape')     close();
    });
  };

  /* ── GALLERY FILTER ──────────────────────────────────────────── */
  document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('[data-cat]').forEach(item => {
        item.style.display = (filter === 'all' || item.dataset.cat === filter) ? '' : 'none';
      });
    });
  });

  /* ── PRODUCT SEARCH ──────────────────────────────────────────── */
  const srch = document.getElementById('product-search');
  if (srch) {
    srch.addEventListener('input', () => {
      const v = srch.value.toLowerCase();
      document.querySelectorAll('.product-card').forEach(c => {
        c.style.display = c.textContent.toLowerCase().includes(v) ? '' : 'none';
      });
    });
  }

  /* ── PRODUCT MODAL ───────────────────────────────────────────── */
  const productModal = document.getElementById('product-modal');
  if (productModal) {
    document.querySelectorAll('[data-modal]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.modal;
        const data = window.PRODUCTS_DATA?.[id];
        if (!data) return;
        document.getElementById('modal-title').textContent  = data.name;
        document.getElementById('modal-img').src            = data.img;
        document.getElementById('modal-img').alt            = data.name;
        document.getElementById('modal-cat').textContent    = data.category;
        document.getElementById('modal-desc').textContent   = data.description;
        document.getElementById('modal-process').textContent    = data.process;
        document.getElementById('modal-material').textContent   = data.material;
        document.getElementById('modal-finish').textContent     = data.finish;
        document.getElementById('modal-tolerance').textContent  = data.tolerance;
        productModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    document.getElementById('modal-close')?.addEventListener('click', closeModal);
    productModal.addEventListener('click', e => { if (e.target === productModal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && productModal.classList.contains('open')) closeModal(); });
    function closeModal() { productModal.classList.remove('open'); document.body.style.overflow = ''; }
  }

  /* ── FORM VALIDATION ─────────────────────────────────────────── */
  function validateForm(form) {
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const errEl = form.querySelector(`[data-for="${field.id}"]`);
      const empty = !field.value.trim();
      field.classList.toggle('error', empty);
      if (errEl) errEl.classList.toggle('show', empty);
      if (empty) { valid = false; return; }
      if (field.type === 'email') {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        field.classList.toggle('error', !ok);
        if (errEl) errEl.classList.toggle('show', !ok);
        if (!ok) valid = false;
      }
    });
    return valid;
  }

  /* Contact form */
  const cf = document.getElementById('contact-form');
  if (cf) {
    cf.addEventListener('submit', e => {
      e.preventDefault();
      if (!validateForm(cf)) return;
      const name    = cf.querySelector('#f-name')?.value.trim() || '';
      const company = cf.querySelector('#f-company')?.value.trim() || '';
      const email   = cf.querySelector('#f-email')?.value.trim() || '';
      const phone   = cf.querySelector('#f-phone')?.value.trim() || '';
      const subject = cf.querySelector('#f-subject')?.value || 'General Inquiry';
      const message = cf.querySelector('#f-message')?.value.trim() || '';
      const body = [name && `Name: ${name}`, company && `Company: ${company}`,
        email && `Email: ${email}`, phone && `Phone: ${phone}`, '', message
      ].filter(Boolean).join('\n');
      window.location.href = `mailto:info@hebronautomotive.com?subject=[Hebron Inquiry] ${subject}&body=${encodeURIComponent(body)}`;
      cf.style.display = 'none';
      const suc = document.getElementById('contact-success');
      if (suc) suc.classList.add('show');
    });
  }

  /* Internship form */
  const inf = document.getElementById('internship-form');
  if (inf) {
    const fi = document.getElementById('f-resume');
    if (fi) {
      fi.addEventListener('change', () => {
        const lbl = document.getElementById('file-label');
        if (lbl && fi.files.length) {
          lbl.textContent = `✓ ${fi.files[0].name}`;
          lbl.closest('.file-upload')?.classList.add('has-file');
        }
      });
    }
    inf.addEventListener('submit', e => {
      e.preventDefault();
      if (!validateForm(inf)) return;
      inf.style.display = 'none';
      const suc = document.getElementById('intern-success');
      if (suc) suc.classList.add('show');
    });
  }

  /* Careers form */
  const crf = document.getElementById('careers-form');
  if (crf) {
    const fr = document.getElementById('cr-resume');
    if (fr) {
      fr.addEventListener('change', () => {
        const lbl = document.getElementById('cr-file-label');
        if (lbl && fr.files.length) {
          lbl.textContent = `✓ ${fr.files[0].name}`;
          lbl.closest('.file-upload')?.classList.add('has-file');
        }
      });
    }
    crf.addEventListener('submit', e => {
      e.preventDefault();
      if (!validateForm(crf)) return;
      crf.style.display = 'none';
      const suc = document.getElementById('careers-success');
      if (suc) suc.classList.add('show');
    });
  }

})();


