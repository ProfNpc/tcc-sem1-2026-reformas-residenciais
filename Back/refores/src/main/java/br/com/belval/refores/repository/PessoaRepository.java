
package br.com.belval.refores.repository;
 
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.belval.refores.model.Pessoa;
 
@Repository
public interface PessoaRepository extends CrudRepository<Pessoa, Integer> {
 

	List<Pessoa> findByNomeContainingOrEmailContaining(String texto1, String texto2);

}






