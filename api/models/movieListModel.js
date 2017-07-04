'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  rotten_tomatoes_url: {
    type: String
  },
  added_by: {
    type: String,
    required: true
  },
  rank: {
    type: Number
  },
  watched: {
    type: Boolean,
    default: false
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Movies', MovieSchema);
