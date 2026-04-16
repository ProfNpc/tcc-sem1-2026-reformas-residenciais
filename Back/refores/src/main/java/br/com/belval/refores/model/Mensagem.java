package br.com.belval.refores.model;

import java.time.LocalDateTime;
import java.util.Objects;

public class Mensagem {

	private Integer id;
	private String texto;
	private LocalDateTime dataEnvio;
	private LocalDateTime dataRecebimento;

	public Mensagem() {

	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTexto() {

		return texto;

	}

	public void setTexto(String texto) {

		this.texto = texto;
	}

	public LocalDateTime getDataEnvio() {
		return dataEnvio;
	}

	public void setDataEnvio(LocalDateTime dataEnvio) {
		this.dataEnvio = dataEnvio;
	}

	public LocalDateTime getDataRecebimento() {
		return dataRecebimento;
	}

	public void setDataRecebimento(LocalDateTime dataRecebimento) {
		this.dataRecebimento = dataRecebimento;
	}

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
		Mensagem other = (Mensagem) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "Mensagem [id=" + id + ", texto=" + texto + ", dataEnvio=" + dataEnvio + ", dataRecebimento="
				+ dataRecebimento + "]";
	}
	
	

//	public static void main(String[] args) {
//		Mensagem m = new Mensagem();
//		
//		m.setId(233);
//		Integer id = m.getId();
//	
//		
//		
//			
//			m.settexto("o");
//			String Texto = m.gettexto();
//			
//	
//			m.setdataEnvio("o");
//			LocalDateTime dataEnvio = m.dataenvio();
//			
//			
//			
//			System.out.println("id" + id + "\ntexto" + Texto);
//			
//			
//			
//			
//	}

}
