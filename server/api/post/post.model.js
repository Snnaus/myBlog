'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  tags: Array,
  category: String,
  body: String,
  thumbPic: String,
  postDate: Object
});

module.exports = mongoose.model('Post', PostSchema);