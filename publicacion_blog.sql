create database publicacion_de_blog;
use publicacion_de_blog;
create table publicacion_de_blog(
 id int not null primary key auto_increment,
 titulo varchar(50)not null,
 contenido varchar(50) not null,
 autor varchar(50) not null,
 categoría varchar(50) not null,
 fecha_de_publicación datetime not null
);
