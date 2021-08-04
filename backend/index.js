const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const e = require('express');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "dbadmin",
    host: "db",
    password: "password",
    database: "employee"
})

app.get('/emp',(req,res) => {
    db.query("SELECT * FROM employee",(err,result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/create',(req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const position = req.body.position;
    const salary = req.body.salary;

    db.query("INSERT INTO employee (name,email,position,salary) VALUES(?,?,?,?)", 
    [name,email,position,salary],
    (err,result) => {
        if (err){
            console.log(err)
        } else {
            res.send("value added")
        }
    }
    )
})

app.put('/update', (req,res) => {
    const id = req.body.id;
    const salary = req.body.salary;
    db.query("UPDATE employee SET salary = ? WHERE id = ?", [salary,id], (err,result) => {
        if(err) {
            console.log(err);
        }else{
            res.send(result);
        }
    });
})

app.delete('/delete/:id', (req,res) => {
    const id = req.params.id;
    db.query("DELETE FROM employee WHERE id = ?", id,(err,result) => {
        if (err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
app.listen('3001' , () => {
    console.log('server running on port 3001');
})
