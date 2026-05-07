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



    "spotify-clone": {
      role: "Full Stack Engineer",
      tools: "React, Node.js, Express, MongoDB, Spotify Web API",
      year: "2025",
      outcome: "Full auth + real-time playback",
      hook: "A pixel-perfect music streaming platform, engineered from the ground up.",
      body: [
        "Most clones stop at the interface. This one didn't. Built with a full backend stack — Node.js, Express, and MongoDB — wired to the Spotify Web API for real authentication, live track streaming, and dynamic playlist management.",
        "The result is a feature-complete streaming experience: OAuth login, a search engine across millions of tracks, a persistent player bar, artist deep-dives, and a discovery feed powered by the Spotify recommendation engine. Every interaction was treated as a first-class engineering problem.",
        `<a href="https://github.com/sumit-ai-labs/spotify-clone" target="_blank" rel="noopener noreferrer" style="color: var(--red); text-decoration: underline; display: inline-block; margin-top: 10px;">View Repository on GitHub →</a>`
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
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
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

  // Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('nameInput').value.trim();
      const email = document.getElementById('emailInput').value.trim();
      const message = document.getElementById('msgInput').value.trim();
      const submitBtn = document.getElementById('submitBtn');
      
      if (!name || !email || !message) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Incomplete Fields';
        submitBtn.style.color = 'var(--red)';
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.color = '';
        }, 2000);
        return;
      }

      // Visual feedback
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Transmitting...';
      submitBtn.style.opacity = '0.7';
      submitBtn.disabled = true;

      // Direct Sending via Web3Forms API
      // To make this work: Go to https://web3forms.com/, enter your email to get a free Access Key, and paste it below.
      const accessKey = "424d4d1d-b4b7-4248-b938-683800836dcc"; 

      if (accessKey === "YOUR_ACCESS_KEY_HERE") {
          alert("System Note: To enable direct sending, please get a free access key from web3forms.com and paste it into main.js (Line 315).");
          submitBtn.textContent = originalText;
          submitBtn.style.opacity = '1';
          submitBtn.disabled = false;
          return;
      }

      fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              access_key: accessKey,
              name: name,
              email: email,
              message: message,
              subject: `Portfolio Inquiry from ${name}`
          })
      })
      .then(async (response) => {
          if (response.status === 200) {
              // Success state
              submitBtn.textContent = 'Message Dispatched';
              submitBtn.style.color = 'var(--red)';
              submitBtn.style.borderColor = 'var(--red)';
              submitBtn.style.opacity = '1';
              
              // Reset form
              setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.color = '';
                submitBtn.style.borderColor = '';
                submitBtn.disabled = false;
                contactForm.reset();
              }, 3500);
          } else {
              throw new Error("Transmission failed");
          }
      })
      .catch((error) => {
          submitBtn.textContent = 'Error Sending';
          submitBtn.style.color = 'var(--red)';
          setTimeout(() => {
              submitBtn.textContent = originalText;
              submitBtn.style.color = '';
              submitBtn.style.opacity = '1';
              submitBtn.disabled = false;
          }, 3000);
      });
    });
  }

});
