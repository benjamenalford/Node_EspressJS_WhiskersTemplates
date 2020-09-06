var config = require("./config")
var http = require('http')

module.exports = function(app, config) {
    app.all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    });
    app.get('/', function(req, res) {
        res.render('layout.html', {
            cache: config.config.singleTemplateCache,
            partials: {
                body: 'index.html',
                head: `../${config.config.viewDirectory}/head.html`,
                header: `../${config.config.viewDirectory}/header.html`,
                footer: `../${config.config.viewDirectory}/footer.html`
            },
            pageContent: {
                title: 'Node ExpressJS, Whiskers App',
                content: 'Simple framework for NodeJs & Whiskers',
                author: { name: 'BA' },
                test: {
                    testSimpleList: [0, 1, 2, 3, 4],
                    testSimpleObject: { "testKey": "testValue" },
                    testSimpleListOfObjects: [this.testSimpleObject]
                },
                data: [{
                    keys: Object.keys(config.config),
                    values: Object.keys(config.config),
                    data: config.config
                }]
            }
        });

    });
    app.get('/config', function(req, res) {
        res.send([config.config]);
    });

}