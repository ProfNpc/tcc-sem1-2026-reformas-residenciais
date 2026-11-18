
package br.com.belval.refores.model.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import br.com.belval.refores.model.Admin;
import br.com.belval.refores.model.PessoaRepository.AdminRepository;

@RestController
@RequestMapping("/Admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminRepository repository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public AdminController(AdminRepository repository) {
        this.repository = repository;
    }

    // RETORNA DADOS SEM EXPOR A SENHA
    private Map<String, Object> dadosAdmin(Admin admin) {

        Map<String, Object> dados = new HashMap<>();

        dados.put("id", admin.getId());
        dados.put("nome", admin.getNome());
        dados.put("email", admin.getEmail());

        return dados;
    }

    // LISTAR ADMINISTRADORES
    @GetMapping
    public ResponseEntity<?> obterAdmins() {

        return ResponseEntity.ok(
                repository.findAll()
                        .stream()
                        .map(this::dadosAdmin)
                        .toList()
        );
    }

    // CADASTRAR ADMINISTRADOR
    @PostMapping
    public ResponseEntity<?> criarAdmin(@RequestBody Admin admin) {

        if (admin.getNome() == null ||
            admin.getEmail() == null ||
            admin.getSenha() == null ||
            admin.getNome().isBlank() ||
            admin.getEmail().isBlank() ||
            admin.getSenha().isBlank()) {

            return ResponseEntity.badRequest()
                    .body("Preencha todos os campos.");
        }

        if (repository.existsByEmailIgnoreCase(admin.getEmail())) {

            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("E-mail já cadastrado.");
        }

        admin.setSenha(
                passwordEncoder.encode(admin.getSenha())
        );

        Admin salvo = repository.save(admin);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(dadosAdmin(salvo));
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin adminLogin) {

        if (adminLogin.getEmail() == null ||
            adminLogin.getSenha() == null) {

            return ResponseEntity.badRequest()
                    .body("E-mail e senha são obrigatórios.");
        }

        Optional<Admin> adminOpt =
                repository.findByEmailIgnoreCase(
                        adminLogin.getEmail()
                );

        if (adminOpt.isEmpty()) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("E-mail ou senha inválidos.");
        }

        Admin admin = adminOpt.get();

        if (!passwordEncoder.matches(
                adminLogin.getSenha(),
                admin.getSenha())) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("E-mail ou senha inválidos.");
        }

        return ResponseEntity.ok(dadosAdmin(admin));
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Integer id) {

        Optional<Admin> adminOpt = repository.findById(id);

        if (adminOpt.isEmpty()) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Administrador não encontrado.");
        }

        return ResponseEntity.ok(
                dadosAdmin(adminOpt.get())
        );
    }

    // ATUALIZAR
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarAdmin(
            @PathVariable Integer id,
            @RequestBody Admin admin) {

        Optional<Admin> adminOpt = repository.findById(id);

        if (adminOpt.isEmpty()) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Administrador não encontrado.");
        }

        Admin atual = adminOpt.get();

        if (admin.getNome() == null ||
            admin.getEmail() == null) {

            return ResponseEntity.badRequest()
                    .body("Nome e e-mail são obrigatórios.");
        }

        Optional<Admin> emailExistente =
                repository.findByEmailIgnoreCase(admin.getEmail());

        if (emailExistente.isPresent() &&
            !emailExistente.get().getId().equals(id)) {

            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("E-mail já cadastrado.");
        }

        atual.setNome(admin.getNome());
        atual.setEmail(admin.getEmail());

        if (admin.getSenha() != null &&
            !admin.getSenha().isBlank()) {

            atual.setSenha(
                    passwordEncoder.encode(admin.getSenha())
            );
        }

        Admin atualizado = repository.save(atual);

        return ResponseEntity.ok(dadosAdmin(atualizado));
    }

    // EXCLUIR
    @DeleteMapping("/{id}")
    public ResponseEntity<?> apagarAdmin(@PathVariable Integer id) {

        Optional<Admin> adminOpt = repository.findById(id);

        if (adminOpt.isEmpty()) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Administrador não encontrado.");
        }

        // Impede excluir o administrador principal
        if ("admin".equalsIgnoreCase(adminOpt.get().getEmail())) {

            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("O administrador principal não pode ser excluído.");
        }

        repository.deleteById(id);

        return ResponseEntity.ok(
                "Administrador excluído com sucesso."
        );
    }
}
