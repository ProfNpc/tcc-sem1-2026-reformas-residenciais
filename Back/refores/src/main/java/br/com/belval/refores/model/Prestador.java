package br.com.belval.refores.model;

import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_prestador")
public class Prestador {

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

    @Column(name = "CNPJ", length = 20)
    private String CNPJ;

    @Column(name = "deletado", length = 20)
    private String deletado;

    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao;

    public Prestador() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCnpj() {
        return CNPJ;
    }

    public void setCnpj(String CNPJ) {
        this.CNPJ = CNPJ;
    }

    public String getDeletado() {
        return deletado;
    }

    public void setDeletado(String deletado) {
        this.deletado = deletado;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (!(obj instanceof Prestador))
            return false;

        Prestador other = (Prestador) obj;
        return Objects.equals(id, other.id);
    }

    @Override
    public String toString() {
        return "Prestador [id=" + id +
                ", nome=" + nome +
                ", cpf=" + cpf +
                ", telefone=" + telefone +
                ", endereco=" + endereco +
                ", email=" + email +
                ", CNPJ=" + CNPJ +
                ", dataCriacao=" + dataCriacao +
                ", deletado=" + deletado + "]";
    }
}