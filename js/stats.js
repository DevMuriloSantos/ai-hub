// Statistics page functionality

document.addEventListener("DOMContentLoaded", () => {
  // Animate statistics numbers
  animateStats()

  // Observe stats cards for animation
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  document.querySelectorAll(".stat-card, .metric-card").forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `all 0.6s ease ${index * 0.1}s`
    observer.observe(card)
  })
})

function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number")

  statNumbers.forEach((stat) => {
    const target = Number.parseInt(stat.dataset.target)
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      stat.textContent = Math.floor(current).toLocaleString("pt-BR")
    }, duration / steps)
  })
}
