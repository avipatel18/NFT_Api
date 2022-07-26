const axios = require('axios');
const { promisify } = require('util');

var ownerAddress = new Array();

async function getNFTDetails(nftId) {
    let response;

    response = await axios.get('https://api3.loopring.io/api/v3/nft/info/nftData', {
        params: {
            'minter': "0xC50493dfEbC31a51d2907fe1d30AB579dD68F245",
            'tokenAddress': "0x108096acd34a12f8bc246a011065a2c6dc2923be",
            'nftId': nftId
        },
        headers: {
            'X-API-KEY': 'wxCCHPmtwCq7hZg3uxqgohA9lhvC5cuO3go34HlRLd2b0KqlxZQxFAi39qK6MwKz'
        }
    });

    // console.log(response.data["nftData"]);

    let res = await axios.get('https://api3.loopring.io/api/v3/nft/info/nftHolders', {
        params: {
            'nftData': response.data["nftData"],
            'offset': '0',
            'limit': '100'
        },
        headers: {
            'X-API-KEY': 'wxCCHPmtwCq7hZg3uxqgohA9lhvC5cuO3go34HlRLd2b0KqlxZQxFAi39qK6MwKz'
        }
    });

    objArray = res.data["nftHolders"];

    let accountIds = objArray.map(a => a.accountId);

    let acctRequests = [];

    let nftOwners = new Array();

    accountIds.forEach(acctId => {

        acctRequests.push(getOwner(acctId));

        // axios('https://api3.loopring.io/api/v3/account', {
        //     params: {
        //         'accountId': acctId
        //     }
        // }).then(r => {
        //     console.log(r.data["owner"]);
        //     nftOwners.push(r.data["owner"]);
        // });
    });

    Promise.all(acctRequests).then(allData => {
        console.log(allData);
        nftOwners = allData;
    })


    console.log("After for each:>>>>>> ", nftOwners);
    return
}

const getOwner = (acctId) => {
    return new Promise((resolve, reject) => {
        axios('https://api3.loopring.io/api/v3/account', {
            params: {
                'accountId': acctId
            }
        }).then(res => {
            resolve(res.data["owner"]);
        });
    });
}


// module.exports = {getNFTDATA,getNFTHOLDER};
module.exports = getNFTDetails;