(function () {
  const body = document.body;

  window.addEventListener("load", () => {
    body.classList.add("is-ready");
  });

  const countdownEl = document.querySelector("[data-countdown]");

  if (countdownEl) {
    const rawDate = (countdownEl.dataset.targetDate || "").trim();
    let targetDate = rawDate ? new Date(rawDate) : null;

    if (!targetDate || Number.isNaN(targetDate.valueOf())) {
      targetDate = new Date();
      targetDate.setMonth(targetDate.getMonth() + 2);
      countdownEl.dataset.targetDate = targetDate.toISOString();
    }

    const refs = {
      days: countdownEl.querySelector("[data-countdown-days]"),
      hours: countdownEl.querySelector("[data-countdown-hours]"),
      minutes: countdownEl.querySelector("[data-countdown-minutes]"),
      seconds: countdownEl.querySelector("[data-countdown-seconds]"),
    };

    const format = (value) => String(value).padStart(2, "0");

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        Object.values(refs).forEach((node) => {
          if (node) node.textContent = "00";
        });
        countdownEl.classList.add("countdown--completed");
        clearInterval(timer);
        return;
      }

      const totalSeconds = Math.floor(difference / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      if (refs.days) refs.days.textContent = format(days);
      if (refs.hours) refs.hours.textContent = format(hours);
      if (refs.minutes) refs.minutes.textContent = format(minutes);
      if (refs.seconds) refs.seconds.textContent = format(seconds);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("[data-animate]").forEach((section) => {
      observer.observe(section);
    });
  } else {
    document.querySelectorAll("[data-animate]").forEach((section) => {
      section.classList.add("is-visible");
    });
  }

  const yearNode = document.querySelector("[data-year]");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const header = document.querySelector(".header");
  const scrollProgress = document.querySelector(".scroll-progress");
  const backToTop = document.querySelector(".back-to-top");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    
    // Header scroll effect
    if (currentScroll > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    
    // Scroll progress bar
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (currentScroll / windowHeight) * 100;
    scrollProgress.style.width = scrolled + "%";
    
    // Back to top button
    if (currentScroll > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
    
    lastScroll = currentScroll;
  });

  // Back to top click handler
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Add parallax effect to orbs
  const orbs = document.querySelectorAll(".orb");
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    orbs.forEach((orb, index) => {
      const speed = 0.5 + (index * 0.2);
      orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Add hover effect to project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach(card => {
    card.addEventListener("mouseenter", function() {
      this.style.zIndex = "10";
    });
    card.addEventListener("mouseleave", function() {
      this.style.zIndex = "1";
    });
  });
})();
