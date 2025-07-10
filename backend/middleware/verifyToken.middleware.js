// middleware/verifyToken.middleware.js
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