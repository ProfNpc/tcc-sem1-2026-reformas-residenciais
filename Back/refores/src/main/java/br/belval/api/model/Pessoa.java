package br.belval.api.model;

public class Pessoa {

	private Integer id;
	private String nome;
	private double cpf;
	public double getCpf() {
		return cpf;
	}

	public void setCpf(double cpf) {
		this.cpf = cpf;
	}

	public double getTelefone() {
		return telefone;
	}

	public void setTelefone(double telefone) {
		this.telefone = telefone;
	}

	public double getEndereço() {
		return endereço;
	}

	public void setEndereço(double endereço) {
		this.endereço = endereço;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	private double telefone;
	private double endereço;
	private String email;

	// metodo que recupera o valor do atributo id

	public Integer getId() {
		return this.id;
	}

	// metodo que define/altera o valr do atributo id

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public String toString() {
		return "Pessoa [id=" + id + ", nome=" + nome + ", CPF=" + CPF + ", telefone=" + telefone + ", endereço="
				+ endereço + ", email=" + email + "]";
	}

//		public static void main(String[] args) {      
//            
//			Pessoa p = new Pessoa();                  
//		                                                                    
//		    p.setId(2);
//		    
//		    
//		    String nome= p.getNome();
//		     p.setNome("Fulaninho"); 
//		    
//		     p.setCPF("000.000.000-00");             
//             
//		     p.settelefone("00 00000-0000");	   
//		                                           
//		     p.setendereço("rua das conchas, 123");
//		                                           
//		     p.setemail("fulaninho@gmail.com");                                             
//	
//             
//             
//System.out.println("id=" + id + ", nome=" + nome + ", CPF=" + CPF + ", telefone=" + telefone + ", endereço="  
//+ endereço + ", email=" + email);                                                         
//             
//             
//} 

}
