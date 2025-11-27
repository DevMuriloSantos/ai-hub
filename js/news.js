// News page functionality

document.addEventListener("DOMContentLoaded", () => {
  loadNews()
})

function loadNews() {
  const newsGrid = document.getElementById("newsGrid")

  const newsItems = [
    {
      date: "20 de Janeiro, 2025",
      title: "Nova Breakthrough em Processamento de Linguagem Natural",
      summary:
        "Pesquisadores desenvolvem modelo de IA capaz de compreender contexto com 98% de precisão, revolucionando a comunicação humano-máquina e estabelecendo novo padrão para assistentes virtuais.",
    },
    {
      date: "18 de Janeiro, 2025",
      title: "IA Generativa Atinge Novo Marco em Criatividade",
      summary:
        "Algoritmos de inteligência artificial agora conseguem criar obras de arte e música indistinguíveis de criações humanas, levantando questões sobre criatividade e autoria.",
    },
    {
      date: "15 de Janeiro, 2025",
      title: "Avanços em Machine Learning para Medicina",
      summary:
        "Novo sistema de IA diagnostica doenças raras com precisão superior a especialistas humanos, prometendo revolucionar a medicina e salvar milhares de vidas.",
    },
    {
      date: "12 de Janeiro, 2025",
      title: "Robótica Inteligente em Ambientes Domésticos",
      summary:
        "Robôs domésticos com IA avançada começam a ser testados em lares, oferecendo assistência personalizada e aprendizado contínuo para melhor atender as necessidades dos usuários.",
    },
    {
      date: "10 de Janeiro, 2025",
      title: "IA Sustentável: Reduzindo Consumo Energético",
      summary:
        "Novos algoritmos de otimização reduzem em 40% o consumo energético de data centers que processam IA, promovendo sustentabilidade e redução de custos operacionais.",
    },
    {
      date: "8 de Janeiro, 2025",
      title: "Educação Personalizada com Inteligência Artificial",
      summary:
        "Plataformas educacionais utilizam IA para adaptar conteúdo ao ritmo e estilo de aprendizado de cada aluno, aumentando eficácia e engajamento em 70%.",
    },
  ]

  newsItems.forEach((item, index) => {
    setTimeout(() => {
      const newsCard = document.createElement("div")
      newsCard.className = "news-card"
      newsCard.innerHTML = `
                <div class="news-image" id="newsImage${index}"></div>
                <div class="news-content">
                    <div class="news-date">${item.date}</div>
                    <h3 class="news-title">${item.title}</h3>
                    <p class="news-summary">${item.summary}</p>
                </div>
            `

      newsCard.addEventListener("click", () => {
        alert(`${item.title}\n\n${item.summary}\n\nArtigo completo disponível em breve!`)
      })

      newsGrid.appendChild(newsCard)
    }, index * 150)
  })
}
