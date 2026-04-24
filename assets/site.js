const header = document.querySelector("[data-header]");
const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav-menu");
document.documentElement.classList.add("js-ready");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const onScroll = () => {
  if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const revealItems = document.querySelectorAll(".reveal");
const showIfInView = (item) => {
  const rect = item.getBoundingClientRect();
  if (rect.top < window.innerHeight * 1.05) item.classList.add("is-visible");
};
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => {
  showIfInView(item);
  observer.observe(item);
});
