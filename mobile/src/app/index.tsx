import { Redirect } from 'expo-router';

export default function Index() {
  // Por enquanto redireciona direto pro login do prestador.
  // Depois você pode colocar aqui uma checagem de sessão:
  // se já estiver logado, manda pra agenda; senão, pro login.
  return <Redirect href="/login-prestador" />;
}