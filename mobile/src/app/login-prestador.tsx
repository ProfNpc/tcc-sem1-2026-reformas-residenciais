import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../colors';

export default function LoginPrestador() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [foto, setFoto] = useState<string | null>(null);

  async function escolherFoto() {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert(
        'Permissão necessária',
        'Precisamos de acesso às suas fotos para definir a imagem de perfil.'
      );
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  }

  async function handleLogin() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha e-mail e senha para continuar.');
      return;
    }

    try {
      setCarregando(true);

      const resposta = await fetch(
        'http://127.0.0.1:8089/Usuarios/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usuarioCriado: email.trim(),
            senhaCriada: senha,
          }),
        }
      );

      if (!resposta.ok) {
        Alert.alert(
          'Login inválido',
          'Confira seu usuário e sua senha.'
        );
        return;
      }

      const usuario = await resposta.json();

      if (
        String(usuario.tipoUsuario).toLowerCase() !== 'prestador' ||
        !usuario.idPrestador
      ) {
        Alert.alert(
          'Acesso negado',
          'Este acesso é exclusivo para prestadores.'
        );
        return;
      }

      router.replace({
        pathname: '/agenda-prestador',
        params: {
          idPrestador: String(usuario.idPrestador),
          nome: usuario.usuarioCriado ?? '',
        },
      });
    } catch (erro) {
      console.error('Erro no login:', erro);

      Alert.alert(
        'Erro de conexão',
        'Não foi possível acessar o servidor. Verifique se o backend está rodando.'
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80',
      }}
      style={styles.fundo}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.logoArea}>
            <TouchableOpacity
              style={styles.fotoContainer}
              onPress={escolherFoto}
            >
              {foto ? (
                <Image source={{ uri: foto }} style={styles.foto} />
              ) : (
                <View style={styles.fotoPlaceholder}>
                  <Text style={styles.fotoPlaceholderTexto}>+</Text>
                </View>
              )}
            </TouchableOpacity>

            <Text style={styles.fotoLegenda}>Adicionar foto</Text>

            <Text style={styles.logo}>
              Reforma<Text style={styles.logoDestaque}>Já</Text>
            </Text>

            <Text style={styles.subtitulo}>Área do profissional</Text>
          </View>

          <View style={styles.cartao}>
            <Text style={styles.label}>E-mail</Text>

            <TextInput
              style={styles.input}
              placeholder="seuemail@exemplo.com"
              placeholderTextColor={COLORS.cinzaClaro}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Senha</Text>

            <TextInput
              style={styles.input}
              placeholder="Sua senha"
              placeholderTextColor={COLORS.cinzaClaro}
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />

            <TouchableOpacity
              style={styles.botaoEntrar}
              onPress={handleLogin}
              disabled={carregando}
            >
              <Text style={styles.textoBotaoEntrar}>
                {carregando ? 'Entrando...' : 'Entrar'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(20,18,15,0.55)',
  },
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 24,
  },
  fotoContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 8,
  },
  foto: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  fotoPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fotoPlaceholderTexto: {
    fontSize: 32,
    color: COLORS.branco,
    fontWeight: '300',
  },
  fotoLegenda: {
    fontSize: 12,
    color: COLORS.branco,
    marginBottom: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.branco,
  },
  logoDestaque: {
    color: COLORS.laranja,
  },
  subtitulo: {
    fontSize: 14,
    color: '#E7E4DE',
    marginTop: 4,
  },
  cartao: {
    width: '100%',
    backgroundColor: COLORS.branco,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.borda,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.preto,
    backgroundColor: COLORS.fundoInput,
  },
  botaoEntrar: {
    backgroundColor: COLORS.navy,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  textoBotaoEntrar: {
    color: COLORS.branco,
    fontSize: 16,
    fontWeight: '600',
  },
});