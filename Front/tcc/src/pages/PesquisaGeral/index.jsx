import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Index() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [prestadores, setPrestadores] = useState([]);

  const [cpfdigitado, setcpfdigitado] = useState('');
  const [mostrarTabelaGet, setMostrarTabelaGet] = useState(true);
  const [mostrarTabelaPut, setMostrarTabelaPut] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  // Filtro de cadastros
  const [tipoFiltro, setTipoFiltro] = useState('todos');

  // Busca os clientes
  const carregarPessoas = () => {
    fetch('http://127.0.0.1:8089/Pessoa')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar clientes');
        }
        return response.json();
      })
      .then(json => setData(json))
      .catch(error =>
        console.error('Erro carregar clientes:', error)
      );
  };

  // Busca os prestadores
  const carregarPrestadores = () => {
    fetch('http://127.0.0.1:8089/Prestador')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar prestadores');
        }
        return response.json();
      })
      .then(json => setPrestadores(json))
      .catch(error =>
        console.error('Erro carregar prestadores:', error)
      );
  };

  useEffect(() => {
    carregarPessoas();
    carregarPrestadores();
  }, []);

  // Remove cadastros deletados
  const clientesAtivos = data.filter(
    item => item.deletado !== 'SIM'
  );

  const prestadoresAtivos = prestadores.filter(
    item => item.deletado !== 'SIM'
  );

  // Define quais cadastros serão exibidos
  const cadastrosExibidos = [
    ...(tipoFiltro === 'todos' || tipoFiltro === 'cliente'
      ? clientesAtivos.map(item => ({
          ...item,
          tipoCadastro: 'Cliente'
        }))
      : []),

    ...(tipoFiltro === 'todos' || tipoFiltro === 'prestador'
      ? prestadoresAtivos.map(item => ({
          ...item,
          tipoCadastro: 'Prestador'
        }))
      : [])
  ];

  return (
    <main>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '20px'
        }}
      >
        {/* BOTÃO PARA VOLTAR AO DASHBOARD */}
        <button
          type="button"
          onClick={() => navigate('/admin/dashboard')}
          style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            padding: '10px 16px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ⬅ Voltar para Dashboard
        </button>

        <h2>
          {tipoFiltro === 'cliente'
            ? 'Clientes cadastrados'
            : tipoFiltro === 'prestador'
              ? 'Prestadores cadastrados'
              : 'Pessoas cadastradas'}
        </h2>

        <Link to="/Cadastro/cliente">
          <button>+ Novo Cadastro Cliente</button>
        </Link>

        <Link to="/cadastro/prestador/pro">
          <button>+ Novo Cadastro Prestador</button>
        </Link>

        <Link to="/PesquisaDeletados">
          <button>Visualizar pessoas deletadas</button>
        </Link>
      </div>

      <br />

      {/* FILTRO POR TIPO */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}
      >
        <label htmlFor="tipoFiltro">
          <strong>Filtrar cadastros:</strong>
        </label>

        <select
          id="tipoFiltro"
          value={tipoFiltro}
          onChange={e => setTipoFiltro(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          <option value="todos">Todos</option>
          <option value="cliente">Somente clientes</option>
          <option value="prestador">Somente prestadores</option>
        </select>

        <span>
          Total: {cadastrosExibidos.length}
        </span>
      </div>

      {cpfdigitado && (
        <p
          style={{
            color: 'red',
            marginBottom: '10px'
          }}
        >
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
            {cadastrosExibidos.map(item => (
              <tr
                key={`${item.tipoCadastro}-${item.id}`}
              >
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.cpf}</td>
                <td>{item.telefone}</td>
                <td>{item.email}</td>
                <td>{item.endereco}</td>
                <td>{item.tipoCadastro}</td>

                <td>
                  {item.tipoCadastro === 'Cliente' ? (
                    <Link to={`/Atualizar/cliente/${item.id}`}>
                      <button className="btnAcao">
                        Atualizar
                      </button>
                    </Link>
                  ) : (
                    <Link to={`/Atualizar/prestador/${item.id}`}>
                      <button className="btnAcao">
                        Atualizar
                      </button>
                    </Link>
                  )}

                  <Link to={`/deletar/${item.id}`}>
                    <button className="btnAcao">
                      Deletar
                    </button>
                  </Link>
                </td>
              </tr>
            ))}

            {cadastrosExibidos.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  style={{ textAlign: 'center' }}
                >
                  Nenhum cadastro encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default Index;