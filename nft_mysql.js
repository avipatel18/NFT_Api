var express = require('express');
var mysql = require('mysql');
var nftDetails = require('./nft_details');
const axios = require('axios');

var app = express.Router();
var jsdom = require("jsdom");
const {
    JSDOM
} = jsdom;
const {
    window
} = new JSDOM();
const {
    document
} = (new JSDOM('')).window;
global.document = document;


function getMySQLConnection() {
    return mysql.createConnection({
        host: '13.235.49.134',
        port: 3306,
        user: 'admin_vanlife',
        password: 'vanlife123',
        database: 'admin_vanlife'
    });
}


app.get('/allNFTs', function (req, res) {

    var connection = getMySQLConnection();
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });

    connection.query('SELECT * FROM nft_details', function (err, rows, fields) {
        if (err) {
            res.status(500).json({
                "status_code": 500,
                "status_message": "internal server error"
            });
        } else {
            res.status(200).send((rows));

        }
    });
    connection.end();

});


app.post('/addNFT', function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    var connection = getMySQLConnection();
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var nft_id = req.body.nftid;

    const sdk = require("@loopring-web/loopring-sdk");
    const CHAIN_ID = 1;
    const nftAPI = new sdk.NFTAPI({
        chainId: CHAIN_ID
    });
    // const nftID = nft_id;
    var nftcid0 = nftAPI.ipfsNftIDToCid("0xbc7de12e19467e415af8de27866fcab4ac6f4b40f28add13d94d747f897da06c");

    // var nftcid0 = "QmNNMVydDLCLtaG4URdoSa285uSrDpBe14Xc8JSmFogowb";

    let nftjson;
    var $ = jQuery = require('jquery')(window);
    $.ajaxSetup({
        async: false
    });
    $.getJSON('https://loopring.mypinata.cloud/ipfs/' + nftcid0, function (data) {
        nftjson = data;
    });

    var parsedNFTJSON = JSON.parse(JSON.stringify(nftjson))

    var nftImageHash = parsedNFTJSON.image.substr(7);

    // nftcid0="QmNNMVydDLCLtaG4URdoSa285uSrDpBe14Xc8JSmFogowb";
    // nftImageHash="QmNNMVydDLCLtaG4URdoSa285uSrDpBe14Xc8JSmFogowb";

    connection.query('INSERT INTO nft_details(nft_id,nft_metadata,nft_image) VALUES (?,?,?)', [nft_id, nftcid0, nftImageHash], function (err, data) {
        if (err) {
            res.status(500).json({
                "status_code": 500,
                "status_message": "1internal server error"
            });
        } else {
            res.status(200).send((data));
        }
    });

    connection.end();

});


app.get('/getCID', function (req, res) {

    var connection = getMySQLConnection();
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });

    var nft_id = "0xbc7de12e19467e415af8de27866fcab4ac6f4b40f28add13d94d747f897da06c";

    const sdk = require("@loopring-web/loopring-sdk");
    const CHAIN_ID = 5
    const nftAPI = new sdk.NFTAPI({
        chainId: CHAIN_ID
    });
    var nftcid0 = nftAPI.ipfsNftIDToCid(nft_id);

    res.status(200).send((nftcid0));
    connection.end();

});

app.get('/getNFTowners', function (req, res) {

    var connection = getMySQLConnection();
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });

    connection.query('SELECT nft_id FROM nft_details LIMIT 1', function (err, rows, fields) {
        if (err) {
            res.status(500).json({
                "status_code": 500,
                "status_message": "internal server error"
            });
        } else {

            rows.forEach(function (nftid) {

                //api for get holder details
                var tempid = nftid["nft_id"];
                var nftdata;

                var pro=nftDetails(tempid);


                // pro = nftDetails(tempid).view();
                // console.log("pro");

                console.log("pro"+pro);
    

            });
            
        }
        res.status(200).send((rows));
        connection.end();
    });
    
});

module.exports = app;


//  {nft_id , nft_image, nft_owner  [{},{}]
