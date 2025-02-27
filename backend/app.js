import express from "express";
import mysql from "mysql2";
import cors from "cors";
const app = express();
const port = 3000;

//Connection to database
const DB = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "user",
  password: "admin",
});

DB.connect((err) => {
  if (err) throw err;
  console.log("Conexion exitosa!");
});

//Server
app.use(cors());
app.get("/", (req, res) => {
  const sql = "SELECT * FROM info";
  DB.query(sql, (err, result) => {
    if (err) console.log(err.message);
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`App listening the port ${port} :)`);
});
