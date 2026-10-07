
use reformas

INSERT INTO tb_pessoa (cep,cpf,data_criacao,deletado,email,endereco, nome, telefone) values ('00000-000','21499658231','2026-09-30 21:06:45.7330900','NAO','FRANCISCO@reformas','RUA fieb','FRANCISCO DA SILVA','999999999')
INSERT INTO tb_usuarios(id_cliente,id_prestador,senha_criada,tipo_usuario,usuario_criado) VALUES (1,'','654321','cliente','francisco')

INSERT INTO tb_pessoa (cep,cpf,data_criacao,deletado,email,endereco, nome, telefone) values ('00000-002','21499658232','2026-09-30 21:06:45.7330900','NAO','JOAO@reformas','RUA tcc','JOAO DE SOUZA','999999999')
INSERT INTO tb_usuarios(id_cliente,id_prestador,senha_criada,tipo_usuario,usuario_criado) VALUES (2,'','654321','cliente','joao')


INSERT INTO tb_pessoa (cep,cpf,data_criacao,deletado,email,endereco, nome, telefone) values ('00000-003','21499658233','2026-09-30 21:06:45.7330900','NAO','MARIA@reformas','RUA dsa','MARIA DAS DORES','999999999')
INSERT INTO tb_usuarios(id_cliente,id_prestador,senha_criada,tipo_usuario,usuario_criado) VALUES (3,'','654321','cliente','maria')

--prestador

INSERT INTO tb_prestador (cep,cnpj,cpf,data_criacao,deletado,email,endereco,informacoes_complementares,nome,servico1,servico2,servico3,telefone) VALUES ('00000-001','4654646546551','21499658225','2026-09-30 21:06:45.7330900','NAO','JACK@reformas','RUA back','pontual','JACK','Eletricista','PEDREIRO','ENCANADOR','11999999999')
INSERT INTO tb_usuarios(id_cliente,id_prestador,senha_criada,tipo_usuario,usuario_criado) VALUES ('',1,'654321','prestador','jack')

INSERT INTO tb_prestador (cep,cnpj,cpf,data_criacao,deletado,email,endereco,informacoes_complementares,nome,servico1,servico2,servico3,telefone) VALUES ('00000-002','4654646546552','21499658226','2026-09-30 21:06:45.7330900','NAO','TACINI@reformas','RUA front','pontual','TACINI','GESSEIRO','PEDREIRO','Pintor','11999999999')
INSERT INTO tb_usuarios(id_cliente,id_prestador,senha_criada,tipo_usuario,usuario_criado) VALUES ('',2,'654321','prestador','tacini')

INSERT INTO tb_prestador (cep,cnpj,cpf,data_criacao,deletado,email,endereco,informacoes_complementares,nome,servico1,servico2,servico3,telefone) VALUES ('00000-003','4654646546553','21499658227','2026-09-30 21:06:45.7330900','NAO','ALBERTI@reformas','RUA mobile','pontual','ALBERTI','GESSEIRO','Tapeceiro','Marceneiro','11999999999')
INSERT INTO tb_usuarios(id_cliente,id_prestador,senha_criada,tipo_usuario,usuario_criado) VALUES ('',3,'654321','prestador','alberti')


