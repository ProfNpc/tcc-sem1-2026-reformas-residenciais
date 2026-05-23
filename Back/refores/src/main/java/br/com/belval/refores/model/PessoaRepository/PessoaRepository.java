package br.com.belval.refores.model.PessoaRepository;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import br.com.belval.refores.model.Pessoa;


	
	public interface PessoaRepository extends CrudRepository <Pessoa, Integer>{
		
		/*List<Produto> findByNomeContainingOrDescricaoContaining(String texto2);*/
		List<Pessoa> findByNomeContainingOrEmailContaining(String nome, String email);
		
	}


