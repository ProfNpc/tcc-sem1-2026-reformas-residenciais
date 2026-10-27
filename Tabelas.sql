--drop database REFORMAS

--create database REFORMAS

use reformas

select * from tb_pessoa

select * from tb_prestador

select * from tb_usuarios

select * from tb_Pedidos


--conferir login criados

SELECT
    usuario_criado,
    tipo_usuario,
    id_cliente,
    id_prestador
FROM tb_usuarios
ORDER BY tipo_usuario, usuario_criado;