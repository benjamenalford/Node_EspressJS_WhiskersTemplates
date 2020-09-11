const MongoClient = require('mongodb').MongoClient;

// Connection url
const url = 'mongodb://192.168.1.183:27017';

// Database Name
const dbName = 'test';
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbNames);
    var query = { address: "Park Lane 38" };
    dbo.collection("customers").insert(query, (e) => {});
    dbo.collection("customers").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});
// see click fix
//http://dev.seeclickfix.com/v2/places/
//http://dev.seeclickfix.com/
// places:  https://seeclickfix.com/api/v2/issues?page=1&per_page=10