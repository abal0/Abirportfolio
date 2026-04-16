document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1. PREMIUM FEATURE: CUSTOM GLOWING CURSOR 
     (Mobile Responsive - Only loads on devices with a mouse)
  ========================================================= */
  if (window.matchMedia("(pointer: fine)").matches) {
    const cursor = document.createElement("div");
    cursor.style.width = "20px";
    cursor.style.height = "20px";
    cursor.style.border = "2px solid #ff7a2f";
    cursor.style.borderRadius = "50%";
    cursor.style.position = "fixed";
    cursor.style.pointerEvents = "none";
    cursor.style.zIndex = "9999";
    cursor.style.transform = "translate(-50%, -50%)";
    cursor.style.transition = "width 0.2s, height 0.2s, background-color 0.2s";
    cursor.style.boxShadow = "0 0 15px rgba(255,122,47,0.5)";
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    // Make cursor expand when hovering over clickable items
    const clickables = document.querySelectorAll("a, button, .filter-btn, .nav__dropbtn");
    clickables.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.width = "40px";
        cursor.style.height = "40px";
        cursor.style.backgroundColor = "rgba(255,122,47,0.1)";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.width = "20px";
        cursor.style.height = "20px";
        cursor.style.backgroundColor = "transparent";
      });
    });
  }

  /* =========================================================
     2. PREMIUM FEATURE: MOUSE PARALLAX ON BLOBS
     (Mobile Responsive - Only loads on desktop for performance)
  ========================================================= */
  if (window.matchMedia("(pointer: fine)").matches) {
    const blobs = document.querySelectorAll(".blob");
    document.addEventListener("mousemove", (e) => {
      const x = (window.innerWidth - e.pageX * 2) / 90;
      const y = (window.innerHeight - e.pageY * 2) / 90;
      
      blobs.forEach((blob, index) => {
        const speed = index + 1; // Different speed for each blob
        blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });
  }

  /* =========================================================
     3. MOBILE NAVIGATION MENU
  ========================================================= */
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  const dropBtn = document.querySelector(".nav__dropbtn");
  const dropdown = document.querySelector(".nav__dropdown");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("is-open");
    });
  }

  // Mobile dropdown toggle fix
  if (dropdown && dropBtn) {
    dropBtn.addEventListener("click", (e) => {
      if (window.innerWidth <= 860) {
        e.preventDefault();
        dropdown.classList.toggle("is-open");
      }
    });
  }

  /* =========================================================
     4. SCROLL REVEAL ANIMATIONS
     (Fades elements in smoothly as you scroll down)
  ========================================================= */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, { 
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* =========================================================
     5. SKILLS PROGRESS BAR ANIMATION
  ========================================================= */
  const skills = document.querySelectorAll(".progress span");
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillName = entry.target.parentElement.previousElementSibling.innerText;
        // Set widths based on the skill name
        if (skillName.includes("Premiere")) entry.target.style.width = "90%";
        else if (skillName.includes("After Effects")) entry.target.style.width = "85%";
        else if (skillName.includes("Photoshop")) entry.target.style.width = "80%";
        else if (skillName.includes("CapCut")) entry.target.style.width = "75%";
      }
    });
  }, { threshold: 0.5 });

  skills.forEach(skill => {
    skill.style.width = "0"; // Start at 0
    skill.style.transition = "width 1.5s cubic-bezier(0.25, 1, 0.5, 1)";
    skillObserver.observe(skill);
  });

  /* =========================================================
     6. SMOOTH PROJECTS FILTER
  ========================================================= */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  // Default to Video on load
  const defaultFilter = "video";
  projectCards.forEach(card => {
    if(card.dataset.cat !== defaultFilter) card.classList.add("is-hidden");
  });

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Manage active button state
      filterButtons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const isMatch = card.dataset.cat === filter;
        
        if (isMatch) {
          card.classList.remove("is-hidden");
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50); 
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.9)";
          setTimeout(() => {
            card.classList.add("is-hidden");
          }, 300); // Wait for fade out to finish before hiding
        }
      });
    });
  });

  /* =========================================================
     7. SERVICES SLIDER NAVIGATION
  ========================================================= */
  const track = document.getElementById("servicesTrack");
  const prevBtn = document.querySelector(".nav-btn.prev");
  const nextBtn = document.querySelector(".nav-btn.next");

  if (track && prevBtn && nextBtn) {
    const scrollAmount = 350; // Distance to scroll per click

    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  /* =========================================================
     8. DYNAMIC COPYRIGHT YEAR
  ========================================================= */
  const footerYearElement = document.querySelector(".footer-bottom p");
  if (footerYearElement) {
    const currentYear = new Date().getFullYear();
    // Replaces just the year portion, keeping the rest of your text intact
    footerYearElement.innerHTML = `© ${currentYear} Abirhasan. All Rights Reserved.`;
  }

  /* =========================================================
     9. SMART HIDDEN HEADER (Works across the entire page)
  ========================================================= */
  const header = document.querySelector(".header");
  let lastScrollY = window.scrollY;

  if (header) {
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      
      // If scrolling down AND past the first 100px of the site
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add("header--hidden");
      } 
      // If scrolling up
      else {
        header.classList.remove("header--hidden");
      }
      
      // Update last scroll position (prevents mobile "bounce" bugs)
      lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY; 
    }, { passive: true }); // "passive: true" makes the scroll detection much faster
  }

});
