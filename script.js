/**
 * RISKCURITY — Master CyFocus Animation & Interactive Engine
 * Real-time 3D Wireframe Mesh, Rotating Geometric Canvases & Motion
 */

const W3F_KEY = '80e27178-2217-47b1-9947-cff9b84e9262';

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. Navigation Toggle & Mobile Menu
     ========================================================================== */
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.innerHTML = isOpen ? '✕' : '☰';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '☰';
        document.body.style.overflow = '';
      });
    });
  }

  /* ==========================================================================
     2. Header Elevation on Scroll
     ========================================================================== */
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          siteHeader.classList.toggle('scrolled', window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ==========================================================================
     3. Hero 3D Warped Parametric Wireframe Mesh Canvas (Video 0:00 - 0:04)
     ========================================================================== */
  const heroCanvas = document.getElementById('heroWireframeCanvas');
  if (heroCanvas && !prefersReducedMotion) {
    const ctx = heroCanvas.getContext('2d');
    let width, height;
    let time = 0;

    function resize() {
      width = heroCanvas.parentElement.clientWidth;
      height = heroCanvas.parentElement.clientHeight;
      heroCanvas.width = width * window.devicePixelRatio;
      heroCanvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resize();
    window.addEventListener('resize', resize);

    function drawWarpedGrid() {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 1;

      const cols = 24;
      const rows = 16;
      const cellW = width / cols;
      const cellH = height / rows;

      // Draw horizontal lines with sine/cosine undulation
      for (let r = 0; r <= rows; r++) {
        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const x = c * cellW;
          const baseY = r * cellH;
          // CyFocus signature wave distortion
          const wave = Math.sin((c * 0.3) + (time * 0.03)) * Math.cos((r * 0.25) + (time * 0.025)) * 28;
          const y = baseY + wave;
          if (c === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw vertical lines with matching warp
      for (let c = 0; c <= cols; c++) {
        ctx.beginPath();
        for (let r = 0; r <= rows; r++) {
          const baseY = r * cellH;
          const wave = Math.sin((c * 0.3) + (time * 0.03)) * Math.cos((r * 0.25) + (time * 0.025)) * 28;
          const x = c * cellW;
          const y = baseY + wave;
          if (r === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      time += 0.8;
      requestAnimationFrame(drawWarpedGrid);
    }
    drawWarpedGrid();
  }

  /* ==========================================================================
     4. Key Challenges 3D Rotating Geometric Wireframe Canvases (Video 0:08 - 0:10)
     ========================================================================== */
  // Canvas 1: Rotating Geodesic Sphere
  function initSphereCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || prefersReducedMotion) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 360;
    canvas.height = 360;
    let angle = 0;

    function renderSphere() {
      ctx.clearRect(0, 0, 360, 360);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;

      const cx = 180, cy = 180, radius = 75;
      const numRings = 9;

      // Latitude rings
      for (let i = 0; i < numRings; i++) {
        const theta = (i / (numRings - 1)) * Math.PI - Math.PI / 2;
        const r = radius * Math.cos(theta);
        const y = cy + radius * Math.sin(theta);

        ctx.beginPath();
        ctx.ellipse(cx, y, r, r * Math.sin(angle * 0.5), 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Longitude rings rotated
      for (let j = 0; j < 6; j++) {
        const phi = (j / 6) * Math.PI + angle;
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius * Math.abs(Math.sin(phi)), radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      angle += 0.015;
      requestAnimationFrame(renderSphere);
    }
    renderSphere();
  }
  initSphereCanvas('sphereCanvas');

  // Canvas 2: Rotating 3D Torus
  function initTorusCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || prefersReducedMotion) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 360;
    canvas.height = 360;
    let rotX = 0.5;
    let rotY = 0;

    function renderTorus() {
      ctx.clearRect(0, 0, 360, 360);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;

      const cx = 180, cy = 180;
      const R = 55; // Major radius
      const r = 24; // Minor radius
      const uSteps = 16;
      const vSteps = 10;

      for (let u = 0; u < uSteps; u++) {
        const uAngle = (u / uSteps) * Math.PI * 2 + rotY;
        ctx.beginPath();
        for (let v = 0; v <= vSteps; v++) {
          const vAngle = (v / vSteps) * Math.PI * 2;
          const x = (R + r * Math.cos(vAngle)) * Math.cos(uAngle);
          const y = (R + r * Math.cos(vAngle)) * Math.sin(uAngle);
          const z = r * Math.sin(vAngle);

          // Project 3D to 2D
          const px = cx + x;
          const py = cy + (y * Math.sin(rotX) - z * Math.cos(rotX));
          if (v === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      rotY += 0.02;
      requestAnimationFrame(renderTorus);
    }
    renderTorus();
  }
  initTorusCanvas('torusCanvas');

  // Canvas 3: Rotating Wireframe Cylinder / Mesh
  function initCylinderCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || prefersReducedMotion) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 360;
    canvas.height = 360;
    let rot = 0;

    function renderCylinder() {
      ctx.clearRect(0, 0, 360, 360);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;

      const cx = 180, cy = 180;
      const radius = 60;
      const height = 90;
      const steps = 14;

      // Draw top and bottom circles
      ctx.beginPath();
      ctx.ellipse(cx, cy - height / 2, radius, radius * 0.35, 0, 0, Math.PI * 2);
      ctx.ellipse(cx, cy + height / 2, radius, radius * 0.35, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Draw rotating vertical ribs
      for (let i = 0; i < steps; i++) {
        const a = (i / steps) * Math.PI * 2 + rot;
        const x = cx + radius * Math.cos(a);
        const yTop = cy - height / 2 + (radius * 0.35) * Math.sin(a);
        const yBot = cy + height / 2 + (radius * 0.35) * Math.sin(a);

        ctx.beginPath();
        ctx.moveTo(x, yTop);
        ctx.lineTo(x, yBot);
        ctx.stroke();
      }

      rot += 0.018;
      requestAnimationFrame(renderCylinder);
    }
    renderCylinder();
  }
  initCylinderCanvas('cylinderCanvas');

  // Card click/hover active toggle (like in video 0:08 - 0:10)
  const challengeCards = document.querySelectorAll('.challenge-card');
  challengeCards.forEach(card => {
    card.addEventListener('click', () => {
      challengeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  /* ==========================================================================
     5. Testimonial Carousel Controls (Video 0:11 - 0:14)
     ========================================================================== */
  const testimonials = [
    {
      quote: "Riskcurity delivered expert security solutions that protected our digital assets and kept our business running without disruption. Their proactive approach and actionable insights not only strengthened our defense but also gave us the confidence to scale securely.",
      author: "Adam Glover",
      role: "CISO, Dynamix24",
      date: "Feb 3"
    },
    {
      quote: "Unlike consulting firms that handed us 150-page PDF reports, Riskcurity engineers embedded with our dev team to write exact code patches. We passed our SOC 2 Type II audit in 3 weeks with zero deficiencies.",
      author: "Sarah Chen",
      role: "VP of Engineering, CloudScale",
      date: "Jan 18"
    },
    {
      quote: "Their 24/7 SOC intercepted and isolated a credential stuffing attack within 11 minutes. The under-15-minute SLA is real and saves our business from costly breach disclosures.",
      author: "Marcus Vance",
      role: "Head of Infrastructure, NexaPay",
      date: "Dec 12"
    },
    {
      quote: "Having an attestation letter signed by OSCP-certified ethical hackers allowed us to close a Fortune 500 enterprise deal that was held up in vendor procurement for two months.",
      author: "Elena Rostova",
      role: "Founder & CEO, DataSphere AI",
      date: "Nov 28"
    }
  ];

  let currentTestimonial = 0;
  const quoteEl = document.getElementById('testimonialQuote');
  const authorEl = document.getElementById('testimonialAuthor');
  const roleEl = document.getElementById('testimonialRole');
  const counterEl = document.getElementById('testimonialCounter');
  const prevBtn = document.getElementById('testPrevBtn');
  const nextBtn = document.getElementById('testNextBtn');

  function updateTestimonial(idx) {
    if (!quoteEl) return;
    currentTestimonial = (idx + testimonials.length) % testimonials.length;
    const item = testimonials[currentTestimonial];

    quoteEl.style.opacity = '0';
    quoteEl.style.transform = 'translateY(10px)';

    setTimeout(() => {
      quoteEl.textContent = `“${item.quote}”`;
      if (authorEl) authorEl.textContent = `${item.author} · ${item.role} · ${item.date}`;
      if (counterEl) counterEl.textContent = `0${currentTestimonial + 1} / 04`;
      quoteEl.style.opacity = '1';
      quoteEl.style.transform = 'translateY(0)';
      quoteEl.style.transition = 'all 0.3s ease';
    }, 150);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => updateTestimonial(currentTestimonial - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => updateTestimonial(currentTestimonial + 1));

  /* ==========================================================================
     6. Interactive Services Showcase (Video 0:15 - 0:19)
     ========================================================================== */
  const serviceSlides = [
    {
      headline: "Expose Vulnerabilities Before They Become Breaches.",
      title: "Penetration Testing (VAPT)",
      p1_title: "Thorough Evaluations",
      p1_desc: "Assessments of networks, web applications, and cloud infrastructures to uncover weaknesses.",
      p2_title: "Realistic Attack Simulations",
      p2_desc: "Mimic current cyber threats by OSCP ethical hackers to rigorously test and validate defenses.",
      p3_title: "Practical Remediation",
      p3_desc: "Provide clear, prioritized guidelines and direct code patches to effectively mitigate discovered risks."
    },
    {
      headline: "Swiftly Contain And Analyze Security Incidents.",
      title: "24/7 SOC Monitoring & Threat Control",
      p1_title: "Rapid Containment",
      p1_desc: "Instantly identify and isolate breaches with a guaranteed under-15-minute response SLA.",
      p2_title: "Deep Forensic Analysis",
      p2_desc: "Investigate incidents to trace attack vectors and determine root causes across cloud and endpoints.",
      p3_title: "Strategic Recovery",
      p3_desc: "Develop actionable plans to restore compromised systems and eliminate false alarms by up to 68%."
    },
    {
      headline: "Ensure Robust Security While Meeting Regulatory Standards.",
      title: "Compliance & Security Audits",
      p1_title: "Regulatory Benchmarking",
      p1_desc: "Internal controls aligned against SOC 2, ISO 27001, PCI-DSS v4.0, HIPAA, and GDPR standards.",
      p2_title: "Customized Action Plans",
      p2_desc: "Craft step-by-step strategies to achieve and sustain full compliance without spreadsheet chaos.",
      p3_title: "Clear, Insightful Reporting",
      p3_desc: "Deliver concise reports that bridge technical depth and auditor sign-off requirements."
    }
  ];

  let activeServiceSlide = 0;
  const sHeadline = document.getElementById('serviceSlideHeadline');
  const sTitle = document.getElementById('serviceSlideTitle');
  const sp1_t = document.getElementById('sp1Title');
  const sp1_d = document.getElementById('sp1Desc');
  const sp2_t = document.getElementById('sp2Title');
  const sp2_d = document.getElementById('sp2Desc');
  const sp3_t = document.getElementById('sp3Title');
  const sp3_d = document.getElementById('sp3Desc');
  const sProgressFill = document.getElementById('serviceProgressFill');
  const sStepBtns = document.querySelectorAll('.service-step-btn');

  function updateServiceSlide(idx) {
    if (!sHeadline) return;
    activeServiceSlide = idx;
    const s = serviceSlides[idx];

    sStepBtns.forEach((btn, i) => btn.classList.toggle('active', i === idx));
    if (sProgressFill) sProgressFill.style.width = `${((idx + 1) / 3) * 100}%`;

    sHeadline.textContent = s.headline;
    if (sTitle) sTitle.textContent = s.title;
    if (sp1_t) sp1_t.textContent = s.p1_title;
    if (sp1_d) sp1_d.textContent = s.p1_desc;
    if (sp2_t) sp2_t.textContent = s.p2_title;
    if (sp2_d) sp2_d.textContent = s.p2_desc;
    if (sp3_t) sp3_t.textContent = s.p3_title;
    if (sp3_d) sp3_d.textContent = s.p3_desc;
  }

  sStepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-step') || '0', 10);
      updateServiceSlide(idx);
    });
  });

  // Service Canvas 3D Warped Orange Grid Animation
  const serviceCanvas = document.getElementById('serviceWireframeCanvas');
  if (serviceCanvas && !prefersReducedMotion) {
    const sCtx = serviceCanvas.getContext('2d');
    let sTime = 0;
    serviceCanvas.width = 440;
    serviceCanvas.height = 320;

    function drawServiceMesh() {
      sCtx.clearRect(0, 0, 440, 320);
      sCtx.strokeStyle = 'rgba(255, 68, 5, 0.7)';
      sCtx.lineWidth = 1.2;

      const cols = 12;
      const rows = 10;
      const cellW = 440 / cols;
      const cellH = 320 / rows;

      for (let r = 0; r <= rows; r++) {
        sCtx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const x = c * cellW;
          const baseY = r * cellH;
          const wave = Math.sin((c * 0.4) + (sTime * 0.04)) * Math.cos((r * 0.3) + (sTime * 0.03)) * 20;
          const y = baseY + wave;
          if (c === 0) sCtx.moveTo(x, y);
          else sCtx.lineTo(x, y);
        }
        sCtx.stroke();
      }

      for (let c = 0; c <= cols; c++) {
        sCtx.beginPath();
        for (let r = 0; r <= rows; r++) {
          const baseY = r * cellH;
          const wave = Math.sin((c * 0.4) + (sTime * 0.04)) * Math.cos((r * 0.3) + (sTime * 0.03)) * 20;
          const x = c * cellW;
          const y = baseY + wave;
          if (r === 0) sCtx.moveTo(x, y);
          else sCtx.lineTo(x, y);
        }
        sCtx.stroke();
      }

      sTime += 1;
      requestAnimationFrame(drawServiceMesh);
    }
    drawServiceMesh();
  }

  /* ==========================================================================
     7. Segmented Contact Switcher (Video 0:20)
     ========================================================================== */
  const segBtns = document.querySelectorAll('.segmented-btn');
  segBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      segBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const input = document.getElementById('fc-client-type');
      if (input) input.value = btn.getAttribute('data-val') || 'business';
    });
  });

  /* ==========================================================================
     8. FAQ Accordion Functionality
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-button');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active', !isActive);
        btn.setAttribute('aria-expanded', String(!isActive));
      });
    }
  });

  /* ==========================================================================
     9. Contact Form Submissions (Web3Forms API)
     ========================================================================== */
  function setupForm(formId, successId) {
    const form = document.getElementById(formId);
    const success = document.getElementById(successId);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Transmitting Request…';
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: W3F_KEY,
            subject: `New Riskcurity Assessment Request: ${data.name || 'Anonymous'}`,
            from_name: data.name || 'Riskcurity Client',
            ...data
          })
        });
      } catch (err) {
        console.warn('Form network fallback:', err);
      }

      form.style.display = 'none';
      if (success) {
        success.style.display = 'block';
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  setupForm('contactFormCy', 'contactSuccessCy');
  setupForm('contactFormPage', 'contactSuccessPage');

  /* ==========================================================================
     10. Free Security Checklist Lead Magnet Modal
     ========================================================================== */
  const lmOverlay = document.getElementById('lmModalOverlay');
  const lmTriggers = document.querySelectorAll('.lm-trigger');
  const lmClose = document.getElementById('lmClose');
  const lmForm = document.getElementById('lmForm');

  function openLmModal() {
    if (lmOverlay) {
      lmOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      const input = lmOverlay.querySelector('input');
      if (input) setTimeout(() => input.focus(), 100);
    }
  }

  function closeLmModal() {
    if (lmOverlay) {
      lmOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  lmTriggers.forEach(t => t.addEventListener('click', (e) => {
    e.preventDefault();
    openLmModal();
  }));

  if (lmClose) lmClose.addEventListener('click', closeLmModal);
  if (lmOverlay) {
    lmOverlay.addEventListener('click', (e) => {
      if (e.target === lmOverlay) closeLmModal();
    });
  }

  if (lmForm) {
    lmForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = lmForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Generating PDF…';
      }

      const email = document.getElementById('lmEmail')?.value || '';

      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: W3F_KEY,
            subject: `Free Checklist PDF Requested: ${email}`,
            email,
            asset: '10-Point Vendor Security Assessment Checklist'
          })
        });
      } catch (_) {}

      lmForm.innerHTML = `
        <div style="text-align: center; padding: 1.5rem 0;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(255,68,5,0.15); color: #FF4405; display: inline-flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 1rem;">✓</div>
          <h4 style="font-size: 1.25rem; font-weight: 700; color: #FFFFFF; margin-bottom: 0.5rem;">Checklist Dispatched</h4>
          <p style="font-size: 0.9375rem; color: #9BA0A8; margin-bottom: 1.5rem;">We've sent the 10-Point Vendor Security Assessment Checklist to <strong>${email}</strong>.</p>
          <button type="button" class="btn-cy-pill" onclick="document.getElementById('lmModalOverlay').classList.remove('open'); document.body.style.overflow='';" style="width: 100%; justify-content: center;">Done</button>
        </div>
      `;
    });
  }

  /* ==========================================================================
     11. Blog Article Modal Reader
     ========================================================================== */
  const blogCards = document.querySelectorAll('.blog-card[data-article-id]');
  const blogSearchInput = document.getElementById('blogSearch');
  const blogResultCount = document.getElementById('blogResultCount');
  const blogEmptyState = document.getElementById('blogEmptyState');

  // Search the existing article collection without changing or removing its content.
  if (blogSearchInput) {
    const filterBlogArticles = () => {
      const query = blogSearchInput.value.trim().toLowerCase();
      let visibleCount = 0;
      blogCards.forEach((card) => {
        const matches = card.textContent.toLowerCase().includes(query);
        card.hidden = !matches;
        if (matches) visibleCount += 1;
      });
      if (blogResultCount) {
        blogResultCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'article' : 'articles'}`;
      }
      if (blogEmptyState) blogEmptyState.hidden = visibleCount !== 0;
    };
    blogSearchInput.addEventListener('input', filterBlogArticles);
  }

  const blogReaderModal = document.getElementById('blogReaderModal');
  const blogReaderContent = document.getElementById('blogReaderContent');
  const blogReaderClose = document.getElementById('blogReaderClose');

  const articleLibrary = {
    'pentest-cost': {
      tag: 'Penetration Testing',
      title: 'How Much Does a Penetration Test Cost in 2026?',
      readTime: '7 min read',
      date: 'Aug 2026',
      content: `
        <p class="lead" style="font-size:1.15rem; color:#9BA0A8; margin-bottom:1.5rem; line-height:1.7;">For B2B SaaS companies and scaling technology firms, penetration testing is a mandatory procurement gate required by enterprise customers, cyber insurers, and compliance frameworks like SOC 2 and ISO 27001.</p>
        <h3 style="font-size:1.35rem; font-weight:700; color:#FFFFFF; margin: 1.75rem 0 0.75rem;">Key Cost Determinants</h3>
        <p style="color:#9BA0A8; margin-bottom:1rem; line-height:1.65;">The price of an authentic manual penetration test depends on application complexity, multi-tenant RBAC roles, REST/GraphQL API surfaces, and AWS/GCP cloud configurations.</p>
        <h3 style="font-size:1.35rem; font-weight:700; color:#FFFFFF; margin: 1.75rem 0 0.75rem;">Transparent Flat-Rate Pricing</h3>
        <p style="color:#9BA0A8; margin-bottom:1.5rem; line-height:1.65;">Riskcurity charges transparent upfront flat rates and includes 100% free re-testing within 30 days on every engagement.</p>
      `
    },
    'vuln-vs-pentest': {
      tag: 'Offensive Security',
      title: 'Vulnerability Scanning vs. Penetration Testing: What’s the Difference?',
      readTime: '5 min read',
      date: 'Aug 2026',
      content: `
        <p class="lead" style="font-size:1.15rem; color:#9BA0A8; margin-bottom:1.5rem; line-height:1.7;">A vulnerability scan is an automated software check for known signatures. A penetration test is a manual attack simulated by certified OSCP ethical hackers who exploit logic flaws, IDOR, and authorization bypasses that automated scanners miss.</p>
      `
    },
    'soc2-type1-vs-type2': {
      tag: 'SOC 2 Compliance',
      title: 'SOC 2 Type I vs. Type II: Which Does Your Startup Need First?',
      readTime: '8 min read',
      date: 'Aug 2026',
      content: `
        <p class="lead" style="font-size:1.15rem; color:#9BA0A8; margin-bottom:1.5rem; line-height:1.7;">Type I evaluates design at a point in time (2 to 4 weeks). Type II evaluates operational effectiveness over 3 to 12 months. Start with Type I to unlock immediate enterprise revenue, while continuously collecting automated evidence toward Type II.</p>
      `
    },
    'iso27001-checklist': {
      tag: 'ISO 27001',
      title: 'ISO 27001 Certification Checklist for B2B SaaS Companies',
      readTime: '10 min read',
      date: 'Aug 2026',
      content: `
        <p class="lead" style="font-size:1.15rem; color:#9BA0A8; margin-bottom:1.5rem; line-height:1.7;">Step-by-step guidance on creating an ISMS, defining Annex A controls, and passing Stage 1 and Stage 2 ISO audits effortlessly with automated compliance evidence.</p>
      `
    },
    'pci-dss-v4': {
      tag: 'PCI DSS v4.0',
      title: 'PCI DSS v4.0 Transition Guide: Key Changes You Need to Know',
      readTime: '6 min read',
      date: 'Aug 2026',
      content: `
        <p class="lead" style="font-size:1.15rem; color:#9BA0A8; margin-bottom:1.5rem; line-height:1.7;">Mandatory multi-factor authentication, cardholder data environment (CDE) isolation, tokenization, anti-e-skimming script verification, and QSA audit preparation.</p>
      `
    },
    'siem-alert-fatigue': {
      tag: 'SOC & SIEM',
      title: 'How to Reduce SIEM Alert Fatigue by Up to 70%',
      readTime: '6 min read',
      date: 'Aug 2026',
      content: `
        <p class="lead" style="font-size:1.15rem; color:#9BA0A8; margin-bottom:1.5rem; line-height:1.7;">How custom detection engineering and alert tuning eliminate false alarms so real security incidents receive immediate human analyst containment under 15 minutes.</p>
      `
    },
    'ai-governance-iso42001': {
      tag: 'AI Safety',
      title: 'AI Governance & ISO 42001: Building Trust in AI Systems',
      readTime: '9 min read',
      date: 'Aug 2026',
      content: `
        <p class="lead" style="font-size:1.15rem; color:#9BA0A8; margin-bottom:1.5rem; line-height:1.7;">How to audit LLM applications, prevent prompt injection attacks, and enforce human-in-the-loop guardrails for responsible AI deployment.</p>
      `
    },
    'vendor-security-questionnaires': {
      tag: 'Vendor Trust',
      title: 'Vendor Security Questionnaires: How to Pass Enterprise Reviews',
      readTime: '5 min read',
      date: 'Aug 2026',
      content: `
        <p class="lead" style="font-size:1.15rem; color:#9BA0A8; margin-bottom:1.5rem; line-height:1.7;">How to answer SIG, VSA, and enterprise procurement questionnaires quickly without bottlenecking your sales team.</p>
      `
    }
  };

  blogCards.forEach(card => {
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.click();
      }
    });
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-article-id');
      const article = id ? articleLibrary[id] : null;
      if (article && blogReaderModal && blogReaderContent) {
        blogReaderContent.innerHTML = `
          <div style="margin-bottom: 1.5rem; border-bottom: 1px solid var(--cy-border); padding-bottom: 1.25rem;">
            <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--cy-orange); margin-bottom:0.5rem;">${article.tag} · ${article.readTime} · ${article.date}</div>
            <h2 style="font-size:1.75rem; font-weight:800; line-height:1.25; color:#FFFFFF;">${article.title}</h2>
          </div>
          <div style="font-size:1rem; line-height:1.7; color:#9BA0A8;">
            ${article.content}
          </div>
          <div style="margin-top:2.5rem; padding-top:1.5rem; border-top:1px solid var(--cy-border); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
            <span style="font-size:0.875rem; color:#656972;">Published by Riskcurity Cybersecurity Engineering</span>
            <a href="contact.html" class="nav-btn-contact">Discuss With An Engineer →</a>
          </div>
        `;
        blogReaderModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (blogReaderClose && blogReaderModal) {
    blogReaderClose.addEventListener('click', () => {
      blogReaderModal.classList.remove('open');
      document.body.style.overflow = '';
    });
    blogReaderModal.addEventListener('click', (e) => {
      if (e.target === blogReaderModal) {
        blogReaderModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
});
