package br.com.belval.refores.model.PessoaRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.belval.refores.model.Prestador;

public interface PrestadorRepository extends JpaRepository<Prestador, Integer> {

    List<Prestador> findByNomeContainingOrEmailContaining(
        String nome,
        String email
    );

}
