import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../colors';

const API_URL = 'http://127.0.0.1:8089';

type StatusAgendamento =
  | 'pendente'
  | 'confirmado'
  | 'concluido'
  | 'recusado';

type PedidoAPI = {
  id: number;
  idCliente: number;
  idPrestador: number;
  nomeCliente?: string;
  telefoneCliente?: string;
  servico: string;
  whatsappCliente?: string;
  whatsappPrestador?: string;
  codigoAtendimento?: string;
  descricao?: string;
  endereco?: string;
  dataDesejada?: string;
  observacoes?: string;
  status: string;
};

type Agendamento = {
  id: string;
  cliente: string;
  servico: string;
  data: string;
  descricao: string;
  endereco: string;
  observacoes: string;
  status: StatusAgendamento;
  pedido: PedidoAPI;
};

type AcaoPedido = 'aceitar' | 'recusar' | 'encerrar' | null;

const STATUS_CONFIG: Record<
  StatusAgendamento,
  { cor: string; texto: string }
> = {
  pendente: {
    cor: COLORS.statusPendente,
    texto: 'Pendente',
  },
  confirmado: {
    cor: COLORS.statusConfirmado,
    texto: 'Aceito',
  },
  concluido: {
    cor: COLORS.statusConcluido,
    texto: 'Concluído',
  },
  recusado: {
    cor: '#B42318',
    texto: 'Recusado',
  },
};

function converterStatus(status: string): StatusAgendamento {
  switch (status?.toUpperCase()) {
    case 'ACEITO':
      return 'confirmado';

    case 'CONCLUIDO':
    case 'ENCERRADO':
      return 'concluido';

    case 'RECUSADO':
      return 'recusado';

    default:
      return 'pendente';
  }
}

function formatarData(data?: string) {
  if (!data) return 'Data não informada';

  const partes = data.split('-');

  if (partes.length === 3) {
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  return data;
}

function converterPedido(pedido: PedidoAPI): Agendamento {
  return {
    id: String(pedido.id),
    cliente:
      pedido.nomeCliente?.trim() ||
      `Cliente #${pedido.idCliente}`,
    servico: pedido.servico || 'Serviço não informado',
    data: formatarData(pedido.dataDesejada),
    descricao: pedido.descricao || '',
    endereco: pedido.endereco || '',
    observacoes: pedido.observacoes || '',
    status: converterStatus(pedido.status),
    pedido,
  };
}

export default function AgendaPrestador() {
  const { idPrestador, nome } = useLocalSearchParams<{
    idPrestador: string;
    nome?: string;
  }>();

  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [atualizando, setAtualizando] = useState(false);

  const [pedidoSelecionado, setPedidoSelecionado] =
    useState<Agendamento | null>(null);

  const [acao, setAcao] = useState<AcaoPedido>(null);

  const [whatsappPrestador, setWhatsappPrestador] = useState('');
  const [motivoRecusa, setMotivoRecusa] = useState('');
  const [observacaoEncerramento, setObservacaoEncerramento] =
    useState('');

  // SAIR DA CONTA
  function sair() {
    router.replace('/login-prestador');
  }

  // CARREGAR PEDIDOS
  const carregarPedidos = useCallback(
    async (mostrarCarregamento = true) => {
      if (!idPrestador) {
        setErro(true);
        setCarregando(false);
        return;
      }

      try {
        if (mostrarCarregamento) {
          setCarregando(true);
        }

        setErro(false);

        const resposta = await fetch(`${API_URL}/Pedidos`);

        if (!resposta.ok) {
          throw new Error('Não foi possível carregar os pedidos.');
        }

        const pedidos: PedidoAPI[] = await resposta.json();

        const pedidosPrestador = pedidos
          .filter(
            (pedido) =>
              Number(pedido.idPrestador) === Number(idPrestador)
          )
          .map(converterPedido);

        setAgendamentos(pedidosPrestador);
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
        setErro(true);
      } finally {
        setCarregando(false);
        setAtualizando(false);
      }
    },
    [idPrestador]
  );

  useEffect(() => {
    carregarPedidos();
  }, [carregarPedidos]);

  // ABRIR MODAL
  function abrirAcao(
    pedido: Agendamento,
    tipo: Exclude<AcaoPedido, null>
  ) {
    setPedidoSelecionado(pedido);
    setAcao(tipo);

    setWhatsappPrestador(
      pedido.pedido.whatsappPrestador || ''
    );

    setMotivoRecusa('');
    setObservacaoEncerramento('');
  }

  // FECHAR MODAL
  function fecharModal() {
    setAcao(null);
    setPedidoSelecionado(null);
    setWhatsappPrestador('');
    setMotivoRecusa('');
    setObservacaoEncerramento('');
  }

  // ACEITAR, RECUSAR OU ENCERRAR PEDIDO
  async function atualizarStatus() {
    if (!pedidoSelecionado || !acao) return;

    if (
      Number(pedidoSelecionado.pedido.idPrestador) !==
      Number(idPrestador)
    ) {
      Alert.alert(
        'Erro',
        'Este pedido não pertence ao seu cadastro.'
      );
      return;
    }

    if (acao === 'aceitar' && !whatsappPrestador.trim()) {
      Alert.alert(
        'Atenção',
        'Informe seu WhatsApp para aceitar o pedido.'
      );
      return;
    }

    if (acao === 'recusar' && !motivoRecusa.trim()) {
      Alert.alert(
        'Atenção',
        'Informe o motivo da recusa.'
      );
      return;
    }

    if (
      acao === 'encerrar' &&
      !observacaoEncerramento.trim()
    ) {
      Alert.alert(
        'Atenção',
        'Informe uma observação sobre a conclusão do serviço.'
      );
      return;
    }

    const pedidoOriginal = pedidoSelecionado.pedido;
    const acaoAtual = acao;

    let url = '';
    let corpo: object = {};

    // ACEITAR PEDIDO
    if (acaoAtual === 'aceitar') {
      url = `${API_URL}/Pedidos/${pedidoOriginal.id}/aceitar`;

      corpo = {
        whatsappPrestador: whatsappPrestador.trim(),
      };
    }

    // RECUSAR PEDIDO
    if (acaoAtual === 'recusar') {
      url = `${API_URL}/Pedidos/${pedidoOriginal.id}`;

      const observacoesAnteriores =
        pedidoOriginal.observacoes?.trim() || '';

      const novasObservacoes = observacoesAnteriores
        ? `${observacoesAnteriores}\nMotivo da recusa: ${motivoRecusa.trim()}`
        : `Motivo da recusa: ${motivoRecusa.trim()}`;

      corpo = {
        ...pedidoOriginal,
        observacoes: novasObservacoes,
        status: 'RECUSADO',
      };
    }

    // ENCERRAR PEDIDO
    if (acaoAtual === 'encerrar') {
      url = `${API_URL}/Pedidos/${pedidoOriginal.id}/encerrar`;

      corpo = {
        observacoes: observacaoEncerramento.trim(),
      };
    }

    try {
      setAtualizando(true);

      const resposta = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(corpo),
      });

      if (!resposta.ok) {
        const mensagem = await resposta.text();

        throw new Error(
          mensagem || 'Não foi possível atualizar o pedido.'
        );
      }

      fecharModal();

      await carregarPedidos(false);

      const mensagens = {
        aceitar: 'Pedido aceito com sucesso!',
        recusar: 'Pedido recusado com sucesso!',
        encerrar: 'Serviço encerrado com sucesso!',
      };

      Alert.alert('Sucesso', mensagens[acaoAtual]);

    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);

      Alert.alert(
        'Erro',
        error instanceof Error
          ? error.message
          : 'Não foi possível atualizar o pedido. Tente novamente.'
      );
    } finally {
      setAtualizando(false);
    }
  }

  // EXIBIR PEDIDOS
  function renderItem({ item }: { item: Agendamento }) {
    const status = STATUS_CONFIG[item.status];

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.95}
        onPress={() => {
          const detalhes = [
            `Cliente: ${item.cliente}`,

            item.pedido.telefoneCliente
              ? `Telefone: ${item.pedido.telefoneCliente}`
              : item.pedido.whatsappCliente
                ? `WhatsApp: ${item.pedido.whatsappCliente}`
                : '',

            `Serviço: ${item.servico}`,

            `Data desejada: ${item.data}`,

            item.descricao
              ? `Descrição: ${item.descricao}`
              : '',

            item.endereco
              ? `Endereço: ${item.endereco}`
              : '',

            item.observacoes
              ? `Observações: ${item.observacoes}`
              : '',

            item.pedido.codigoAtendimento
              ? `Código de atendimento: ${item.pedido.codigoAtendimento}`
              : '',
          ]
            .filter(Boolean)
            .join('\n\n');

          Alert.alert('Detalhes do pedido', detalhes);
        }}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cliente}>
            {item.cliente}
          </Text>

          <View
            style={[
              styles.badge,
              { backgroundColor: status.cor },
            ]}
          >
            <Text style={styles.badgeTexto}>
              {status.texto}
            </Text>
          </View>
        </View>

        {item.pedido.telefoneCliente ||
        item.pedido.whatsappCliente ? (
          <Text style={styles.detalhe}>
            Telefone:{' '}
            {item.pedido.telefoneCliente ||
              item.pedido.whatsappCliente}
          </Text>
        ) : null}

        <Text style={styles.servico}>
          {item.servico}
        </Text>

        {item.descricao ? (
          <Text style={styles.detalhe}>
            Descrição: {item.descricao}
          </Text>
        ) : null}

        {item.endereco ? (
          <Text style={styles.detalhe}>
            Endereço: {item.endereco}
          </Text>
        ) : null}

        {item.pedido.codigoAtendimento ? (
          <Text style={styles.codigo}>
            Código de atendimento:{' '}
            {item.pedido.codigoAtendimento}
          </Text>
        ) : null}

        <View style={styles.cardFooter}>
          <Text style={styles.dataHora}>
            Data desejada: {item.data}
          </Text>
        </View>

        {/* AÇÕES PARA PEDIDOS PENDENTES */}
        {item.status === 'pendente' ? (
          <View style={styles.acoes}>
            <TouchableOpacity
              style={[
                styles.botaoAcao,
                styles.botaoAceitar,
              ]}
              onPress={() => abrirAcao(item, 'aceitar')}
              disabled={atualizando}
            >
              <Text style={styles.textoBotaoAcao}>
                Aceitar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.botaoAcao,
                styles.botaoRecusar,
              ]}
              onPress={() => abrirAcao(item, 'recusar')}
              disabled={atualizando}
            >
              <Text style={styles.textoBotaoAcao}>
                Recusar
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* AÇÃO PARA PEDIDOS ACEITOS */}
        {item.status === 'confirmado' ? (
          <TouchableOpacity
            style={[
              styles.botaoAcao,
              styles.botaoConcluir,
            ]}
            onPress={() => abrirAcao(item, 'encerrar')}
            disabled={atualizando}
          >
            <Text style={styles.textoBotaoAcao}>
              Encerrar serviço
            </Text>
          </TouchableOpacity>
        ) : null}

        <Text style={styles.toqueDetalhes}>
          Toque no pedido para ver os detalhes
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* CABEÇALHO COM BOTÃO SAIR */}
      <View style={styles.header}>
        <View style={styles.headerSuperior}>

          <View style={styles.headerTexto}>
            <Text style={styles.titulo}>
              Minha Agenda
            </Text>

            {nome ? (
              <Text style={styles.nomePrestador}>
                Olá, {nome}
              </Text>
            ) : null}

            <Text style={styles.subtitulo}>
              {agendamentos.length} pedido(s)
            </Text>
          </View>

          <TouchableOpacity
            style={styles.botaoSair}
            onPress={sair}
            activeOpacity={0.5}
          >
            <Text style={styles.textoBotaoSair}>
              Sair
            </Text>
          </TouchableOpacity>

        </View>
      </View>

      {/* CARREGAMENTO E LISTAGEM */}
      {carregando ? (
        <View style={styles.estado}>
          <ActivityIndicator
            size="large"
            color={COLORS.navy}
          />

          <Text style={styles.mensagemEstado}>
            Carregando pedidos...
          </Text>
        </View>
      ) : erro ? (
        <View style={styles.estado}>
          <Text style={styles.mensagemEstado}>
            Não foi possível carregar os pedidos.
          </Text>

          <TouchableOpacity
            style={styles.botaoTentar}
            onPress={() => carregarPedidos()}
          >
            <Text style={styles.textoBotaoTentar}>
              Tentar novamente
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={agendamentos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
          refreshing={atualizando}
          onRefresh={() => carregarPedidos(false)}
          ListEmptyComponent={
            <Text style={styles.vazio}>
              Nenhum pedido por aqui ainda.
            </Text>
          }
        />
      )}

      {/* MODAL DE ACEITAR, RECUSAR E ENCERRAR */}
      <Modal
        visible={acao !== null}
        transparent
        animationType="fade"
        onRequestClose={fecharModal}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalCartao}>

            <Text style={styles.modalTitulo}>
              {acao === 'aceitar'
                ? 'Aceitar pedido'
                : acao === 'recusar'
                  ? 'Recusar pedido'
                  : 'Encerrar serviço'}
            </Text>

            <Text style={styles.modalDescricao}>
              {acao === 'aceitar'
                ? 'Informe seu WhatsApp para que o cliente possa entrar em contato.'
                : acao === 'recusar'
                  ? 'Informe o motivo da recusa. Essa informação será salva nas observações do pedido.'
                  : 'Informe uma observação sobre o serviço realizado antes de encerrá-lo.'}
            </Text>

            {/* CAMPO WHATSAPP */}
            {acao === 'aceitar' ? (
              <TextInput
                style={styles.modalInput}
                placeholder="DDD + número do WhatsApp"
                placeholderTextColor={COLORS.cinzaClaro}
                keyboardType="phone-pad"
                value={whatsappPrestador}
                onChangeText={setWhatsappPrestador}
                editable={!atualizando}
              />
            ) : null}

            {/* CAMPO MOTIVO DA RECUSA */}
            {acao === 'recusar' ? (
              <TextInput
                style={[
                  styles.modalInput,
                  styles.inputMultilinha,
                ]}
                placeholder="Motivo da recusa"
                placeholderTextColor={COLORS.cinzaClaro}
                value={motivoRecusa}
                onChangeText={setMotivoRecusa}
                multiline
                textAlignVertical="top"
                editable={!atualizando}
              />
            ) : null}

            {/* CAMPO OBSERVAÇÃO DO ENCERRAMENTO */}
            {acao === 'encerrar' ? (
              <TextInput
                style={[
                  styles.modalInput,
                  styles.inputMultilinha,
                ]}
                placeholder="Descreva a conclusão do serviço"
                placeholderTextColor={COLORS.cinzaClaro}
                value={observacaoEncerramento}
                onChangeText={setObservacaoEncerramento}
                multiline
                textAlignVertical="top"
                editable={!atualizando}
              />
            ) : null}

            {/* BOTÕES DO MODAL */}
            <View style={styles.modalAcoes}>
              <TouchableOpacity
                style={[
                  styles.modalBotao,
                  styles.modalCancelar,
                ]}
                onPress={fecharModal}
                disabled={atualizando}
              >
                <Text style={styles.modalTextoCancelar}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalBotao,
                  acao === 'aceitar'
                    ? styles.botaoAceitar
                    : acao === 'recusar'
                      ? styles.botaoRecusar
                      : styles.botaoConcluir,
                ]}
                onPress={atualizarStatus}
                disabled={atualizando}
              >
                {atualizando ? (
                  <ActivityIndicator
                    color={COLORS.branco}
                  />
                ) : (
                  <Text style={styles.textoBotaoAcao}>
                    {acao === 'aceitar'
                      ? 'Confirmar'
                      : acao === 'recusar'
                        ? 'Recusar'
                        : 'Encerrar serviço'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

// ESTILIZAÇÃO
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.branco,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: COLORS.navy,
  },

  headerSuperior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTexto: {
    flex: 1,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.branco,
  },

  nomePrestador: {
    fontSize: 15,
    color: COLORS.branco,
    marginTop: 6,
  },

  subtitulo: {
    fontSize: 14,
    color: '#C7D2E3',
    marginTop: 4,
  },

  botaoSair: {
    backgroundColor: '#B42318',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 10,
  },

  textoBotaoSair: {
    color: COLORS.branco,
    fontSize: 14,
    fontWeight: 'bold',
  },

  lista: {
    padding: 16,
    flexGrow: 1,
  },

  card: {
    backgroundColor: COLORS.fundoInput,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },

  cliente: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.preto,
  },

  badge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  badgeTexto: {
    color: COLORS.branco,
    fontSize: 12,
    fontWeight: '600',
  },

  servico: {
    fontSize: 14,
    color: '#444',
    marginTop: 8,
    fontWeight: '600',
  },

  detalhe: {
    fontSize: 13,
    color: '#555',
    marginTop: 8,
  },

  codigo: {
    fontSize: 14,
    color: COLORS.navy,
    fontWeight: 'bold',
    marginTop: 10,
  },

  cardFooter: {
    marginTop: 10,
  },

  dataHora: {
    fontSize: 13,
    color: COLORS.laranja,
    fontWeight: '600',
  },

  acoes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },

  botaoAcao: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },

  botaoAceitar: {
    backgroundColor: COLORS.navy,
  },

  botaoRecusar: {
    backgroundColor: '#B42318',
  },

  botaoConcluir: {
    backgroundColor: '#247A45',
  },

  textoBotaoAcao: {
    color: COLORS.branco,
    fontSize: 14,
    fontWeight: '600',
  },

  toqueDetalhes: {
    fontSize: 12,
    color: COLORS.cinzaClaro,
    marginTop: 10,
  },

  vazio: {
    textAlign: 'center',
    color: COLORS.cinzaClaro,
    marginTop: 40,
  },

  estado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  mensagemEstado: {
    color: COLORS.cinzaClaro,
    textAlign: 'center',
    marginTop: 12,
  },

  botaoTentar: {
    backgroundColor: COLORS.navy,
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginTop: 16,
  },

  textoBotaoTentar: {
    color: COLORS.branco,
    fontWeight: '600',
  },

  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    padding: 24,
  },

  modalCartao: {
    backgroundColor: COLORS.branco,
    borderRadius: 16,
    padding: 22,
  },

  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.preto,
  },

  modalDescricao: {
    fontSize: 14,
    color: '#555',
    lineHeight: 21,
    marginTop: 10,
    marginBottom: 16,
  },

  modalInput: {
    borderWidth: 1,
    borderColor: COLORS.borda,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.preto,
    backgroundColor: COLORS.fundoInput,
  },

  inputMultilinha: {
    minHeight: 100,
  },

  modalAcoes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },

  modalBotao: {
    flex: 1,
    minHeight: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  modalCancelar: {
    backgroundColor: '#EEEEEE',
  },

  modalTextoCancelar: {
    color: COLORS.preto,
    fontWeight: '600',
  },
});