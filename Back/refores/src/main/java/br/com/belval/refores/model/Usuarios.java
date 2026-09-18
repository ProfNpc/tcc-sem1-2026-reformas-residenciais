package br.com.belval.refores.model;

import java.util.Objects;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_usuarios")
public class Usuarios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "id_prestador")
    private Integer idPrestador;

    @Column(name = "id_Cliente")
    private Integer idCliente;

    @Column(name = "usuario_criado", nullable = false, length = 100)
    private String usuarioCriado;

    @Column(name = "senha_criada", nullable = false, length = 255)
    private String senhaCriada;

    @Column(name = "tipoUsuario", nullable = false, length = 255)
    private String tipoUsuario;

    public Usuarios() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getIdPrestador() {
        return idPrestador;
    }

    public void setIdPrestador(Integer idPrestador) {
        this.idPrestador = idPrestador;
    }

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public String getUsuarioCriado() {
        return usuarioCriado;
    }

    public void setUsuarioCriado(String usuarioCriado) {
        this.usuarioCriado = usuarioCriado;
    }

    public String getSenhaCriada() {
        return senhaCriada;
    }

    public void setSenhaCriada(String senhaCriada) {
        this.senhaCriada = senhaCriada;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;

        if (!(obj instanceof Usuarios))
            return false;

        Usuarios other = (Usuarios) obj;

        return Objects.equals(id, other.id);
    }

    @Override
    public String toString() {
        return "Usuario [id=" + id +
                ", idPrestador=" + idPrestador +
                ", idCliente=" + idCliente +
                ", usuarioCriado=" + usuarioCriado +
                ", senhaCriada=" + senhaCriada +
                ", tipoUsuario=" + tipoUsuario + "]";
    }
}
