package br.com.belval.refores.model.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.belval.refores.model.Pedidos;
import br.com.belval.refores.model.Pessoa;
import br.com.belval.refores.model.PessoaRepository.PedidosRepository;
import br.com.belval.refores.model.PessoaRepository.PessoaRepository;

@RestController
@RequestMapping("/Pedidos")
@CrossOrigin(origins = "*")
public class PedidosController {

    @Autowired
    private PedidosRepository repository;

    @Autowired
    private PessoaRepository pessoaRepository;

    // MONTAR PEDIDO COM OS DADOS DO CLIENTE
    private Map<String, Object> montarDetalhesPedido(Pedidos pedido) {

        Map<String, Object> resultado = new HashMap<>();

        resultado.put("id", pedido.getId());
        resultado.put("idCliente", pedido.getIdCliente());
        resultado.put("idPrestador", pedido.getIdPrestador());
        resultado.put("servico", pedido.getServico());
        resultado.put("whatsappCliente", pedido.getWhatsappCliente());
        resultado.put("whatsappPrestador", pedido.getWhatsappPrestador());
        resultado.put("codigoAtendimento", pedido.getCodigoAtendimento());
        resultado.put("descricao", pedido.getDescricao());
        resultado.put("endereco", pedido.getEndereco());
        resultado.put("dataDesejada", pedido.getDataDesejada());
        resultado.put("observacoes", pedido.getObservacoes());
        resultado.put("status", pedido.getStatus());

        if (pedido.getIdCliente() != null) {

            Optional<Pessoa> pessoaOpt =
                    pessoaRepository.findById(pedido.getIdCliente());

            if (pessoaOpt.isPresent()) {

                Pessoa pessoa = pessoaOpt.get();

                resultado.put("nomeCliente", pessoa.getNome());
                resultado.put("telefoneCliente", pessoa.getTelefone());

            } else {

                resultado.put(
                        "nomeCliente",
                        "Cliente #" + pedido.getIdCliente()
                );

                resultado.put(
                        "telefoneCliente",
                        pedido.getWhatsappCliente()
                );
            }

        } else {

            resultado.put("nomeCliente", "Cliente não identificado");
            resultado.put("telefoneCliente", pedido.getWhatsappCliente());
        }

        return resultado;
    }

    // LISTAR TODOS OS PEDIDOS COM DADOS DO CLIENTE
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> obterPedidos() {

        Iterable<Pedidos> pedidos = repository.findAll();

        List<Map<String, Object>> resultado = new ArrayList<>();

        for (Pedidos pedido : pedidos) {
            resultado.add(montarDetalhesPedido(pedido));
        }

        return ResponseEntity.status(HttpStatus.OK).body(resultado);
    }

    // CRIAR PEDIDO
    @PostMapping
    public ResponseEntity<Pedidos> criarPedido(
            @RequestBody Pedidos pedidos) {

        pedidos.setStatus("PENDENTE");

        Pedidos pedidoSalvo = repository.save(pedidos);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(pedidoSalvo);
    }

    // BUSCAR PEDIDO POR ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> buscarPorId(
            @PathVariable Integer id) {

        Optional<Pedidos> pedidoOpt = repository.findById(id);

        if (pedidoOpt.isPresent()) {


                    return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(montarDetalhesPedido(pedidoOpt.get()));
        }

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Pedido não encontrado");
    }

    // BUSCAR DETALHES DO PEDIDO
    @GetMapping("/{id}/detalhes")
    public ResponseEntity<Object> obterDetalhesPedido(
            @PathVariable Integer id) {

        Optional<Pedidos> pedidoOpt = repository.findById(id);

        if (pedidoOpt.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Pedido não encontrado!");
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(montarDetalhesPedido(pedidoOpt.get()));
    }

    // ACEITAR PEDIDO
    @PutMapping("/{id}/aceitar")
    public ResponseEntity<Object> aceitarPedido(
            @PathVariable Integer id,
            @RequestBody Pedidos dados) {

        Optional<Pedidos> pedidoOpt = repository.findById(id);

        if (pedidoOpt.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Pedido não encontrado!");
        }

        Pedidos pedido = pedidoOpt.get();

        if (!"PENDENTE".equals(pedido.getStatus())) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Somente pedidos pendentes podem ser aceitos!");
        }

        if (dados.getWhatsappPrestador() == null
                || dados.getWhatsappPrestador().trim().isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Informe o WhatsApp do prestador!");
        }

        pedido.setWhatsappPrestador(dados.getWhatsappPrestador());

        String codigo = "RF-" +
                UUID.randomUUID()
                        .toString()
                        .substring(0, 6)
                        .toUpperCase();

        pedido.setCodigoAtendimento(codigo);
        pedido.setStatus("ACEITO");

        Pedidos pedidoAtualizado = repository.save(pedido);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(montarDetalhesPedido(pedidoAtualizado));
    }

    // ENCERRAR PEDIDO
    @PutMapping("/{id}/encerrar")
    public ResponseEntity<Object> encerrarPedido(
            @PathVariable Integer id,
            @RequestBody Pedidos dados) {

        Optional<Pedidos> pedidoOpt = repository.findById(id);

        if (pedidoOpt.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Pedido não encontrado!");
        }

        Pedidos pedido = pedidoOpt.get();

        if (!"ACEITO".equals(pedido.getStatus())) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Somente pedidos aceitos podem ser encerrados!");
        }

        if (dados.getObservacoes() == null
                || dados.getObservacoes().trim().isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Informe uma observação para encerrar o pedido!");
        }

        pedido.setObservacoes(dados.getObservacoes());
        pedido.setStatus("ENCERRADO");

        Pedidos pedidoAtualizado = repository.save(pedido);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(montarDetalhesPedido(pedidoAtualizado));
    }

    // ATUALIZAR PEDIDO
    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizarPedido(
            @PathVariable Integer id,
            @RequestBody Pedidos dados) {

        Optional<Pedidos> pedidoOpt = repository.findById(id);

        if (pedidoOpt.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Pedido não encontrado!");
        }

        Pedidos pedido = pedidoOpt.get();

        if (dados.getIdCliente() != null) {
            pedido.setIdCliente(dados.getIdCliente());
        }

        if (dados.getIdPrestador() != null) {
            pedido.setIdPrestador(dados.getIdPrestador());
        }

        if (dados.getServico() != null) {
            pedido.setServico(dados.getServico());
        }

        if (dados.getWhatsappCliente() != null) {
            pedido.setWhatsappCliente(dados.getWhatsappCliente());
        }

        if (dados.getWhatsappPrestador() != null) {
            pedido.setWhatsappPrestador(dados.getWhatsappPrestador());
        }

        if (dados.getCodigoAtendimento() != null) {
            pedido.setCodigoAtendimento(dados.getCodigoAtendimento());
        }

        if (dados.getDescricao() != null) {
            pedido.setDescricao(dados.getDescricao());
        }

        if (dados.getEndereco() != null) {
            pedido.setEndereco(dados.getEndereco());
        }

        if (dados.getDataDesejada() != null) {
            pedido.setDataDesejada(dados.getDataDesejada());
        }

        if (dados.getObservacoes() != null) {
            pedido.setObservacoes(dados.getObservacoes());
        }

        if (dados.getStatus() != null) {
            pedido.setStatus(dados.getStatus());
        }

        Pedidos pedidoAtualizado = repository.save(pedido);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(montarDetalhesPedido(pedidoAtualizado));
    }

    // EXCLUIR PEDIDO
    @DeleteMapping("/{id}")
    public ResponseEntity<String> apagarPedido(
            @PathVariable Integer id) {

        Optional<Pedidos> pedidoOpt = repository.findById(id);

        if (pedidoOpt.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Pedido não encontrado!");
        }

        repository.deleteById(id);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Pedido deletado com sucesso!");
    }
}