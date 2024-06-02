drop database if exists gamesj;

create database if not exists gamesj;
use gamesj;

create table foto (
idFoto int,
nome varchar(45) null,
primary key (idFoto)
);

create table usuario (
idUsuario int auto_increment,
nome varchar(25) not null,
email varchar(50) not null unique,
senha varchar(255) not null,
fotoPerfil int null,
primary key (idUsuario),
constraint ft_perf_user foreign key (fotoPerfil) references foto(idFoto)
);

create table post (
idPostagem int auto_increment,
postagem varchar(250),
jogo varchar(45),
avaliacao int,
fkUsuario int,
primary key (idPostagem),
constraint fk_user_post foreign key (fkUsuario) references usuario(idUsuario)
) auto_increment = 1000;