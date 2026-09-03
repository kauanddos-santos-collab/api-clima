// 1) Encontra o botão que possui id="buscar"
const botaoBuscar = document.getElementById("buscar");

// 2) Liga o clique do botão à função buscarClima
botaoBuscar.addEventListener("click", buscarClima);

// 3) Esta função será executada a cada clique
function buscarClima () {function buscarClima() {

  // Encontra o input com id="cidade"
  const campoCidade = document.getElementById("cidade");

  // .value pega o que o usuário digitou
  // .trim() remove espaços extras no início/fim
  const cidade = campoCidade.value.trim();

  console.log("Cidade digitada:", cidade);
}

  console.log("O botão foi clicado!");
}
