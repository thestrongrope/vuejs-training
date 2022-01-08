const express = require('express');
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const cors = require('cors')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mahdi@786',
    database: 'demo'
});

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// fetch all tasks
app.get('/',function(req,res){
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

// add a task
app.delete('/',function(req,res){
    connection.query('delete from tasks where id = ?', 
        [req.body.id],
        (err,rows) => {
            if(err) throw err;
            res.send({});
        });
})

//Server
app.listen(3000,function(){
    console.log('Server is Up')
})
