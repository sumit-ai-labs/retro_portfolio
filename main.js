document.addEventListener("DOMContentLoaded", () => {
  // Loader
  const loader = document.getElementById("loader");
  const loaderFill = document.getElementById("loaderFill");
  let loadProgress = 0;
  
  const loadInterval = setInterval(() => {
    loadProgress += Math.random() * 20;
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(loadInterval);
      if (loaderFill) loaderFill.style.width = "100%";
      setTimeout(() => {
        if (loader) loader.classList.add("is-hidden");
        document.body.classList.remove("is-loading");
      }, 500);
    } else {
      if (loaderFill) loaderFill.style.width = `${loadProgress}%`;
    }
  }, 100);

  // Scroll Progress
  const scrollProgress = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgress) scrollProgress.style.width = `${scrolled}%`;
  }, { passive: true });

  // Reveals & Skills Observers
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (entry.target.classList.contains('skill-bars')) {
          document.querySelectorAll('.skill-fill').forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal-up, .skill-bars').forEach(el => observer.observe(el));

  // Magnetic Cursor
  const cursor = document.getElementById("cursor");
  const cursorLabel = document.getElementById("cursorLabel");
  
  if (window.matchMedia("(hover: hover)").matches) {
    let mouseX = -100, mouseY = -100;
    let cursorX = -100, cursorY = -100;
    let isVisible = false;
    
    if (cursor) cursor.style.opacity = '0';

    window.addEventListener("mousemove", (e) => {
      if (!isVisible && cursor) {
        cursor.style.opacity = '1';
        isVisible = true;
      }
      mouseX = e.clientX; mouseY = e.clientY;
    });

    const loop = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      if (cursor) cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
      if (cursorLabel) cursorLabel.style.transform = `translate(${cursorX + 16}px, ${cursorY + 16}px)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    document.querySelectorAll('.mag-target').forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (cursor) cursor.classList.add("is-active");
        if (cursorLabel) cursorLabel.classList.add("is-active");
      });
      el.addEventListener('mouseleave', () => {
        if (cursor) cursor.classList.remove("is-active");
        if (cursorLabel) cursorLabel.classList.remove("is-active");
      });
    });
  }

  // Dialog Content
  const projectData = {
    "policy-ai": {
      role: "Lead Engineer",
      tools: "Next.js, Tailwind CSS, Python, FastAPI, Spacy, RAG",
      year: "2026",
      outcome: "Clear actionable verdict",
      hook: "Understand Any Insurance Policy in Seconds.",
      body: [
        "Stop drowning in legal jargon. PolicyAI instantly extracts hidden risks, exclusions, and gives you a clear, actionable verdict on any insurance document.",
        `<a href="https://github.com/sumit-ai-labs/policy-lens" target="_blank" rel="noopener noreferrer" style="color: var(--red); text-decoration: underline; display: inline-block; margin-top: 10px;">View Repository on GitHub →</a>`
      ]
    },
    policyai: {
      role: "Lead Engineer",
      tools: "Next.js, Python, Vector DB",
      year: "2024",
      outcome: "Processed 10,000+ policies",
      hook: "Decoding Insurance Complexity With AI.",
      body: [
        "Insurance documents are explicitly designed to confuse. This project began as an attempt to translate legal density into human readability using generative models.",
        "By orchestrating a robust RAG pipeline and a clean, responsive frontend, PolicyAI breaks down dense contracts—extracting risks, exclusions, and financial insights into something actually understandable."
      ]
    },
    ledger: {
      role: "Full Stack Architect",
      tools: "React, Node.js, Postgres",
      year: "2024",
      outcome: "Zero downtime deployment",
      hook: "A high-performance financial tool escaping SaaS sameness.",
      body: [
        "The challenge was building a financial tool that didn't feel like a spreadsheet. We developed a robust backend architecture paired with a calm, information-dense interface.",
        "The resulting platform processes complex transactions smoothly while maintaining an editorial pacing, proving that heavy data can still be presented with elegance."
      ]
    },
    model: {
      role: "ML Engineer",
      tools: "PyTorch, Python",
      year: "2023",
      outcome: "Improved prediction accuracy by 14%",
      hook: "Training neural networks to find patterns in noise.",
      body: [
        "This project treated data streams like an editorial archive, sorting the essential signal from the irrelevant noise using advanced predictive modeling.",
        "We achieved significant accuracy improvements by treating the data structuring phase with the same rigor as the final interface layer."
      ]
    }
  };

  const dialog = document.getElementById('projectDialog');
  const dialogClose = document.getElementById('dialogClose');
  
  if (dialog) {
    document.querySelectorAll('.story-card').forEach(card => {
      card.addEventListener('click', () => {
        const titleEl = document.getElementById('dialogTitle');
        const h3 = card.querySelector('h3');
        if (titleEl && h3) titleEl.textContent = h3.textContent;
        
        const projectId = card.dataset.project;
        const data = projectData[projectId];
        if (data) {
          document.getElementById('dialogRole').textContent = data.role;
          document.getElementById('dialogTools').textContent = data.tools;
          document.getElementById('dialogYear').textContent = data.year;
          document.getElementById('dialogOutcome').textContent = data.outcome;
          document.getElementById('dialogHook').textContent = data.hook;
          document.getElementById('dialogBody').innerHTML = data.body.map(p => `<p>${p}</p>`).join("");
        }

        dialog.showModal();
        document.body.style.overflow = "hidden";
      });
    });
    
    if (dialogClose) {
        dialogClose.addEventListener('click', () => {
            dialog.close();
            document.body.style.overflow = "";
        });
    }
    
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
          dialog.close();
          document.body.style.overflow = "";
      }
    });
  }

  // 1. Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('is-dark');
      if (document.body.classList.contains('is-dark')) {
        themeToggle.textContent = 'Morning Edition';
      } else {
        themeToggle.textContent = 'Evening Edition';
      }
    });
  }

  // 2. Headline Micro Animation
  const headline = document.querySelector('.masthead h1');
  if (headline) {
    const text = headline.textContent;
    headline.innerHTML = '';
    headline.style.opacity = '1';
    headline.style.transform = 'none';
    headline.style.filter = 'none';
    headline.classList.remove('reveal-up');
    
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      if (char === ' ') {
        span.style.width = '0.25em';
        span.style.display = 'inline-block';
      } else {
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = `opacity 0.4s ease ${i * 30}ms, transform 0.4s ease ${i * 30}ms`;
      }
      headline.appendChild(span);
    });

    setTimeout(() => {
      headline.querySelectorAll('span').forEach(span => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      });
    }, 100);
  }

  // 3. Subtle Parallax Depth
  let parallaxTicking = false;
  window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
      window.requestAnimationFrame(() => {
        if (window.innerWidth > 760) {
          document.querySelectorAll('.plate-img, .story-img').forEach(img => {
            img.style.transform = ''; // clear buggy translateY
            const rect = img.getBoundingClientRect();
            const yOffset = (window.innerHeight - rect.top) * 0.05;
            img.style.backgroundPositionY = `calc(50% + ${yOffset}px)`;
          });
        } else {
          document.querySelectorAll('.plate-img, .story-img').forEach(img => {
            img.style.transform = '';
            img.style.backgroundPositionY = '';
          });
        }
        parallaxTicking = false;
      });
      parallaxTicking = true;
    }
  }, { passive: true });

  // Active section tracking
  const sideLinks = document.querySelectorAll('.side-link');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sideLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').substring(1) === entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.sheet').forEach(sheet => {
    sectionObserver.observe(sheet);
  });
  
  // Konami Code Easter Egg
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        const toast = document.getElementById('konamiToast');
        if (toast) {
          toast.classList.add('is-visible');
          toast.setAttribute('aria-hidden', 'false');
          setTimeout(() => {
              toast.classList.remove('is-visible');
              toast.setAttribute('aria-hidden', 'true');
          }, 4000);
        }
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

});
