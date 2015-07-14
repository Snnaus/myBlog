'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  name: String,
  author: String,
  info: String,
  active: Boolean,
  tags: Array,
  category: String,
  body: String,
  markdown: String,
  thumbPic: String,
  postDate: Object
});

module.exports = mongoose.model('Post', PostSchema);