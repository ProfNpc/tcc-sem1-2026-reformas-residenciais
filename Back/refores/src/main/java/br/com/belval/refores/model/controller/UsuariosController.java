package br.com.belval.refores.model.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.belval.refores.model.Usuarios;
import br.com.belval.refores.model.PessoaRepository.UsuariosRepository;

@RestController
@RequestMapping("/Usuarios")
@CrossOrigin(origins = "*")
public class UsuariosController {

    @Autowired
    private UsuariosRepository repository;

    // LISTAR TODOS OS USUÁRIOS
    @GetMapping
    public ResponseEntity<Iterable<Usuarios>> obterUsuarios() {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(repository.findAll());
    }

    // CRIAR USUÁRIO
    @PostMapping
    public ResponseEntity<Usuarios> criarUsuario(
            @RequestBody Usuarios usuarios) {

        Usuarios usuarioSalvo = repository.save(usuarios);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(usuarioSalvo);
    }

    // BUSCAR USUÁRIO POR ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> buscarPorId(
            @PathVariable Integer id) {

        Optional<Usuarios> usuarioOpt =
                repository.findById(id);

        if (usuarioOpt.isPresent()) {

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(usuarioOpt.get());
        }

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Usuário não encontrado");
    }

    // ATUALIZAR USUÁRIO
    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizarUsuario(
            @PathVariable Integer id,
            @RequestBody Usuarios usuarios) {

        Optional<Usuarios> usuarioOpt =
                repository.findById(id);

        if (usuarioOpt.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Usuário não encontrado!");
        }

        usuarios.setId(id);

        Usuarios usuarioAtualizado =
                repository.save(usuarios);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(usuarioAtualizado);
    }

    // EXCLUIR USUÁRIO
    @DeleteMapping("/{id}")
    public ResponseEntity<String> apagarUsuario(
            @PathVariable Integer id) {

        Optional<Usuarios> usuarioOpt =
                repository.findById(id);

        if (usuarioOpt.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Usuário não encontrado!");
        }

        repository.deleteById(id);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Usuário deletado com sucesso!");
    }
}
