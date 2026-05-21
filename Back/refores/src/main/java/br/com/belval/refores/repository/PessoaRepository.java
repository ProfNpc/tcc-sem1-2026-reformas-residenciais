<<<<<<< HEAD

package br.com.belval.refores.repository;
 
=======
package br.com.belval.refores.repository;

>>>>>>> 28ffbee615de0532721fc95725e7237e1f9e6e75
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.belval.refores.model.Pessoa;
<<<<<<< HEAD
 
@Repository
public interface PessoaRepository extends CrudRepository<Pessoa, Integer> {
 

	List<Pessoa> findByNomeContainingOrEmailContaining(String texto1, String texto2);

}






=======



@Repository
public interface PessoaRepository extends CrudRepository<Pessoa, Integer>{
	
}
>>>>>>> 28ffbee615de0532721fc95725e7237e1f9e6e75
