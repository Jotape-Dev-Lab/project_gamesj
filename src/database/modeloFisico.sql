-- drop database if exists gamesj;

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

-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-- FORUM

-- Quantidade de post realizados por jogo

select ifnull(count(fkJogo), 0) as 'Jogos mais comentados', j.nome 
from post as p
right join jogos as j
on j.idJogo = p.fkJogo
group by fkJogo, j.nome
order by 1 desc
limit 3;

-- Quantidade de usuários que mais comentaram

select count(fkUsuario) as 'Mais ativos', 
u.nome,
u.fotoPerfil
from post as p
right join usuario as u
on u.idUsuario = p.fkUsuario
group by p.fkUsuario, u.nome, u.fotoPerfil
order by 1 desc
limit 3;

-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-- KPI

select
    (select count(avaliacao)
     from post
     where avaliacao < 3 and fkUsuario = 1) as negativo,
    (select count(avaliacao)
     from post
     where avaliacao = 3 and fkUsuario = 1) as neutro,
    (select count(avaliacao)
     from post
     where avaliacao > 3 and fkUsuario = 1) as positivo,
    (select count(postagem)
     from post
     where fkUsuario = 1) as qtdPost;

-- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-- GRAFICO PIZZA

select 
ifnull(count(p.fkJogo), 0) as qtdPost, 
j.nome as Jogo
from jogos as j
left join post as p
on p.fkJogo = j.idJogo and p.fkUsuario = 1
group by fkJogo, j.nome
order by qtdPost desc;

select
	(select ifnull(count(p.fkJogo), 0)
	from jogos as j
	left join post as p
	on p.fkJogo = j.idJogo and p.fkUsuario = 1
    where j.nome = 'Brawlhalla'
	group by fkJogo, j.nome) as braw,
    (select ifnull(count(p.fkJogo), 0)
	from jogos as j
	left join post as p
	on p.fkJogo = j.idJogo and p.fkUsuario = 1
    where j.nome = 'Minecraft'
	group by fkJogo, j.nome) as mine,
    (select ifnull(count(p.fkJogo), 0)
	from jogos as j
	left join post as p
	on p.fkJogo = j.idJogo and p.fkUsuario = 1
    where j.nome = 'Rocket League'
	group by fkJogo, j.nome) as rock,
    (select ifnull(count(p.fkJogo), 0)
	from jogos as j
	left join post as p
	on p.fkJogo = j.idJogo and p.fkUsuario = 1
    where j.nome = 'Valorant'
	group by fkJogo, j.nome) as vava,
    (select ifnull(count(p.fkJogo), 0)
	from jogos as j
	left join post as p
	on p.fkJogo = j.idJogo and p.fkUsuario = 1
    where j.nome = 'Pokémon'
	group by fkJogo, j.nome) as poke;

-- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-- GRAFICO BARRA

select
    (select count(avaliacao) from post where avaliacao = 1 and fkUsuario = 1) as estrela1,
    (select count(avaliacao) from post where avaliacao = 2 and fkUsuario = 1) as estrela2,
    (select count(avaliacao) from post where avaliacao = 3 and fkUsuario = 1) as estrela3,
    (select count(avaliacao) from post where avaliacao = 4 and fkUsuario = 1) as estrela4,
    (select count(avaliacao) from post where avaliacao = 5 and fkUsuario = 1) as estrela5;

-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

select * from jogos;
select * from post;
select * from usuario;
