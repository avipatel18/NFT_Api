var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
let nftjson;
var $ = jQuery = require('jquery')(window);
$.ajaxSetup({
    async: false
    });
$.getJSON('https://loopring.mypinata.cloud/ipfs/QmcxrgCwFXZu7oH2HX59erEoKuHcCwgDqShGVgNqKQ2DPj',async function (data){
     console.log(data);
    nftjson=data;

    }
    );
   
 var parsedNFTJSON = JSON.parse(JSON.stringify(nftjson))

var imageHash=parsedNFTJSON.image.substr(7);
console.log(imageHash);
