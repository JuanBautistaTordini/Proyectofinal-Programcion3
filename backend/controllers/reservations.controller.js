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

//Editar una reserva (solo admin)
// exports.updateReservation = async (req, res) => {
//   try {
//     const { name, email, package_id, reservation_date } = req.body;
//     const reservation = await Reservation.findByPk(req.params.id);
    
//     if (!reservation) {
//       return res.status(404).json({ message: 'Reserva no encontrada' });
//     }
    
//     // Verificar que el paquete existe
//     const packageExists = await Package.findByPk(package_id);
//     if (!packageExists) {
//       return res.status(404).json({ message: 'El paquete seleccionado no existe' });
//     }
    
//     await reservation.update({
//       name,
//       email,
//       package_id,
//       reservation_date
//     });
    
//     res.json(reservation);
//   } catch (error) {
//     console.error('Error al actualizar reserva:', error);
//     res.status(500).json({ message: 'Error al actualizar reserva' });
//   }
// };

// Eliminar una reserva (solo admin)
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    
    await reservation.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar reserva:', error);
    res.status(500).json({ message: 'Error al eliminar reserva' });
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

// Obtener una reserva por ID (solo admin)
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id, {
      include: [{ model: Package, attributes: ['title'] }]
    });
    
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    
    res.json(reservation);
  } catch (error) {
    console.error('Error al obtener reserva:', error);
    res.status(500).json({ message: 'Error al obtener reserva' });
  }
};
