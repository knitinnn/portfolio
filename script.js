/* ==================== Force page reload at Home ==================== */

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.addEventListener("load", () => {
  window.scrollTo({
    top: 0,
    behavior: "instant",
  });
});

/* ==================== Mobile Menu Toggle ==================== */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// ==================== Smooth Scroll for Links & Logo ==================== 

const navItems = document.querySelectorAll(".nav-link");
const logo = document.querySelector(".logo");

function smoothScroll(targetId) {
  const section = document.querySelector(targetId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop - 70,
      behavior: "smooth",
    });
  }
}

navItems.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    smoothScroll(targetId);

    navItems.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");

    navLinks.classList.remove("show");
  });
});

logo.addEventListener("click", (e) => {
  e.preventDefault();
  smoothScroll("#home");
  navLinks.classList.remove("show");
});

/* ==================== Scroll Spy ==================== */
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
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

  const backToTop = document.getElementById("back-to-top");
  backToTop.style.display = scrollY > 300 ? "flex" : "none";
});

/* ==================== Back to Top Button ==================== */
document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ==================== Changing Role Text Animation ==================== */
const roles = [
  { text: "Full Stack", color: "#3b82f6", font: "'Poppins', sans-serif" },
  { text: "Frontend", color: "#10b981", font: "'Montserrat', sans-serif" },
  { text: "Web", color: "#f59e0b", font: "'Roboto Slab', serif" },
];

let index = 0;
const textEl = document.getElementById("changing-role");

setInterval(() => {
  index = (index + 1) % roles.length;
  const { text, color, font } = roles[index];

  textEl.style.opacity = 0;
  setTimeout(() => {
    textEl.textContent = text;
    textEl.style.color = color;
    textEl.style.fontFamily = font;
    textEl.style.opacity = 1;
  }, 300);
}, 2000);

/* ==================== Section Scroll Reveal Animations ==================== */
document.addEventListener("DOMContentLoaded", () => {
  const revealSections = document.querySelectorAll(
    ".skills-section, .projects-section"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.2 }
  );

  revealSections.forEach((section) => observer.observe(section));
});

/* ==================== Contact Form Validation & Popup ==================== */

document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;
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

  if (!valid) {
    return;
  }

  const sendBtn = document.getElementById("sendBtn");
  sendBtn.classList.add("loading");

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
    });

    if (response.ok) {
     
      document.getElementById("successPopup").style.display = "block";
      form.reset();
    } else {
      alert("Something went wrong. Please try again later.");
    }
  } catch (error) {
    alert("Error sending message. Please check your connection.");
  } finally {
    sendBtn.classList.remove("loading");
  }
});


document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("successPopup").style.display = "none";
  window.location.href = "/"; // Change this to your homepage route if needed
});


(function(){
  function logW(){ console.log('viewport width:', window.innerWidth); }
  window.addEventListener('load', logW);
  window.addEventListener('resize', logW);
})();

