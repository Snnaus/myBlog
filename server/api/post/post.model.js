'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  name: String,
  author: String,
  info: String,
  active: Boolean,
  category: Array,
  body: String,
  markdown: String,
  thumbPic: String,
  postDate: Object,
  urlID: String
});

module.exports = mongoose.model('Post', PostSchema);