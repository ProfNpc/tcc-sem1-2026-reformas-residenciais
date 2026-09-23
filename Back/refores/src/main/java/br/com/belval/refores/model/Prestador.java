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

    @Column(name = "cep", nullable = false, unique = false, length = 14)
    private String cep;

    @Column(name = "telefone", length = 20)
    private String telefone;

    @Column(name = "endereco", length = 255)
    private String endereco;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "cnpj", length = 20)
    private String cnpj;

    @Column(name = "deletado", length = 20)
    private String deletado;

    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao;

    // NOVOS CAMPOS
    @Column(name = "servico1", length = 100)
    private String servico1;

    @Column(name = "servico2", length = 100)
    private String servico2;

    @Column(name = "servico3", length = 100)
    private String servico3;

    @Column(name = "informacoes_complementares", length = 1000)
    private String informacoesComplementares;

    public Prestador() {
        super();
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

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
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
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
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

    // NOVOS GETTERS E SETTERS
    public String getServico1() {
        return servico1;
    }

    public void setServico1(String servico1) {
        this.servico1 = servico1;
    }

    public String getServico2() {
        return servico2;
    }

    public void setServico2(String servico2) {
        this.servico2 = servico2;
    }

    public String getServico3() {
        return servico3;
    }

    public void setServico3(String servico3) {
        this.servico3 = servico3;
    }

    public String getInformacoesComplementares() {
        return informacoesComplementares;
    }

    public void setInformacoesComplementares(String informacoesComplementares) {
        this.informacoesComplementares = informacoesComplementares;
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
                ", cep=" + cep +
                ", telefone=" + telefone +
                ", endereco=" + endereco +
                ", email=" + email +
                ", CNPJ=" + cnpj +
                ", servico1=" + servico1 +
                ", servico2=" + servico2 +
                ", servico3=" + servico3 +
                ", informacoesComplementares=" + informacoesComplementares +
                ", dataCriacao=" + dataCriacao +
                ", deletado=" + deletado + "]";
    }
}

