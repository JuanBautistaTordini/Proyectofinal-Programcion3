// controllers/admin_users.controller.js
const { AdminUser } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("BODY recibido:", req.body);

    const user = await AdminUser.findOne({ where: { email } });
    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    console.log("Usuario encontrado:", user.email);

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    console.log("Password válido:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    console.log("Token generado:", token);

    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
