package br.com.belval.refores.model.controller;

import java.util.Optional;

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
import br.com.belval.refores.model.PessoaRepository.PedidosRepository;

@RestController
@RequestMapping("/Pedidos")
@CrossOrigin(origins = "*")
public class PedidosController {

    @Autowired
    private PedidosRepository repository;

    // LISTAR TODOS OS PEDIDOS
    @GetMapping
    public ResponseEntity<Iterable<Pedidos>> obterPedidos() {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(repository.findAll());
    }

    // CRIAR PEDIDO
    @PostMapping
    public ResponseEntity<Pedidos> criarPedido(
            @RequestBody Pedidos pedidos) {

        pedidos.setStatus("PENDENTE");

        Pedidos pedidoSalvo =
                repository.save(pedidos);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(pedidoSalvo);
    }

    // BUSCAR PEDIDO POR ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> buscarPorId(
            @PathVariable Integer id) {

        Optional<Pedidos> pedidoOpt =
                repository.findById(id);

        if (pedidoOpt.isPresent()) {

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(pedidoOpt.get());
        }

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Pedido não encontrado");
    }

    // ATUALIZAR PEDIDO
    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizarPedido(
            @PathVariable Integer id,
            @RequestBody Pedidos pedidos) {

        Optional<Pedidos> pedidoOpt =
                repository.findById(id);

        if (pedidoOpt.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Pedido não encontrado!");
        }

        pedidos.setId(id);

        Pedidos pedidoAtualizado =
                repository.save(pedidos);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(pedidoAtualizado);
    }

    // EXCLUIR PEDIDO
    @DeleteMapping("/{id}")
    public ResponseEntity<String> apagarPedido(
            @PathVariable Integer id) {

        Optional<Pedidos> pedidoOpt =
                repository.findById(id);

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