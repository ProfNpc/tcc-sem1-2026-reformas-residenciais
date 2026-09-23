import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function index() {

  const [data, setData] = useState([]);
  const [prestadores, setPrestadores] = useState([]);

  const [cpfdigitado, setcpfdigitado] = useState('');
  const [mostrarTabelaGet, setMostrarTabelaGet] = useState(true);
  const [mostrarTabelaPut, setMostrarTabelaPut] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  // Busca os clientes
  const carregarPessoas = () => {

    fetch('http://127.0.0.1:8089/Pessoa')

      .then(response => response.json())

      .then(json => setData(json))

      .catch(error =>
        console.error('Erro carregar clientes:', error)
      );
  };

  // Busca os prestadores
  const carregarPrestadores = () => {

    fetch('http://127.0.0.1:8089/Prestador')

      .then(response => response.json())

      .then(json => setPrestadores(json))

      .catch(error =>
        console.error('Erro carregar prestadores:', error)
      );
  };

  useEffect(() => {

    carregarPessoas();
    carregarPrestadores();

  }, []);

  return (

    <main>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>

        <h2>Pessoas cadastradas</h2>

        <Link  to="/Cadastro/cliente">
        
          <button>
            + Novo Cadastro Cliente
          </button>
        </Link>

         <Link   to="/cadastro/prestador/pro">
        
          <button>
            + Novo Cadastro Prestador
          </button>
        </Link>


        

        <Link to="/PesquisaDeletados">
          <button>
            Visualizar pessoas deletadas
          </button>
        </Link>

      </div>

      <br></br>

      {cpfdigitado && (
        <p style={{
          color: 'red',
          marginBottom: '10px'
        }}>
          {cpfdigitado}
        </p>
      )}

      {mostrarTabelaGet && (

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Endereço</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>

          </thead>

          <tbody>

            {/* CLIENTES */}

            {data
              .filter(item => item.deletado !== 'SIM')
              .map((item) => (

                <tr key={`cliente-${item.id}`}>

                  <td>{item.id}</td>

                  <td>{item.nome}</td>

                  <td>{item.cpf}</td>

                  <td>{item.telefone}</td>

                  <td>{item.email}</td>

                  <td>{item.endereco}</td>

                  <td>Cliente</td>

                  <td>

                    {/* ALTERADO: agora informa que é CLIENTE */}
                    <Link to={`/Atualizar/cliente/${item.id}`}>

                      <button className='btnAcao'>
                        atualizar
                      </button>

                    </Link>

                    <Link to={`/deletar/${item.id}`}>

                      <button className='btnAcao'>
                        Deletar
                      </button>

                    </Link>

                  </td>

                </tr>

              ))}


            {/* PRESTADORES */}

            {prestadores
              .filter(item => item.deletado !== 'SIM')
              .map((item) => (

                <tr key={`prestador-${item.id}`}>

                  <td>{item.id}</td>

                  <td>{item.nome}</td>

                  <td>{item.cpf}</td>

                  <td>{item.telefone}</td>

                  <td>{item.email}</td>

                  <td>{item.endereco}</td>

                  <td>Prestador</td>

                  <td>

                    {/* ALTERADO: agora informa que é PRESTADOR */}
                    <Link to={`/Atualizar/prestador/${item.id}`}>

                      <button className='btnAcao'>
                        atualizar
                      </button>

                    </Link>

                    <Link to={`/deletar/${item.id}`}>

                      <button className='btnAcao'>
                        Deletar
                      </button>

                    </Link>

                  </td>

                </tr>

              ))}

          </tbody>

        </table>

      )}

    </main>

  );
}

export default index;
