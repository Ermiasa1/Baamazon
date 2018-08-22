CREATE DATABASE Bamazon_db;

USE Bamazon_db;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    primary key(item_id)
);

select * FROM products;

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Liquid Soup","Laundry",15.50,124),
    ("Laptop","Hardware Tech",800.99,86),
    ("Antivirus","Software",75.50,130),
    ("Coolife Luggage","Travel",60.00,66),
    ("Beach trouser linen","Clothings",54.99,34),
    ("Bud light Beer","Alchoal",5.20,175),
    ("Avocado", "Grocery",1.25,350),
    ("Nike basketball shoes","Sport",68.50,36),
    ("Exercise book","Stationery",4.00,215),
    ("Star wars","Entertainment",23.75,38);
