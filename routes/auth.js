const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/register", authController.mostrarRegistro);
router.post("/register", authController.registrarUsuario);

router.get("/login", authController.mostrarLogin);
router.post("/login", authController.iniciarSesion);

router.get("/logout", authController.cerrarSesion);

module.exports = router;
