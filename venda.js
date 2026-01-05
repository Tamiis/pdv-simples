
const produtos = {
  "001": { nome: "Coca-Cola", descricao: "Refrigerante 350ml", preco: 5.00 },
  "002": { nome: "Pastel", descricao: "Pastel de carne", preco: 7.50 },
  "003": { nome: "Água", descricao: "Água mineral", preco: 3.00 }
};

let carrinho = [];
let total = 0;

document.getElementById("codigoProduto").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    adicionarProduto();
  }
});

function adicionarProduto() {
  const codigo = document.getElementById("codigoProduto").value.trim();
  const quantidade = parseInt(document.getElementById("quantidadeProduto").value);

  if (!produtos[codigo]) {
    alert("Produto não encontrado!");
    return;
  }

  const produto = produtos[codigo];

  carrinho.push({
    codigo,
    nome: produto.nome,
    descricao: produto.descricao,
    quantidade,
    preco: produto.preco
  });

  atualizarTabela();
  limparCampos();
}

function atualizarTabela() {
  const tabela = document.getElementById("tabelaItens");
  tabela.innerHTML = "";
  total = 0;

  carrinho.forEach((item, index) => {
    const totalItem = item.preco * item.quantidade;
    total += totalItem;

    tabela.innerHTML += `
      <tr data-index="${index}">
        <td>${item.nome}</td>
        <td>${item.descricao}</td>
        <td>${item.quantidade}</td>
        <td>R$ ${item.preco.toFixed(2)}</td>
      </tr>
    `;
  });

  atualizarTotal();
}

function atualizarTotal() {
  document.getElementById("totalVenda").innerText =
    total.toFixed(2).replace(".", ",");
}

function limparCampos() {
  document.getElementById("codigoProduto").value = "";
  document.getElementById("quantidadeProduto").value = 1;
  document.getElementById("codigoProduto").focus();
}

function cancelarNota() {
  if (confirm("Deseja cancelar a nota?")) {
    carrinho = [];
    atualizarTabela();
  }
}

function cancelarItem() {
  if (carrinho.length === 0) {
    alert("Nenhum item para cancelar.");
    return;
  }

  carrinho.pop(); 
  atualizarTabela();
}

function finalizarCompra() {
  alert("Ir para tela FECHAR NOTA");
}

// ===============================
// ATALHOS DE TECLADO (SEGUROS)
// ===============================
document.addEventListener("keydown", function (event) {

  switch (event.key) {

    case "F2":
      event.preventDefault();
      document.getElementById("codigoProduto").focus();
      break;

    case "F4":
      event.preventDefault();
      finalizarCompra();
      break;

    case "F6":
      event.preventDefault();
      cancelarItem();
      break;

    case "Escape":
      event.preventDefault();
      cancelarNota();
      break;
  }
});
