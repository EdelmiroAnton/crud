/* eslint-disable no-undef */
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Edeede123*",
  database: "users",
});

db.connect((err) => {
  if (err) {
    console.log(
      `Error en la conexion a la base de datos. ${err.stack}, ${err.cause} ${err.code}`
    );
    return;
  }
  console.log("Conectado a la base de datos!");
});

//Obtener todos los usuarios
app.get("/user", (req, res) => {
  db.query("SELECT * FROM USERS", (err, rows) => {
    if (err) {
      res.status(500).send({
        error: "Error al obtener usuarios",
      });
    } else {
      res.json(rows);
    }
  });
});

// Crear nuevo usuario
app.post("/user/add", (req, res) => {
  const { nombre, email } = req.body;
  const query = "INSERT INTO users (nombre, email) VALUES (?,?)";
  db.query(query, [nombre, email], (err, results) => {
    if (err) {
      res.status("Error al crear el usuario");
    } else {
      res.status(201).json({
        id: results.insertId,
        nombre,
        email,
      });
    }
  });
});

// Actualizar usuarios
app.put("/user/update/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;

  const query = "UPDATE users SET nombre = ?, email = ?, WHERE id = ?";

  db.query(query, [nombre, email, id], (err) => {
    if (err) {
      res.status(500).send({
        error: "Error al actualizar datos",
      });
    } else {
      res.json({ id, nombre, email });
    }
  });
});

//Eliminar usuarios

app.delete("/user/delete/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) {
      res.status(500).send({
        error: "Error al eliminar usuarios",
      });
    } else {
      res.status(204).send();
    }
  });
});

//Iniciar Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
