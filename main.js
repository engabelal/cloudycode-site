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
  
  typeWriter();
  
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
    }, 1800);
  });

  // Make project cards clickable
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach(card => {
    card.addEventListener("click", (e) => {
      if (!e.target.closest("a")) {
        const link = card.querySelector(".project-card__link");
        if (link && link.closest("a")) {
          link.closest("a").click();
        }
      }
    });
    
    card.addEventListener("mouseenter", function() {
      this.style.zIndex = "10";
    });
    card.addEventListener("mouseleave", function() {
      this.style.zIndex = "1";
    });
  });

  // Tech stack links
  const techLinks = {
    "AWS": "https://aws.amazon.com",
    "Azure": "https://azure.microsoft.com",
    "Terraform": "https://www.terraform.io",
    "Packer": "https://www.packer.io",
    "Ansible": "https://www.ansible.com",
    "Docker": "https://www.docker.com",
    "Kubernetes": "https://kubernetes.io",
    "GitHub Actions": "https://github.com/features/actions",
    "Jenkins": "https://www.jenkins.io",
    "Bash": "https://www.gnu.org/software/bash/",
    "Python": "https://www.python.org",
    "Linux": "https://www.linux.org",
    "Git": "https://git-scm.com"
  };

  document.querySelectorAll(".skill-card").forEach(card => {
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
  const betaBadge = document.querySelector(".beta-badge-fixed");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    
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
    
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (currentScroll / windowHeight) * 100;
    scrollProgress.style.width = scrolled + "%";
    
    if (currentScroll > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
    
    lastScroll = currentScroll;
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  const orbs = document.querySelectorAll(".orb");
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    orbs.forEach((orb, index) => {
      const speed = 0.5 + (index * 0.2);
      orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Project filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      
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

  // Terminal typing animation
  const heroTerminal = document.getElementById("hero-terminal");
  const terminalCmd = document.getElementById("terminal-cmd");
  const terminalOutput = document.getElementById("terminal-output");
  const cursor = document.getElementById("cursor");
  
  if (heroTerminal && terminalCmd && terminalOutput) {
    const command = "./deploy.sh --env production";
    const outputs = [
      { text: '[INFO] Starting deployment pipeline...', delay: 300 },
      { text: '<span class="hero__check">✓</span> Building Docker image... <span class="hero__time">2.3s</span>', delay: 800, class: 'output-success' },
      { text: '<span class="hero__check">✓</span> Pushing to registry... <span class="hero__time">1.8s</span>', delay: 700, class: 'output-success' },
      { text: '<span class="hero__check">✓</span> Deploying to K8s cluster... <span class="hero__time">3.1s</span>', delay: 800, class: 'output-success' },
      { text: '<span class="hero__rocket">🚀</span> Deployment successful! <span class="hero__url">https://app.prod.io</span>', delay: 600, class: 'output-complete' }
    ];
    
    let charIndex = 0;
    
    function resetTerminal() {
      terminalCmd.textContent = "";
      terminalOutput.innerHTML = "";
      terminalOutput.style.display = "none";
      if (cursor) cursor.style.display = "inline";
      charIndex = 0;
    }
    
    function typeCommand() {
      if (charIndex < command.length) {
        terminalCmd.textContent = command.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeCommand, 50);
      } else {
        setTimeout(() => {
          if (cursor) cursor.style.display = "none";
          showOutputs();
        }, 200);
      }
    }
    
    function showOutputs() {
      terminalOutput.style.display = "flex";
      let currentDelay = 0;
      
      outputs.forEach((output, index) => {
        currentDelay += output.delay;
        setTimeout(() => {
          const line = document.createElement('div');
          line.className = 'output-line' + (output.class ? ' ' + output.class : '');
          line.innerHTML = output.text;
          terminalOutput.appendChild(line);
          
          // Restart after last output
          if (index === outputs.length - 1) {
            setTimeout(() => {
              resetTerminal();
              startAnimation();
            }, 3000);
          }
        }, currentDelay);
      });
    }
    
    function startAnimation() {
      setTimeout(typeCommand, 600);
    }
    
    // Show terminal first, then start typing
    setTimeout(() => {
      heroTerminal.classList.add('show');
      startAnimation();
    }, 300);
  }
})();
