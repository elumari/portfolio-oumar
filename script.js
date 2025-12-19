// Défilement fluide
document.querySelectorAll('.main-nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    }
  });
});

// Animation d'apparition
const revealElements = document.querySelectorAll(".reveal");
const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.85;
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.classList.add("visible");
  });
};
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Bouton retour haut
const backToTopBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTopBtn.style.display = window.scrollY > 400 ? "flex" : "none";
});
backToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Menu mobile
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuBtn.textContent = nav.classList.contains("open") ? "✖" : "☰";
});
document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
      menuBtn.textContent = "☰";
    }
  });
});

// Année automatique
document.getElementById("year").textContent = new Date().getFullYear();

// Formspree - message de succès
const form = document.querySelector(".contact-form");
form.addEventListener("submit", async e => {
  e.preventDefault();
  const data = new FormData(form);
  const res = await fetch(form.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  });
  if (res.ok) {
    alert("✅ Merci, ton message a bien été envoyé !");
    form.reset();
  } else {
    alert("⚠️ Erreur : le message n’a pas pu être envoyé.");
  }
});
