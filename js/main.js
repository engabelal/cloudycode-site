(function () {
  const html = document.documentElement;
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");

  

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = html.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      html.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }
  
  const loaderWrapper = document.querySelector(".loader-wrapper");

  body.style.overflow = "hidden";
  window.scrollTo(0, 0);

  window.addEventListener("load", () => {
    body.classList.add("is-ready");

    setTimeout(() => {
      loaderWrapper.classList.add("loaded");
      setTimeout(() => {
        loaderWrapper.style.display = "none";
        body.style.overflow = "";
        window.scrollTo(0, 0);
      }, 800);
    }, 1500);
  });

  // Enhanced project cards with performance optimization
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    // Add GPU acceleration
    card.classList.add("gpu-accelerated");

    // Staggered animation delay
    card.style.animationDelay = `${index * 100}ms`;

    card.addEventListener("click", (e) => {
      if (!e.target.closest("a")) {
        const link = card.querySelector(".project-card__link");
        if (link && link.closest("a")) {
          // Add click animation
          card.style.transform = "scale(0.98)";
          setTimeout(() => {
            card.style.transform = "";
            link.closest("a").click();
          }, 150);
        }
      }
    });

    // Optimized hover effects
    let hoverTimeout;
    card.addEventListener("mouseenter", function () {
      clearTimeout(hoverTimeout);
      this.style.zIndex = "10";
      this.style.willChange = "transform";
    });

    card.addEventListener("mouseleave", function () {
      hoverTimeout = setTimeout(() => {
        this.style.zIndex = "1";
        this.style.willChange = "auto";
      }, 300);
    });
  });

  // Tech stack links
  const techLinks = {
    AWS: "https://aws.amazon.com",
    Azure: "https://azure.microsoft.com",
    Terraform: "https://www.terraform.io",
    Packer: "https://www.packer.io",
    Ansible: "https://www.ansible.com",
    Docker: "https://www.docker.com",
    Kubernetes: "https://kubernetes.io",
    "GitHub Actions": "https://github.com/features/actions",
    Jenkins: "https://www.jenkins.io",
    Bash: "https://www.gnu.org/software/bash/",
    Python: "https://www.python.org",
    Linux: "https://www.linux.org",
    Git: "https://git-scm.com",
  };

  document.querySelectorAll(".skill-card").forEach((card) => {
    const techName = card.querySelector("h3").textContent;
    const url = techLinks[techName];

    if (url) {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        window.open(url, "_blank", "noopener,noreferrer");
      });
    }
  });

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
      { threshold: 0.1, rootMargin: "50px" }
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
  const betaBadge = document.querySelector(".beta-badge-fixed");
  let lastScroll = 0;

  // Optimized scroll handler with RAF
  let ticking = false;

  const updateScrollEffects = () => {
    const currentScroll = window.pageYOffset;

    // Header effects
    if (currentScroll > 100) {
      header.classList.add("scrolled");
      if (betaBadge && window.innerWidth <= 768) {
        betaBadge.classList.add("hidden");
      }
    } else {
      header.classList.remove("scrolled");
      if (betaBadge) {
        betaBadge.classList.remove("hidden");
      }
    }

    // Progress bar with transform for better performance
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (currentScroll / windowHeight) * 100;
    scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
    scrollProgress.style.transformOrigin = "left";

    // Back to top button
    if (currentScroll > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }

    lastScroll = currentScroll;
    ticking = false;
  };

  const requestScrollUpdate = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  };

  window.addEventListener("scroll", requestScrollUpdate, { passive: true });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  const orbs = document.querySelectorAll(".orb");
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    orbs.forEach((orb, index) => {
      const speed = 0.5 + index * 0.2;
      orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Project filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      projects.forEach((project) => {
        const category = project.dataset.category;

        if (filter === "all" || category === filter) {
          project.classList.remove("hidden");
          project.classList.add("show");
        } else {
          project.classList.add("hidden");
          project.classList.remove("show");
        }
      });
    });
  });
})();

// Hero Typing Animation
(function() {
  const statusData = [
    { symbol: "✽", message: "Doodling..." },
    { symbol: "◐", message: "Thinking..." },
    { symbol: "◑", message: "Processing..." },
    { symbol: "◒", message: "Computing..." },
    { symbol: "◓", message: "Analyzing..." },
    { symbol: "●", message: "Synthesizing..." },
    { symbol: "◯", message: "Optimizing..." },
    { symbol: "◈", message: "Debugging..." },
    { symbol: "◇", message: "Refactoring..." },
    { symbol: "◆", message: "Compiling..." },
    { symbol: "▲", message: "Iterating..." },
    { symbol: "▼", message: "Innovating..." }
  ];
  
  const words = [
    "Chaos into Automation",
    "Ideas into Infrastructure",
    "Code into Production",
    "Manual into Automated",
    "Complexity into Simplicity",
    "Problems into Solutions",
    "Downtime into Uptime",
    "Costs into Savings"
  ];
  
  const statusSymbol = document.getElementById('hero-status-symbol');
  const statusText = document.getElementById('hero-status-text');
  const typedWord = document.getElementById('hero-typed-word');
  
  if (statusSymbol && statusText && typedWord) {
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let statusIndex = 0;
    
    typedWord.innerHTML = '&nbsp;';
    
    function typeWriter() {
      const currentWord = words[currentWordIndex];
      
      if (!isDeleting) {
        if (currentCharIndex < currentWord.length) {
          typedWord.innerHTML = currentWord.substring(0, currentCharIndex + 1) || '&nbsp;';
          currentCharIndex++;
          setTimeout(typeWriter, 80);
        } else {
          setTimeout(() => {
            isDeleting = true;
            typeWriter();
          }, 2500);
        }
      } else {
        if (currentCharIndex > 0) {
          typedWord.innerHTML = currentWord.substring(0, currentCharIndex - 1) || '&nbsp;';
          currentCharIndex--;
          setTimeout(typeWriter, 40);
        } else {
          isDeleting = false;
          currentWordIndex = (currentWordIndex + 1) % words.length;
          statusIndex = (statusIndex + 1) % statusData.length;
          statusSymbol.textContent = statusData[statusIndex].symbol;
          statusText.textContent = statusData[statusIndex].message;
          setTimeout(typeWriter, 500);
        }
      }
    }
    
    setTimeout(typeWriter, 1000);
  }
})();
