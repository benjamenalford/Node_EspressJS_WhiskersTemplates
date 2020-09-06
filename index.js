var express = require('express');
var fs = require('fs');
var http = require('http');
var assert = require('assert');
var whiskers = require('whiskers');
var config = require('./modules/config')
var allColors = require('./modules/allColors');
var app;

app = express();
app.engine('.html', whiskers.__express);

if (config.config.globalTemplateCaching) {
    app.use(function(req, res, next) {
        res.locals.cache = true;
        next();
    });
}

app.set('views', `${config.config.viewDirectory}`);

//import routing
require('./modules/routes')(app, config);

app.listen(config.config.port, function() {
    http.get({
        host: config.config.host,
        port: config.config.port
    }, function(res) {
        var data = '';
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', function() {
            //runTests(data);
            //process.exit();
        });
    }).on('error', function(e) {
        throw e;
    });
});

function runTests(data) {
    let expected = fs.readFileSync(__dirname + '/rendered.html', 'utf8');
    assert.equal(data, expected);
}
// http.get('config', (res) => {
//     const { statusCode } = res;
//     const contentType = res.headers['content-type'];

//     let error;
//     // Any 2xx status code signals a successful response but
//     // here we're only checking for 200.
//     if (statusCode !== 200) {
//         error = new Error('Request Failed.\n' +
//             `Status Code: ${statusCode}`);
//     } else if (!/^application\/json/.test(contentType)) {
//         error = new Error('Invalid content-type.\n' +
//             `Expected application/json but received ${contentType}`);
//     }
//     if (error) {
//         console.error(error.message);
//         // Consume response data to free up memory
//         res.resume();
//         return;
//     }

//     res.setEncoding('utf8');
//     let rawData = '';
//     res.on('data', (chunk) => { rawData += chunk; });
//     res.on('end', () => {
//         try {
//             const parsedData = JSON.parse(rawData);
//             console.log(parsedData);
//         } catch (e) {
//             console.error(e.message);
//         }
//     });
// }).on('error', (e) => {
//     console.error(`Got error: ${e.message}`);
// });