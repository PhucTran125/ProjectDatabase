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
    ProductDesc varchar(2000) not null,
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

insert into Brands(Brand_id, Brand_name) values ('1', 'Apple'), ('2', 'Sony'), ('3', 'AKG'), ('4', 'Beats'), ('5', 'Bose'), 
('6', 'JBL'), ('7', 'Jabra'), ('8', 'Marshall'), ('9', 'Razer'), ('10', 'Logitech'), ('11', 'Master & Dynamic'), ('12', 'HiFiMAN'), ('13', 'Bowers & Wilkins'), ('14', 'JVC'), ('15', 'Klipsch'); 



insert into Categories(Category_id, Category_name) values ('1', 'Wireless Headphone'), ('2', 'Wireless Earphone'), ('3', 'Noise Cancellation'), ('4', 'Gaming'), ('5', 'Sports'); ('6', 'True Wireless Earbuds'), ('7', 'In-Ear');

insert into Products(ProductID, ProductName, ProductSortDesc, ProductDesc, Price, Color, Material, ProductStock, ProductState, thumbnail_photo, slug, Brand_id, Category_id) values ('1', 'Sony-WH-CH510', '30MM DYNAMIC DRIVERS FOR SUPREME SOUND', 'Thanks to 30mm Dynamic Dome Drivers that come with the Sony-WH-CH510, you can now listen to your music with an amazing vocal clarity. It delivers the crowd-pleasing warm sound, with an enjoyable amount of bass and treble alike.', '2990', 'Black', 'Synthetic resins, leather', '20', 'In stock', 'https://i.imgur.com/uOtwR2n.jpg', 'sony-ch-510-headphone', '2', '1'),
('2', 'Sony-WH-1000XM4', 'QUIETER. BETTER. FASTER. STRONGER.', 'How do you ensure betterment of the best? By continuing to do what you have been doing best whilst adding feature and ensuring there are no shortcoming, meet the worthy follow-up Sony-WH-1000XM4.', '24990', 'Black', 'Synthetic resins, leather', '18', 'In stock', 'https://i.imgur.com/A9v7r7B.jpg', 'sony-wh-1000mx4-headphone', '2', '3'),
('3', 'Beats by Dre - Powerbeats Pro', 'POWERFUL SOUND FOR POWER WORKOUTS', 'For an athlete, music is an important motivator. The Powerbeats Pro delivers a powerful and balanced sound. With its dynamic range and noise isolation, you can now listen and experience the best of your music.', '20490', 'Black', 'Synthetic resins', '28', 'In stock', 'https://i.imgur.com/oGRVGU2.jpg', 'beats-by-dre-powerbeats-pro', '4', '5');

select * from dbproject.products order by ProductName desc;

create table WishList(
	WishListID int not null primary key,
    CreatedAt datetime not null,
    UpdateAt datetime not null
);

create table Cart(
	CartID int auto_increment not null primary key,
    CreatedAt datetime not null,
    UpdateAt datetime not null
);

create table User_table(
	UserID int not null primary key,
    FirstName varchar(15) not null,
    LastName varchar(15) not null,
    Phone char(11) not null,
    Email varchar(50) not null,
    Password varchar(500) not null,
    City varchar(80) not null, 
    Country varchar(20) not null,
    WishListID int not null,
    CartID int not null,
    constraint WishList_fk foreign key (WishListID) references WishList(WishListID),
	constraint Cart_fk foreign key (CartID) references Cart(CartID)
);

ALTER TABLE user_table AUTO_INCREMENT=1;
alter table user_table drop column VerificationCode;

insert into WishList(WishListID) value ('1');
insert into Cart(CartID) value ('1');
insert into User_table(FirstName, LastName, Phone, Email, Password, City, Country, WishListID, CartID) 
value ('Phuc', 'Tran', '0966078010', 'phuctran125.hust@gmail.com', '12052000', 'Hai Phong', 'Viet Nam', '1', '1');

insert into Products(UszProductID, ProductName, ProductSortDesc, ProductDesc, Price, Color, Material, ProductStock, ProductState, thumbnail_photo, slug, Brand_id, Category_id) values 
('1', 'Sony-WH-CH510', '30MM DYNAMIC DRIVERS FOR SUPREME SOUND', '30MM DYNAMIC DRIVERS FOR SUPREME SOUND', '2990', 'Black', 'Synthetic resins, leather', '20', 'In stock', 'https://i.imgur.com/uOtwR2n.jpg', 'sony-ch-510-headphone', '2', '1'),
('2', 'Sony-WH-1000XM4', 'QUIETER. BETTER. FASTER. STRONGER.', 'How do you ensure betterment of the best? By continuingbrand to do what you have been doing best whilst adding feature and ensuring there are no shortcoming, meet the worthy follow-up Sony-WH-1000XM4.', '24990', 'Black', 'Synthetic resins, leather', '18', 'In stock', 'https://i.imgur.com/A9v7r7B.jpg', 'sony-wh-1000mx4-headphone', '2', '3'),
('3', 'Beats by Dre - Powerbeats Pro', 'POWERFUL SOUND FOR POWER WORKOUTS', 'For an athlete, music is an important motivator. The Powerbeats Pro delivers a powerful and balanced sound. With its dynamic range and noise isolation, you can now listen and experience the best of your music.', '20490', 'Black', 'Synthetic resins', '28', 'In stock', 'https://i.imgur.com/oGRVGU2.jpg', 'beats-by-dre-powerbeats-pro', '4', '5');

update Product_Cart set CheckInCart = 'N' where ProductID = '4';
delete from Product_Cart where CartID = '1';
update Products set Price = '399' where ProductID = '22';

delete from user_table where UserID = 2;
delete from cart where CartID = 2;

INSERT INTO Product_Cart values(1, 1, 2);
alter table Cart add column PaymenMethod char(45);

SELECT * FROM Products, Cart, Product_Cart WHERE Products.ProductID = Product_Cart.ProductID AND Product_Cart.CartID = Cart.CartID AND Product_Cart.CartID = 1;
alter table Product_Cart add column CheckInCart char(1);
delete from OrderItem where OrderID = "OR#1" and ProductID = 1;
delete from OrderItem where OrderID = "OR#2" and ProductID = 17;
delete from OrderItem where OrderID = "OR#1" and ProductID = 3;
delete from Ordered where OrderID = "OR#2" and UserID = 1;
update Ordered set OrderState = 'Complete' and OrderContact = '1111' where UserID = 1 and OrderState = 'Processing';
insert into Ordered values ('OR#1', "", "", "", "", "", "", "", "", "", '1');
Update Ordered set ShippingMethod = '1' and PaymenMethod = 'adsda'   where UserID = 1	