// NodeJS => Chrome running on the server
// Express => MVC framework
// $5 per month (15-20)
// Dedicated Server from Linode and DigitalOcean $5 => Rs. 350/-

import express, { json } from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors';

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mahdi@786',
    database: 'demo'
});

var app = express();
app.use(cors());
app.use(json());

// callback
// promises

// fetch all tasks 
app.get('/', function(req,res) {
    connection.query('select * from tasks', (err,rows) => {
        if(err) throw err;
        res.send(rows);
    });
})

// add a task
app.post('/',function(req,res){
    connection.query('insert into tasks(task) values(?)', 
        [req.body.task],
        (err,rows) => {
            if(err) throw err;
            res.send({id: rows.insertId});
        });
})

// add a task
app.post('/complete',function(req,res){
    connection.query('update tasks set status=1 where id = ?', 
        [req.body.id],
        (err,rows) => {
            if(err) throw err;
            res.send({});
        });
})

// delete a task
app.delete('/',function(req,res){
    connection.query('delete from tasks where id = ?', 
        [req.body.id],
        (err,rows) => {
            if(err) throw err;
            res.send({});
        });
})

//Server
app.listen(3000);