// backend/routes/index.js
const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packages.controller');
const reservationController = require('../controllers/reservations.controller');
const adminController = require('../controllers/admin_users.controller');
const { authenticateJWT } = require('../middleware/verifyToken.middleware');

// Ruta de prueba
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

//Ruta de ejemplo
router.get('/test', (req, res) => {
 res.json({
    message: 'Endpoint de prueba',
    data: {
      backend: 'Express',
      database: 'PostgreSQL',
      orm: 'Sequelize'
    }
  });
});

// Rutas públicas
router.get('/packages', packageController.getAllPackages);//anda
router.get('/packages/:id', packageController.getPackageById); //anda
router.post('/reservations', reservationController.createReservation);//anda
router.post('/admin/login', adminController.login); //anda

// Rutas protegidas (solo admin)
router.post('/packages', authenticateJWT, packageController.createPackage);
router.put('/packages/:id', authenticateJWT, packageController.updatePackage);
router.delete('/packages/:id', authenticateJWT, packageController.deletePackage);
router.get('/reservations', authenticateJWT, reservationController.getAllReservations);
router.delete('/reservations/:id', authenticateJWT, reservationController.deleteReservationById);


module.exports = router;
