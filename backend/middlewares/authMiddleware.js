const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, autorización denegada' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contiene userId y email
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;

const protegido = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guarda info del usuario en la request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = protegido;