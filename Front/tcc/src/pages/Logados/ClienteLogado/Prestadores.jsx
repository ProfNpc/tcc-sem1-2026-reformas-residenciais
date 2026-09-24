import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Prestadores.css';

function Prestadores() {

  const { servico } = useParams();

  const navigate = useNavigate();

  const [prestadores, setPrestadores] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {

    const buscarPrestadores = async () => {

      try {

        setCarregando(true);
        setErro('');

        const resposta = await fetch(
          'http://127.0.0.1:8089/Prestador'
        );

        if (!resposta.ok) {
          throw new Error(
            'Não foi possível carregar os prestadores.'
          );
        }

        const dados = await resposta.json();

        const servicoSelecionado =
          decodeURIComponent(servico).toLowerCase();

        const filtrados = dados.filter((prestador) => {

          return (
            prestador.servico1?.toLowerCase() === servicoSelecionado ||
            prestador.servico2?.toLowerCase() === servicoSelecionado ||
            prestador.servico3?.toLowerCase() === servicoSelecionado
          );

        });

        setPrestadores(filtrados);

      } catch (error) {

        console.error(
          'Erro ao buscar prestadores:',
          error
        );

        setErro(
          'Não foi possível carregar os prestadores.'
        );

      } finally {

        setCarregando(false);

      }

    };

    buscarPrestadores();

  }, [servico]);


  return (

    <main className="prestadores-page">

      <header className="prestadores-header">

        <button
          type="button"
          onClick={() => navigate('/Logados')}
        >
          ← Voltar
        </button>

        <h1>
          Profissionais
        </h1>

      </header>


      <section className="prestadores-conteudo">

        <h2>
          {decodeURIComponent(servico)}
        </h2>

        <p>
          Encontre profissionais disponíveis para
          realizar seu serviço.
        </p>


        {carregando && (

          <div className="prestadores-mensagem">
            Carregando profissionais...
          </div>

        )}


        {!carregando && erro && (

          <div className="prestadores-mensagem erro">
            {erro}
          </div>

        )}


        {!carregando &&
         !erro &&
         prestadores.length === 0 && (

          <div className="prestadores-mensagem">

            <h3>
              Nenhum profissional encontrado
            </h3>

            <p>
              Não encontramos prestadores para este serviço.
            </p>

          </div>

        )}


        {!carregando &&
         !erro &&
         prestadores.length > 0 && (

          <div className="prestadores-grid">

            {prestadores.map((prestador) => (

              <article
                key={prestador.id}
                className="prestador-card"
              >

                <h3>
                  {prestador.nome}
                </h3>

                <p>
                  <strong>Serviço:</strong>{' '}
                  {decodeURIComponent(servico)}
                </p>

                <p>
                  <strong>E-mail:</strong>{' '}
                  {prestador.email}
                </p>

                {/* INFORMAÇÕES COMPLEMENTARES */} 
                {prestador.informacoesComplementares && ( 
                  <div className="prestador-informacoes"> 
                    <strong>Sobre o profissional:</strong> 
                    <p> 
                      {prestador.informacoesComplementares}
                    </p> 
                  </div> 
                )}

                <button
                  type="button"
                  onClick={() => {
                    console.log(
                      'Prestador selecionado:',
                      prestador
                    );
                  }}
                >
                  Solicitar serviço
                </button>

              </article>

            ))}

          </div>

        )}

      </section>

    </main>

  );

}

export default Prestadores;