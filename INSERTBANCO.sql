
use reformas

INSERT INTO tb_pessoa (cep,cpf,data_criacao,deletado,email,endereco, nome, telefone) values ('00000-000','21499658231','2026-09-30 21:06:45.7330900','NAO','clientecadastrado1@reformas','RUA1','FRANCISCO DA SILVA','999999999')
INSERT INTO tb_usuarios(id_cliente,id_prestador,senha_criada,tipo_usuario,usuario_criado) VALUES (1,'','654321','cliente','clientecadastrado1')

INSERT INTO tb_pessoa (cep,cpf,data_criacao,deletado,email,endereco, nome, telefone) values ('00000-002','21499658232','2026-09-30 21:06:45.7330900','NAO','clientecadastrado1@reformas','RUA1','JOAO DE SOUZA','999999999')
INSERT INTO tb_usuarios(id_cliente,id_prestador,senha_criada,tipo_usuario,usuario_criado) VALUES (2,'','654321','cliente','clientecadastrado2')


INSERT INTO tb_pessoa (cep,cpf,data_criacao,deletado,email,endereco, nome, telefone) values ('00000-003','21499658233','2026-09-30 21:06:45.7330900','NAO','clientecadastrado1@reformas','RUA1','MARIA DAS DORES','999999999')
INSERT INTO tb_usuarios(id_cliente,id_prestador,senha_criada,tipo_usuario,usuario_criado) VALUES (3,'','654321','cliente','clientecadastrado3')

--prestador

INSERT INTO tb_prestador (cep,cnpj,cpf,data_criacao,deletado,email,endereco,informacoes_complementares,nome,servico1,servico2,servico3,telefone) VALUES ('00000-001','4654646546551','21499658225','2026-09-30 21:06:45.7330900','NAO','clientecadastrado1@reformas','RUA1','pontual','JACK','Eletricista','PEDREIRO','ENCANADOR','11999999999')
INSERT INTO tb_usuarios(id_cliente,id_prestador,senha_criada,tipo_usuario,usuario_criado) VALUES ('',1,'654321','PRESTADOR','PRESTADORcadastrado1')

INSERT INTO tb_prestador (cep,cnpj,cpf,data_criacao,deletado,email,endereco,informacoes_complementares,nome,servico1,servico2,servico3,telefone) VALUES ('00000-002','4654646546552','21499658226','2026-09-30 21:06:45.7330900','NAO','clientecadastrado1@reformas','RUA1','pontual','TACINI','GESSEIRO','PEDREIRO','Pintor','11999999999')
INSERT INTO tb_usuarios(id_cliente,id_prestador,senha_criada,tipo_usuario,usuario_criado) VALUES ('',2,'654321','PRESTADOR','PRESTADORcadastrado1')

INSERT INTO tb_prestador (cep,cnpj,cpf,data_criacao,deletado,email,endereco,informacoes_complementares,nome,servico1,servico2,servico3,telefone) VALUES ('00000-003','4654646546553','21499658227','2026-09-30 21:06:45.7330900','NAO','clientecadastrado1@reformas','RUA1','pontual','ALBERTI','GESSEIRO','Tapeceiro','Marceneiro','11999999999')
INSERT INTO tb_usuarios(id_cliente,id_prestador,senha_criada,tipo_usuario,usuario_criado) VALUES ('',3,'654321','PRESTADOR','PRESTADORcadastrado1')


