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
