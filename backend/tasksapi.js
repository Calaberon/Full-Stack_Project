const express = require('express');
const app = express();
// const path = require('path');
// const realmsJSON = path.join(__dirname, 'tasksdb.sql');
const { exit } = require('process');
const { Pool } = require('pg');
const postgres = require("postgres");
app.use(express.json());
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');

// PORT = 15000
// DATABASE_URL = postgres://calebdewey@localhost:5432/student_db
const pool = new Pool({
    user: 'student_db_1glt_user',
    database: 'student_db_1glt',
    password: 'Q9sSzchOGUjB2MXL9o2P9pPcARl6T0lr',
    host: 'dpg-cfa0p6ta49987h4tomb0-a',
    port: 5432
});
const sql = postgres(process.env.DATABASE_URL);
app.use(express.static("public"));
//GET ALL
app.get('/tasks', async (req, res) => {
    try {
        const tasksEnt = await pool.query(`SELECT * FROM tasks`);
        res.status(200);
        res.set('Content-Type', 'application/json');
        res.send(tasksEnt.rows);
    } catch(err) {
        res.send(err);
    }
});

// app.get('/tasks', async (req, res) => {
//     try {
//         const tasksEnt = await sql`SELECT * FROM tasks`;
//         res.status(200);
//         res.set('Content-Type', 'application/json');
//         res.send(tasksEnt.rows);
//     } catch(err) {
//         res.send(err);
//     }
// });



app.listen(PORT, function(){
    console.log(`listening on port ${PORT}`);
});

// // import express from "express";
// // import postgres from "postgres";

// // TODO: Uncomment the following two lines.
// // import dotenv from "dotenv";
// dotenv.config();

// // const app = express();

// // TODO: Replace with process.env.DATABASE_URL
// // Format: postgres://USER:PASSWORD@HOST:PORT/DATABASE
// // const sql = postgres("postgres://localhost/example_db");
// //this gives access to the database
// const sql = postgres(process.env.DATABASE_URL);


// app.use(express.static("public"));

// app.get("/tasks", (req, res) => {
//   sql`SELECT * FROM tasks`.then((data) => {
//     res.json(data);
//   });
// });

// // TODO: Replace 3000 with process.env.PORT
// app.listen(3000, () => {
//   console.log(`listening on Port ${3000}`);
// });