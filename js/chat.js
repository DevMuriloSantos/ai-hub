// Chat functionality for demo page

document.addEventListener("DOMContentLoaded", () => {
  const chatInput = document.getElementById("chatInput")
  const sendButton = document.getElementById("sendButton")
  const chatMessages = document.getElementById("chatMessages")
  const suggestionChips = document.querySelectorAll(".suggestion-chip")

  // Send message on button click
  sendButton.addEventListener("click", sendMessage)

  // Send message on Enter key
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  })

  // Handle suggestion chips
  suggestionChips.forEach((chip) => {
    chip.addEventListener("click", function () {
      const question = this.dataset.question
      chatInput.value = question
      sendMessage()
    })
  })

  function sendMessage() {
    const message = chatInput.value.trim()

    if (!message) return

    // Add user message
    addMessage(message, "user")
    chatInput.value = ""

    // Show typing indicator
    showTypingIndicator()

    // Simulate AI response after delay
    setTimeout(() => {
      hideTypingIndicator()
      const response = generateAIResponse(message)
      addMessage(response, "ai")
    }, 1500)
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${sender}-message`

    if (sender === "ai") {
      messageDiv.innerHTML = `
                <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                </div>
                <div class="message-bubble">
                    <p>${text}</p>
                </div>
            `
    } else {
      messageDiv.innerHTML = `
                <div class="message-bubble">
                    <p>${text}</p>
                </div>
                <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                </div>
            `
    }

    chatMessages.appendChild(messageDiv)
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  function showTypingIndicator() {
    const indicator = document.createElement("div")
    indicator.className = "message ai-message typing-indicator"
    indicator.innerHTML = `
            <div class="message-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
            </div>
            <div class="message-bubble">
                <p>Digitando...</p>
            </div>
        `
    chatMessages.appendChild(indicator)
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  function hideTypingIndicator() {
    const indicator = document.querySelector(".typing-indicator")
    if (indicator) {
      indicator.remove()
    }
  }

  function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase()

    // Simple response logic based on keywords
    if (message.includes("inteligência artificial") || message.includes("ia")) {
      return "Inteligência Artificial é a capacidade de máquinas simularem inteligência humana através de algoritmos e aprendizado. Ela pode ser dividida em IA Fraca (sistemas específicos) e IA Forte (inteligência geral). Principais áreas incluem machine learning, processamento de linguagem natural e visão computacional."
    } else if (message.includes("machine learning") || message.includes("ml")) {
      return "Machine Learning é um subcampo da IA que permite que sistemas aprendam e melhorem automaticamente com base em experiências, sem serem explicitamente programados. Utiliza algoritmos que encontram padrões em dados para fazer previsões ou decisões."
    } else if (message.includes("aplicações") || message.includes("aplicação")) {
      return "As aplicações de IA são vastas: assistentes virtuais, reconhecimento facial, carros autônomos, diagnósticos médicos, recomendações personalizadas, tradução automática, detecção de fraudes, análise de sentimentos e muito mais. A IA está transformando praticamente todos os setores da economia."
    } else if (message.includes("diferença")) {
      return 'IA é o conceito amplo de máquinas realizando tarefas de forma "inteligente", enquanto Machine Learning é um subconjunto específico da IA que foca em sistemas que aprendem com dados. Deep Learning, por sua vez, é um subconjunto do ML que usa redes neurais profundas.'
    } else {
      const responses = [
        `Interessante pergunta sobre "${userMessage}". Com base em meu conhecimento de IA, posso dizer que este é um tópico fascinante e em constante evolução.`,
        `Sobre "${userMessage}", a inteligência artificial tem feito grandes avanços nesta área. Posso fornecer mais detalhes específicos se você tiver perguntas adicionais.`,
        `Excelente questão! "${userMessage}" é um tema que envolve várias tecnologias de machine learning e processamento de dados avançados.`,
        `Analisando sua pergunta sobre "${userMessage}", posso fornecer insights baseados em algoritmos avançados e análise de dados.`,
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }
})
