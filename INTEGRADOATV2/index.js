const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 3000;
app.use(bodyParser.json());
const contas = {
  12345: { saldo: 10000 },
  76498: { saldo: 500 },
};
const transacoes = [];

app.post("/api/transferencia", (req, ress) => {
  const { contaOrigem, contaDestino, valor } = req.body;

  if (!contaOrigem || !contaDestino || !valor === undefined) {
    return res.status(400).json({ mensagem: "Dados incompletos" });
  }

  if (!contas[contaOrigem] || !contas[coontaDestino]) {
    return res
      .status(400)
      .json({ mensagem: "Conta Origem ou conta destino não existe" });
  }

  if (valor <= 0) {
    return res
      .status(400)
      .json({ mensagem: "O valor da transferencia deve ser maior que zero" });
  }

  if (contas[contaOrigem].saldo < valor) {
    return res.status(400).json({ mensagem: "Saldo insuficiente" });
  }

  const idTransacao = uuidv4();

  const novaTransacao = {
    id: idTransacao,
    contaOrigem,
    contaDestino,
    valor,
    data: new Date().toISOString(),
    status: "Concluida",
  };

  transacoes.push(novaTransacao);
  contas[contaOrigem].saldo -= valor;
  contas[contaDestino].saldo += valor;

  return res.status(200).json({
    mensagem: "Transferência realizada",
    idTransacao,
    novoSaldoOrigem: contas[contaOrigem].saldo,
    novoSaldoDestino: contas[contaDestino].saldo,
  });
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost${port}`);
});
