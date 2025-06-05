const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Middleware para proteger rutas
function protegido(req, res, next) {
  if (!req.session.userId) return res.redirect("/login");
  next();
}

router.get("/", protegido, taskController.listarTareas);
router.post("/crear", protegido, taskController.crearTarea);

router.get("/editar/:id", protegido, taskController.mostrarEditar);
router.post("/editar/:id", protegido, taskController.editarTarea);

router.post("/eliminar/:id", protegido, taskController.eliminarTarea);
router.post("/compartir/:id", protegido, taskController.compartirTarea);
router.post("/comentar/:id", protegido, taskController.comentarTarea);
router.post("/etiquetar/:id", protegido, taskController.agregarEtiqueta);

module.exports = router;
