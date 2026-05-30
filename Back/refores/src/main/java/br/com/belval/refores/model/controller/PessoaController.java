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
import org.springframework.web.bind.annotation.RestController;

import br.com.belval.refores.model.Pessoa;
import br.com.belval.refores.model.PessoaRepository.PessoaRepository;

@RestController
public class PessoaController {
	
	@Autowired
	private PessoaRepository repository;
	
	/**
	 *retorna todas as pessoas
	 * @return
	 */
	
	@GetMapping("/Pessoa")
	public ResponseEntity<Iterable<Pessoa>> obterPessoa() {
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(repository.findAll());
		
	}
	
	
	//curl POST http://localhost:8080/pessoa -H "Content-Type: application/json; Charset=utf-8" -d @cadastro.json
	
		
	
	@PostMapping("/pessoa")
	public ResponseEntity<Pessoa> criarPessoa(@RequestBody Pessoa Pessoa) {
		
		Pessoa.setDataCriacao(LocalDateTime.now());
		System.out.println("Chegou : " + Pessoa.toString());
		
		
		repository.save(Pessoa);
		
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(Pessoa);
	}
	
	@GetMapping("/Pessoa/{id}")
	public ResponseEntity<Object> buscarPorid(
			@PathVariable(value = "id") Integer id){
		
		Optional<Pessoa> PessoaOpt = repository.findById(id);
		
		if(PessoaOpt.isPresent()) {
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(PessoaOpt.get());				
		}
		
		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body("produto não encontrado");	
		
	}
	
	
	
	
	//curl -X PUT http://localhost:8080/Pessoa/1 -H "Content-Type: application/json; Charset=utf-8" -d @cadastro.json
	@PutMapping("/Pessoa/{id}")
	public ResponseEntity<Object> atualizaPessoa(
			
			@PathVariable Integer id,
			@RequestBody Pessoa Pessoa){
		
		Optional<Pessoa> pessoaOpt = repository.findById(id);
		
		if(pessoaOpt.isEmpty()) {
			return ResponseEntity
					.status(HttpStatus.NOT_FOUND)
					.body(" produto não encontrado!");				
		}
		
		Pessoa.setId(id);
		Pessoa.setDataCriacao(pessoaOpt.get().getDataCriacao());
				repository.save(Pessoa);
				return ResponseEntity
						.status(HttpStatus.OK)
						.body(" produto atualizado com sucesso");
		
	}
	
	//curl -X DELETE http://localhost:8080/Pessoa/2
	@DeleteMapping("/Pessoa/{id}")
	public ResponseEntity<String> apagarPessoa(@PathVariable Integer id) {

	    Optional<Pessoa> PessoaOpt = repository.findById(id);

	    if (PessoaOpt.isEmpty()) {
	        return ResponseEntity
	                .status(HttpStatus.NOT_FOUND)
	                .body("Produto não encontrado!");
	    }

	    repository.deleteById(id);

	    return ResponseEntity
	            .status(HttpStatus.OK)
	            .body("Produto apagado com sucesso!");
	}

}
