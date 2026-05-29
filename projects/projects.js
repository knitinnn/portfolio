/* ====================================================================
   NITIN KUMAR KASTURI — Case Study Interactivity Script
   Manages: Scroll progress, Carousel slider, Image zoom, Scroll reveal
   ==================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initScrollProgress();
  initCarousels();
  initImageZoom();
  initScrollReveals();
});

/* ==================== Scroll Progress Meter ==================== */
function initScrollProgress() {
  const progressBar = document.querySelector(".cs-scroll-progress");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (windowScroll / height) * 100 : 0;
    progressBar.style.width = scrolled + "%";
  }, { passive: true });
}

/* ==================== Premium Carousel / Slider ==================== */
function initCarousels() {
  const carousels = document.querySelectorAll(".carousel-wrapper");
  
  carousels.forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
    const nextBtn = carousel.querySelector(".carousel-btn.next");
    const prevBtn = carousel.querySelector(".carousel-btn.prev");
    const dotsContainer = carousel.querySelector(".carousel-dots");
    
    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    
    // Create pagination dots
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("carousel-dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        goToSlide(index);
      });
      dotsContainer.appendChild(dot);
    });
    
    const dots = Array.from(dotsContainer.querySelectorAll(".carousel-dot"));

    // Move to specific slide
    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update active dot
      dots.forEach(dot => dot.classList.remove("active"));
      dots[currentIndex].classList.add("active");
    }

    // Bind event listeners
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        goToSlide(currentIndex + 1);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        goToSlide(currentIndex - 1);
      });
    }

    // Auto-advance every 5 seconds
    let autoPlayInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);

    // Pause autoplay on mouse hover
    carousel.addEventListener("mouseenter", () => {
      clearInterval(autoPlayInterval);
    });

    carousel.addEventListener("mouseleave", () => {
      autoPlayInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 5000);
    });
  });
}

/* ==================== Image Modal Zoom Overlay ==================== */
function initImageZoom() {
  // Create modal structure if not already in document
  let modal = document.querySelector(".zoom-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.className = "zoom-modal";
    modal.innerHTML = `
      <span class="zoom-close">&times;</span>
      <img class="zoom-modal-img" src="" alt="Zoomed Screenshot">
    `;
    document.body.appendChild(modal);
  }

  const modalImg = modal.querySelector(".zoom-modal-img");
  const closeBtn = modal.querySelector(".zoom-close");
  const zoomableImages = document.querySelectorAll(".carousel-slide img, .feature-img-wrapper img, .zoomable-img");

  zoomableImages.forEach(img => {
    // Add cursor style to original elements
    img.style.cursor = "zoom-in";
    
    img.addEventListener("click", (e) => {
      e.stopPropagation();
      modalImg.src = img.src;
      modalImg.alt = img.alt || "Case Study Preview";
      modal.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent scrolling
    });
  });

  // Close modal functions
  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = ""; // Re-enable scrolling
    setTimeout(() => {
      modalImg.src = "";
    }, 300);
  };

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", closeModal);
  
  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

/* ==================== Scroll Reveal Animations ==================== */
function initScrollReveals() {
  const revealElements = document.querySelectorAll(".reveal, .flow-step, .challenge-item, .result-card");
  
  // Reuse same animation class name from main portfolio CSS
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el, index) => {
    // Add base reveal class if not present
    if (!el.classList.contains("reveal")) {
      el.classList.add("reveal");
    }
    
    // Add staggered delay class if inside a grid
    if (el.parentElement && (el.parentElement.classList.contains("grid-2col") || el.parentElement.classList.contains("grid-3col") || el.parentElement.classList.contains("results-grid"))) {
      const children = Array.from(el.parentElement.children);
      const childIndex = children.indexOf(el);
      if (childIndex > 0) {
        el.style.transitionDelay = `${childIndex * 100}ms`;
      }
    }

    observer.observe(el);
  });
}
