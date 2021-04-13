const https = require('https');
const querystring = require('querystring');

function lookupAddress(businessInfo) {
    return new Promise((resolve) => {
        createAddressPromise(businessInfo).then(result => {
            resolve(result)
        }).catch(error => {
            console.log('error occurred while processing address lookup, skipping')
            console.log(error)
            resolve(null)
        });
    })
}

function createAddressPromise(businessInfo) {
    return new Promise(resolve => {
        options = {
            hostname: 'maps.googleapis.com',
            port: 443,
            path: '/maps/api/geocode/json?address=' + encodeURIComponent(businessInfo.address) + '&key=AIzaSyCfpU4ZBRpxXM65E3TDMo2uGPz_yMfpCew',
            method: 'GET'
        }
        console.log(businessInfo.address)
        const req = https.request(options, res => {
            var jsonResponse = ''
            res.on('data', d => {
                console.log('getting data')
                jsonResponse += d    
            })

            res.on('error', err => {
                console.error(err)
                console.log('error getting data, skipping')
                resolve(null)
            })

            res.on('end', d => {
                try {
                    parsedResponse = JSON.parse(jsonResponse)
                    var newBusinessInfo = {}

                    newBusinessInfo['latitude'] = parsedResponse.results[0].geometry.location.lat
                    newBusinessInfo['longitude'] = parsedResponse.results[0].geometry.location.lng
                    newBusinessInfo['address'] = businessInfo.address
                    newBusinessInfo['email'] = businessInfo.businessEmail
                    newBusinessInfo['mobile'] = businessInfo.businessPhone
                    newBusinessInfo['name'] = businessInfo.businessName

                    resolve(newBusinessInfo)
                } catch(err) {
                    console.log('error parsing google response, skipping')
                    resolve(null)
                }
            })
        })

        req.end()
    })
}
module.exports.lookupAddress = lookupAddress;
