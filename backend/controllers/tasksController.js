const Task = require('../models/Task');

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
