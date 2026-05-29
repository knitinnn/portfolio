/* ====================================================================
   NITIN KUMAR KASTURI — Premium Portfolio
   Interactive features: cursor tracker, scroll progress, scroll reveal,
   count-up stats, smooth scroll, mobile menu, form handling
   ==================================================================== */

/* ==================== Force page reload at Home ==================== */
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.addEventListener("load", () => {
  window.scrollTo({ top: 0, behavior: "instant" });
});

/* ==================== Custom Cursor Tracker ==================== */
(function () {
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");

  if (!dot || !ring) return;

  // Check for touch device — disable cursor on mobile
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    dot.style.display = "none";
    ring.style.display = "none";
    return;
  }

  let mouseX = 0,
    mouseY = 0;
  let dotX = 0,
    dotY = 0;
  let ringX = 0,
    ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth lerp animation
  function animate() {
    // Dot follows fast
    dotX += (mouseX - dotX) * 0.25;
    dotY += (mouseY - dotY) * 0.25;
    dot.style.left = dotX + "px";
    dot.style.top = dotY + "px";

    // Ring follows slower for lag effect
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";

    requestAnimationFrame(animate);
  }
  animate();

  // Hover grow effect on interactive elements
  const interactiveElements = document.querySelectorAll(
    'a, button, input, textarea, .skill-card, .project-card, .cert-badge, .contact-info-card, .timeline-content, .social-btn, .stat-item'
  );

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-hover");
    });
    el.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-hover");
    });
  });

  // Hide cursor when leaving viewport
  document.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  });
})();

/* ==================== Scroll Progress Bar ==================== */
(function () {
  const progressBar = document.getElementById("scrollProgress");
  if (!progressBar) return;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + "%";
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
})();

/* ==================== Mobile Menu Toggle ==================== */
(function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const overlay = document.getElementById("mobileOverlay");
  const toggleIcon = menuToggle ? menuToggle.querySelector("i") : null;

  if (!menuToggle || !navLinks) return;

  function openMenu() {
    navLinks.classList.add("show");
    if (overlay) overlay.classList.add("active");
    if (toggleIcon) {
      toggleIcon.classList.remove("fa-bars");
      toggleIcon.classList.add("fa-times");
    }
  }

  function closeMenu() {
    navLinks.classList.remove("show");
    if (overlay) overlay.classList.remove("active");
    if (toggleIcon) {
      toggleIcon.classList.remove("fa-times");
      toggleIcon.classList.add("fa-bars");
    }
  }

  menuToggle.addEventListener("click", () => {
    if (navLinks.classList.contains("show")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  // Close menu when clicking a nav link
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
})();

/* ==================== Smooth Scroll ==================== */
(function () {
  const navItems = document.querySelectorAll(".nav-link");

  function smoothScroll(targetId) {
    const section = document.querySelector(targetId);
    const navbar = document.getElementById("navbar");
    const navHeight = navbar ? navbar.offsetHeight : 70;
    if (section) {
      const targetPosition =
        section.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
      history.pushState(null, null, targetId);
    }
  }

  navItems.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      smoothScroll(targetId);
      navItems.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // All hash links (CTAs, footer links, etc.)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    if (!anchor.classList.contains("nav-link")) {
      anchor.addEventListener("click", (e) => {
        const targetId = anchor.getAttribute("href");
        if (targetId && targetId !== "#") {
          e.preventDefault();
          smoothScroll(targetId);
        }
      });
    }
  });

  // Logo click
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      smoothScroll("#home");
    });
  }

  // Footer logo click
  const footerLogo = document.querySelector(".footer-logo");
  if (footerLogo) {
    footerLogo.addEventListener("click", (e) => {
      e.preventDefault();
      smoothScroll("#home");
    });
  }
})();

/* ==================== Scroll Spy ==================== */
(function () {
  const navItems = document.querySelectorAll(".nav-link");

  function updateActiveLink() {
    const scrollY = window.scrollY;
    const sections = document.querySelectorAll("section[id]");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navItems.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
})();

/* ==================== Navbar Scroll Effect ==================== */
(function () {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();
})();

/* ==================== Back to Top ==================== */
(function () {
  const backToTop = document.getElementById("back-to-top");
  if (!backToTop) return;

  function toggleButton() {
    backToTop.style.display = window.scrollY > 500 ? "flex" : "none";
  }

  window.addEventListener("scroll", toggleButton, { passive: true });
  toggleButton();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

/* ==================== Hero Entrance Animations ==================== */
(function () {
  window.addEventListener("load", () => {
    const heroElements = document.querySelectorAll(".hero-animate");
    // Small delay to ensure page is visually ready
    setTimeout(() => {
      heroElements.forEach((el) => {
        el.classList.add("animate-in");
      });
    }, 100);
  });
})();

/* ==================== Scroll Reveal (IntersectionObserver) ==================== */
(function () {
  const revealElements = document.querySelectorAll(".reveal");

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Only animate once
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((el) => observer.observe(el));
})();

/* ==================== Count-Up Animation for Stats ==================== */
(function () {
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");

  if (!statNumbers.length) return;

  function animateCount(el) {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1800;
    const startTime = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = Math.round(easedProgress * target);

      el.textContent = currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          animateCount(el);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  statNumbers.forEach((el) => observer.observe(el));
})();

/* ==================== Contact Form ==================== */
(function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");
    let valid = true;

    [name, email, subject, message].forEach((field) => {
      field.classList.remove("input-error");
      if (field.value.trim() === "") {
        field.classList.add("input-error");
        valid = false;
      }
    });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      email.classList.add("input-error");
      valid = false;
    }

    if (!valid) return;

    const sendBtn = document.getElementById("sendBtn");
    sendBtn.classList.add("loading");

    try {
      // Demo Mode: If the Formspree ID is still the placeholder, simulate successful submission for testing UI/UX
      if (form.action.includes("your_formspree_id_here")) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network latency
        document.getElementById("successPopup").style.display = "block";
        const overlay = document.getElementById("popupOverlay");
        if (overlay) overlay.style.display = "block";
        form.reset();
        return;
      }

      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        document.getElementById("successPopup").style.display = "block";
        const overlay = document.getElementById("popupOverlay");
        if (overlay) overlay.style.display = "block";
        form.reset();
      } else {
        alert("Something went wrong. Please check your Formspree ID configuration and try again.");
      }
    } catch (error) {
      alert("Error sending message. Please check your connection.");
    } finally {
      sendBtn.classList.remove("loading");
    }
  });

  const closeSuccessPopup = () => {
    document.getElementById("successPopup").style.display = "none";
    const overlay = document.getElementById("popupOverlay");
    if (overlay) overlay.style.display = "none";

    // Smoothly scroll back to the Home section
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update the URL hash to #home
    if (history.pushState) {
      history.pushState(null, null, "#home");
    } else {
      window.location.hash = "home";
    }
  };

  document.getElementById("closePopup").addEventListener("click", closeSuccessPopup);
  const overlay = document.getElementById("popupOverlay");
  if (overlay) {
    overlay.addEventListener("click", closeSuccessPopup);
  }
})();