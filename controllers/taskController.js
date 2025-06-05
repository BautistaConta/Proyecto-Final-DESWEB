const Task = require("../models/Task");
const User = require("../models/User");

// Mostrar todas las tareas del usuario
exports.listarTareas = async (req, res) => {
  try {
    const tareas = await Task.find({
      $or: [
        { owner: req.session.userId },
        { sharedWith: req.session.userId }
      ]
    });

    res.render("dashboard", { tareas, username: req.session.username });
  } catch (err) {
    console.error("Error al listar tareas:", err);
    res.status(500).send("Error al listar tareas");
  }
};

// Crear nueva tarea
exports.crearTarea = async (req, res) => {
  try {
    const nueva = new Task({
      title: req.body.title,
      description: req.body.description,
      owner: req.session.userId,
    });
    await nueva.save();
    res.redirect("/tasks");
  } catch (err) {
    res.status(500).send("Error al crear tarea");
  }
};

// Mostrar formulario de edición
exports.mostrarEditar = async (req, res) => {
  const tarea = await Task.findById(req.params.id);
  if (!tarea || tarea.owner.toString() !== req.session.userId) {
    return res.status(403).send("No autorizado");
  }
  res.render("editTask", { tarea });
};

// Editar tarea
exports.editarTarea = async (req, res) => {
  try {
    const tarea = await Task.findById(req.params.id);
    if (!tarea || tarea.owner.toString() !== req.session.userId) {
      return res.status(403).send("No autorizado");
    }

    tarea.title = req.body.title;
    tarea.description = req.body.description;
    tarea.completed = req.body.completed === "on";

    await tarea.save();
    res.redirect("/tasks");
  } catch (err) {
    res.status(500).send("Error al editar tarea");
  }
};

// Eliminar tarea
exports.eliminarTarea = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id, owner: req.session.userId });
    res.redirect("/tasks");
  } catch (err) {
    res.status(500).send("Error al eliminar tarea");
  }
};

//Compartir tarea
exports.compartirTarea = async (req, res) => {
  const { email } = req.body;
  try {
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(404).send("Usuario no encontrado");

    const tarea = await Task.findById(req.params.id);
    if (!tarea || tarea.owner.toString() !== req.session.userId) {
      return res.status(403).send("No autorizado");
    }

    if (!tarea.sharedWith.includes(usuario._id)) {
      tarea.sharedWith.push(usuario._id);
      await tarea.save();
    }

    res.redirect("/tasks");
  } catch (err) {
    res.status(500).send("Error al compartir tarea");
  }
};

//Comentar
exports.comentarTarea = async (req, res) => {
  try {
    const tarea = await Task.findById(req.params.id);
    if (!tarea) return res.status(404).send("Tarea no encontrada");

    tarea.comments.push({
      author: req.session.userId,
      text: req.body.text,
    });

    await tarea.save();
    res.redirect("/tasks");
  } catch (err) {
    res.status(500).send("Error al comentar");
  }
};

//Etiqueta
exports.agregarEtiqueta = async (req, res) => {
  try {
    const tarea = await Task.findById(req.params.id);
    if (!tarea) return res.status(404).send("Tarea no encontrada");

    const nuevaEtiqueta = req.body.tag;
    if (!tarea.tags.includes(nuevaEtiqueta)) {
      tarea.tags.push(nuevaEtiqueta);
      await tarea.save();
    }

    res.redirect("/tasks");
  } catch (err) {
    res.status(500).send("Error al agregar etiqueta");
  }
};