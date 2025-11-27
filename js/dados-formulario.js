// dados-formulario.js
// Lógica completa para tratar e exibir os dados do formulário

function carregarDadosFormulario() {
    try {
        const dadosString = localStorage.getItem("inscricaoData")
        if (!dadosString) {
            return null
        }
        return JSON.parse(dadosString)
    } catch (error) {
        console.error("Erro ao carregar dados:", error)
        return null
    }
}

function formatarTelefone(telefone) {
    if (!telefone) return "-"

    // Remove caracteres não numéricos
    const numero = telefone.replace(/\D/g, "")

    // Formata conforme o tamanho
    if (numero.length === 11) {
        return `(${numero.substring(0, 2)}) ${numero.substring(2, 7)}-${numero.substring(7)}`
    } else if (numero.length === 10) {
        return `(${numero.substring(0, 2)}) ${numero.substring(2, 6)}-${numero.substring(6)}`
    }

    return telefone
}

function formatarCurso(cursoValue) {
    const cursos = {
        fundamentos: "Fundamentos de IA",
        "deep-learning": "Deep Learning Avançado",
        nlp: "Processamento de Linguagem Natural",
        "computer-vision": "Visão Computacional",
    }
    return cursos[cursoValue] || cursoValue
}

function formatarNivel(nivelValue) {
    const niveis = {
        iniciante: "Iniciante - Nunca estudei IA",
        basico: "Básico - Conhecimentos teóricos",
        intermediario: "Intermediário - Alguma experiência prática",
        avancado: "Avançado - Experiência profissional",
    }
    return niveis[nivelValue] || nivelValue
}

function formatarArea(areaValue) {
    const areas = {
        tecnologia: "Tecnologia",
        saude: "Saúde",
        financas: "Finanças",
        educacao: "Educação",
        marketing: "Marketing",
        engenharia: "Engenharia",
        pesquisa: "Pesquisa Acadêmica",
        estudante: "Estudante",
        outro: "Outro",
    }
    return areas[areaValue] || areaValue
}

function formatarDataHora(timestamp) {
    if (!timestamp) {
        const agora = new Date()
        timestamp = agora.toISOString()
    }

    const data = new Date(timestamp)
    const opcoes = {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }
    return data.toLocaleDateString("pt-BR", opcoes)
}

function exibirDados(dados) {
    // Dados Pessoais
    document.getElementById("displayName").textContent = dados.fullName || "-"
    document.getElementById("displayEmail").textContent = dados.email || "-"
    document.getElementById("displayPhone").textContent = formatarTelefone(dados.phone)
    document.getElementById("displayWorkArea").textContent = formatarArea(dados.workArea) || "-"

    // Dados do Curso
    document.getElementById("displayCourse").textContent = formatarCurso(dados.courseInterest)
    document.getElementById("displayLevel").textContent = formatarNivel(dados.experienceLevel)

    // Objetivos
    const objetivosElement = document.getElementById("displayObjectives")
    if (dados.objectives && dados.objectives.trim() !== "") {
        objetivosElement.textContent = dados.objectives
    } else {
        objetivosElement.textContent = "Nenhum objetivo especificado"
        objetivosElement.style.fontStyle = "italic"
        objetivosElement.style.color = "#94a3b8"
    }

    // Preferências - Newsletter
    const newsletterBadge = document.getElementById("displayNewsletter")
    if (dados.newsletter) {
        newsletterBadge.textContent = "Sim"
        newsletterBadge.className = "badge bg-success"
    } else {
        newsletterBadge.textContent = "Não"
        newsletterBadge.className = "badge bg-secondary"
    }

    // Preferências - Termos
    const termsBadge = document.getElementById("displayTerms")
    if (dados.terms) {
        termsBadge.textContent = "Aceito"
        termsBadge.className = "badge bg-success"
    } else {
        termsBadge.textContent = "Não aceito"
        termsBadge.className = "badge bg-danger"
    }

    // Data e hora da inscrição
    document.getElementById("displayDateTime").textContent = formatarDataHora(dados.timestamp)

    // Adicionar animação aos cards
    const cards = document.querySelectorAll(".data-card")
    cards.forEach((card, index) => {
        card.style.opacity = "0"
        card.style.transform = "translateY(20px)"
        setTimeout(() => {
            card.style.transition = "all 0.5s ease"
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
        }, index * 100)
    })
}

function verificarDados() {
    const dados = carregarDadosFormulario()

    if (!dados) {
        // Mostrar mensagem de aviso
        const alertDiv = document.createElement("div")
        alertDiv.className =
            "alert alert-warning alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3"
        alertDiv.style.zIndex = "9999"
        alertDiv.innerHTML = `
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      <strong>Nenhum dado encontrado!</strong> Você será redirecionado para o formulário.
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `
        document.body.appendChild(alertDiv)

        // Redirecionar após 3 segundos
        setTimeout(() => {
            window.location.href = "forms.html"
        }, 3000)
        return false
    }

    exibirDados(dados)
    return true
}

function limparDados() {
    if (confirm("Tem certeza que deseja limpar os dados da inscrição?")) {
        localStorage.removeItem("inscricaoData")
        window.location.href = "forms.html"
    }
}

document.addEventListener("DOMContentLoaded", () => {
    verificarDados()
})