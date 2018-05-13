var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Entities = require('html-entities').AllHtmlEntities;
var app = express();
const PORT = 3009

var entities = new Entities();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, function(){
    console.log("Server running on port " + PORT + "...");
});
