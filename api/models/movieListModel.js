'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  plot: {
    type: String
  },
  rating: {
    type: String
  },
  year: {
    type: String
  },
  poster: {
    type: String
  },
  rank: {
    type: Number
  },
  imdbID: {
    type: String
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
