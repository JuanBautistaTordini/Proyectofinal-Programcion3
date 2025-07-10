// backend/models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions
  }
);

// Importar modelos
const Package = require('./packages.model')(sequelize, DataTypes);
const Reservation = require('./reservations.model')(sequelize, DataTypes);
const AdminUser = require('./admin_users.model')(sequelize, DataTypes);

// Relaciones
Package.hasMany(Reservation, { foreignKey: 'package_id' });
Reservation.belongsTo(Package, { foreignKey: 'package_id' });

module.exports = {
  sequelize,
  Sequelize,
  Package,
  Reservation,
  AdminUser
};
