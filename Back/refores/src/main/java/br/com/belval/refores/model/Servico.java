package br.com.belval.refores.model;

import java.util.Objects;

public class Servico {

	private Integer id;
	private String nome;
	private String descricao;
	private Integer telefone;

	public Integer getid() {
		return this.id;
	}

	public Integer gettelefone() {
		return this.telefone;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void settelefone(Integer telefone) {
		this.telefone = telefone;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
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
		Servico other = (Servico) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "servico [id=" + id + ", nome=" + nome + ", descricao=" + descricao + "Telefone " + telefone + "]";
	}
	

	public static void main(String[] args) {

		Servico i = new Servico();
		// servico n = new servico();
		// servico d = new servico();
		// servico t = new servico();

		i.setId(2);
		i.setNome("jaciel");
		i.setDescricao("Eletricista");
		i.settelefone(1155555555);

		Integer id = i.getid();
		Integer telefone = i.gettelefone();
		String nome = i.getNome();
		String descricao = i.getDescricao();

		System.out.println(
				"ID: " + id + "\nNome: " + nome + "\nServiço a prestar: " + descricao + "\ntelefone " + telefone);

	}

}
