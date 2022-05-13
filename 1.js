var express = require('express');
const { Collection } = require('mongodb');
var app = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://kompanietst:Rjnbyzgfkrf123@cluster0.luo11.mongodb.net/test';


MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return console.log(err);
    }
});

app.get('/', function (req, res) {
    res.send('Hell');
});
app.listen(3000, function () {
    console.log("server start at port 3000"); // The server object listens on port 3000
});
