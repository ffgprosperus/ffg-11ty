//import { Loader } from "@googlemaps/js-api-loader"

/*const loader = new Loader({
    apiKey: "AIzaSyCfpU4ZBRpxXM65E3TDMo2uGPz_yMfpCew",
    version: "weekly"
});*/

const https = require('https');
const querystring = require('querystring');

function lookupAddress(address) {
  options = {
    hostname: 'maps.googleapis.com',
    port: 443,
    path: '/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key=AIzaSyCfpU4ZBRpxXM65E3TDMo2uGPz_yMfpCew',
    method: 'GET'
  }
  console.log(options.path)

  const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)

      res.on('data', d => {
        //return this from the function
            process.stdout.write(d)
          })
  })

  req.on('error', error => {
      console.error(error)
  })

  req.end()
}

module.exports.lookupAddress = lookupAddress;
