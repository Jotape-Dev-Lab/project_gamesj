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

select * from post;

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
	WHERE p.postagem LIKE '${texto}';