document.addEventListener("DOMContentLoaded", () => {
    // Create blur overlay
    const blurOverlay = document.createElement("div")
    blurOverlay.className = "blur-overlay"
    document.body.appendChild(blurOverlay)

    const sections = {
        about: document.querySelector(".about-me"),
        projects: document.querySelector(".projects"),
        achievements: document.querySelector(".achievements"),
        skills: document.querySelector(".skills-section"),
        contact: document.querySelector(".contact-section"),
    }

    const navItems = document.querySelectorAll(".navbar .nav-item")

    // Add CSS for transitions
    const style = document.createElement("style")
    style.innerHTML = `
          .blur-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(25, 25, 25, 0.95);
              backdrop-filter: blur(20px);
              -webkit-backdrop-filter: blur(20px);
              z-index: 9999;
              transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
          }
  
          .blur-overlay.fade-out {
              opacity: 0;
              backdrop-filter: blur(0px);
              -webkit-backdrop-filter: blur(0px);
              pointer-events: none;
          }
  
          .container {
              opacity: 0;
              transform: translateY(20px);
              transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
          }
  
          .container.loaded {
              opacity: 1;
              transform: translateY(0);
          }
  
          .section {
              transition: all 0.5s ease-in-out;
              opacity: 0;
              transform: translateY(20px);
              display: none;
          }
  
          .section-active {
              display: block !important;
              opacity: 1;
              transform: translateY(0);
          }
  
          .section-inactive {
              display: none !important;
          }
  
          .navbar .nav-item {
              transition: all 0.3s ease;
          }
  
          .navbar .nav-item.active {
              color: var(--accent-primary);
              transform: scale(1.1);
          }
      `
    document.head.appendChild(style)

    // Function to show a section with clean transition
    function showSection(sectionKey) {
        // First, fade out current section
        const currentSection = document.querySelector(".section-active")
        if (currentSection) {
            currentSection.style.opacity = "0"
            currentSection.style.transform = "translateY(20px)"
        }

        // After short delay, switch sections
        setTimeout(() => {
            Object.entries(sections).forEach(([key, section]) => {
                if (section) {
                    if (key === sectionKey) {
                        section.classList.remove("section-inactive")
                        section.classList.add("section-active")
                        // Trigger reflow
                        section.offsetHeight
                        section.style.opacity = "1"
                        section.style.transform = "translateY(0)"
                    } else {
                        section.classList.remove("section-active")
                        section.classList.add("section-inactive")
                    }
                }
            })

            // Save active section to local storage
            saveActiveSection(sectionKey)

            // Update active state for nav items
            navItems.forEach((item) => {
                if (item.getAttribute("data-hover").toLowerCase() === sectionKey) {
                    item.classList.add("active")
                } else {
                    item.classList.remove("active")
                }
            })
        }, 300) // Matches the transition time
    }

    function saveActiveSection(sectionKey) {
        localStorage.setItem("activeSection", sectionKey)
    }

    // Initial setup
    const savedSection = localStorage.getItem("activeSection") || "about"
    showSection(savedSection)

    // Add click event to navbar items
    navItems.forEach((navItem) => {
        navItem.addEventListener("click", function () {
            const sectionToShow = this.getAttribute("data-hover").toLowerCase()
            showSection(sectionToShow)
        })
    })

    // Set initial active state for nav items based on saved section
    const savedSection2 = localStorage.getItem("activeSection") || "about"
    navItems.forEach((item) => {
        if (item.getAttribute("data-hover").toLowerCase() === savedSection2) {
            item.classList.add("active")
        } else {
            item.classList.remove("active")
        }
    })

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()
            const targetId = this.getAttribute("href").substring(1)
            const targetElement = document.getElementById(targetId)
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                })
            }
        })
    })

    // Remove blur overlay and show content after page loads
    window.addEventListener("load", () => {
        const container = document.querySelector(".container")
        setTimeout(() => {
            blurOverlay.classList.add("fade-out")
            container.classList.add("loaded")
        }, 500)
    })

    // Create loading screen
    // const loadingScreen = document.createElement("div")
    // loadingScreen.className = "loading-screen"
    // loadingScreen.innerHTML = `
    //       <div class="loading-content">
    //           <div class="loading-text">Loading</div>
    //           <div class="loading-spinner"></div>
    //       </div>
    //   `
    // document.body.appendChild(loadingScreen)

    // Add CSS for loading screen and transitions (This part is kept from the original code as it's not replaced in the updates)
    const style2 = document.createElement("style")
    style2.innerHTML = `
          @keyframes glitchIn {
              0% {
                  opacity: 0;
                  clip-path: inset(100% 0 0 0);
                  transform: scale(0.98) translateY(10px);
              }
              20% {
                  clip-path: inset(80% 0 0 0);
                  transform: scale(0.98) translateY(8px);
              }
              40% {
                  clip-path: inset(60% 0 0 0);
                  transform: scale(0.98) translateY(6px);
              }
              60% {
                  clip-path: inset(40% 0 0 0);
                  transform: scale(0.98) translateY(4px);
              }
              80% {
                  clip-path: inset(20% 0 0 0);
                  transform: scale(0.98) translateY(2px);
              }
              100% {
                  opacity: 1;
                  clip-path: inset(0 0 0 0);
                  transform: scale(1) translateY(0);
              }
          }
  
          @keyframes glitchOut {
              0% {
                  opacity: 1;
                  clip-path: inset(0 0 0 0);
                  transform: scale(1) translateY(0);
              }
              20% {
                  clip-path: inset(0 20% 0 0);
                  transform: scale(0.98) translateY(-2px);
              }
              40% {
                  clip-path: inset(0 40% 0 0);
                  transform: scale(0.98) translateY(-4px);
              }
              60% {
                  clip-path: inset(0 60% 0 0);
                  transform: scale(0.98) translateY(-6px);
              }
              80% {
                  clip-path: inset(0 80% 0 0);
                  transform: scale(0.98) translateY(-8px);
              }
              100% {
                  opacity: 0;
                  clip-path: inset(0 100% 0 0);
                  transform: scale(0.98) translateY(-10px);
              }
          }
  
          .section-active {
              display: block !important;
              animation: fadeIn 0.5s ease forwards;
          }
          .section-inactive {
              display: none !important;
          }
          .section-exit {
              animation: glitchOut 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
          .loading-screen {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: #191919;
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 9999;
          }
          .loading-content {
              text-align: center;
          }
          .loading-text {
              font-size: 2rem;
              color: #fff;
              margin-bottom: 20px;
              font-family: 'Courier New', monospace;
          }
          .loading-spinner {
              width: 50px;
              height: 50px;
              border: 5px solid #fff;
              border-top: 5px solid #ff758c;
              border-radius: 50%;
              animation: spin 1s linear infinite;
          }
          @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
              from {
                  opacity: 0;
                  transform: translateY(20px);
              }
              to {
                  opacity: 1;
                  transform: translateY(0);
              }
          }
          
      `
    document.head.appendChild(style2)

    // // Simulate loading time and remove loading screen
    // setTimeout(() => {
    //     loadingScreen.style.opacity = "0"
    //     loadingScreen.style.transition = "opacity 0.5s ease"
    //     setTimeout(() => {
    //         loadingScreen.remove()
    //     }, 500)
    // }, 3000) // Adjust this time as needed
})

