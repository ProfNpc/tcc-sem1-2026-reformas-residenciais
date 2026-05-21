package br.com.belval.refores.model;

//Add import com Ctrl+SHIFT+O
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Corresponde à tabela produto
 */
@Entity
@Table (name = "tb_Pessoa")
public class Pessoa {
	
    /*@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
    
	private String nome;
	
	private String descricao;
	
	private BigDecimal preco;//valores decimais como 12.34
	
	private LocalDateTime dataCriacao;*/
	
	
	  	@Id
	  	@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Integer id;
		
		@Column(name = "nometeste", nullable = false, length = 100)
		private String nome;
		
		@Column(name = "email", length = 100)
		private String email;
		
		@Column(name = "cpf", length = 11)
		private String cpf;
		
		@Column(name = "telefone", length = 15)
		private String telefone;
		
		@Column(name = "data_criacao")
		private LocalDateTime dataCriacao;
	
	
	/**
	 * Precisamos criar:
	 * 1 - Construtor padrão(sem parâmetros) e publico - OK
	 * 2 - Métodos getters e setters - OK
	 * 3 - Criar os métodos hashCode() e equals()
	 * 4 - Método toString() : representação textual do conteúdo do objeto
	 */

	/*
	 // método qualquer
	public int calcularQQcoisa(String param1, String param2) {
	   ^    ^       ^          ^---------------------------^
	   |    |       |                      |----------Lista de parâmetros
	   |    |       |------nome do método
	   |    |------- tipo de retorno
	   |--------visibilidade     
		return 0;
	}
	*/
	
	/**
	 * Método construtor é aquele que:
	 * 1 - Tem o mesmo nome da classe
	 * 2 - Não tem tipo de retorno(nem void)
	 * 
	 * Método construtor padrão
	 * 3 - Lista de parâmetros vazia 
	 */
	public Pessoa() {
		
	}
	
	//Método que recupera o valor do atributo id
	public Integer getId() {
		return this.id;
	}
	
	//Método que define/altera o valor do atributo id
	public void setId(Integer id) {
		this.id = id;
	}

	//Para criar os getters e os setters podemos utilizar o atalho da IDE
	//Alt + SHIFT + S >> "Generate getters and setters"
	
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	
	public String getemail() {
		return email;
	}

	public void setemail(String email) {
		this.email = email;
	}
	
	
	public String getcpf() {
		return cpf;
	}

	public void setcpf(String cpf) {
		this.cpf = cpf;
	}

	public String gettelefone() {
		return telefone;
	}

	public void settelefone(String telefone) {
		this.telefone = telefone;
	}
	
	public void setDataCriacao(LocalDateTime dataCriacao) {
		this.dataCriacao = dataCriacao;
	}

	//Para criar o hashCode() e o equals() também temo um atalho
	//Alt + SHIFT + S >> "Generate hashCode() and equals()"
	
	@Override
	public int hashCode() {
		return Objects.hash(id);
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
		return Objects.equals(id, other.id);
	}

	
	//Para facilitar a identificação do objeto em um momento de 
	//debug, precisamos de uma representação textual que nos permita 
	//identificar qual objeto é aquele, para isso vamos sobreescrever
	//o método toString()
	
	//Atalho:Alt + SHIFT + S >> Generate toString()
	
	@Override
	public String toString() {
		return "Produto [id=" + id + ", nome=" + nome + ", email=" + email + ", cpf=" + cpf
				+ ", dataCriacao=" + dataCriacao + "]";
	}
	
}
