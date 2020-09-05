module.exports = function(app, config) {
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
                }
            }
        });
    });

    //other routes..
}