require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // El puerto donde corre Next.js
  credentials: true,
}));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado a MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en puerto ${PORT}`);
  });
})
.catch((err) => {
  console.error('Error conectando a MongoDB:', err);
});
