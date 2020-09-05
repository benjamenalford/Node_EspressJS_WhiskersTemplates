const express = require('express')
const bodyParser = require('body-parser');


const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine('.html', whiskers.__express);

app.get('/', (req, res) => {
    res.send('Hello World!')
    res.send([{ "test": 1 }]);
})

app.post('/', (req, res) => {
    console.log('Got body:', req.body);
    console.log(req.body["results"][0]["id"])
    res.sendStatus(200);
})
app.listen(port, () => {
    console.log(`Example app listening at http: //localhost:${port}`)
})