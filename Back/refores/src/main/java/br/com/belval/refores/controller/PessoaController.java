package br.com.belval.refores.controller;




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
import br.com.belval.refores.repository.PessoaRepository;

@RestController
public class PessoaController {
	
	@Autowired
	private PessoaRepository repository;
	
	@GetMapping("/pessoa")
	public ResponseEntity<Iterable<Pessoa>> obterPessoa() {
		return ResponseEntity
			.status(HttpStatus.OK)
			.body(repository.findAll());
	}
	
	
	
	@PostMapping("/pessoa")
	public ResponseEntity<Pessoa> criarProduto(@RequestBody Pessoa pessoa) {
		
		//pessoa.setDataCriacao(LocalDateTime.now());
		
		System.out.println("Chegou : " + pessoa.toString());
		
		repository.save(pessoa);
		
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(pessoa);
	}
	
	
	@GetMapping("/pessoa/{id}")
	public ResponseEntity<Object> buscarPorId(
			@PathVariable(value = "id") Integer id) {
		
		Optional<Pessoa> pessoaOpt = repository.findById(id);
		
		if (pessoaOpt.isPresent()) {
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(pessoaOpt.get());
		}	
		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body("Pessoa não encontrado!");
		}
	
	
	@PutMapping("/pessoa/{id}")
	public ResponseEntity<Object> buscarPorId(
			@PathVariable Integer id,
			@RequestBody Pessoa pessoa) {
		
		Optional<Pessoa> produtoOpt = repository.findById(id);
		
		if (produtoOpt.isEmpty()) {
			return ResponseEntity
					.status(HttpStatus.NOT_FOUND)
					.body("Pessoa não encontrado!");
		}
		
		pessoa.setId(id);
		//pessoa.setDataCriacao(pessoaOpt.get().getDataCriacao());
		
		repository.save(pessoa);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body("Pessoa atualizado com sucesso!");
		}
		
	
	    //curl -X DELETE http://localhost:8080/produtos/1//
		@DeleteMapping("/pessoa/{id}")
		public ResponseEntity<String> apagarPessoa(@PathVariable Integer id) {
			Optional<Pessoa> pessoaoOpt = repository.findById(id);
			
			if (pessoaoOpt.isEmpty()) {
				return ResponseEntity
						.status(HttpStatus.NOT_FOUND)
						.body("Pessoa não encontrado!");
		
			}
			
			repository.deleteById(id);
			
			return ResponseEntity
					.status(HttpStatus.OK)
					.body("Pessoa apagado com sucesso!");
		}
	

	

	 
}