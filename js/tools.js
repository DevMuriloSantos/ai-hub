// Tools page functionality

document.addEventListener("DOMContentLoaded", () => {
  const toolCards = document.querySelectorAll(".tool-card")
  const toolButtons = document.querySelectorAll(".tool-button")

  // Handle tool card clicks
  toolCards.forEach((card) => {
    card.addEventListener("click", function () {
      const toolName = this.dataset.tool
      openToolDemo(toolName)
    })
  })

  // Handle button clicks (prevent card click)
  toolButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation()
      const card = this.closest(".tool-card")
      const toolName = card.dataset.tool
      openToolDemo(toolName)
    })
  })

  function openToolDemo(toolName) {
    const toolMessages = {
      "text-generator":
        "Ferramenta de Geração de Texto ativada! Esta ferramenta permite criar textos automaticamente usando algoritmos avançados de processamento de linguagem natural.",
      "image-analyzer":
        "Analisador de Imagens ativo! Faça upload de uma imagem e receba uma análise detalhada usando tecnologia de visão computacional.",
      "sentiment-analyzer":
        "Análise de Sentimentos pronta! Digite um texto e descubra o sentimento e emoção por trás dele.",
      translator: "Tradutor Inteligente ativo! Digite um texto e o idioma de destino para tradução em tempo real.",
      "code-generator":
        "Gerador de Código pronto! Descreva o que você quer programar e receba código funcional em diversas linguagens.",
      "data-predictor":
        "Preditor de Dados ativo! Forneça dados históricos e receba previsões e análises baseadas em machine learning.",
    }

    const message = toolMessages[toolName] || "Ferramenta ativada!"

    // Show alert for now (could redirect to demo page)
    alert(message + "\n\nEm breve você será redirecionado para a página de demonstração desta ferramenta.")

    // Optional: redirect to demo page
    // window.location.href = 'demo.html?tool=' + toolName;
  }

  // Animate cards on scroll
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

  toolCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `all 0.6s ease ${index * 0.1}s`
    observer.observe(card)
  })
})
