package br.com.belval.refores.model;

import java.time.LocalDate;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_pedidos")
public class Pedidos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "id_cliente")
    private Integer idCliente;

    @Column(name = "id_prestador")
    private Integer idPrestador;

    @Column(name = "servico", nullable = false, length = 100)
    private String servico;

    @Column(name = "whatsappCliente")
    private String whatsappCliente;

    @Column(name = "whatsappPrestador")
    private String whatsappPrestador;
      

    @Column(name = "descricao", length = 1000)
    private String descricao;

    @Column(name = "endereco", length = 255)
    private String endereco;

    @Column(name = "data_desejada")
    private LocalDate dataDesejada;

    @Column(name = "observacoes", length = 1000)
    private String observacoes;

    @Column(name = "status", nullable = false, length = 50)
    private String status;

    public Pedidos() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public Integer getIdPrestador() {
        return idPrestador;
    }

    public void setIdPrestador(Integer idPrestador) {
        this.idPrestador = idPrestador;
    }

    public String getServico() {
        return servico;
    }

    public void setServico(String servico) {
        this.servico = servico;
    }

       public String getwhatsappCliente() {
        return whatsappCliente;
    }

    public void setwhatsappCliente(String whatsappCliente) {
        this.whatsappCliente = whatsappCliente;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public LocalDate getDataDesejada() {
        return dataDesejada;
    }

    public void setDataDesejada(LocalDate dataDesejada) {
        this.dataDesejada = dataDesejada;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;

        if (!(obj instanceof Pedidos))
            return false;

        Pedidos other = (Pedidos) obj;

        return Objects.equals(id, other.id);
    }

    @Override
    public String toString() {
        return "Pedido [id=" + id +
                ", idCliente=" + idCliente +
                ", idPrestador=" + idPrestador +
                ", servico=" + servico +
				",whatsappPrestador" + whatsappPrestador +
				",whatsappCliente" + whatsappCliente +
                ", descricao=" + descricao +
                ", endereco=" + endereco +
                ", dataDesejada=" + dataDesejada +
                ", observacoes=" + observacoes +
                ", status=" + status + "]";
    }
}