create database dbProject;
use dbProject;
create table Brands(
	Brand_id int not null primary key,
    Brand_name varchar(20)
);

create table Categories(
	Category_id int not null primary key,
    Category_name varchar(25) not null
);

create table Products(
	ProductID int not null primary key,
	ProductName varchar(30) not null,
    ProductSortDesc varchar(200) not null,
    ProductDesc varchar(500) not null,
    Price double not null,
    Color varchar(15) not null,
    Material varchar(30) not null,
    ProductStock int not null,
    ProductState varchar(15) not null,
    thumbnail_photo varchar(150) not null,
    slug varchar(30) not null,
    Brand_id int not null,
    Category_id int not null,
    constraint ProducBrand_fk foreign key (Brand_id) references
    Brands(Brand_id),
    constraint ProductCategory_fk foreign key (Category_id) references
    Categories(Category_id)
);

insert into Brands(Brand_id, Brand_name) values ('1', 'Apple'), ('2', 'Sony'), ('3', 'AKG'), ('4', 'Beats'), ('5', 'Bose'), ('6', 'JBL');

insert into Categories(Category_id, Category_name) values ('1', 'Wireless Headphone'), ('2', 'Wireless Earphone'), ('3', 'Noise Cancellation'), ('4', 'Gaming'), ('5', 'Sports');

insert into Products(ProductID, ProductName, ProductSortDesc, ProductDesc, Price, Color, Material, ProductStock, ProductState, thumbnail_photo, slug, Brand_id, Category_id) values ('1', 'Sony-WH-CH510', '30MM DYNAMIC DRIVERS FOR SUPREME SOUND', 'Thanks to 30mm Dynamic Dome Drivers that come with the Sony-WH-CH510, you can now listen to your music with an amazing vocal clarity. It delivers the crowd-pleasing warm sound, with an enjoyable amount of bass and treble alike.', '2990', 'Black', 'Synthetic resins, leather', '20', 'In stock', 'https://drive.google.com/file/d/16367g1hBZxShvMRF9QeTsYKctZNMYwW8/view?usp=sharing', 'sony-ch-510-headphone', '2', '1'),
('2', 'Sony-WH-1000XM4', 'QUIETER. BETTER. FASTER. STRONGER.', 'How do you ensure betterment of the best? By continuing to do what you have been doing best whilst adding feature and ensuring there are no shortcoming, meet the worthy follow-up Sony-WH-1000XM4.', '24990', 'Black', 'Synthetic resins, leather', '18', 'In stock', 'https://drive.google.com/file/d/1QRnjlpx5irs81NWQEQFpn3diqcydRYoD/view?usp=sharing', 'sony-wh-1000mx4-headphone', '2', '3'),
('3', 'Beats by Dre - Pơwerbeats Pro', 'POWERFUL SOUND FOR POWER WORKOUTS', 'For an athlete, music is an important motivator. The Powerbeats Pro delivers a powerful and balanced sound. With its dynamic range and noise isolation, you can now listen and experience the best of your music.', '20490', 'Black', 'Synthetic resins', '28', 'In stock', 'https://drive.google.com/file/d/1nxkRKuCSSfnTANjPmfqekhqbGaubzhxT/view?usp=sharing', 'beats-by-dre-powerbeats-pro', '4', '5');