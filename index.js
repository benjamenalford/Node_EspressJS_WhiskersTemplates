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