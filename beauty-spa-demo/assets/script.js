document.documentElement.classList.add("js-ready");

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".reveal").forEach((item) => {
  const reveal = () => item.classList.add("is-visible");
  if (item.getBoundingClientRect().top < window.innerHeight) reveal();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

const chips = document.querySelectorAll("[data-filter]");
const services = document.querySelectorAll("[data-category]");
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((item) => item.classList.remove("is-active"));
    chip.classList.add("is-active");
    const filter = chip.dataset.filter;
    services.forEach((service) => {
      service.hidden = filter !== "all" && service.dataset.category !== filter;
    });
  });
});

const amounts = document.querySelectorAll(".amount-card");
amounts.forEach((amount) => {
  amount.addEventListener("click", () => {
    amounts.forEach((item) => item.classList.remove("is-active"));
    amount.classList.add("is-active");
  });
});

const bookingSteps = document.querySelectorAll(".booking-step");
const stepItems = document.querySelectorAll(".step");
let stepIndex = 0;

const showStep = (index) => {
  bookingSteps.forEach((step, i) => step.classList.toggle("is-active", i === index));
  stepItems.forEach((step, i) => step.classList.toggle("is-active", i === index));
};

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => {
    stepIndex = Math.min(stepIndex + 1, bookingSteps.length - 1);
    showStep(stepIndex);
  });
});

document.querySelectorAll("[data-prev]").forEach((button) => {
  button.addEventListener("click", () => {
    stepIndex = Math.max(stepIndex - 1, 0);
    showStep(stepIndex);
  });
});

document.querySelectorAll(".tab-btn").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((item) => item.classList.remove("is-active"));
    document.querySelectorAll("[data-tab-panel]").forEach((panel) => panel.hidden = true);
    tab.classList.add("is-active");
    document.querySelector(`[data-tab-panel="${tab.dataset.tab}"]`).hidden = false;
  });
});
