CREATE DATABASE marketplace

\c marketplace;

CREATE TABLE customers(
id SERIAL PRIMARY KEY,
email Varchar(255),
password Varchar(255),
first_name Varchar(255),
last_name Varchar(255),
telephone Varchar(15),
type Integer,
created_at Timestamp,
modified_at Timestamp,
deleted_at Timestamp
);

CREATE TABLE orders(
id SERIAL PRIMARY KEY,
customer_id Integer,
total_amount Integer,
created_at Timestamp,
FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE products(
id SERIAL PRIMARY KEY,
product_name Varchar(255),
descrip Varchar(255),
cost Integer,
price Integer,
stock_quantity Integer,
url_img Text,
stars_quantity integer,
category Varchar(255),
is_new Boolean,
is_special_offer Boolean,
created_at Timestamp,
modified_at Timestamp,
deleted_at Timestamp
);

CREATE TABLE order_items(
id SERIAL PRIMARY KEY,
order_id Integer,
product_id Integer,
quantity Integer,
unit_price Integer,
created_at Timestamp,
FOREIGN KEY (order_id) REFERENCES orders(id),
FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE contact_requests(
id SERIAL PRIMARY KEY,
name Varchar,
email Varchar,
comments Text,
created_at Timestamp
);

CREATE TABLE my_preferences(
url_img_banner Text,
url_img_logo Text
);

INSERT INTO customers(id, email, password, first_name, last_name, telephone,type, created_at, modified_at, deleted_at) 
VALUES (DEFAULT, 'miguel@gmail.com','passw1', 'miguel', 'stark', '+5699887766', 0, '06/06/2023', null, null );

INSERT INTO customers(id, email, password, first_name, last_name, telephone,type, created_at, modified_at, deleted_at) 
VALUES (DEFAULT, 'jose@gmail.com','passw2', 'jose', 'stone', '+56911911', 0, '07/06/2023', null, null );

INSERT INTO customers(id, email, password, first_name, last_name, telephone,type, created_at, modified_at, deleted_at) 
VALUES (DEFAULT, 'julio@gmail.com','passw3', 'julio', 'junio', '+5699887755', 0, '08/06/2023', null, null );

INSERT INTO customers(id, email, password, first_name, last_name, telephone,type, created_at, modified_at, deleted_at) 
VALUES (DEFAULT, 'ricardo@gmail.com','passw3', 'ricardo', 'perez', '+5699667755', 0, current_date, null, null );

INSERT INTO customers(id, email, password, first_name, last_name, telephone,type, created_at, modified_at, deleted_at) 
VALUES (DEFAULT, 'eduardo@gmail.com','passw3', 'eduardo', 'rojas', '+5699667755', 0, current_timestamp, null, null );


INSERT INTO products(id,product_name,descrip,cost,price,stock_quantity,url_img ,stars_quantity , category ,is_new,is_special_offer, created_at,modified_at,deleted_at) 
VALUES (DEFAULT, 'dark soul 3', 'Juego de accion', 8000, 12000, 56, 
'https://firebasestorage.googleapis.com/v0/b/proyecto-final-desafio-latam.appspot.com/o/darksoul.jpeg?alt=media&token=5ff08fa7-2e5b-4038-97f2-e36f5b7031cf&_gl=1*1a6ztcj*_ga*MjEyMzIzMjg0Mi4xNjg2MDE3NzE4*_ga_CW55HF8NVT*MTY4NjEwMzI0Ny40LjEuMTY4NjEwMzI1Mi4wLjAuMA..',
 3, 'accion', true, true, NOW(), null, null  );

INSERT INTO products(id, product_name, descrip, cost, price, stock_quantity, url_img , stars_quantity , category , is_new, is_special_offer,created_at,modified_at,deleted_at) 
VALUES (DEFAULT, 'Dirty 5', 'Juego de carreras', 9000, 17000, 21, 
'https://firebasestorage.googleapis.com/v0/b/proyecto-final-desafio-latam.appspot.com/o/dirt5.jpeg?alt=media&token=51e5025e-e314-4f09-bc55-e894cb90d612&_gl=1*7p5us4*_ga*MjEyMzIzMjg0Mi4xNjg2MDE3NzE4*_ga_CW55HF8NVT*MTY4NjEwMzI0Ny40LjEuMTY4NjEwMzI2MC4wLjAuMA..', 
4, 'Carreras ', true, false, NOW(), null, null  );

INSERT INTO products(id,product_name,descrip,cost,price,stock_quantity,url_img ,stars_quantity , category ,is_new,is_special_offer,created_at,modified_at,deleted_at) 
VALUES (DEFAULT, 'final fantasy XV', 'Juego de aventura', 12000, 17000, 5, 
'https://firebasestorage.googleapis.com/v0/b/proyecto-final-desafio-latam.appspot.com/o/ff_rpg.jpeg?alt=media&token=3a9a8abe-642c-4bec-bd15-d3c3c53032d6&_gl=1*ze23bb*_ga*MjEyMzIzMjg0Mi4xNjg2MDE3NzE4*_ga_CW55HF8NVT*MTY4NjEwMzI0Ny40LjEuMTY4NjEwMzI2Mi4wLjAuMA..', 
3, 'Aventuras ', true, false, NOW(), null, null  );


INSERT INTO products(id,product_name,descrip,cost,price,stock_quantity,url_img ,stars_quantity , category ,is_new,is_special_offer,created_at,modified_at,deleted_at) 
VALUES (DEFAULT, 'Mortal Kombat', 'Peleas', 45000, 21000, 8, 
'https://firebasestorage.googleapis.com/v0/b/proyecto-final-desafio-latam.appspot.com/o/ff_rpg.jpeg?alt=media&token=3a9a8abe-642c-4bec-bd15-d3c3c53032d6&_gl=1*ze23bb*_ga*MjEyMzIzMjg0Mi4xNjg2MDE3NzE4*_ga_CW55HF8NVT*MTY4NjEwMzI0Ny40LjEuMTY4NjEwMzI2Mi4wLjAuMA..', 
5, 'Peleas ', false, true, NOW(), null, null  );

INSERT INTO my_preferences(url_img_banner,url_img_logo)
VALUES('www.img.mybestbanner.com', 'www.img.mybestlogo.com')

INSERT INTO orders(customer_id,total_amount,created_at)
VALUES(4, 7800, NOW() );

INSERT INTO orders(customer_id,total_amount,created_at)
VALUES(4, 71200, NOW() );

INSERT INTO orders(customer_id,total_amount,created_at)
VALUES(2, 12500, NOW() );


INSERT INTO customers(id, email, password, first_name, last_name, telephone,type, created_at, modified_at, deleted_at) 
VALUES (DEFAULT, 'admin@admin.com','admin', 'admin', 'admin', '+666', 1, '06/06/2023', null, null );