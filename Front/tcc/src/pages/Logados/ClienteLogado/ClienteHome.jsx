import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ClienteHome.css';

function ClienteHome() {

  const navigate = useNavigate();


  // =====================================================
  // PEGA O CLIENTE LOGADO
  // =====================================================

  const usuarioSalvo =
    localStorage.getItem('usuarioLogado');

  const usuario =
    usuarioSalvo
      ? JSON.parse(usuarioSalvo)
      : null;


  // =====================================================
  // SE NÃO ESTIVER LOGADO
  // =====================================================

  if (!usuario || usuario.tipoUsuario !== 'cliente') {

    navigate('/login');

    return null;
  }


  // =====================================================
  // TIPOS DE SERVIÇO
  // =====================================================

  const tiposServico = [
    {
      valor: 'Eletricista',
      icone: '⚡'
    },
    {
      valor: 'Encanador',
      icone: '🚰'
    },
    {
      valor: 'Gesseiro',
      icone: '🧱'
    },
    {
      valor: 'Marceneiro',
      icone: '🪚'
    },
    {
      valor: 'Marido de Aluguel',
      icone: '🔧'
    },
    {
      valor: 'Montador de Móveis',
      icone: '🪑'
    },
    {
      valor: 'Mudanças e Carretos',
      icone: '🚚'
    },
    {
      valor: 'Pedreiro',
      icone: '🧱'
    },
    {
      valor: 'Pintor',
      icone: '🎨'
    },
    {
      valor: 'Serralheiro',
      icone: '🔩'
    },
    {
      valor: 'Tapeceiro',
      icone: '🛋️'
    },
    {
      valor: 'Vidraceiro',
      icone: '🪟'
    }
  ];


  // =====================================================
  // SELECIONAR SERVIÇO
  // =====================================================

  const selecionarServico = (servico) => {

    console.log(
      'Cliente:',
      usuario
    );

    console.log(
      'ID Cliente:',
      usuario.id
    );

    console.log(
      'Serviço selecionado:',
      servico
    );


    navigate(
      `/prestadores/${encodeURIComponent(servico)}`
    );

  };


  // =====================================================
  // LOGOUT
  // =====================================================

  const sair = () => {

    localStorage.removeItem(
      'usuarioLogado'
    );

    navigate('/login');

  };


  return (

    <main className="cliente-home">


      {/* =================================================
          CABEÇALHO
      ================================================= */}

      <header className="cliente-header">


        <div className="cliente-logo">
          Reforma Fácil
        </div>


        <div className="cliente-usuario">

          <span>
            Olá,{' '}

            <strong>
              {usuario.nome}
            </strong>

          </span>


          <button
            type="button"
            onClick={sair}
          >
            Sair
          </button>

        </div>

      </header>


      {/* =================================================
          CONTEÚDO
      ================================================= */}

      <section className="cliente-conteudo">


        <div className="cliente-titulo">

          <h1>
            Encontre o profissional que você precisa
          </h1>

          <p>
            Escolha uma categoria para encontrar
            prestadores de serviços.
          </p>

        </div>


        {/* =================================================
            CATEGORIAS
        ================================================= */}

        <div className="categorias-grid">

          {tiposServico.map((servico) => (

            <button
              key={servico.valor}
              type="button"
              className="categoria-card"
              onClick={() =>
                selecionarServico(servico.valor)
              }
            >

              <span className="categoria-icone">
                {servico.icone}
              </span>

              <span className="categoria-nome">
                {servico.valor}
              </span>

            </button>

          ))}

        </div>


        {/* =================================================
            MEUS PEDIDOS
        ================================================= */}

        <section className="meus-pedidos">


          <div className="pedidos-header">

            <div>

              <h2>
                Meus pedidos
              </h2>

              <p>
                Acompanhe suas solicitações de serviço.
              </p>

            </div>


            <button
              type="button"
              onClick={() =>
                navigate('/meus-pedidos')
              }
              className="botao-pedidos"
            >
              Ver meus pedidos
            </button>

          </div>


          {/* =================================================
              POR ENQUANTO
          ================================================= */}

          <div className="sem-pedidos">

            <div className="sem-pedidos-icone">
              📋
            </div>

            <h3>
              Você ainda não possui pedidos
            </h3>

            <p>
              Escolha uma categoria acima para
              encontrar um profissional.
            </p>

          </div>


        </section>


      </section>


    </main>

  );

}

export default ClienteHome;
