const express = require('express');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config()
const app = express();
const PORT = process.env.PORT || 10000;
const pool = new Pool({
   connectionString: process.env.DATABASE_URL
});
    

app.use(express.json());
app.use(express.static('Public'));

//GET ALL
app.route('/tasks')
    .get(async (req, res) => {
        try {
            const tasksEnt = await pool.query(`SELECT * FROM tasks`);
            res.status(200);
            res.set('Content-Type', 'application/json');
            res.send(tasksEnt.rows);
        } catch(err) {
            res.send(err);
        }
    })

    //POST
    .post(async (req, res) => {
        try {
            const { body } = req
            await pool.query(`INSERT INTO tasks (taskname, realm_id) VALUES ('${body.taskname}', ${body.realmID})`);
            res.status(201).json({validation: true})
        } catch(err) {
            res.status(500).json({message: err.message})
        }
    })

//PUT
app.route('/tasks/:id')
    .get(async (res, req) => {
        try {
            const { id } = req.params;
            const { rows } = await pool.query('SELECT * FROM tasks');
            res.send(rows[id]);
        } catch(err) {
            res.status(500).json({message: err.message})
        }
    })

//PATCH
    .patch( async (req, res) => {
        try {
            const { id } = req.params;
            let { body } = req;
            for (key in body) {
                await pool.query(`UPDATE tasks SET ${ key } = '${ body[key] }' WHERE id = ${ id }`);
            }
            res.status(204).send()
        } catch(err) {
            res.status(500).json({message: err.message})
        }
    })

//DELETE
    .delete(async (req, res) => {
        try {
            const { id } = req.params;
            await pool.query(`DELETE FROM tasks WHERE id = ${id}`);
            res.status(200).json({validation: true})
        } catch(err) {
            res.status(500).json({message: err.message})
        }
    });

// app.use('/', (req, res) => {
//     res.status(400).send('Bad Request: Invalid Route')
// })

app.listen(PORT, function(){
    console.log(`Server listening on port: ${PORT}`);
});