// Forms/Courses page functionality

document.addEventListener("DOMContentLoaded", () => {
  const courseForm = document.getElementById("courseForm")

  courseForm.addEventListener("submit", handleFormSubmit)

  // Animate elements on scroll
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

  document.querySelectorAll(".course-card").forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `all 0.6s ease ${index * 0.1}s`
    observer.observe(card)
  })
})

function handleFormSubmit(event) {
  event.preventDefault()

  const formData = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    courseInterest: document.getElementById("courseInterest").value,
    experienceLevel: document.getElementById("experienceLevel").value,
    workArea: document.getElementById("workArea").value,
    objectives: document.getElementById("objectives").value,
    newsletter: document.getElementById("newsletter").checked,
    terms: document.getElementById("terms").checked,
    timestamp: new Date().toISOString(),
  }

  const formMessage = document.getElementById("formMessage")
  const form = document.getElementById("courseForm")

  // Show loading
  formMessage.style.display = "block"
  formMessage.className = "form-message"
  formMessage.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #6366f1; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 16px; color: #475569;">Processando sua inscrição...</p>
        </div>
    `

  // Simulate form processing
  setTimeout(() => {
    const courseNames = {
      fundamentos: "Fundamentos de IA",
      "deep-learning": "Deep Learning Avançado",
      nlp: "Processamento de Linguagem Natural",
      "computer-vision": "Visão Computacional",
    }

    const courseName = courseNames[formData.courseInterest] || "Curso selecionado"

    localStorage.setItem("inscricaoData", JSON.stringify(formData))

    // Show success message
    formMessage.className = "form-message success"
    formMessage.innerHTML = `
            <div style="text-align: center;">
                <svg style="width: 48px; height: 48px; color: #10b981; margin-bottom: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h4 style="margin: 0 0 12px 0; font-size: 20px; color: #065f46;">Inscrição Realizada com Sucesso!</h4>
                <p style="margin: 0; font-size: 15px; color: #047857;">
                    Olá <strong>${formData.fullName}</strong>!<br>
                    Sua inscrição no curso "<strong>${courseName}</strong>" foi confirmada.<br>
                    Enviaremos mais informações para <strong>${formData.email}</strong> em breve.
                </p>
                <button onclick="window.location.href='dados-formulario.html'" 
                        style="margin-top: 20px; padding: 10px 24px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                    Ver Detalhes da Inscrição
                </button>
            </div>
        `

    // Reset form
    form.reset()
  }, 2000)
}

// Add animation keyframe for loading spinner
const style = document.createElement("style")
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`
document.head.appendChild(style)
