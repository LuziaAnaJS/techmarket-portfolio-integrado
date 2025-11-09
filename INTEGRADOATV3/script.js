document.addEventListener("DOMContentLoaded", () => {
  const dadosExtrato = {
    saldo: 6892.35,
    transacoes: [
      {
        tipo: "venda",
        descricao: "Venda - Fone Bluetooth TechSound",
        valor: 249.9,
      },
      {
        tipo: "venda",
        descricao: "Venda - Teclado Bluetooth TechMarket",
        valor: 599.99,
      },
      { tipo: "venda", descricao: "Venda - Mouse sem fio", valor: 220.99 },
      {
        tipo: "compra",
        descricao: "Compra -  Estoque de SDDs NVMe",
        valor: -8699.9,
      },
      {
        tipo: "cashback",
        descricao: "Cashback campanha TechFriday",
        valor: 150.0,
      },
      {
        tipo: "pix",
        descricao: "Pagamento Fornecedor - AlpphaEletronics",
        valor: -5160.0,
      },
      {
        tipo: "taxa",
        descricao: "Taxa de intermediação - FastPay",
        valor: -175.0,
      },
      {
        tipo: "reembolso",
        descricao: "Reembolso cliente - pedido #C3499",
        valor: -229.0,
      },
      {
        tipo: "serviço",
        descricao: "Assinatura TechMarket Plus (Mensal)",
        valor: -57.9,
      },
      {
        tipo: "pix",
        descricao: "Recebido via PIX - Cliente Luzia Ana",
        valor: 423.8,
      },
    ],
  };

  const saldoElemento = document.getElementById("saldo-conta");
  const listaTransacoesElemento = document.getElementById("lista-transacoes");

  saldoElemento.textContent = `Saldo ${dadosExtrato.saldo.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  )}`;

  dadosExtrato.transacoes.forEach((transacao) => {
    const itemLista = document.createElement("li");
    itemLista.classList.add("transacao");

    if (Math.abs(transacao.valor) >= 5000) {
      itemLista.classList.add("destaque");
    }

    const valorFormatado = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(transacao.valor);

    const classeValor = transacao.valor > 0 ? "positivo" : "negativo";

    itemLista.innerHTML = `
      <div class="transacao-info">
        <span>${transacao.descricao}</span>
      </div>
      <span class="transacao-valor ${classeValor}">
        ${valorFormatado}
      </span>
    `;

    listaTransacoesElemento.appendChild(itemLista);
  });
});
