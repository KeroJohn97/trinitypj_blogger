document.addEventListener("DOMContentLoaded", () => {
  // Main button functionality from the original app
  const mainButton = document.getElementById("mainButton")
  if (mainButton) {
    mainButton.addEventListener("click", () => {
      const messageElement = document.getElementById("message")
      if (messageElement) {
        messageElement.textContent = "Button clicked successfully!"
      }
    })
  }

  // Responsive menu functionality
  const menuToggle = document.getElementById("menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("-translate-x-full")
    })
  }

  // Carousel Navigation
  const navButtons = document.querySelectorAll(".nav-button")
  const backgroundContainer = document.getElementById("background-container")
  const contentWrappers = document.querySelectorAll(".content-wrapper")
  const sections = document.querySelectorAll(".snap-start-section")

  const images = [
    "https://source.unsplash.com/random/1920x1080?abstract",
    "https://source.unsplash.com/random/1920x1080?people,crowd",
    "https://source.unsplash.com/random/1920x1080?nature",
    "https://source.unsplash.com/random/1920x1080?city",
    "https://source.unsplash.com/random/1920x1080?office",
  ]

  // Function to handle the carousel navigation and animation
  function navigateToSection(targetId) {
    // Remove active class from all sections and hide them
    sections.forEach((section) => {
      section.classList.remove("active-section")
    })

    // Find the target section and make it active
    const targetSection = document.getElementById(targetId)
    if (targetSection) {
      targetSection.classList.add("active-section")

      // Update nav buttons color
      navButtons.forEach((btn) => btn.classList.remove("bg-blue-500", "text-white"))
      const activeButton = document.querySelector(`.nav-button[data-target="${targetId}"]`)
      if (activeButton) {
        activeButton.classList.add("bg-blue-500", "text-white")
      }

      // Animate content and change background
      contentWrappers.forEach((wrapper) => {
        wrapper.classList.remove("animate-content")
      })

      const targetWrapper = targetSection.querySelector(".content-wrapper")
      if (targetWrapper) {
        targetWrapper.classList.add("animate-content")
      }

      // Update background image
      const sectionIds = Array.from(sections).map((section) => section.id)
      const sectionIndex = sectionIds.indexOf(targetId)
      if (backgroundContainer && sectionIndex !== -1 && sectionIndex < images.length) {
        backgroundContainer.style.backgroundImage = `url('${images[sectionIndex]}')`
      }
    }
  }

  // Add event listeners to each navigation button
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target
      navigateToSection(targetId)
    })
  })

  // Initialize the first section on page load
  navigateToSection("home")

  // Modal functionality for Document section
  const docModal = document.getElementById("document-modal")
  const closeDocModalBtn = document.getElementById("close-doc-modal")
  const googleDriveIframe = document.getElementById("google-drive-doc")
  const documentLinks = document.querySelectorAll(".document-link")

  // Add click listener to each document link in the carousel
  documentLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault() // Prevent default link behavior
      const documentUrl = event.currentTarget.getAttribute("data-link")

      // Set the iframe source and display the modal
      if (documentUrl && googleDriveIframe && docModal) {
        googleDriveIframe.src = documentUrl
        docModal.style.display = "block"
      }
    })
  })

  if (closeDocModalBtn && docModal) {
    closeDocModalBtn.addEventListener("click", () => {
      docModal.style.display = "none"
    })
  }

  if (docModal) {
    window.addEventListener("click", (event) => {
      if (event.target === docModal) {
        docModal.style.display = "none"
      }
    })
  }

  // Image Modal functionality (NEW)
  const imgModal = document.getElementById("image-modal")
  const closeImgModalBtn = document.getElementById("close-img-modal")
  const modalImage = document.getElementById("modal-image")
  const galleryImages = document.querySelectorAll(".gallery-image")
  const modalNavButton = document.getElementById("modal-nav-button")

  // Add click listeners to all gallery images
  galleryImages.forEach((img) => {
    img.addEventListener("click", (event) => {
      const fullSizeUrl = event.target.getAttribute("data-src")
      if (fullSizeUrl && modalImage && imgModal) {
        modalImage.src = fullSizeUrl
        imgModal.style.display = "block"
      }
    })
  })

  if (closeImgModalBtn && imgModal) {
    closeImgModalBtn.addEventListener("click", () => {
      imgModal.style.display = "none"
    })
  }

  if (imgModal) {
    window.addEventListener("click", (event) => {
      if (event.target === imgModal) {
        imgModal.style.display = "none"
      }
    })
  }

  if (modalNavButton && imgModal) {
    modalNavButton.addEventListener("click", () => {
      imgModal.style.display = "none"
      navigateToSection("activities")
    })
  }
})
