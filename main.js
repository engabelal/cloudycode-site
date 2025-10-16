(function () {
  const body = document.body;
  const loaderWrapper = document.querySelector(".loader-wrapper");
  const typingCode = document.getElementById("typing-code");
  
  // Typing animation
  const text = "< Loading Cloudycode />";
  let index = 0;
  
  function typeWriter() {
    if (index < text.length) {
      typingCode.textContent = text.substring(0, index + 1);
      index++;
      setTimeout(typeWriter, 80);
    }
  }
  
  // Start typing immediately
  typeWriter();
  
  // Prevent scroll during loading
  body.style.overflow = "hidden";
  window.scrollTo(0, 0);

  window.addEventListener("load", () => {
    body.classList.add("is-ready");
    
    // Hide loader after animation completes
    setTimeout(() => {
      loaderWrapper.classList.add("loaded");
      setTimeout(() => {
        loaderWrapper.style.display = "none";
        body.style.overflow = "";
        window.scrollTo(0, 0);
      }, 800);
    }, 1800);
  });

  // Newsletter form handler
  const newsletterForm = document.getElementById("newsletter-form");
  const newsletterSuccess = document.getElementById("newsletter-success");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const emailInput = document.getElementById("newsletter-email");
      const email = emailInput.value;
      
      // Create mailto link
      const subject = encodeURIComponent("Newsletter Subscription - Cloudycode.dev");
      const body = encodeURIComponent(`New newsletter subscription request:\n\nEmail: ${email}\n\nFrom: Cloudycode.dev website`);
      const mailtoLink = `mailto:eng.abelal@gmail.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success message
      setTimeout(() => {
        newsletterForm.style.display = "none";
        newsletterSuccess.style.display = "flex";
      }, 500);
    });
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

  // Project filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      
      // Filter projects
      projects.forEach(project => {
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
