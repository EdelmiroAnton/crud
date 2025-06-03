import mysql from "mysql2";
import express from "express";
import cors from "cors";

//crete connection to the database

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "crud",
});
console.log("Connected to the databasee...");

// create server
const app = express();
const port = 3000;
app.use(cors());

app.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) console.error(`Error message: ${err.message}`);
    res.send(result);
    console.log(result);
    console.log("Data fetched successfully");
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
