const express = require('express');
const app = express();
const cors = require('cors');
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

//GET 1
app.get('/tasks/:id', async (res, req) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query('SELECT * FROM tasks');
        res.send(rows[id]);
    } catch(err) {
        res.send(err);
        exit(500);
    }
})

//POST
app.post('/tasks', async (req, res) => {
    try {
        const { taskname, body, realm_id } = req.body;
        const { rows } = await pool.query('INSERT INTO tasks (taskname, body, realm_id) VALUES ($1, $2, $3) RETURNING *', [taskname, body, realm_id]);
        res.status(200);
        res.set('Content-Type', 'application/json');
        res.send(rows);
    } catch(err) {
        res.send(err);
        exit(500);
    }
});

//PUT
app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { taskname, body, realm_id } = req.body;
        const { rows } = await pool.query('UPDATE tasks SET taskname = $1, body = $2, realm_id = $3 WHERE id = $4', [taskname, body, realm_id, id]);
        res.send(rows);
    } catch(err) {
        res.send(err);
        exit(500);
    }
});

//PATCH
app.patch('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let { body } = req;
        for (key in body) {
            await pool.query(`UPDATE tasks SET ${ key } = '${ body[key] }' WHERE id = ${ id }`);
        }
        const { newTask } = await pool.query(`SELECT * FROM tasks WHERE id = ${ id }`);
        res.send(newPet.rows);
    } catch(err) {
        res.send(err);
        exit(500);
    }
});

//DELETE
app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { taskname, body, realm_id } = body.req;
        const { rows } = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        res.send(rows);
    } catch(err) {
        res.send(err);
        exit(500);
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