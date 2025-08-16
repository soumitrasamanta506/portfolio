// Theme Toggle
const themeToggle = document.getElementById("theme-toggle")
const body = document.body

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light"
if (currentTheme === "dark") {
  body.setAttribute("data-theme", "dark")
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
}

themeToggle.addEventListener("click", () => {
  const isDark = body.getAttribute("data-theme") === "dark"

  if (isDark) {
    body.removeAttribute("data-theme")
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
    localStorage.setItem("theme", "light")
  } else {
    body.setAttribute("data-theme", "dark")
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    localStorage.setItem("theme", "dark")
  }
})

// Mobile Navigation
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  hamburger.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  })
})

// Navbar Scroll Effect
const navbar = document.getElementById("navbar")

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Typing Animation
const typingText = document.getElementById("typing-text")
const texts = ["Full Stack Developer", "Competitive Programmer", "Problem Solver", "CS Student", "Tech Enthusiast"]

let textIndex = 0
let charIndex = 0
let isDeleting = false

function typeWriter() {
  const currentText = texts[textIndex]

  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1)
    charIndex--
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = isDeleting ? 50 : 100

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000 // Pause at end
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    textIndex = (textIndex + 1) % texts.length
    typeSpeed = 500 // Pause before next word
  }

  setTimeout(typeWriter, typeSpeed)
}

// Start typing animation
typeWriter()

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const navbar = document.getElementById("navbar")
      const navbarHeight = navbar.offsetHeight
      const targetPosition = target.offsetTop - navbarHeight - 20 // 20px extra padding

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Active Navigation Link
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""
  const navbar = document.getElementById("navbar")
  const navbarHeight = navbar.offsetHeight

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - navbarHeight - 100) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Back to Top Button
const backToTop = document.getElementById("back-to-top")

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible")
  } else {
    backToTop.classList.remove("visible")
  }
})

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Contact Form
const contactForm = document.getElementById("contact-form")
const successModal = document.getElementById("success-modal")

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault()

  const formData = new FormData(this)

  try {
    const response = await fetch(this.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })

    if (response.ok) {
      // Show success message only after successful submission
      showSuccessModal()
      // Reset form
      this.reset()
    } else {
      throw new Error("Form submission failed")
    }
  } catch (error) {
    console.error("[v0] Form submission error:", error)
    alert("Sorry, there was an error sending your message. Please try again or contact me directly via email.")
  }
})

function showSuccessModal() {
  successModal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeModal() {
  successModal.classList.remove("active")
  document.body.style.overflow = "auto"
}

// Project View Modal
const projectModal = document.getElementById("project-modal")
const projectModalTitle = document.getElementById("project-modal-title")
const projectModalBody = document.getElementById("project-modal-body")

function viewProject(projectId) {
  const projects = {
    dthoughts: {
      title: "DThoughts - Blog Application",
      content: `
                <div class="project-details">
                    <img src="project1.png" alt="DThoughts" style="width: 100%; border-radius: 12px; margin-bottom: 2rem;">
                    <h3>Project Overview</h3>
                    <p>DThoughts is a comprehensive blog application built with modern web technologies. It provides a seamless experience for content creators to write, edit, and manage their blog posts with a rich text editor.</p>
                    
                    <h3>Key Features</h3>
                    <ul>
                        <li>Rich text editing with TinyMCE integration</li>
                        <li>User authentication and authorization</li>
                        <li>Real-time database operations</li>
                        <li>File storage and management</li>
                        <li>Responsive design for all devices</li>
                        <li>State management with Redux Toolkit</li>
                    </ul>
                    
                    <h3>Technologies Used</h3>
                    <div class="tech-stack">
                        <span class="tech-tag">React.js</span>
                        <span class="tech-tag">Redux Toolkit</span>
                        <span class="tech-tag">TinyMCE</span>
                        <span class="tech-tag">Appwrite</span>
                        <span class="tech-tag">CSS3</span>
                    </div>
                    
                    <div class="project-links" style="margin-top: 2rem;">
                        <a href="https://github.com/soumitrasamanta" target="_blank" class="btn btn-primary">
                            <i class="fab fa-github"></i> View Code
                        </a>
                        <a href="#" class="btn btn-secondary">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    </div>
                </div>
            `,
    },
    pathfinding: {
      title: "Pathfinding Algorithm Visualization",
      content: `
                <div class="project-details">
                    <img src="project2.png" alt="Pathfinding Visualization" style="width: 100%; border-radius: 12px; margin-bottom: 2rem;">
                    <h3>Project Overview</h3>
                    <p>An interactive visualization tool for shortest path algorithms that demonstrates how different pathfinding algorithms work in real-time. Built using HTML5 Canvas for smooth animations and responsive interactions.</p>
                    
                    <h3>Key Features</h3>
                    <ul>
                        <li>Real-time algorithm visualization</li>
                        <li>Interactive graph creation and editing</li>
                        <li>Multiple pathfinding algorithms (Dijkstra, A*, BFS, DFS)</li>
                        <li>Customizable graph nodes and edges</li>
                        <li>Performance optimization for large datasets</li>
                        <li>Responsive canvas rendering</li>
                    </ul>
                    
                    <h3>Technologies Used</h3>
                    <div class="tech-stack">
                        <span class="tech-tag">HTML5</span>
                        <span class="tech-tag">CSS3</span>
                        <span class="tech-tag">JavaScript</span>
                        <span class="tech-tag">Canvas API</span>
                        <span class="tech-tag">Algorithms</span>
                    </div>
                    
                    <div class="project-links" style="margin-top: 2rem;">
                        <a href="https://github.com/soumitrasamanta" target="_blank" class="btn btn-primary">
                            <i class="fab fa-github"></i> View Code
                        </a>
                        <a href="#" class="btn btn-secondary">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    </div>
                </div>
            `,
    },
  }

  const project = projects[projectId]
  if (project) {
    projectModalTitle.textContent = project.title
    projectModalBody.innerHTML = project.content
    projectModal.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}

function closeProjectModal() {
  projectModal.classList.remove("active")
  document.body.style.overflow = "auto"
}

// Close modals when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === successModal) {
    closeModal()
  }
  if (e.target === projectModal) {
    closeProjectModal()
  }
})

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document
  .querySelectorAll(".achievement-item, .skill-category, .project-card, .timeline-item, .contact-item")
  .forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

// Add image files as placeholders
console.log("[v0] Portfolio website loaded successfully")
console.log("[v0] Required files: profile.png, project1.png, project2.png, resume.pdf")
