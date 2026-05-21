package br.com.belval.refores.model;

<<<<<<< HEAD

=======
>>>>>>> 28ffbee615de0532721fc95725e7237e1f9e6e75
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

<<<<<<< HEAD
/**
 * Corresponde à tabela pessoa
 */
@Entity
@Table(name = "tb_pessoa")
public class Pessoa {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "nome", nullable = false, length = 150)
	private String nome;
	
	@Column(name = "cpf", nullable = false, unique = true, length = 14)
	private String cpf;
	
	@Column(name = "telefone", length = 20)
	private String telefone;
	
	@Column(name = "endereco", length = 255)
	private String endereco;
	
	@Column(name = "email", length = 100)
	private String email;
	
	
	public Pessoa() {
		super();
	}
	
	
=======

@Entity
@Table(name = "tb_Pessoa")
public class Pessoa {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "cpf", nullable = false, length = 11)
	private String cpf;
	
	@Column(name = "nome", nullable = false, length = 100)
	private String nome;
	
	@Column(name = "telefone", nullable = false, length = 15)
	private String telefone;
	
	@Column(name = "email", nullable = false, unique = true, length = 100)
	private String email;
	
 public Pessoa() {
		
	}
	
>>>>>>> 28ffbee615de0532721fc95725e7237e1f9e6e75
	public Integer getId() {
		return this.id;
	}
	
<<<<<<< HEAD
	
=======
>>>>>>> 28ffbee615de0532721fc95725e7237e1f9e6e75
	public void setId(Integer id) {
		this.id = id;
	}

<<<<<<< HEAD
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

=======
>>>>>>> 28ffbee615de0532721fc95725e7237e1f9e6e75
	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

<<<<<<< HEAD
=======
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

>>>>>>> 28ffbee615de0532721fc95725e7237e1f9e6e75
	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

<<<<<<< HEAD
	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

=======
>>>>>>> 28ffbee615de0532721fc95725e7237e1f9e6e75
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public int hashCode() {
<<<<<<< HEAD
		return Objects.hash(id);
=======
		return Objects.hash(cpf, email, id, nome, telefone);
>>>>>>> 28ffbee615de0532721fc95725e7237e1f9e6e75
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Pessoa other = (Pessoa) obj;
<<<<<<< HEAD
		return Objects.equals(id, other.id);
	}

	
	@Override
	public String toString() {
		return "Pessoa [id=" + id + ", nome=" + nome + ", cpf=" + cpf + ", telefone=" + telefone + ", endereco="
				+ endereco + ", email=" + email + "]";
	}
=======
		return Objects.equals(cpf, other.cpf) && Objects.equals(email, other.email) && Objects.equals(id, other.id)
				&& Objects.equals(nome, other.nome) && Objects.equals(telefone, other.telefone);
	}

	@Override
	public String toString() {
		return "Pessoa [id=" + id + ", cpf=" + cpf + ", nome=" + nome + ", telefone=" + telefone + ", email=" + email
				+ "]";
	}

	
	
	
>>>>>>> 28ffbee615de0532721fc95725e7237e1f9e6e75
}
