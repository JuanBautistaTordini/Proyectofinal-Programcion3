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

// importar modelos correctamente
const Packages = require('./packages.model')(sequelize, DataTypes);
const Reservations = require('./reservations.model')(sequelize, DataTypes);
const AdminUsers = require('./admin_users.model')(sequelize, DataTypes);

// relaciones
Packages.hasMany(Reservations, { foreignKey: 'package_id' });
Reservations.belongsTo(Packages, { foreignKey: 'package_id' });

module.exports = {
  sequelize,
  Sequelize,
  Packages,
  Reservations,
  AdminUsers
};
