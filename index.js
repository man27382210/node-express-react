var express = require('express');
var DB = require('./db').IssueModel;
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname));

app.get('/issues', function(req, res) {
  DB.find({}, function(err, docs) {
    if (err) console.log(err);
    res.json(docs);
  });
});

app.use(bodyParser.json());

app.post('/issues', function(req, res) {
  var issue = new DB(req.body.issue);
  issue.save(issue, function(err, docs) {
    if (err) console.log(err);
    res.json(docs);
  });
});

app.listen(3000, function() {
  console.log('application listening on port 3000!');
});

module.exports = app;
