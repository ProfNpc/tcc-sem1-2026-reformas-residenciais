package br.com.belval.refores.model.controller;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import br.com.belval.refores.model.Pessoa;
import br.com.belval.refores.model.Prestador;
import br.com.belval.refores.model.PessoaRepository.PrestadorRepository;

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
     * Busca prestador por ID
     */
  /*  @GetMapping("/{id}")
    public ResponseEntity<Object> buscarPorId(
            @PathVariable Integer id) {
        Optional<Prestador> prestadorOpt = repository.findById(id);
        if (prestadorOpt.isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(prestadorOpt.get());
        }

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Prestador nÃ£o encontrado");
    }*/

    	@GetMapping("/Prestador/{id}")
	public ResponseEntity<Object> buscarPorid(
			@PathVariable(value = "id") Integer id){
		
		Optional<Prestador> PrestadorOpt = repository.findById(id);
		
		if(PrestadorOpt.isPresent()) {
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(PrestadorOpt.get());				
		}
		
		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body("Prestado não encontrado");	
		
	}


                

    /**
     * Atualiza prestador
     */
    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizarPrestador(
            @PathVariable Integer id,
            @RequestBody Prestador prestador) {

        Optional<Prestador> prestadorOpt = repository.findById(id);

        if (prestadorOpt.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Prestador nÃ£o encontrado!");
        }

        prestador.setId(id);
        prestador.setDataCriacao(
                prestadorOpt.get().getDataCriacao());

        repository.save(prestador);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Prestador atualizado com sucesso!");
    }

    /**
     * ExclusÃ£o lÃ³gica
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> apagarPrestador(
            @PathVariable Integer id) {

        Optional<Prestador> prestadorOpt =
                repository.findById(id);

        if (prestadorOpt.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Prestador nÃ£o encontrado!");
        }

        Prestador prestador = prestadorOpt.get();
        prestador.setDeletado("SIM");

        repository.save(prestador);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Prestador deletado com sucesso!");
    }


}
