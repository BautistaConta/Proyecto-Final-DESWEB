const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware); // proteger todas las rutas

router.get('/', tasksController.getTasks);
router.post('/', tasksController.createTask);
router.get('/:id', tasksController.getTaskById);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);
router.post("/compartir/:id", tasksController.compartirTarea);
router.post('/:id/comments', tasksController.comentarTarea);
router.post("/:id/tags", tasksController.agregarEtiqueta);


// Aquí agregarías POST /, GET /:id, PUT /:id, DELETE /:id, comentarios, etiquetas, compartir...

module.exports = router;
