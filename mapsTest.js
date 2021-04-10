const https = require('https');
const querystring = require('querystring');

function lookupAddress(address) {
    return new Promise(resolve => {
        options = {
            hostname: 'maps.googleapis.com',
            port: 443,
            path: '/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key=AIzaSyCfpU4ZBRpxXM65E3TDMo2uGPz_yMfpCew',
            method: 'GET'
        }
        console.log(address)
        const req = https.request(options, res => {
            var jsonResponse = ''
            res.on('data', d => {
                console.log('getting data')
                jsonResponse += d    
            })

            res.on('error', err => {
                console.error(err)
            })

            res.on('end', d => {
                console.log(jsonResponse)
                resolve(JSON.parse(jsonResponse))
            })
        })

        req.end()
    })
}

module.exports.lookupAddress = lookupAddress;
