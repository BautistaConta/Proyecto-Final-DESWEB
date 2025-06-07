const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware); // proteger todas las rutas

router.get('/', tasksController.getTasks);

// Aquí agregarías POST /, GET /:id, PUT /:id, DELETE /:id, comentarios, etiquetas, compartir...

module.exports = router;
