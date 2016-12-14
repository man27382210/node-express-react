/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
var mongoose = require('mongoose');

var db;
var Issue;
var IssueModel;

mongoose.connect('mongodb://localhost/Issues');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log('connect'); });

const Schema = mongoose.Schema;

Issue = new Schema({
  seq: Number,
  status: String,
  category: String,
  title: String,
  owner: String,
  priority: String,
  isUpdate: Boolean
});

IssueModel = mongoose.model('Issues', Issue);
exports.IssueModel = IssueModel;
