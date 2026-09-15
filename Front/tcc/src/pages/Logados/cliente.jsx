import React from "react";

function Clientes() {

  const clienteSalvo = localStorage.getItem("cliente");

  const cliente = clienteSalvo
    ? JSON.parse(clienteSalvo)
    : null;

  return (
    <main>

      <h1>
        Olá, {cliente?.nome}!
      </h1>

      <p>
        E-mail: {cliente?.email}
      </p>

      <p>
        CPF: {cliente?.cpf}
      </p>

    </main>
  );
}

export default Clientes;