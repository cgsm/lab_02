
var express = require('express');
var bodyParser = require('body-parser');

var app=express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var quotes= [
{ id: 'U0', name: 'UTEM' },
{ id: 'U1', name: 'PUC' },
{ id: 'U2', name: 'PUCV' },
{ id: 'U3', name: 'UTFSM' },
{ id: 'U4', name: 'USACH' }
];

app.get('/', function(req, res) {
res.type('text/plain');
res.send('test REST API');
});

app.get('/quote/all', function(req, res) {
res.json(quotes);
});

app.get('/quote/random', function(req, res) {
var id = Math.floor(Math.random() * quotes.length);
var q = quotes[id];
res.json(q);
});

app.get('/quote/:id', function(req, res) {
if(quotes.length <= req.params.id || req.params.id < 0) {
res.statusCode = 404;
return res.send('id no encontrado');
}
var q = quotes[req.params.id];
res.json(q);
});

app.post('/quote', urlencodedParser, function(req, res) {

if (!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('name')) {
res.statusCode = 400;
return res.send('Error 400: Post syntax incorrect.');
}

var newQuote = {
id: req.body.id,
text: req.body.what
};

quotes.push(newQuote);
res.json(newQuote);
});

app.delete('/quote/:id', function(req, res) {
if(quotes.length <= req.params.id) {
res.statusCode = 404;
return res.send('id no encontrado');
}
quotes.splice(req.params.id, 1);
res.json(true);
});
app.listen(1080);
