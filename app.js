var http = require("http");
var express = require('express');
var app = express();
var emp_router = require("./nft_mysql_old");

const port = process.env.PORT || 8000;


const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(express.json());

app.use(cors(corsOptions));

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

app.listen(port);
