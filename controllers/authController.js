const User = require("../models/User");

// Mostrar vista de registro
exports.mostrarRegistro = (req, res) => {
  res.render("register");
};

// Mostrar vista de login
exports.mostrarLogin = (req, res) => {
  res.render("login");
};

// Registrar usuario
exports.registrarUsuario = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const nuevoUsuario = new User({ username, email, password });
    await nuevoUsuario.save();
    res.redirect("/login");
  } catch (error) {
    console.error("Error al registrar:", error);
    res.status(500).send("Error al registrar");
  }
};

// Iniciar sesión
exports.iniciarSesion = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(401).send("Usuario no encontrado");

    const contraseñaValida = await usuario.comparePassword(password);
    if (!contraseñaValida) return res.status(401).send("Contraseña incorrecta");

    // Guardar sesión
    req.session.userId = usuario._id;
    req.session.username = usuario.username;

    res.redirect("/tasks");
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).send("Error en login");
  }
};

// Cerrar sesión
exports.cerrarSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
