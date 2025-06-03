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


