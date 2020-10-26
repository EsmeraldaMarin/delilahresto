CREATE TABLE delilah_resto.users(
	id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(45) NOT NULL,
    address VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY(id)
);
CREATE TABLE delilah_resto.products(
	id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    price FLOAT(4,2) NOT NULL,
    stock BOOLEAN NOT NULL DEFAULT TRUE, 
    imgUrl VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    PRIMARY KEY(id)
);
CREATE TABLE delilah_resto.orders(
	id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    status VARCHAR(45) NOT NULL,
    paymentMethod VARCHAR(45) NOT NULL,
    updateTime TIME NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE delilah_resto.orders_details(
	id INT AUTO_INCREMENT NOT NULL,
    order_id INT NOT NULL,
	product_id INT NOT NULL,
	quantity INT NOT NULL,
    PRIMARY KEY(id)
)