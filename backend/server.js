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

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err.message);
    return;
  }
  console.log("Connected to the databasee...");
});

// create server
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

//Get users (READ)
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res
        .status(500)
        .send(`Error at getting users. Error Message: ${err.message}`);
      return;
    }
    res.json(result);
    console.log(result);
    console.log("Data fetched successfully");
  });
});

//Create user (CREATE)
app.post("/users/add", (req, res) => {
  console.log("GET BODY" + req.body.name);
  res.end();
  res.send(req.body);
  const { first_name, last_name, age, email } = req.body;
  const query =
    "INSERT INTO users (first_name, last_name, age, email) VALUES (?, ?, ?, ?)";
  const values = [first_name, last_name, age, email];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error message: ", err.message);
      res
        .status(500)
        .send(`Error creating user. Error Message: ${err.message}`);
      return;
    } else {
      res.json({
        id: result.insertId,
        first_name,
        last_name,
        age,
        email,
      });
      console.log("User created successfully");
    }
  });
});

// Update users (UPDATE)
app.put("users/update/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, age, email } = req.body;
  const query = `
  UPDATE users SET 
  first_name = ?, 
  last_name = ?, 
  age = ?, 
  email = ?   
  `;
  const values = [first_name, last_name, age, email];
  db.query(query, values, (err, result) => {
    if (err) {
      res
        .status(500)
        .send(`Error while updating users. Error Message: ${err.message}`);
      return;
    } else {
      res.json({
        id: result.insertId,
        first_name,
        last_name,
        age,
        email,
      });
    }
  });
});

// Delete user (DELETE)
app.put("/users/delete/:id", (req, res) => {
  const { id } = req.params;
  // const {first_name, last_name, age, email} = req.body
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res
        .status(500)
        .send(`Error while deleting user. Error Message: ${err.message}`);
      return;
    } else {
      res.status(204).send();
    }
  });
});
