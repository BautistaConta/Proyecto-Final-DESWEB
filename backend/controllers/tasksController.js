const Task = require('../models/Task');
const User = require('../models/User');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ 
      $or: [
        { user: req.user.userId },             // propias
        { sharedWith: req.user.userId }        // compartidas
      ]
    }).populate('user', 'name email');

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas', error });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.userId;

    if (!title) {
      return res.status(400).json({ message: 'El título es obligatorio' });
    }

    const newTask = new Task({
      user: userId,
      title,
      description,
      comments: [],
      tags: [],
      sharedWith: []
    });

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tarea', error });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;

    const task = await Task.findById(taskId)
      .populate('user', 'name email')
      .populate('comments.user', 'name email');

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    // Verificar que el usuario sea dueño o esté en sharedWith
    if (task.user._id.toString() !== userId && !task.sharedWith.includes(userId)) {
      return res.status(403).json({ message: 'No autorizado para ver esta tarea' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tarea', error });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;
    const { title, description } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    if (task.user.toString() !== userId) {
      return res.status(403).json({ message: 'No autorizado para modificar esta tarea' });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar tarea', error });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    if (task.user.toString() !== userId) {
      return res.status(403).json({ message: 'No autorizado para eliminar esta tarea' });
    }

    await task.deleteOne();

    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar tarea', error });
  }
};

exports.compartirTarea = async (req, res) => {
  const { email } = req.body;
  const taskId = req.params.id;
  const userId = req.user.userId;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

    const tarea = await Task.findById(taskId);
    if (!tarea) return res.status(404).json({ message: "Tarea no encontrada" });

    if (tarea.user.toString() !== userId) {
      return res.status(403).json({ message: "No autorizado para compartir esta tarea" });
    }

    if (!tarea.sharedWith.includes(usuario._id)) {
      tarea.sharedWith.push(usuario._id);
      await tarea.save();
    }

    res.json({ message: "Tarea compartida correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al compartir tarea", error: err.message });
  }
};

//Comentar
exports.comentarTarea = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.userId;
  const { text } = req.body;

  try {
    const tarea = await Task.findById(taskId);
    if (!tarea) return res.status(404).json({ message: "Tarea no encontrada" });

    tarea.comments.push({ user: userId, text });

    await tarea.save();
    res.status(201).json({ message: "Comentario agregado" });
  } catch (err) {
    res.status(500).json({ message: "Error al comentar", error: err.message });
  }
};

//Etiqueta
exports.agregarEtiqueta = async (req, res) => {
  const taskId = req.params.id;
  const { tag } = req.body;

  try {
    const tarea = await Task.findById(taskId);
    if (!tarea) return res.status(404).json({ message: "Tarea no encontrada" });

    if (!tarea.tags.includes(tag)) {
      tarea.tags.push(tag);
      await tarea.save();
    }

    res.status(200).json({ message: "Etiqueta agregada correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al agregar etiqueta", error: err.message });
  }
};