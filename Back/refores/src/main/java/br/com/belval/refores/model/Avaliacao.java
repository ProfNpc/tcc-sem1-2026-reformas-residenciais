package br.com.belval.refores.model;

import java.util.Objects;

import jakarta.persistence.Column;






public class Avaliacao {
	private Integer id;
	private String data;
	private String nota;
	private String comentario;
	
	
	public Avaliacao() {
		
	}
	public Integer getId() {
		return this.id;
		
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getcomentario() {
		return this.comentario;
	  }
	
	public void setComentario(String comentario) {
		this.comentario = comentario;
	}
	
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	public String getNota() {
		return nota;
	}
	public void setNota(String nota) {
		this.nota = nota;
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
		Avaliacao other = (Avaliacao) obj;
		return Objects.equals(id, other.id);
	}
	@Override
	public String toString() {
		return "Avaliacao [id=" + id + ", data=" + data + ", nota=" + nota + ", comentario=" + comentario + "]";
	}
	public static void main(String[] args) {
		Avaliacao a = new Avaliacao();
		a.setId(223);
		Integer id = a.getId();
		System.out.println("id:" + id);
	}
}
	

