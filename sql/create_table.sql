  create extension if not exists "uuid-ossp";

create table IF NOT EXISTS Customers (
	id uuid primary key NOT NULL,
	name varchar(255) not null,
	email varchar(255) null,
	cpf varchar(11) not null,
  active boolean DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table IF NOT EXISTS Situations (
  id uuid primary key NOT NULL,
  description varchar(255) not null,
  active boolean DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Category (
  id uuid PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  description VARCHAR(255),
  active boolean DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Product (
  id uuid PRIMARY KEY ,
  name VARCHAR(255),
  description VARCHAR(255),
  price NUMERIC,
  categoryId uuid not null,
  image VARCHAR(255),
  active boolean DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  foreign key (categoryId) references Category (id)
);

create table IF NOT EXISTS Orders (
  id uuid NOT NULL primary key,
  number integer NOT NULL UNIQUE,
  customerId uuid NOT NULL,
  situationId uuid NOT NULL,
  observation varchar(500) null,
  created_at timestamp NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  foreign key (customerId) references Customers (id),
  foreign key (situationId) references Situations (id)
);

create table IF NOT EXISTS OrdersItems (
	id uuid NOT NULL primary key,
	numberOrder integer not null,
	productId uuid not null,
  quantity integer not null DEFAULT 0,
	productDescription varchar(255) not null,
	productPrice float not null,
	active boolean DEFAULT true,
	created_at timestamp NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  foreign key (productId) references Product (id),
  foreign key (numberOrder) references Orders (number)
);


CREATE TABLE IF NOT EXISTS payments (
    id uuid PRIMARY KEY,
    orderId uuid NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (orderId) REFERENCES orders(id)
);

insert into Situations (id, description ) values
    ('cbf9b6ab-4c5c-4db9-a7f2-33e1e3bc3a91','Aguardando Pagamento'),
    ('9e07b6f1-c470-4318-8c1a-2441771b600e','Recebido'),
    ('f7f9ba46-ad25-4d10-a6aa-6c603aad6755','Em Preparação'),
    ('11729253-5280-4d6f-9619-53045076236e','Pronto'),
    ('3f4798e6-1f03-411e-b99b-73833c104255','Finalizado');

INSERT INTO Customers (id, name, email, cpf) values
    ('eefdd3d4-97af-4ae6-bdc7-2f8ec461b28c','Anônimo','anonimo@ws.com.br','12345678909');

INSERT INTO category (id, name, description, active) VALUES
('131bf57b-e926-4f0b-954d-0eb472a82973', 'Lanche', 'Lanches deliciosos e rápidos, perfeitos para qualquer hora do dia. Experimente nossa variedade de hambúrgueres, sanduíches e salgados.', true),
('1d5d312b-7b8a-4e09-98c8-4f7763ba9237', 'Acompanhamento', 'Complementos saborosos que enriquecem sua refeição. Escolha entre batatas fritas crocantes, saladas frescas e outros acompanhamentos deliciosos.', true),
('d3cc30c7-1eb9-471f-8354-e54c385fda26', 'Bebida', 'Bebidas refrescantes para acompanhar sua refeição. Oferecemos uma seleção de refrigerantes, sucos naturais, águas e bebidas quentes.', true),
('8fb57489-cd39-46fc-95e2-c98443d090cf', 'Sobremesa', 'Finalize sua refeição com uma de nossas sobremesas irresistíveis. Temos opções para todos os gostos, desde bolos e tortas até sorvetes e doces tradicionais.', true);


INSERT INTO product (id, name, description, price, categoryid, image, active) VALUES
('f9a20b1e-a926-42d7-85ff-91cde1b31a93', 'Hambúrguer Clássico', 'Hambúrguer suculento com queijo e molho especial', 15.99, '131bf57b-e926-4f0b-954d-0eb472a82973', 'hamburguer_classico.jpg', true),
('9cebcb2a-696c-4f54-a742-fcef3302c8fb', 'Cheeseburger', 'Hambúrguer com queijo, tomate e alface', 17.99, '131bf57b-e926-4f0b-954d-0eb472a82973', 'cheeseburger.jpg', true),
('1f68c1d2-bd17-484d-baf2-edb8259cd89c', 'Sanduíche de Frango', 'Sanduíche com peito de frango grelhado', 14.99, '131bf57b-e926-4f0b-954d-0eb472a82973', 'sanduiche_frango.jpg', true),
('387a981b-ca3e-4441-bb3f-6b82c8723d51', 'Cachorro-Quente', 'Cachorro-quente com salsicha, maionese e ketchup', 12.99, '131bf57b-e926-4f0b-954d-0eb472a82973', 'cachorro_quente.jpg', true),
('3d97a457-152c-4e61-8bcc-92a90c066abd', 'Sanduíche Vegetariano', 'Sanduíche com vegetais frescos e molho de iogurte', 13.99, '131bf57b-e926-4f0b-954d-0eb472a82973', 'sanduiche_vegetariano.jpg', true),
('f5bc938c-9667-416c-b3cd-e2d663de05af', 'Batata Frita', 'Porção de batatas fritas crocantes', 8.99, '1d5d312b-7b8a-4e09-98c8-4f7763ba9237', 'batata_frita.jpg', true),
('4df61073-216c-4613-89a2-d0684186e274', 'Salada Caesar', 'Salada Caesar com molho especial', 10.99, '1d5d312b-7b8a-4e09-98c8-4f7763ba9237', 'salada_caesar.jpg', true),
('6a5b15b9-34c1-4e49-a685-946a49a9b54d', 'Anéis de Cebola', 'Anéis de cebola empanados e fritos', 9.99, '1d5d312b-7b8a-4e09-98c8-4f7763ba9237', 'aneis_cebola.jpg', true),
('b874ce21-93a1-4265-ae28-ff7204d593aa', 'Nuggets de Frango', 'Nuggets de frango crocantes', 11.99, '1d5d312b-7b8a-4e09-98c8-4f7763ba9237', 'nuggets_frango.jpg', true),
('23d7b234-20f3-4cbf-a7fb-96f97a223c63', 'Chips de Batata Doce', 'Chips de batata doce crocantes', 7.99, '1d5d312b-7b8a-4e09-98c8-4f7763ba9237', 'chips_batata_doce.jpg', true),
('b877f159-814e-43e6-bf53-73ec63ca622a', 'Refrigerante', 'Refrigerante gelado de diversos sabores', 4.99, 'd3cc30c7-1eb9-471f-8354-e54c385fda26', 'refrigerante.jpg', true),
('efb9aeec-ca1d-4afc-b360-cd3f13b8b049', 'Suco Natural', 'Suco natural de frutas frescas', 5.99, 'd3cc30c7-1eb9-471f-8354-e54c385fda26', 'suco_natural.jpg', true),
('1a9c94ab-7617-4013-842a-a093a3c520d2', 'Água Mineral', 'Água mineral sem gás', 2.99, 'd3cc30c7-1eb9-471f-8354-e54c385fda26', 'agua_mineral.jpg', true),
('ab1dc463-6a14-4c62-9f31-ede07265ca30', 'Chá Gelado', 'Chá gelado de limão', 4.99, 'd3cc30c7-1eb9-471f-8354-e54c385fda26', 'cha_gelado.jpg', true),
('6fe91206-0df7-4ee6-8610-2c5266294ef1', 'Café Expresso', 'Café expresso forte e encorpado', 3.99, 'd3cc30c7-1eb9-471f-8354-e54c385fda26', 'cafe_expresso.jpg', true),
('4a92b4bf-2aaa-4c14-985a-530dabc8cf50', 'Bolo de Chocolate', 'Bolo de chocolate com cobertura cremosa', 6.99, '8fb57489-cd39-46fc-95e2-c98443d090cf', 'bolo_chocolate.jpg', true),
('a58c0145-ba9d-4edc-93bd-8143af0a38e2', 'Sorvete', 'Sorvete de diversos sabores', 4.99, '8fb57489-cd39-46fc-95e2-c98443d090cf', 'sorvete.jpg', true),
('39dc0ca6-9c5d-412d-85d3-5610e2341fb5', 'Torta de Maçã', 'Torta de maçã com canela', 5.99, '8fb57489-cd39-46fc-95e2-c98443d090cf', 'torta_maca.jpg', true),
('fcfffe66-1655-4404-b607-d2f25aac1b67', 'Pudim de Leite', 'Pudim de leite condensado', 3.99, '8fb57489-cd39-46fc-95e2-c98443d090cf', 'pudim_leite.jpg', true),
('acf2e45e-82ab-4f90-bc8b-2ca5cfa1e50c', 'Brownie', 'Brownie de chocolate com nozes', 6.49, '8fb57489-cd39-46fc-95e2-c98443d090cf', 'brownie.jpg', true);

