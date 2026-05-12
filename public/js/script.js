


const defaultConfig = {
      group_name: "Smart Polymeric Biomaterials",
      tagline: "Pioneering Innovation in Science and Technology",
      home_description: "We are dedicated to advancing scientific knowledge through cutting-edge research and collaboration. Our team works on groundbreaking projects that shape the future of technology and innovation.",
      team_intro: "Meet the brilliant minds driving our research forward",
      background_color: "#667eea",
      surface_color: "#ffffff",
      text_color: "#1f2937",
      primary_action_color: "#7c3aed",
      secondary_action_color: "#6366f1",
      font_family: "Inter",
      font_size: 16
    };

    async function onConfigChange(config) {
      const customFont = config.font_family || defaultConfig.font_family;
      const baseFontStack = '-apple-system, BlinkMacSystemFont, sans-serif';
      const fontFamily = `${customFont}, ${baseFontStack}`;
      const baseSize = config.font_size || defaultConfig.font_size;
      
      const backgroundColor = config.background_color || defaultConfig.background_color;
      const surfaceColor = config.surface_color || defaultConfig.surface_color;
      const textColor = config.text_color || defaultConfig.text_color;
      const primaryActionColor = config.primary_action_color || defaultConfig.primary_action_color;
      const secondaryActionColor = config.secondary_action_color || defaultConfig.secondary_action_color;

      document.body.style.fontFamily = fontFamily;
      document.body.style.fontSize = `${baseSize}px`;
      
      const pageWrapper = document.querySelector('.page-wrapper');
      if (pageWrapper) {
        pageWrapper.style.background = `linear-gradient(135deg, ${backgroundColor} 0%, ${primaryActionColor} 100%)`;
      }

      const allText = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, li, label, button, input, textarea');
      allText.forEach(el => {
        el.style.fontFamily = fontFamily;
      });

      document.querySelectorAll('h1').forEach(el => el.style.fontSize = `${baseSize * 2.5}px`);
      document.querySelectorAll('h2').forEach(el => el.style.fontSize = `${baseSize * 2}px`);
      document.querySelectorAll('h3').forEach(el => el.style.fontSize = `${baseSize * 1.5}px`);
      document.querySelectorAll('p, li').forEach(el => el.style.fontSize = `${baseSize}px`);

      document.querySelectorAll('.bg-white, .team-card, .nav-container').forEach(el => {
        el.style.backgroundColor = surfaceColor;
      });

      document.querySelectorAll('h1, h2, h3, .text-gray-800').forEach(el => {
        el.style.color = textColor;
      });

      document.querySelectorAll('button[type="submit"]').forEach(el => {
        el.style.background = `linear-gradient(to right, ${primaryActionColor}, ${secondaryActionColor})`;
      });

      const navGroupName = document.getElementById('nav-group-name');
      const homeGroupName = document.getElementById('home-group-name');
      const homeTagline = document.getElementById('home-tagline');
      const homeDescription = document.getElementById('home-description');
      const teamIntro = document.getElementById('team-intro');

      if (navGroupName) navGroupName.textContent = config.group_name || defaultConfig.group_name;
      if (homeGroupName) homeGroupName.textContent = config.group_name || defaultConfig.group_name;
      if (homeTagline) homeTagline.textContent = config.tagline || defaultConfig.tagline;
      if (homeDescription) homeDescription.textContent = config.home_description || defaultConfig.home_description;
      if (teamIntro) teamIntro.textContent = config.team_intro || defaultConfig.team_intro;
    }

    function mapToCapabilities(config) {
      return {
        recolorables: [
          {
            get: () => config.background_color || defaultConfig.background_color,
            set: (value) => {
              config.background_color = value;
              window.elementSdk.setConfig({ background_color: value });
            }
          },
          {
            get: () => config.surface_color || defaultConfig.surface_color,
            set: (value) => {
              config.surface_color = value;
              window.elementSdk.setConfig({ surface_color: value });
            }
          },
          {
            get: () => config.text_color || defaultConfig.text_color,
            set: (value) => {
              config.text_color = value;
              window.elementSdk.setConfig({ text_color: value });
            }
          },
          {
            get: () => config.primary_action_color || defaultConfig.primary_action_color,
            set: (value) => {
              config.primary_action_color = value;
              window.elementSdk.setConfig({ primary_action_color: value });
            }
          },
          {
            get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
            set: (value) => {
              config.secondary_action_color = value;
              window.elementSdk.setConfig({ secondary_action_color: value });
            }
          }
        ],
        borderables: [],
        fontEditable: {
          get: () => config.font_family || defaultConfig.font_family,
          set: (value) => {
            config.font_family = value;
            window.elementSdk.setConfig({ font_family: value });
          }
        },
        fontSizeable: {
          get: () => config.font_size || defaultConfig.font_size,
          set: (value) => {
            config.font_size = value;
            window.elementSdk.setConfig({ font_size: value });
          }
        }
      };
    }

    function mapToEditPanelValues(config) {
      return new Map([
        ["group_name", config.group_name || defaultConfig.group_name],
        ["tagline", config.tagline || defaultConfig.tagline],
        ["home_description", config.home_description || defaultConfig.home_description],
        ["team_intro", config.team_intro || defaultConfig.team_intro]
      ]);
    }

    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
      });
    }


// highlight active nav link on multipage site
document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------
  // Highlight active nav link
  // ---------------------------
  const currentPage = window.location.pathname.split("/").pop(); // e.g., "team.html"

  document.querySelectorAll("nav a").forEach(link => {
    const linkHref = link.getAttribute("href");
    if (!linkHref) return;

    // Only take the filename for comparison, ignore folders
    const linkPage = linkHref.split("/").pop();

    if (linkPage === currentPage ) {
      link.classList.add("text-orange-600", "font-bold");
      link.classList.remove("text-gray-700");


      
      
      
    } else {
      link.classList.remove("text-orange-600", "font-bold");
      link.classList.add("text-gray-700");
    }
  });
  });




  document.querySelectorAll('#research-dropdown a').forEach(link => {
  if (link.getAttribute('href') === window.location.pathname) {
    link.classList.add('text-orange-600');
  }
});
  // ---------------------------
  // Contact form handling
  // ---------------------------
 



 // Scroll to Top functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    

// robust slider initializer — supports multiple sliders
function initSlider(container) {
  const slides = Array.from(container.querySelectorAll('.slide'));
  const prevBtn = container.querySelector('.slide-prev');
  const nextBtn = container.querySelector('.slide-next');
  const indicators = Array.from(container.querySelectorAll('.indicator'));

  if (!slides.length) return;

  let current = 0;
  let intervalId = null;
  const delay = 4000;

  function show(index) {
  index = ((index % slides.length) + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    const isActive = i === index;

    slide.style.opacity = isActive ? "1" : "0";
    slide.style.pointerEvents = isActive ? "auto" : "none";

    // 🔁 Handle video restart
    const video = slide.querySelector("video");
    if (video) {
      if (isActive) {
        video.currentTime = 0;   // 🔄 restart
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  });

  indicators.forEach((ind, i) =>
    ind.classList.toggle("active", i === index)
  );

  current = index;
}


  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  function startAuto() {
    stopAuto();
    if (slides.length > 1) intervalId = setInterval(next, delay);
  }
  function stopAuto() { if (intervalId) { clearInterval(intervalId); intervalId = null; } }

  if (nextBtn) nextBtn.addEventListener('click', e => { e.preventDefault(); stopAuto(); next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', e => { e.preventDefault(); stopAuto(); prev(); startAuto(); });

  indicators.forEach((ind, idx) => { ind.addEventListener('click', e => { e.preventDefault(); stopAuto(); show(idx); startAuto(); }); });

  show(0);
  startAuto();

  container.addEventListener('mouseenter', stopAuto);
  container.addEventListener('mouseleave', startAuto);
  window.addEventListener('focus', startAuto);
  window.addEventListener('blur', stopAuto);
}

//duble click to open modal


document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("fullscreen-enabled")) return;
 //if (!e.target.tagName || e.target.tagName !== "IMG") return;
  const container = document.createElement("div");
  container.className = "fullscreen-container";

  const fullImg = document.createElement("img");
  fullImg.src = e.target.src;
  fullImg.className = "fullscreen-img";

  const closeBtn = document.createElement("button");
  closeBtn.className = "fullscreen-close";
  closeBtn.innerHTML = "&times;";

  container.appendChild(fullImg);
  container.appendChild(closeBtn);
  document.body.appendChild(container);

  setTimeout(() => {
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    }
  }, 50);

  closeBtn.addEventListener("click", () => {
    document.exitFullscreen();
  });

  function exitHandler() {
    if (!document.fullscreenElement) {
      container.remove();
      document.removeEventListener("fullscreenchange", exitHandler);
    }
  }

  document.addEventListener("fullscreenchange", exitHandler);
});





 //Mobile menu toggle 

  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const next = btn.nextElementSibling;
      if (next) next.classList.toggle("hidden");
    });
  });



  const overviewBtn = document.getElementById("overview-btn");
const overviewMenu = document.getElementById("overview-menu");
let clickTimer = null;

overviewBtn.addEventListener("click", (e) => {
  // Start a timer to detect double click
  if (clickTimer == null) {
    clickTimer = setTimeout(() => {
      // Single click: toggle submenu
      overviewMenu.classList.toggle("hidden");
      clickTimer = null;
    }, 2000); // 250ms delay for double-click
  } 
});

overviewBtn.addEventListener("dblclick", () => {
  // Double click: go to the Overview page
 
  clearTimeout(clickTimer);
  clickTimer = null;
  // ✅ path-safe navigation
  const target = overviewBtn.dataset.href;
  if (target) {
    window.location.href = target;
  }
});
















    




