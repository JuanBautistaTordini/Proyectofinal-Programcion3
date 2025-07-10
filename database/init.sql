-- crear aca la base de datos con sql
-- Tabla packages
-- id
-- titulo
-- descripcion
-- location
-- price

-- Tabla reservations
-- id
-- name
-- email
-- package_id (FK)
-- reservation_date
-- date_created

-- Tabla admin_users
-- id
-- email
-- password_hash
 
CREATE TABLE packages (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(255)
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  package_id INTEGER REFERENCES packages(id) ON DELETE CASCADE,
  reservation_date DATE NOT NULL,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);

INSERT INTO admin_users (email, password_hash) VALUES ('admin@example.com', '$2a$10$KykYBBmQmmesQE76Sl/sgO/Quk3W8EJayRN7whDvKvtZ1q5Upvzc6');

INSERT INTO packages (title, description, location, price, image_url) VALUES 
('Bariloche Aventura', 'Disfruta de 5 días en Bariloche con excursiones de aventura incluidas.', 'Bariloche, Río Negro', 150000.00, 'https://example.com/bariloche.jpg'),
('Ushuaia Extrema', 'Conoce el fin del mundo con este paquete de 7 días en Ushuaia.', 'Ushuaia, Tierra del Fuego', 200000.00, 'https://example.com/ushuaia.jpg'),
('El Calafate Glaciares', 'Visita el Glaciar Perito Moreno y otras maravillas en 4 días.', 'El Calafate, Santa Cruz', 180000.00, 'https://example.com/calafate.jpg');