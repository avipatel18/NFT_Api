var express = require('express');
var mysql = require('mysql');

var app = express.Router();

function getMySQLConnection() {
    return mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'Testdb'
    });
}

//app.set('view engine', 'pug');

app.get('/employee', function (req, res) {

    var connection = getMySQLConnection();
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });

    connection.query('SELECT * FROM Employee', function (err, rows, fields) {
        if (err) {
            res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
        } else {
            res.json('list', { "empList": rows });
        }
    });
    connection.end();

});

// app.get('/person/:id', function (req, res) {
//     var connection = getMySQLConnection();
//     connection.connect();
//     connection.query('SELECT * FROM people WHERE id = ' + req.params.id,
//         function (err, rows, fields) {
//             var person;

//             if (err) {
//                 res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
//             } else {
//                 if (rows.length == 1) {
//                     res.render('details', { "person": rows[0] });
//                 } else {
//                     res.status(404).json({ "status_code": 404, "status_message": "Not found" });
//                 }
//             }
//         });
//     connection.end();
// });

module.exports = app;