const { Reservation, Package } = require('../models');

exports.createReservation = async (req, res) => {
  try {
    const { name, email, package_id, reservation_date } = req.body;

    const pkg = await Package.findByPk(package_id);
    if (!pkg) return res.status(404).json({ message: 'El paquete seleccionado no existe' });

    const newReservation = await Reservation.create({
      name,
      email,
      package_id,
      reservation_date
    });

    res.status(201).json({
      status: 'success',
      message: 'Reserva creada exitosamente',
      reservation: newReservation
    });
    
  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({ message: 'Error al crear reserva' });
  }
};

exports.deleteReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reserva no encontrada' });

    await reservation.destroy();
    res.status(201).json({
      status: 'success',
      message: 'Reserva eliminada exitosamente',
      deleted: reservation
    });
  } catch (error) {
    console.error('Error al eliminar reserva:', error);
    res.status(500).json({ message: 'Error al eliminar reserva' });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [{ model: Package, attributes: ['title'] }]
    });

    res.status(201).json({
      status: 'success',
      message: 'Reservas obtenidas exitosamente',
      allReservations: reservations
    });
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ message: 'Error al obtener reservas' });
  }
};

