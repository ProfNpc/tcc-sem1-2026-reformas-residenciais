import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import CadastroPrestador from './pages/Cadastro/CadastroPrestador'
import PesquisaGeral from './pages/PesquisaGeral'
import PesquisaDeletados from './pages/PesquisaDeletados'
import Deletar from './pages/Deletar'
import Atualizar from './pages/Atualizar'

export default function Rotas({ Home }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/PesquisaGeral"
        element={<PesquisaGeral />}
      />

      <Route
        path="/PesquisaDeletados"
        element={<PesquisaDeletados />}
      />

      <Route
        path="/cadastro/:tipo"
        element={<Cadastro />}
      />

      <Route
        path="/cadastro/prestador/:tipo"
        element={<CadastroPrestador />}
      />

      <Route
        path="/deletar/:id"
        element={<Deletar />}
      />

      <Route
        path="/atualizar/:id"
        element={<Atualizar />}
      />
    </Routes>
  )
}