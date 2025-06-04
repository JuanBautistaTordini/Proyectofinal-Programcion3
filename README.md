# 🚀 Sistema Web Full-Stack con Docker

## 📋 Componentes Principales

### 🎯 Arquitectura General
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Nginx     │    │   React     │    │   Express   │
│  (Proxy)    │◄──►│ (Frontend)  │◄──►│  (Backend)  │
│   :80       │    │   :3000     │    │   :3001     │
└─────────────┘    └─────────────┘    └─────────────┘
                                              │
                   ┌─────────────┐    ┌─────────────┐
                   │    Redis    │    │ PostgreSQL  │
                   │  (Cache)    │    │    (DB)     │
                   │   :6379     │    │   :5432     │
                   └─────────────┘    └─────────────┘
```

### 🔧 Servicios del Sistema

| Servicio | Tecnología | Puerto | Función |
|----------|------------|--------|---------|
| **Frontend** | React 18 | 3000 | Interfaz de usuario |
| **Backend** | Express + Sequelize | 3001 | API REST |
| **Database** | PostgreSQL 15 | 5432 | Base de datos principal |
| **Cache** | Redis 7 | 6379 | Cache y sesiones |
| **Proxy** | Nginx | 80 | Reverse proxy |
| **pgAdmin** | pgAdmin 4 | 5050 | Administración de BD |

---

## 🏗️ Construcción Inicial

### 1️⃣ Preparación del Entorno
```bash
# Clonar el proyecto
git clone https://github.com/gramoscelli/Proyecto-Final-Prog3.git

# Navegar al proyecto
cd Proyecto-Final-Prog3

```

### 2️⃣ Configuración de Variables
```bash
# Editar .env con tus valores
nano .env
```

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

# Iniciar en background
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend

# Detener servicios
docker-compose down

# Detener y limpiar volúmenes
docker-compose down -v
```

### URLs de Acceso
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001/api
- **Health Check:** http://localhost:3001/health
- **Nginx Proxy:** http://localhost
- **pgAdmin 4:** http://localhost:5050
- **Base de datos:** localhost:5432

---

## 🔄 Desarrollo con Hot Reload

### Funcionamiento Automático
- ✅ **React**: Cambios en `.js`, `.jsx`, `.css` → Recarga automática
- ✅ **Express**: Cambios en `.js` → Reinicio con nodemon
- ✅ **Base de datos**: Persistencia con volúmenes Docker

### Workflow de Desarrollo
1. Modifica archivos en `frontend/src/` o `backend/`
2. Los cambios se detectan automáticamente
3. El servicio correspondiente se actualiza
4. Verifica cambios en el navegador

---

## ⚠️ Problemas Comunes y Soluciones

### 🔴 Error: "Cannot find module './models'"
**Problema:** Faltan archivos básicos del backend
```bash
# Solución
mkdir -p backend/models backend/routes
# Crear archivos básicos con los scripts proporcionados
```

### 🔴 Error: "Could not find index.html"
**Problema:** React no encuentra archivos básicos
```bash
# Solución
mkdir -p frontend/public frontend/src
# Crear archivos básicos de React
```

### 🔴 Error: "psql: Is a directory"
**Problema:** `init.sql` es carpeta en lugar de archivo
```bash
# Solución
rm -rf database/init.sql
touch database/init.sql
# Agregar contenido SQL al archivo
```

### 🔴 Puerto ya en uso
**Problema:** Servicios corriendo en puertos ocupados
```bash
# Verificar puertos ocupados
netstat -4 -tln | grep :3000

# Solución: Cambiar puertos en docker-compose.yml
ports:
  - "3002:3000"  # Cambia puerto externo
```

### 🔴 Error de permisos en Docker
**Problema:** Permisos de archivos en contenedores
```bash
# Solución
sudo chown -R $USER:$USER .
chmod -R 755 .
```

### 🔴 Hot reload no funciona
**Problema:** Cambios no se detectan automáticamente
```bash
# Verificar variables de entorno
CHOKIDAR_USEPOLLING=true
WATCHPACK_POLLING=true

# Reiniciar servicio específico
docker-compose restart frontend
```

### 🔴 Base de datos no conecta
**Problema:** Backend no puede conectar a PostgreSQL
```bash
# Verificar salud de la base de datos
docker-compose ps database

# Ver logs de PostgreSQL
docker-compose logs database

# Reiniciar con volúmenes limpios
docker-compose down -v
docker-compose up --build
```

---

## 🛠️ Comandos de Mantenimiento

### Limpieza del Sistema
```bash
# Limpiar contenedores parados
docker container prune

# Limpiar imágenes sin uso
docker image prune

# Limpiar todo el sistema Docker
docker system prune -a

# Reconstruir desde cero
docker-compose down -v --rmi all
docker-compose build --no-cache
docker-compose up
```

### Base de Datos y Administración
```bash
# Ejecutar migraciones
docker-compose exec backend npm run migrate

# Ejecutar seeders
docker-compose exec backend npm run seed

# Acceder a PostgreSQL via CLI
docker-compose exec database psql -U app_user -d app_database

# Acceder a pgAdmin 4 (Interfaz Web)
# URL: http://localhost:5050
# Email: admin@example.com
# Password: admin123

# Backup de base de datos
docker-compose exec database pg_dump -U app_user app_database > backup.sql

# Restaurar backup
docker-compose exec -T database psql -U app_user -d app_database < backup.sql
```

### Backend - Migraciones y Sequelize
```bash
# Acceder al shell del contenedor backend
docker-compose exec backend sh

# Una vez dentro del contenedor backend:
npx sequelize-cli migration:generate --name create-users
npx sequelize-cli migration:generate --name add-email-to-users
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo
npx sequelize-cli seed:generate --name demo-users
npx sequelize-cli db:seed:all

# Ver estado de migraciones
npx sequelize-cli db:migrate:status

# Salir del contenedor
exit
```

### Frontend - Comandos de Desarrollo
```bash
# Acceder al shell del contenedor frontend
docker-compose exec frontend sh

# Una vez dentro del contenedor:
npm install axios react-router-dom
npm run build
npm run test
npm run eject

# Linting y formateo
npm run lint (si está configurado)

# Salir del contenedor
exit
```

### Debugging
```bash
# Acceder al contenedor del backend
docker-compose exec backend sh

# Acceder al contenedor del frontend
docker-compose exec frontend sh

# Ver variables de entorno
docker-compose exec backend env

# Monitorear recursos
docker stats
```

---

## 📈 Escalabilidad y Producción

### Variables de Entorno de Producción
```env
NODE_ENV=production
POSTGRES_PASSWORD=contraseña_super_segura
JWT_SECRET=jwt_secret_muy_complejo
```

---

### Debugging
```bash
# Acceder al contenedor del backend
docker-compose exec backend sh

# Acceder al contenedor del frontend
docker-compose exec frontend sh

# Ver variables de entorno
docker-compose exec backend env
docker-compose exec frontend env

# Monitorear recursos
docker stats

# Ver logs en tiempo real de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f database
docker-compose logs -f pgadmin
```

---

## 📈 Escalabilidad y Producción

### Optimizaciones Recomendadas
- **Multi-stage builds** para imágenes más pequeñas
- **Health checks** más robustos para todos los servicios
- **Límites de recursos** en contenedores (CPU, memoria)
- **SSL/TLS** con certificados Let's Encrypt
- **Load balancing** con múltiples instancias del backend
- **Separación de entornos** (desarrollo, staging, producción)

### Variables de Entorno de Producción
```env
NODE_ENV=production
POSTGRES_PASSWORD=contraseña_super_segura_produccion
JWT_SECRET=jwt_secret_muy_complejo_y_largo
CORS_ORIGIN=https://tu-dominio.com
PGADMIN_DEFAULT_PASSWORD=password_admin_seguro
```

---

## 📚 Estructura de Archivos Importantes

```
proyecto/
├── docker-compose.yml          # Orquestación de servicios
├── .env                        # Variables de entorno
├── .env.example               # Plantilla de variables
├── .gitignore                 # Archivos a ignorar en Git
├── README.md                  # Documentación del proyecto
│
├── frontend/
│   ├── Dockerfile.dev         # Imagen Docker para desarrollo
│   ├── package.json           # Dependencies de React
│   ├── public/
│   │   ├── index.html         # Página HTML principal
│   │   └── manifest.json      # Configuración PWA
│   └── src/
│       ├── App.js             # Componente principal
│       ├── index.js           # Punto de entrada
│       ├── components/        # Componentes reutilizables
│       ├── pages/             # Páginas de la aplicación
│       ├── services/          # Servicios API
│       └── utils/             # Utilidades
│
├── backend/
│   ├── Dockerfile.dev         # Imagen Docker para desarrollo
│   ├── package.json           # Dependencies de Express
│   ├── server.js              # Servidor principal
│   ├── config/
│   │   └── database.js        # Configuración de Sequelize
│   ├── models/
│   │   └── index.js           # Modelos de Sequelize
│   ├── controllers/           # Lógica de negocio
│   ├── routes/                # Rutas del API
│   │   └── index.js           # Rutas principales
│   ├── middleware/            # Middlewares personalizados
│   ├── migrations/            # Migraciones de BD
│   └── seeders/               # Datos de prueba
│
├── database/
│   └── init.sql               # Script de inicialización
│
├── nginx/
│   └── nginx.conf             # Configuración del proxy
│
├── pgadmin/
│   ├── servers.json           # Configuración de servidores
│   └── pgpass                 # Credenciales de BD
│
└── scripts/
    └── setup-directories.sh   # Script de inicialización
```

---

## 🎯 Tips y Mejores Prácticas

### Resolución de Problemas
1. **Verifica logs** primero: `docker-compose logs -f`
2. **Comprueba estado** de contenedores: `docker-compose ps`
3. **Reinicia servicios** específicos si es necesario
4. **Limpia volúmenes** si hay problemas de datos
5. **Reconstruye imágenes** como último recurso

### Comandos de Emergencia
```bash
# Reiniciar todo el sistema
docker-compose restart

# Limpiar y empezar desde cero
docker-compose down -v --rmi all
docker-compose build --no-cache
docker-compose up

# Liberar espacio en Docker
docker system prune -a --volumes
```

---

## 🆘 Soporte y Recursos

### Documentación Oficial
- **Docker Compose**: https://docs.docker.com/compose/
- **React**: https://react.dev/
- **Express**: https://expressjs.com/
- **Sequelize**: https://sequelize.org/
- **PostgreSQL**: https://www.postgresql.org/docs/
- **pgAdmin**: https://www.pgadmin.org/docs/

### Comunidades y Ayuda
- **Stack Overflow** para problemas específicos
- **GitHub Issues** de cada proyecto
- **Discord/Slack** de las comunidades
- **Reddit** r/docker, r/reactjs, r/node

