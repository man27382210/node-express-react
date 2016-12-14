var express = require('express');
var db = require('./db').IssueModel;

var app = express();

app.use(express.static(__dirname));

app.get('/issues', function(req, res) {
  db.find({}, function(err, docs) {
    if (err) console.log(err);
    res.json(docs);
  });
});

app.listen(3000, function() {
  console.log('application listening on port 3000!');
});

module.exports = app;
