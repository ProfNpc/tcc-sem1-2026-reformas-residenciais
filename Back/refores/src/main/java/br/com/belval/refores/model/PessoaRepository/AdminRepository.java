
package br.com.belval.refores.model.PessoaRepository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.belval.refores.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

    Optional<Admin> findByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCase(String email);
}
