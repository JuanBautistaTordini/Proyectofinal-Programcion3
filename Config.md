# Guía de Implementación: Aplicación de Paquetes Turísticos

Basado en tu arquitectura de archivos, te presentaré un plan detallado para implementar la aplicación de paquetes turísticos que has descrito. Veo que ya tienes una estructura básica con frontend, backend y base de datos configurada con Docker.

## 1. Base de Datos

Primero, necesitamos configurar las tablas en tu base de datos PostgreSQL:

```sql:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\database\init.sql
-- Crear tablas para la aplicación de paquetes turísticos

-- Tabla de paquetes turísticos
CREATE TABLE packages (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de reservas
CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  package_id INTEGER REFERENCES packages(id) ON DELETE CASCADE,
  reservation_date DATE NOT NULL,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de usuarios administradores
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar un usuario administrador por defecto (password: admin123)
INSERT INTO admin_users (email, password_hash) VALUES ('admin@example.com', '$2b$10$X/tCcQZ1Py.QpVhS3zhFAeGNDiVbGZIXHn7zZCgWM1NZnFMKIEYxO');

-- Insertar algunos paquetes turísticos de ejemplo
INSERT INTO packages (title, description, location, price, image_url) VALUES 
('Bariloche Aventura', 'Disfruta de 5 días en Bariloche con excursiones de aventura incluidas.', 'Bariloche, Río Negro', 150000.00, 'https://example.com/bariloche.jpg'),
('Ushuaia Extrema', 'Conoce el fin del mundo con este paquete de 7 días en Ushuaia.', 'Ushuaia, Tierra del Fuego', 200000.00, 'https://example.com/ushuaia.jpg'),
('El Calafate Glaciares', 'Visita el Glaciar Perito Moreno y otras maravillas en 4 días.', 'El Calafate, Santa Cruz', 180000.00, 'https://example.com/calafate.jpg');
```

## 2. Backend (Node.js/Express)

### Modelos

Crea los siguientes modelos en la carpeta `backend/models/`:

```javascript:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\backend\models\Package.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Package = sequelize.define('Package', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'packages',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Package;
```

```javascript:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\backend\models\Reservation.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  package_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reservation_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  date_created: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'reservations',
  timestamps: false
});

module.exports = Reservation;
```

```javascript:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\backend\models\AdminUser.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AdminUser = sequelize.define('AdminUser', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'admin_users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = AdminUser;
```

Actualiza el archivo `models/index.js` para exportar todos los modelos:

```javascript:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\backend\models\index.js
const Package = require('./Package');
const Reservation = require('./Reservation');
const AdminUser = require('./AdminUser');

// Definir relaciones
Package.hasMany(Reservation, { foreignKey: 'package_id' });
Reservation.belongsTo(Package, { foreignKey: 'package_id' });

module.exports = {
  Package,
  Reservation,
  AdminUser
};
```

### Controladores

Crea los siguientes controladores:

```javascript:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\backend\controllers\packageController.js
const { Package } = require('../models');

// Obtener todos los paquetes
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.findAll();
    res.json(packages);
  } catch (error) {
    console.error('Error al obtener paquetes:', error);
    res.status(500).json({ message: 'Error al obtener paquetes' });
  }
};

// Obtener un paquete por ID
exports.getPackageById = async (req, res) => {
  try {
    const package = await Package.findByPk(req.params.id);
    if (!package) {
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }
    res.json(package);
  } catch (error) {
    console.error('Error al obtener paquete:', error);
    res.status(500).json({ message: 'Error al obtener paquete' });
  }
};

// Crear un nuevo paquete (solo admin)
exports.createPackage = async (req, res) => {
  try {
    const { title, description, location, price, image_url } = req.body;
    const newPackage = await Package.create({
      title,
      description,
      location,
      price,
      image_url
    });
    res.status(201).json(newPackage);
  } catch (error) {
    console.error('Error al crear paquete:', error);
    res.status(500).json({ message: 'Error al crear paquete' });
  }
};

// Actualizar un paquete (solo admin)
exports.updatePackage = async (req, res) => {
  try {
    const { title, description, location, price, image_url } = req.body;
    const package = await Package.findByPk(req.params.id);
    
    if (!package) {
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }
    
    await package.update({
      title,
      description,
      location,
      price,
      image_url
    });
    
    res.json(package);
  } catch (error) {
    console.error('Error al actualizar paquete:', error);
    res.status(500).json({ message: 'Error al actualizar paquete' });
  }
};

// Eliminar un paquete (solo admin)
exports.deletePackage = async (req, res) => {
  try {
    const package = await Package.findByPk(req.params.id);
    
    if (!package) {
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }
    
    await package.destroy();
    res.json({ message: 'Paquete eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar paquete:', error);
    res.status(500).json({ message: 'Error al eliminar paquete' });
  }
};
```

```javascript:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\backend\controllers\reservationController.js
const { Reservation, Package } = require('../models');

// Crear una nueva reserva
exports.createReservation = async (req, res) => {
  try {
    const { name, email, package_id, reservation_date } = req.body;
    
    // Verificar que el paquete existe
    const packageExists = await Package.findByPk(package_id);
    if (!packageExists) {
      return res.status(404).json({ message: 'El paquete seleccionado no existe' });
    }
    
    const newReservation = await Reservation.create({
      name,
      email,
      package_id,
      reservation_date
    });
    
    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({ message: 'Error al crear reserva' });
  }
};

// Obtener todas las reservas (solo admin)
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [{ model: Package, attributes: ['title'] }]
    });
    res.json(reservations);
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ message: 'Error al obtener reservas' });
  }
};
```

```javascript:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\backend\controllers\authController.js
const { AdminUser } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Login de administrador
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuario por email
    const user = await AdminUser.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    
    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    
    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: '24h' }
    );
    
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
```

### Middleware de Autenticación

```javascript:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\backend\middleware\authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }
  
  const token = authHeader.split(' ')[1];
  
  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    
    req.user = user;
    next();
  });
};
```

### Rutas

Actualiza el archivo de rutas:

```javascript:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\backend\routes\index.js
const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const reservationController = require('../controllers/reservationController');
const authController = require('../controllers/authController');
const { authenticateJWT } = require('../middleware/authMiddleware');

// Rutas públicas
router.get('/packages', packageController.getAllPackages);
router.get('/packages/:id', packageController.getPackageById);
router.post('/reservations', reservationController.createReservation);
router.post('/auth/login', authController.login);

// Rutas protegidas (solo admin)
router.post('/packages', authenticateJWT, packageController.createPackage);
router.put('/packages/:id', authenticateJWT, packageController.updatePackage);
router.delete('/packages/:id', authenticateJWT, packageController.deletePackage);
router.get('/reservations', authenticateJWT, reservationController.getAllReservations);

module.exports = router;
```

### Configuración

Actualiza el archivo de configuración:

```javascript:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\backend\config\config.js
module.exports = {
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  // Otras configuraciones
};
```

Actualiza el archivo `server.js`:

```javascript:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\backend\server.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const config = require('./config/config');
const sequelize = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', routes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error en el servidor' });
});

// Iniciar servidor
sequelize.sync()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Servidor corriendo en el puerto ${config.port}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });
```

### Actualiza package.json

Asegúrate de tener las dependencias necesarias:

```json:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\backend\package.json
{
  "name": "paquetes-turisticos-backend",
  "version": "1.0.0",
  "description": "Backend para aplicación de paquetes turísticos",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "pg": "^8.11.0",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.31.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

## 3. Frontend (React)

### Estructura de Carpetas

Organiza tu frontend con la siguiente estructura:

```
frontend/src/
├── components/
│   ├── common/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── Navbar.js
│   ├── admin/
│   │   ├── AdminLayout.js
│   │   ├── PackageForm.js
│   │   └── ReservationList.js
│   └── public/
│       ├── PackageCard.js
│       ├── PackageDetail.js
│       └── ReservationForm.js
├── pages/
│   ├── admin/
│   │   ├── AdminDashboard.js
│   │   ├── AdminPackages.js
│   │   ├── AdminReservations.js
│   │   └── Login.js
│   └── public/
│       ├── Home.js
│       ├── PackageDetails.js
│       └── ReservationConfirmation.js
├── services/
│   ├── api.js
│   ├── auth.js
│   ├── packageService.js
│   └── reservationService.js
├── utils/
│   ├── authUtils.js
│   └── formatUtils.js
├── hooks/
│   └── useAuth.js
├── App.js
└── index.js
```

### Servicios API

Crea los servicios para comunicarte con el backend:

```javascript:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\frontend\src\services\api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
```

```javascript:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\frontend\src\services\auth.js
import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error de conexión' };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
```

```javascript:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\frontend\src\services\packageService.js
import api from './api';

export const getAllPackages = async () => {
  try {
    const response = await api.get('/packages');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al obtener paquetes' };
  }
};

export const getPackageById = async (id) => {
  try {
    const response = await api.get(`/packages/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al obtener paquete' };
  }
};

export const createPackage = async (packageData) => {
  try {
    const response = await api.post('/packages', packageData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al crear paquete' };
  }
};

export const updatePackage = async (id, packageData) => {
  try {
    const response = await api.put(`/packages/${id}`, packageData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al actualizar paquete' };
  }
};

export const deletePackage = async (id) => {
  try {
    const response = await api.delete(`/packages/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al eliminar paquete' };
  }
};
```

```javascript:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\frontend\src\services\reservationService.js
import api from './api';

export const createReservation = async (reservationData) => {
  try {
    const response = await api.post('/reservations', reservationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al crear reserva' };
  }
};

export const getAllReservations = async () => {
  try {
    const response = await api.get('/reservations');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al obtener reservas' };
  }
};
```

### Componentes Principales

Aquí te muestro algunos componentes clave:

```jsx:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\frontend\src\pages\public\Home.js
import React, { useState, useEffect } from 'react';
import { getAllPackages } from '../../services/packageService';
import PackageCard from '../../components/public/PackageCard';

const Home = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getAllPackages();
        setPackages(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los paquetes turísticos');
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) return <div className="loading">Cargando paquetes...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Descubre el Sur Argentino</h1>
        <p>Explora nuestros paquetes turísticos y vive una experiencia inolvidable</p>
      </div>
      
      <div className="packages-section">
        <h2>Paquetes Disponibles</h2>
        <div className="packages-grid">
          {packages.length > 0 ? (
            packages.map(pkg => (
              <PackageCard key={pkg.id} package={pkg} />
            ))
          ) : (
            <p>No hay paquetes disponibles en este momento.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
```

```jsx:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\frontend\src\components\public\PackageCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const PackageCard = ({ package: pkg }) => {
  return (
    <div className="package-card">
      {pkg.image_url && (
        <div className="package-image">
          <img src={pkg.image_url} alt={pkg.title} />
        </div>
      )}
      <div className="package-content">
        <h3>{pkg.title}</h3>
        <p className="package-location">{pkg.location}</p>
        <p className="package-price">${pkg.price.toLocaleString()}</p>
        <Link to={`/packages/${pkg.id}`} className="view-details-btn">
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default PackageCard;
```

```jsx:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\frontend\src\pages\public\PackageDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPackageById } from '../../services/packageService';
import ReservationForm from '../../components/public/ReservationForm';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReservationForm, setShowReservationForm] = useState(false);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const data = await getPackageById(id);
        setPackageData(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los detalles del paquete');
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  const handleReservationSuccess = () => {
    navigate('/reservation-confirmation');
  };

  if (loading) return <div className="loading">Cargando detalles...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!packageData) return <div className="error">Paquete no encontrado</div>;

  return (
    <div className="package-details-container">
      <div className="package-header">
        <h1>{packageData.title}</h1>
        <p className="package-location">{packageData.location}</p>
      </div>
      
      {packageData.image_url && (
        <div className="package-image-large">
          <img src={packageData.image_url} alt={packageData.title} />
        </div>
      )}
      
      <div className="package-info">
        <div className="package-description">
          <h2>Descripción</h2>
          <p>{packageData.description}</p>
        </div>
        
        <div className="package-price-card">
          <h3>Precio por persona</h3>
          <div className="price">${packageData.price.toLocaleString()}</div>
          <button 
            className="reserve-btn"
            onClick={() => setShowReservationForm(true)}
          >
            Reservar ahora
          </button>
        </div>
      </div>
      
      {showReservationForm && (
        <div className="reservation-form-container">
          <h2>Completar reserva</h2>
          <ReservationForm 
            packageId={packageData.id} 
            packageTitle={packageData.title}
            onSuccess={handleReservationSuccess}
            onCancel={() => setShowReservationForm(false)}
          />
        </div>
      )}
    </div>
  );
};

export default PackageDetails;
```

```jsx:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\frontend\src\components\public\ReservationForm.js
import React, { useState } from 'react';
import { createReservation } from '../../services/reservationService';

const ReservationForm = ({ packageId, packageTitle, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reservation_date: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createReservation({
        ...formData,
        package_id: packageId
      });
      setLoading(false);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Error al procesar la reserva');
      setLoading(false);
    }
  };

  // Calcular fecha mínima (hoy)
  const today = new Date().toISOString().split('T')[0];
  
  // Calcular fecha máxima (6 meses desde hoy)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="name">Nombre completo</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="reservation_date">Fecha de asistencia</label>
        <input
          type="date"
          id="reservation_date"
          name="reservation_date"
          value={formData.reservation_date}
          onChange={handleChange}
          min={today}
          max={maxDateStr}
          required
        />
      </div>
      
      <div className="reservation-summary">
        <h4>Resumen de la reserva</h4>
        <p><strong>Paquete:</strong> {packageTitle}</p>
      </div>
      
      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Procesando...' : 'Confirmar Reserva'}
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;
```

### Páginas de Administración

```jsx:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\frontend\src\pages\admin\Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(formData.email, formData.password);
      setLoading(false);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Acceso Administrador</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
```

```jsx:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\frontend\src\pages\admin\AdminPackages.js
import React, { useState, useEffect } from 'react';
import { getAllPackages, deletePackage } from '../../services/packageService';
import PackageForm from '../../components/admin/PackageForm';

const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  const fetchPackages = async () => {
    try {
      const data = await getAllPackages();
      setPackages(data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los paquetes');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este paquete?')) {
      try {
        await deletePackage(id);
        fetchPackages(); // Recargar la lista
      } catch (err) {
        setError('Error al eliminar el paquete');
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingPackage(null);
    fetchPackages(); // Recargar la lista
  };

  if (loading) return <div className="loading">Cargando paquetes...</div>;

  return (
    <div className="admin-packages-container">
      <div className="admin-header">
        <h1>Gestión de Paquetes Turísticos</h1>
        <button 
          className="add-package-btn"
          onClick={() => {
            setEditingPackage(null);
            setShowForm(true);
          }}
        >
          Agregar Nuevo Paquete
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {showForm ? (
        <PackageForm 
          packageToEdit={editingPackage}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingPackage(null);
          }}
        />
      ) : (
        <div className="packages-table-container">
          <table className="packages-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Ubicación</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {packages.length > 0 ? (
                packages.map(pkg => (
                  <tr key={pkg.id}>
                    <td>{pkg.title}</td>
                    <td>{pkg.location}</td>
                    <td>${pkg.price.toLocaleString()}</td>
                    <td className="actions-cell">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEdit(pkg)}
                      >
                        Editar
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(pkg.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No hay paquetes disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPackages;
```

### Configuración de Rutas

Configura las rutas en `App.js`:

```jsx:c:\Users\bauti\OneDrive\Escritorio\TUP\ProyectosFinales\Proyecto-Final-Prog3\frontend\src\App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './services/auth';

// Componentes comunes
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Páginas públicas
import Home from './pages/public/Home';
import PackageDetails from './pages/public/PackageDetails';
import ReservationConfirmation from './pages/public/ReservationConfirmation';

// Páginas de administración
import Login from './pages/admin/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPackages from './pages/admin/AdminPackages';
import AdminReservations from './pages/admin/AdminReservations';

// Layout para administración
import AdminLayout from './components/admin/AdminLayout';

// Ruta protegida para administradores
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          } />
          <Route path="/packages/:id" element={
            <>
              <Header />
              <PackageDetails />
              <Footer />
            </>
          } />
          <Route path="/reservation-confirmation" element={
            <>
              <Header />
              <ReservationConfirmation />
              <Footer />
            </>
          } />
          
          {/* Rutas de administración */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/packages" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminPackages />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/reservations" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminReservations />
              </AdminLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

## 4. Estilos

Puedes crear estilos en la carpeta `frontend/src/styles/` para cada componente o usar un enfoque de CSS-in-JS como styled-components.

## 5. Despliegue con Docker

Ya tienes configurados los Dockerfiles y docker-compose.yml. Para iniciar la aplicación, ejecuta:

```bash
docker-compose up -d
```

Esto iniciará el backend, frontend, PostgreSQL y pgAdmin.

## 6. Pasos para Implementar

1. **Base de datos**: Configura el archivo `init.sql` con las tablas necesarias.
2. **Backend**: Implementa los modelos, controladores y rutas.
3. **Frontend**: Desarrolla los componentes y páginas para usuarios y administradores.
4. **Pruebas**: Verifica que todas las funcionalidades trabajen correctamente.
5. **Despliegue**: Utiliza Docker para desplegar la aplicación.

## 7. Credenciales de Administrador

Para acceder al panel de administración, usa:
- Email: admin@example.com
- Contraseña: admin123

Este es un plan completo para implementar la aplicación de paquetes turísticos según tus requerimientos. Puedes ajustar cualquier parte según tus necesidades específicas.

```bash

git checkout main

git merge simon

ERROR POSIBLE: merge: simon - not something we can merge

Did you mean this?
        origin/simon

SOLUCION: $ git fetch origin simon:simon

Luego:
$ git merge simon

$ git push origin main
```