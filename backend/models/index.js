// backend/models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/database');
const Packages = require('./packages.model');
const Reservations = require('./reservations.model');
const AdminUsers = require('./admin_users.model');

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

Package.hasMany(Reservation, { foreignKey: 'package_id' });
Reservation.belongsTo(Package, { foreignKey: 'package_id' });

module.exports = {
  sequelize,
  Sequelize,
  Packages,
  Reservations,
  AdminUsers
};