
package br.com.belval.refores.model.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.belval.refores.model.PessoaRepository.UsuariosRepository;
import br.com.belval.refores.model.Usuarios;

@RestController
@RequestMapping("/Usuarios")
@CrossOrigin(origins = "*")
public class UsuariosController {

    private final UsuariosRepository repository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public UsuariosController(UsuariosRepository repository) {
        this.repository = repository;
    }

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

        // Criptografa a senha antes de salvar
        if (usuarios.getSenhaCriada() != null &&
            !usuarios.getSenhaCriada().isEmpty()) {

            usuarios.setSenhaCriada(
                    passwordEncoder.encode(usuarios.getSenhaCriada())
            );
        }

        Usuarios usuarioSalvo = repository.save(usuarios);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(usuarioSalvo);
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<Object> login(
            @RequestBody Usuarios usuarioLogin) {

        if (usuarioLogin.getUsuarioCriado() == null ||
            usuarioLogin.getSenhaCriada() == null) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Usuário e senha são obrigatórios");
        }

        String usuarioDigitado =
                usuarioLogin.getUsuarioCriado();

        String senhaDigitada =
                usuarioLogin.getSenhaCriada();

        Optional<Usuarios> usuarioEncontrado =
                repository.findAll()
                        .stream()
                        .filter(usuario ->
                                usuario.getUsuarioCriado() != null &&
                                usuario.getUsuarioCriado()
                                        .equalsIgnoreCase(usuarioDigitado))
                        .findFirst();

        if (usuarioEncontrado.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Usuário ou senha inválidos");
        }

        Usuarios usuario =
                usuarioEncontrado.get();

        boolean senhaCorreta =
                passwordEncoder.matches(
                        senhaDigitada,
                        usuario.getSenhaCriada()
                );

        if (!senhaCorreta) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Usuário ou senha inválidos");
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(usuario);
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

        // Criptografa a nova senha antes de atualizar
        if (usuarios.getSenhaCriada() != null &&
            !usuarios.getSenhaCriada().isEmpty()) {

            usuarios.setSenhaCriada(
                    passwordEncoder.encode(usuarios.getSenhaCriada())
            );
        }

        Usuarios usuarioAtualizado =
                repository.save(usuarios);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(usuarioAtualizado);
    }

    @PutMapping("/{id}/alterar-senha")
public ResponseEntity<String> alterarSenha(
        @PathVariable Integer id,
        @RequestBody AlterarSenhaRequest dados) {

    Optional<Usuarios> usuarioOpt = repository.findById(id);

    if (usuarioOpt.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Usuário não encontrado.");
    }

    if (dados.getSenhaAtual() == null || dados.getNovaSenha() == null
            || dados.getSenhaAtual().isBlank()
            || dados.getNovaSenha().isBlank()) {
        return ResponseEntity.badRequest()
                .body("Preencha todos os campos.");
    }

    Usuarios usuario = usuarioOpt.get();

    boolean senhaCorreta = passwordEncoder.matches(
            dados.getSenhaAtual(),
            usuario.getSenhaCriada()
    );

    if (!senhaCorreta) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("A senha atual está incorreta.");
    }

    if (passwordEncoder.matches(
            dados.getNovaSenha(),
            usuario.getSenhaCriada())) {
        return ResponseEntity.badRequest()
                .body("A nova senha deve ser diferente da atual.");
    }

    usuario.setSenhaCriada(
            passwordEncoder.encode(dados.getNovaSenha())
    );

    repository.save(usuario);

    return ResponseEntity.ok("Senha alterada com sucesso!");
}

public static class AlterarSenhaRequest {

    private String senhaAtual;
    private String novaSenha;

    public String getSenhaAtual() {
        return senhaAtual;
    }

    public void setSenhaAtual(String senhaAtual) {
        this.senhaAtual = senhaAtual;
    }

    public String getNovaSenha() {
        return novaSenha;
    }

    public void setNovaSenha(String novaSenha) {
        this.novaSenha = novaSenha;
    }
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
