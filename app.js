var http = require("http");
var express = require('express');
var app = express();
var emp_router = require("./mysql");

app.use(express.urlencoded({ extended: false }));

app.use("", emp_router)

app.get("/healthcheck", (req, res) => {
    res.send("UP")
})

// to get owner-details on the basis of req
app.get("/owner-details", (req, res) => {
    res.send("owner-details")
})

// To get nft-details
app.get("/nft-details", (req, res) => {
    res.send("test")
})

// To transfer nft details
app.get("/nft-details", (req, res) => {
    res.send("test")
})

app.listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');