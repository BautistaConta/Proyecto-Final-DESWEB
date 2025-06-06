require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch((err) => console.error("❌ Error al conectar:", err));

require("dotenv").config();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: "secreto", resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(expressLayouts);                
app.set("view engine", "ejs");
app.set("layout", "layout");             


// Rutas
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

app.use("/", authRoutes);
app.use("/tasks", taskRoutes);

// Servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
