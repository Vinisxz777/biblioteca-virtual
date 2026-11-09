const campoBusca = document.querySelector("#busca");
const livros = document.querySelectorAll("#lista-livros article");
const mensagemSemResultados = document.querySelector("#sem-resultados");
const contadorLivros = document.querySelector("#book-count");

campoBusca.addEventListener("input", () => {
  const termo = campoBusca.value.trim().toLocaleLowerCase("pt-BR");
  let quantidadeVisivel = 0;

  livros.forEach((livro) => {
    const titulo = livro.querySelector("h2").textContent.toLocaleLowerCase("pt-BR");
    const corresponde = titulo.includes(termo);

    // O atributo hidden remove da visualização os livros que não correspondem.
    livro.closest("li").hidden = !corresponde;
    if (corresponde) quantidadeVisivel++;
  });

  mensagemSemResultados.hidden = quantidadeVisivel !== 0;
  contadorLivros.textContent = `${quantidadeVisivel} ${quantidadeVisivel === 1 ? "livro" : "livros"}`;
});

const formulario = document.querySelector("#form-sugestao");
const campoNome = document.querySelector("#nome");
const campoTitulo = document.querySelector("#titulo");
const mensagemFormulario = document.querySelector("#mensagem-formulario");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  mensagemFormulario.className = "form-message";

  const nome = campoNome.value.trim();
  const titulo = campoTitulo.value.trim();

  if (!nome) {
    mensagemFormulario.textContent = "Por favor, informe seu nome.";
    mensagemFormulario.classList.add("error");
    campoNome.focus();
    return;
  }

  if (titulo.length < 3) {
    mensagemFormulario.textContent = "O título do livro deve ter pelo menos 3 caracteres.";
    mensagemFormulario.classList.add("error");
    campoTitulo.focus();
    return;
  }

  mensagemFormulario.textContent = `Obrigado, ${nome}! A sugestão “${titulo}” foi registrada nesta página.`;
  mensagemFormulario.classList.add("success");
  formulario.reset();
});
