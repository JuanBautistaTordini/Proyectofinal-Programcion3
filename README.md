# 🚀 Sistema Web Full-Stack con Docker - PATAGONIA TRIP

### 🔧 Servicios del Sistema

| Servicio | Tecnología | Puerto | Función |
|----------|------------|--------|---------|
| **Frontend** | React 18 | 3000 | Interfaz de usuario |
| **Backend** | Express + Sequelize | 3001 | API REST |
| **Database** | PostgreSQL 15 | 5432 | Base de datos principal |
| **pgAdmin** | pgAdmin 4 | 5050 | Administración de BD |

---

### 3️⃣ Primera Construcción
```bash
# Construir todas las imágenes
docker-compose build

# Inicializar base de datos y servicios
docker-compose up -d
```

---

## 🚀 Ejecución del Sistema

### Comandos Principales
```bash
# Iniciar todos los servicios
docker-compose up

# Detener servicios
docker-compose down

```

### URLs de Acceso
- **Frontend:** http://localhost:3000
- **Frontend - Admin:** http://localhost:3000/admin admin@example.com admin123
- **Backend API:** http://localhost:3001/api
- **Health Check:** http://localhost:3001/health
- **pgAdmin 4:** http://localhost:5050
- **Base de datos:** localhost:5432

---

¡Sistema completo y listo para desarrollo! 🚀