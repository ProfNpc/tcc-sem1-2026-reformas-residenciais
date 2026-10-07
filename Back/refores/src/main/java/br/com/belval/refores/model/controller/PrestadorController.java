
package br.com.belval.refores.model.controller;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.belval.refores.model.PessoaRepository.PrestadorRepository;
import br.com.belval.refores.model.Prestador;

@RestController
@RequestMapping("/Prestador")
public class PrestadorController {

    @Autowired
    private PrestadorRepository repository;

    /**
     * Retorna todos os prestadores
     */
    @GetMapping
    public ResponseEntity<Iterable<Prestador>> obterPrestadores() {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(repository.findAll());
    }

    /**
     * Cria um novo prestador
     */
    @PostMapping
    public ResponseEntity<Prestador> criarPrestador(
            @RequestBody Prestador prestador) {

        prestador.setDataCriacao(LocalDateTime.now());
        prestador.setDeletado("NAO");

        repository.save(prestador);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(prestador);
    }

    /**
     * Busca prestador pelo ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Object> buscarPorid(
            @PathVariable(value = "id") Integer id) {

        Optional<Prestador> prestadorOpt =
                repository.findById(id);

        if (prestadorOpt.isPresent()) {

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(prestadorOpt.get());
        }

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Prestador não encontrado");
    }

    /**
     * Atualiza somente os dados permitidos do prestador
     */
    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizarPrestador(
            @PathVariable Integer id,
            @RequestBody Prestador prestadorAtualizado) {

        Optional<Prestador> prestadorOpt =
                repository.findById(id);

        if (prestadorOpt.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Prestador não encontrado!");
        }

        Prestador prestador = prestadorOpt.get();

        // Dados que o prestador pode alterar
        prestador.setNome(prestadorAtualizado.getNome());
        prestador.setCep(prestadorAtualizado.getCep());
        prestador.setTelefone(prestadorAtualizado.getTelefone());
        prestador.setEndereco(prestadorAtualizado.getEndereco());
        prestador.setEmail(prestadorAtualizado.getEmail());

        // Dados profissionais que o prestador pode alterar
        prestador.setServico1(prestadorAtualizado.getServico1());
        prestador.setServico2(prestadorAtualizado.getServico2());
        prestador.setServico3(prestadorAtualizado.getServico3());
        prestador.setInformacoesComplementares(
                prestadorAtualizado.getInformacoesComplementares()
        );

        repository.save(prestador);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(prestador);
    }

    /**
     * Exclusão lógica
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> apagarPrestador(
            @PathVariable Integer id) {

        Optional<Prestador> prestadorOpt =
                repository.findById(id);

        if (prestadorOpt.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Prestador não encontrado!");
        }

        Prestador prestador = prestadorOpt.get();

        prestador.setDeletado("SIM");

        repository.save(prestador);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Prestador deletado com sucesso!");
    }
}
