function filtrarCardsPorPesquisa(cards) {
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value.toLowerCase().trim();

  if (searchText !== "") {
    return cards.filter((card) =>
      card.title.toLowerCase().includes(searchText)
    );
  } else {
    return cards;
  }
}

function buscarEExibirCards(containerId, ...categories) {
  const cardsContainer = document.getElementById(containerId);
  cardsContainer.innerHTML = "";

  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => {
      let filteredCards = filtrarCardsPorPesquisa(json);

      if (categories.length > 0 && !categories.includes("All")) {
        filteredCards = filteredCards.filter((card) =>
          categories.includes(card.category)
        );
      }

      for (let i = 0; i < filteredCards.length; i++) {
        const card = filteredCards[i];
        const cardElement = document.createElement("div");
        cardElement.classList.add("col-md-3", "mb-2", "mt-2");

        cardElement.innerHTML = `
          <div class="card text-center bg-light d-grid h-100">
            <img src="${card.image}" alt="" class="card-img-top w-100" style="height: 250px;">
            <div class="card-header">R$${card.price}</div>
            <div class="card-body">
              <h6 class="card-title">${card.title}</h6>
            </div>
            <div class="card-footer">
              <form class="d-block">
                <button class="btn detalhes-button" style="background-color: #A9A9A9;" data-id="${card.id}">Detalhes</button>
              </form>
              <small class="text-success">${card.rating.count} em estoque</small>
            </div>
          </div>
        `;
        cardsContainer.appendChild(cardElement);
      }

      const detalhesButtons = document.querySelectorAll(".detalhes-button");
      detalhesButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const id = event.target.dataset.id;
          window.open(`./detalhes.html?id=${id}`, "_blank");
        });
      });
    });
}

// Busca e exibe todos os cards inicialmente
window.addEventListener("load", function () {
  buscarEExibirCards("listagem-grupos-tab1");
});

// Adiciona o evento de clique ao botão de pesquisa
const searchButton = document.getElementById("button-addon2");
searchButton.addEventListener("click", function (event) {
  event.preventDefault(); // Impede o envio do formulário
  buscarEExibirCards("listagem-grupos-tab1");
});

// Adiciona o evento de clique aos botões da aba all
const tab1Button = document.getElementById("tab1-tab");
tab1Button.addEventListener("click", function () {
  buscarEExibirCards("listagem-grupos-tab1");
});

// Adiciona o evento de clique aos botões da aba jewelery
const tab2Button = document.getElementById("tab2-tab");
tab2Button.addEventListener("click", function () {
  buscarEExibirCards("listagem-grupos-tab2", "jewelery");
});

// Adiciona o evento de clique aos botões da aba men's clothing
const tab3Button = document.getElementById("tab3-tab");
tab3Button.addEventListener("click", function () {
  buscarEExibirCards("listagem-grupos-tab3", "men's clothing");
});

// Adiciona o evento de clique aos botões da aba women's clothing
const tab4Button = document.getElementById("tab4-tab");
tab4Button.addEventListener("click", function () {
  buscarEExibirCards("listagem-grupos-tab4", "women's clothing");
});

// Adiciona o evento de clique aos botões da aba electronics
const tab5Button = document.getElementById("tab5-tab");
tab5Button.addEventListener("click", function () {
  buscarEExibirCards("listagem-grupos-tab5", "electronics");
});
