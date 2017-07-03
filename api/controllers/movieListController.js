'use strict';

const mongoose = require('mongoose'),
  Movie = mongoose.model('Movies');

exports.list_all_movies = function(req, res) {
  Movie.find({}, function(err, movies) {
    if (err)
      res.send(err);
    res.json(movies);
  });
};

exports.add_a_movie = function(req, res) {
  var new_movie = new Movie(req.body);
  Movie.count({}, (err, count) => {
    if (err) res.send(err);
    new_movie.rank = count + 1;
    new_movie.save(function(err, movie) {
      if (err) res.send(err);
      res.json(movie);
    });
  });
};

exports.update_a_movie = function(req, res) {
  const opts = {
    new: true,
    runValidators: true
  };
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, opts, function(err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.delete_a_movie = function(req, res) {
  Movie.remove({
    _id: req.params.movieId
  }, function(err) {
    if (err) res.send(err);
    res.json({ message: 'Movie successfully deleted' });
  });
};
