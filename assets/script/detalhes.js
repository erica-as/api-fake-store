// Obtém o ID do objeto da URL
let params = new URLSearchParams(location.search);
let id = params.get('id');

// Busca os detalhes do objeto com base no ID
fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((json) => {
        exibeDetalhesNaTela(json);
    });

// Função para exibir os detalhes na tela
function exibeDetalhesNaTela(detalhes) {
    const tituloElement = document.getElementById("detalhes-titulo");
    const categoriaElement = document.getElementById("detalhes-categoria");
    const imagemElement = document.getElementById("detalhes-imagem");
    const descricaoElement = document.getElementById("detalhes-descricao");
    const precoElement = document.getElementById("detalhes-preco");
    const estoqueElement = document.getElementById("detalhes-estoque");
    const avaliacaoElement = document.getElementById("avaliacao");

    tituloElement.textContent = detalhes.title;
    categoriaElement.textContent = detalhes.category;
    imagemElement.src = detalhes.image;
    descricaoElement.textContent = detalhes.description;
    precoElement.textContent = detalhes.price;
    estoqueElement.textContent = detalhes.rating.count;
    avaliacaoElement.textContent = detalhes.rating.rate;
}