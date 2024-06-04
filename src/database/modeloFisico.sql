drop database if exists gamesj;

create database if not exists gamesj;
use gamesj;

create table foto (
idFoto int,
primary key (idFoto)
);

insert into foto values
(1),
(2),
(3),
(4),
(5),
(11),
(12),
(13),
(14),
(15),
(21),
(22),
(23),
(24),
(25),
(31),
(32),
(33),
(34),
(35),
(41),
(42),
(43),
(44),
(45),
(100);

create table usuario (
idUsuario int auto_increment,
nome varchar(25) not null,
email varchar(50) not null unique,
senha varchar(255) not null,
fotoPerfil int null,
primary key (idUsuario),
constraint ft_perf_user foreign key (fotoPerfil) references foto(idFoto)
);

select * from usuario;

create table jogos (
idJogo int,
nome varchar(45),
primary key (idJogo)
);

insert into jogos values 
(1, 'Minecraft'),
(2, 'Rocket League'),
(3, 'Brawlhalla'),
(4, 'Valorant'),
(5, 'Pokémon');

create table post (
idPostagem int auto_increment,
postagem varchar(250),
fkJogo int,
avaliacao int,
fkUsuario int,
primary key (idPostagem),
constraint fk_user_post foreign key (fkUsuario) references usuario(idUsuario),
constraint fk_jogos_post foreign key (fkJogo) references jogos(idJogo)
) auto_increment = 1000;

select ifnull(count(p.fkJogo), 0), j.nome
from post as p
right join jogos as j
on j.idJogo = p.fkJogo
where p.fkUsuario = 9
group by fkJogo, j.nome
order by 1;

select * from jogos;

/*
SELECT 
            p.idPostagem AS idPostagem,
            p.postagem,
            p.fkJogo,
            p.avaliacao,
            p.fkUsuario,
            u.idUsuario AS idUsuario,
            u.nome,
            u.email,
            u.senha,
            u.fotoPerfil
        FROM post p
            INNER JOIN usuario u
                ON p.fkUsuario = u.idUsuario;
                
SELECT 
        p.idPostagem AS idPostagem,
        p.postagem,
        p.fkJogo,
        p.avaliacao,
        p.fkUsuario,
        u.idUsuario AS idUsuario,
        u.nome,
        u.email,
        u.senha
    FROM post p
        INNER JOIN usuario u
            ON p.fkUsuario = u.idUsuario
	WHERE p.postagem LIKE '${texto}'
*/

select * from post;

select ifnull(count(fkJogo), 0) as 'Quantidade de post', j.nome 
from post as p
right join jogos as j
on j.idJogo = p.fkJogo
group by fkJogo, j.nome
order by 1 desc
limit 3;

select count(fkUsuario) as 'Mais ativos', 
u.nome,
u.fotoPerfil
from post as p
right join usuario as u
on u.idUsuario = p.fkUsuario
group by p.fkUsuario, u.nome, u.fotoPerfil
order by 1 desc
limit 3;

-- ---------------------------------------------------------------------------------------------------------------------------------------------------

-- KPI

select count(avaliacao)
from post
where avaliacao <= 3 and fkUsuario = 9;

select count(avaliacao)
from post
where avaliacao > 3 and fkUsuario = 9;

select count(postagem)
from post
where fkUsuario = 9;

-- ----------------------------------------------------------------------------------------------------------------------------------------------------

-- GRAFICO PIZZA

select 
ifnull(count(p.fkJogo), 0) as qtdPost, 
ifnull(j.nome, 0) as Jogo
from jogos as j
left join post as p
on p.fkJogo = j.idJogo and p.fkUsuario = 9
group by fkJogo, j.nome
order by qtdPost desc;

-- -----------------------------------------------------------------------------------------------------------------------------------------------------

-- GRAFICO BARRA

