import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './administradores.css';

const API = 'http://127.0.0.1:8089';

export default function Administradores() {
const navigate = useNavigate();

const [administradores, setAdministradores] = useState([]);
const [carregando, setCarregando] = useState(true);
const [salvando, setSalvando] = useState(false);
const [erro, setErro] = useState('');

const [editando, setEditando] = useState(null);
const [nome, setNome] = useState('');
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');

useEffect(() => {
const usuario = JSON.parse(
localStorage.getItem('usuarioLogado') || 'null'
);

const tipo = String(usuario?.tipoUsuario || '').toLowerCase();

if (!usuario || !['adm', 'administrador'].includes(tipo)) {
  navigate('/login', { replace: true });
  return;
}

carregarAdministradores();

}, [navigate]);

async function carregarAdministradores() {
try {
setCarregando(true);
setErro('');

  const response = await fetch(`${API}/Admin`);

  if (!response.ok) {
    throw new Error('Não foi possível carregar os administradores.');
  }

  const resultado = await response.json();

  setAdministradores(
    Array.isArray(resultado) ? resultado : []
  );
} catch (error) {
  setErro(error.message || 'Erro ao carregar os administradores.');
} finally {
  setCarregando(false);
}

}

function limparFormulario() {
setNome('');
setEmail('');
setSenha('');
setEditando(null);
}

function prepararEdicao(admin) {
setEditando(admin.id);
setNome(admin.nome || '');
setEmail(admin.email || '');
setSenha('');

window.scrollTo({
  top: 0,
  behavior: 'smooth'
});

}

async function salvarAdministrador(event) {
event.preventDefault();

setErro('');

if (!nome.trim() || !email.trim()) {
  setErro('Preencha o nome e o e-mail ou usuário.');
  return;
}

if (!editando && !senha.trim()) {
  setErro('Informe uma senha para o novo administrador.');
  return;
}

const dados = {
  nome: nome.trim(),
  email: email.trim(),
  senha: senha
};

try {
  setSalvando(true);

  const response = await fetch(
    editando
      ? `${API}/Admin/${editando}`
      : `${API}/Admin`,
    {
      method: editando ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    }
  );

  if (!response.ok) {
    const mensagem = await response.text();

    throw new Error(
      mensagem || 'Não foi possível salvar o administrador.'
    );
  }

  alert(
    editando
      ? 'Administrador atualizado com sucesso!'
      : 'Administrador cadastrado com sucesso!'
  );

  limparFormulario();
  await carregarAdministradores();

} catch (error) {
  setErro(error.message || 'Erro ao salvar administrador.');
} finally {
  setSalvando(false);
}

}

async function excluirAdministrador(admin) {
const principal =
String(admin.email || '').toLowerCase() === 'admin';

if (principal) {
  alert('O administrador principal não pode ser excluído.');
  return;
}

const confirmar = window.confirm(
  `Deseja realmente excluir o administrador ${admin.nome}?`
);

if (!confirmar) return;

try {
  setErro('');

  const response = await fetch(
    `${API}/Admin/${admin.id}`,
    {
      method: 'DELETE'
    }
  );

  if (!response.ok) {
    const mensagem = await response.text();

    throw new Error(
      mensagem || 'Não foi possível excluir o administrador.'
    );
  }

  alert('Administrador excluído com sucesso!');

  await carregarAdministradores();

} catch (error) {
  setErro(error.message || 'Erro ao excluir administrador.');
}

}

return (
<main className="admins-page">

  <header className="admins-header">
    <div>
      <p className="admins-eyebrow">REFORMA FÁCIL</p>
      <h1>Gerenciar administradores</h1>
      <p>Cadastre e gerencie os administradores da plataforma.</p>
    </div>

    <button
      type="button"
      className="admins-button secondary"
      onClick={() => navigate('/admin/dashboard')}
    >
      Voltar ao dashboard
    </button>
  </header>

  <section className="admins-form-section">

    <h2>
      {editando
        ? 'Editar administrador'
        : 'Cadastrar administrador'}
    </h2>

    <form
      className="admins-form"
      onSubmit={salvarAdministrador}
    >

      <div className="admins-field">
        <label htmlFor="admin-nome">Nome</label>

        <input
          id="admin-nome"
          type="text"
          placeholder="Nome do administrador"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          required
        />
      </div>

      <div className="admins-field">
        <label htmlFor="admin-email">E-mail ou usuário</label>

        <input
          id="admin-email"
          type="text"
          placeholder="E-mail ou usuário"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="admins-field">
        <label htmlFor="admin-senha">
          Senha
          {editando && ' (deixe em branco para manter a atual)'}
        </label>

        <input
          id="admin-senha"
          type="password"
          placeholder="Senha do administrador"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
          required={!editando}
        />
      </div>

      <div className="admins-form-actions">

        <button
          type="submit"
          className="admins-button"
          disabled={salvando}
        >
          {salvando
            ? 'Salvando...'
            : editando
              ? 'Salvar alterações'
              : 'Cadastrar administrador'}
        </button>

        {editando && (
          <button
            type="button"
            className="admins-button secondary"
            onClick={limparFormulario}
          >
            Cancelar edição
          </button>
        )}

      </div>
    </form>

    {erro && (
      <p className="admins-error">{erro}</p>
    )}

  </section>

  <section className="admins-list-section">

    <div className="admins-list-header">
      <h2>Administradores cadastrados</h2>

      <button
        type="button"
        className="admins-button secondary"
        onClick={carregarAdministradores}
      >
        Atualizar lista
      </button>
    </div>

    {carregando ? (
      <p className="admins-message">
        Carregando administradores...
      </p>
    ) : administradores.length === 0 ? (
      <p className="admins-message">
        Nenhum administrador cadastrado.
      </p>
    ) : (

      <div className="admins-table-wrapper">

        <table className="admins-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail ou usuário</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>

            {administradores.map((admin) => {
              const principal =
                String(admin.email || '').toLowerCase() === 'admin';

              return (
                <tr key={admin.id}>

                  <td>{admin.id}</td>

                  <td>
                    {admin.nome}

                    {principal && (
                      <span className="admins-principal">
                        Principal
                      </span>
                    )}
                  </td>

                  <td>{admin.email}</td>

                  <td>
                    <div className="admins-actions">

                      <button
                        type="button"
                        className="admins-button edit"
                        onClick={() => prepararEdicao(admin)}
                      >
                        Editar
                      </button>

                      {!principal && (
                        <button
                          type="button"
                          className="admins-button danger"
                          onClick={() => excluirAdministrador(admin)}
                        >
                          Excluir
                        </button>
                      )}

                    </div>
                  </td>

                </tr>
              );
            })}

          </tbody>
        </table>

      </div>
    )}

  </section>

</main>

);
}