INSERT INTO tb_pessoa
(cep, cpf, data_criacao, deletado, email, endereco, nome, telefone)
VALUES
('06400-000','21499658231',GETDATE(),'NAO','francisco@reformas.com','Rua Fieb, Barueri - SP','FRANCISCO DA SILVA','11999999991'),
('06401-000','21499658232',GETDATE(),'NAO','maria@reformas.com','Rua das Flores, Barueri - SP','MARIA OLIVEIRA','11999999992'),
('06402-000','21499658233',GETDATE(),'NAO','joao@reformas.com','Rua Central, Barueri - SP','JOAO SANTOS','11999999993'),
('06403-000','21499658234',GETDATE(),'NAO','ana@reformas.com','Avenida Brasil, Barueri - SP','ANA COSTA','11999999994'),
('06404-000','21499658235',GETDATE(),'NAO','lucas@reformas.com','Rua Azul, Barueri - SP','LUCAS FERREIRA','11999999995'),
('06405-000','21499658236',GETDATE(),'NAO','juliana@reformas.com','Rua Verde, Barueri - SP','JULIANA MARTINS','11999999996'),
('06406-000','21499658237',GETDATE(),'NAO','marcos@reformas.com','Rua das Acacias, Barueri - SP','MARCOS PEREIRA','11999999997'),
('06407-000','21499658238',GETDATE(),'NAO','beatriz@reformas.com','Rua das Rosas, Barueri - SP','BEATRIZ LIMA','11999999998'),
('06408-000','21499658239',GETDATE(),'NAO','rafael@reformas.com','Rua do Sol, Barueri - SP','RAFAEL GOMES','11999999999'),
('06409-000','21499658240',GETDATE(),'NAO','camila@reformas.com','Rua da Paz, Barueri - SP','CAMILA RIBEIRO','11999999801'),
('06410-000','21499658241',GETDATE(),'NAO','bruno@reformas.com','Rua Nova, Barueri - SP','BRUNO CARVALHO','11999999802'),
('06411-000','21499658242',GETDATE(),'NAO','fernanda@reformas.com','Rua do Parque, Barueri - SP','FERNANDA ROCHA','11999999803'),
('06412-000','21499658243',GETDATE(),'NAO','gabriel@reformas.com','Rua das Acacias, Barueri - SP','GABRIEL MENDES','11999999804'),
('06413-000','21499658244',GETDATE(),'NAO','patricia@reformas.com','Rua das Palmeiras, Barueri - SP','PATRICIA LOPES','11999999805'),
('06414-000','21499658245',GETDATE(),'NAO','andre@reformas.com','Rua Bela Vista, Barueri - SP','ANDRE NASCIMENTO','11999999806'),
('06415-000','21499658246',GETDATE(),'NAO','carolina@reformas.com','Rua do Campo, Barueri - SP','CAROLINA DIAS','11999999807'),
('06416-000','21499658247',GETDATE(),'NAO','diego@reformas.com','Rua Esperanca, Barueri - SP','DIEGO BARBOSA','11999999808'),
('06417-000','21499658248',GETDATE(),'NAO','amanda@reformas.com','Rua das Flores, Barueri - SP','AMANDA NUNES','11999999809'),
('06418-000','21499658249',GETDATE(),'NAO','thiago@reformas.com','Rua Central, Barueri - SP','THIAGO MOREIRA','11999999810'),
('06419-000','21499658250',GETDATE(),'NAO','leticia@reformas.com','Avenida Brasil, Barueri - SP','LETICIA CARDOSO','11999999811');



INSERT INTO tb_prestador
(cep, cnpj, cpf, data_criacao, deletado, email, endereco,
 informacoes_complementares, nome, servico1, servico2, servico3, telefone)
VALUES
('06400-001','4654646546551','21499658225',GETDATE(),'NAO','jack@reformas.com','Rua Back, Barueri - SP','Pontual e organizado','JACK SILVA','Eletricista','Pedreiro','Encanador','11988888881'),
('06401-001','4654646546552','21499658226',GETDATE(),'NAO','pedro@reformas.com','Rua das Palmeiras, Barueri - SP','Experiencia em reformas','PEDRO ALMEIDA','Pedreiro','Pintor','Gesseiro','11988888882'),
('06402-001','4654646546553','21499658227',GETDATE(),'NAO','carlos@reformas.com','Rua Central, Barueri - SP','Atendimento residencial','CARLOS SOUZA','Encanador','Eletricista','Pintor','11988888883'),
('06403-001','4654646546554','21499658228',GETDATE(),'NAO','roberto@reformas.com','Avenida Brasil, Barueri - SP','Servico com qualidade','ROBERTO LIMA','Gesseiro','Pedreiro','Pintor','11988888884'),
('06404-001','4654646546555','21499658229',GETDATE(),'NAO','eduardo@reformas.com','Rua Azul, Barueri - SP','Especialista em instalacoes','EDUARDO SILVA','Eletricista','Encanador','Pintor','11988888885'),
('06405-001','4654646546556','21499658230',GETDATE(),'NAO','felipe@reformas.com','Rua Verde, Barueri - SP','Experiencia em alvenaria','FELIPE SANTOS','Pedreiro','Gesseiro','Pintor','11988888886'),
('06406-001','4654646546557','21499658231',GETDATE(),'NAO','renato@reformas.com','Rua das Acacias, Barueri - SP','Atendimento residencial','RENATO COSTA','Encanador','Eletricista','Pedreiro','11988888887'),
('06407-001','4654646546558','21499658232',GETDATE(),'NAO','mariana@reformas.com','Rua das Rosas, Barueri - SP','Acabamento e pintura','MARIANA ALVES','Pintor','Gesseiro','Pedreiro','11988888888'),
('06408-001','4654646546559','21499658233',GETDATE(),'NAO','gustavo@reformas.com','Rua do Sol, Barueri - SP','Reformas e manutencao','GUSTAVO LOPES','Pedreiro','Eletricista','Encanador','11988888889'),
('06409-001','4654646546560','21499658234',GETDATE(),'NAO','daniel@reformas.com','Rua da Paz, Barueri - SP','Servico pontual','DANIEL ROCHA','Encanador','Pintor','Gesseiro','11988888890'),
('06410-001','4654646546561','21499658235',GETDATE(),'NAO','aline@reformas.com','Rua Nova, Barueri - SP','Acabamentos internos','ALINE MARTINS','Gesseiro','Pintor','Pedreiro','11988888891'),
('06411-001','4654646546562','21499658236',GETDATE(),'NAO','sergio@reformas.com','Rua do Parque, Barueri - SP','Instalacoes eletricas','SERGIO PEREIRA','Eletricista','Pedreiro','Pintor','11988888892'),
('06412-001','4654646546563','21499658237',GETDATE(),'NAO','rodrigo@reformas.com','Rua das Acacias, Barueri - SP','Reparos hidraulicos','RODRIGO LIMA','Encanador','Pedreiro','Eletricista','11988888893'),
('06413-001','4654646546564','21499658238',GETDATE(),'NAO','vanessa@reformas.com','Rua das Palmeiras, Barueri - SP','Pintura residencial','VANESSA SOUZA','Pintor','Gesseiro','Encanador','11988888894'),
('06414-001','4654646546565','21499658239',GETDATE(),'NAO','leandro@reformas.com','Rua Bela Vista, Barueri - SP','Reformas completas','LEANDRO MORAES','Pedreiro','Encanador','Pintor','11988888895'),
('06415-001','4654646546566','21499658240',GETDATE(),'NAO','priscila@reformas.com','Rua do Campo, Barueri - SP','Servicos de acabamento','PRISCILA DIAS','Gesseiro','Pintor','Eletricista','11988888896'),
('06416-001','4654646546567','21499658241',GETDATE(),'NAO','alexandre@reformas.com','Rua Esperanca, Barueri - SP','Experiencia em reformas','ALEXANDRE BARBOSA','Eletricista','Encanador','Pedreiro','11988888897'),
('06417-001','4654646546568','21499658242',GETDATE(),'NAO','tatiane@reformas.com','Rua das Flores, Barueri - SP','Pintura e acabamento','TATIANE NUNES','Pintor','Gesseiro','Pedreiro','11988888898'),
('06418-001','4654646546569','21499658243',GETDATE(),'NAO','murilo@reformas.com','Rua Central, Barueri - SP','Manutencao residencial','MURILO CARDOSO','Encanador','Eletricista','Gesseiro','11988888899'),
('06419-001','4654646546570','21499658244',GETDATE(),'NAO','bianca@reformas.com','Avenida Brasil, Barueri - SP','Atendimento com agendamento','BIANCA FERREIRA','Pedreiro','Pintor','Eletricista','11988888800');



DECLARE @Senha VARCHAR(100) =
    '$2a$10$Sdj5ubcrLRpda3dgD8QZEOCA/ntKafrSDDL2/42kwOUyTKEGGps.W';

-- ************************ CLIENTES

INSERT INTO tb_usuarios
    (id_cliente, id_prestador, senha_criada, tipo_usuario, usuario_criado)
SELECT p.id, NULL, @Senha, 'cliente', v.usuario
FROM (VALUES
    ('francisco@reformas.com', 'francisco'),
    ('maria@reformas.com', 'maria'),
    ('joao@reformas.com', 'joao'),
    ('ana@reformas.com', 'ana'),
    ('lucas@reformas.com', 'lucas'),
    ('juliana@reformas.com', 'juliana'),
    ('marcos@reformas.com', 'marcos'),
    ('beatriz@reformas.com', 'beatriz'),
    ('rafael@reformas.com', 'rafael'),
    ('camila@reformas.com', 'camila'),
    ('bruno@reformas.com', 'bruno'),
    ('fernanda@reformas.com', 'fernanda'),
    ('gabriel@reformas.com', 'gabriel'),
    ('patricia@reformas.com', 'patricia'),
    ('andre@reformas.com', 'andre'),
    ('carolina@reformas.com', 'carolina'),
    ('diego@reformas.com', 'diego'),
    ('amanda@reformas.com', 'amanda'),
    ('thiago@reformas.com', 'thiago'),
    ('leticia@reformas.com', 'leticia')
) v(email, usuario)
INNER JOIN tb_pessoa p ON p.email = v.email
WHERE NOT EXISTS (
    SELECT 1
    FROM tb_usuarios u
    WHERE u.id_cliente = p.id
      AND u.tipo_usuario = 'cliente'
);

-- ************************ PRESTADORES

INSERT INTO tb_usuarios
    (id_cliente, id_prestador, senha_criada, tipo_usuario, usuario_criado)
SELECT NULL, p.id, @Senha, 'prestador', v.usuario
FROM (VALUES
    ('jack@reformas.com', 'jack'),
    ('pedro@reformas.com', 'pedro'),
    ('carlos@reformas.com', 'carlos'),
    ('roberto@reformas.com', 'roberto'),
    ('eduardo@reformas.com', 'eduardo'),
    ('felipe@reformas.com', 'felipe'),
    ('renato@reformas.com', 'renato'),
    ('mariana@reformas.com', 'mariana'),
    ('gustavo@reformas.com', 'gustavo'),
    ('daniel@reformas.com', 'daniel'),
    ('aline@reformas.com', 'aline'),
    ('sergio@reformas.com', 'sergio'),
    ('rodrigo@reformas.com', 'rodrigo'),
    ('vanessa@reformas.com', 'vanessa'),
    ('leandro@reformas.com', 'leandro'),
    ('priscila@reformas.com', 'priscila'),
    ('alexandre@reformas.com', 'alexandre'),
    ('tatiane@reformas.com', 'tatiane'),
    ('murilo@reformas.com', 'murilo'),
    ('bianca@reformas.com', 'bianca')
) v(email, usuario)
INNER JOIN tb_prestador p ON p.email = v.email
WHERE NOT EXISTS (
    SELECT 1
    FROM tb_usuarios u
    WHERE u.id_prestador = p.id
      AND u.tipo_usuario = 'prestador'
);





INSERT INTO tb_pedidos
(
    codigo_atendimento,
    data_desejada,
    descricao,
    endereco,
    id_cliente,
    id_prestador,
    observacoes,
    servico,
    status,
    whatsapp_cliente,
    whatsapp_prestador
)
SELECT
    NULL,
    v.data_desejada,
    v.descricao,
    v.endereco,
    c.id,
    p.id,
    v.observacoes,
    v.servico,
    'PENDENTE',
    c.telefone,
    NULL
FROM
(
    VALUES
    (
        'francisco@reformas.com',
        'jack@reformas.com',
        CONVERT(DATE, '20261023'),
        'Instalacao de tomadas',
        'Rua Fieb, Barueri - SP',
        'Material comprado',
        'Eletricista'
    ),
    (
        'maria@reformas.com',
        'pedro@reformas.com',
        CONVERT(DATE, '20261024'),
        'Reforma de parede',
        'Rua das Flores, Barueri - SP',
        'Precisa avaliar o local',
        'Pedreiro'
    ),
    (
        'joao@reformas.com',
        'jack@reformas.com',
        CONVERT(DATE, '20261025'),
        'Instalacao de chuveiro',
        'Rua Central, Barueri - SP',
        'Chuveiro ja comprado',
        'Eletricista'
    ),
    (
        'ana@reformas.com',
        'carlos@reformas.com',
        CONVERT(DATE, '20261026'),
        'Conserto de vazamento',
        'Avenida Brasil, Barueri - SP',
        'Vazamento na cozinha',
        'Encanador'
    ),
    (
        'lucas@reformas.com',
        'roberto@reformas.com',
        CONVERT(DATE, '20261027'),
        'Pintura de quarto',
        'Rua Azul, Barueri - SP',
        'Tinta ja comprada',
        'Pintor'
    ),
    (
        'juliana@reformas.com',
        'pedro@reformas.com',
        CONVERT(DATE, '20261028'),
        'Construcao de muro',
        'Rua Verde, Barueri - SP',
        'Avaliar medidas do terreno',
        'Pedreiro'
    ),
    (
        'marcos@reformas.com',
        'carlos@reformas.com',
        CONVERT(DATE, '20261029'),
        'Troca de torneira',
        'Rua das Acacias, Barueri - SP',
        'Torneira com defeito',
        'Encanador'
    ),
    (
        'beatriz@reformas.com',
        'jack@reformas.com',
        CONVERT(DATE, '20261030'),
        'Instalacao de luminarias',
        'Rua das Rosas, Barueri - SP',
        'Luminarias compradas',
        'Eletricista'
    ),
    (
        'rafael@reformas.com',
        'roberto@reformas.com',
        CONVERT(DATE, '20261031'),
        'Pintura da sala',
        'Rua do Sol, Barueri - SP',
        'Preferencia por cor clara',
        'Pintor'
    ),
    (
        'maria@reformas.com',
        'pedro@reformas.com',
        CONVERT(DATE, '20261101'),
        'Reparo no reboco',
        'Rua das Palmeiras, Barueri - SP',
        'Reparo na parede externa',
        'Pedreiro'
    )
) AS v
(
    email_cliente,
    email_prestador,
    data_desejada,
    descricao,
    endereco,
    observacoes,
    servico
)
INNER JOIN tb_pessoa c
    ON c.email = v.email_cliente
INNER JOIN tb_prestador p
    ON p.email = v.email_prestador;