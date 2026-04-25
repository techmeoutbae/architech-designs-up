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

const solutionAccordions = document.querySelectorAll("[data-solution-accordion]");
const videoHero = document.querySelector("[data-video-hero]");
const heroVideo = document.querySelector("[data-hero-video]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (videoHero && heroVideo) {
  const markReady = () => videoHero.classList.add("is-video-ready");
  const markFailed = () => videoHero.classList.add("is-video-failed");
  const loadingFallback = window.setTimeout(markFailed, 2200);
  const stopLoadingFallback = () => window.clearTimeout(loadingFallback);
  heroVideo.loop = false;

  if (prefersReducedMotion) {
    heroVideo.removeAttribute("autoplay");
    heroVideo.pause();
    stopLoadingFallback();
    markReady();
  } else {
    heroVideo.addEventListener("loadedmetadata", () => {
      stopLoadingFallback();
      markReady();
    }, { once: true });
    heroVideo.addEventListener("canplay", () => {
      stopLoadingFallback();
      markReady();
    }, { once: true });
    heroVideo.addEventListener("error", () => {
      stopLoadingFallback();
      markFailed();
    }, { once: true });
    heroVideo.addEventListener("ended", () => {
      videoHero.classList.add("is-video-restarting");
      heroVideo.currentTime = 0;
      heroVideo.play().catch(() => {
        videoHero.classList.remove("is-video-restarting");
      });
    });
    heroVideo.addEventListener("playing", () => {
      videoHero.classList.remove("is-video-restarting");
    });

    const playAttempt = heroVideo.play();
    if (playAttempt) {
      playAttempt.catch(() => {
        stopLoadingFallback();
        markReady();
      });
    }
  }
}

solutionAccordions.forEach((accordion) => {
  const boxes = Array.from(accordion.querySelectorAll(".solution-box"));

  const setPanelHeight = (box) => {
    const panel = box.querySelector(".solution-panel");
    if (!panel) return;
    panel.style.maxHeight = box.classList.contains("is-open") ? `${panel.scrollHeight}px` : "0px";
  };

  boxes.forEach((box) => {
    const trigger = box.querySelector(".solution-trigger");
    if (!trigger) return;

    setPanelHeight(box);

    trigger.addEventListener("click", () => {
      const willOpen = !box.classList.contains("is-open");

      boxes.forEach((item) => {
        item.classList.remove("is-open");
        item.querySelector(".solution-trigger")?.setAttribute("aria-expanded", "false");
        setPanelHeight(item);
      });

      if (willOpen) {
        box.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        setPanelHeight(box);
      }
    });
  });

  window.addEventListener("resize", () => {
    boxes.forEach(setPanelHeight);
  }, { passive: true });
});

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
