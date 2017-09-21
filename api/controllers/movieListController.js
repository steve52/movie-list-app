'use strict';

const mongoose = require('mongoose'),
  Movie = mongoose.model('Movies');

exports.list_all_movies = function(req, res) {
  console.info('List all movies')
  Movie.find({}, function(err, movies) {
    console.info(`Found ${movies.length} movies`);
    if (err)
      res.send(err);
    res.json(movies);
  });
};

exports.add_a_movie = function(req, res) {
  console.info('Add a movie');
  var new_movie = new Movie(req.body);
  Movie.findOne()
    .sort('-rank')
    .exec((err, movie) => {
      new_movie.rank = movie ? movie.rank + 1 : 0;
      new_movie.save(function(err, movie) {
        if (err) res.send(err);
        console.log('Movie added', movie);
        res.json(movie);
      });
    })
};

exports.update_a_movie = function(req, res) {
  console.info('Update a movie');
  const opts = {
    new: true,
    runValidators: true
  };
  Movie.findByIdAndUpdate(req.params.movieId, req.body, opts, function(err, movie) {
    if (err) res.send(err);
    res.json(movie);
  });
};

exports.mark_watched = function(req, res) {
  console.info('Mark a movie as watched¡');
  const opts = {
    new: true,
    runValidators: true
  };
  Movie.findById(req.params.movieId, function(err, movie) {
    let rank = movie.rank;
    movie.watched = true;
    movie.rank = null;
    movie.save(() => {
      console.log('update watched status', movie);
      if (err) res.send(err);
      Movie.updateMany({rank: {$gt: rank}}, {$inc: {rank: -1}}, function(err, raw) {
        if (err) res.send(err);
        res.json(movie);
      });
    })
  });
};

exports.update_rank = function(req, res) {
  console.info('Update a movie rank');
  let newRank = req.body.rank;
  let movieId = req.params.movieId;

  Movie.findById(req.params.movieId, function(err, movie) {
    let currentRank = movie.rank;
    let shift = currentRank > newRank ? 1 : -1;
    let conditions = currentRank > newRank ? {$gte:newRank, $lt:currentRank} : {$lte:newRank, $gt:currentRank};
    Movie.updateMany({rank: conditions}, {$inc: {rank: shift}}, function(err, raw) {
      if (err) res.send(err);
      movie.rank = newRank;
      movie.save(() => {
        console.log('updated movie to new rank', movie);
        res.json(movie);
      });
    });
  });
};

exports.delete_a_movie = function(req, res) {
  Movie.findById(req.params.movieId, function(err, movie) {
    let rank = movie.rank;
    movie.remove().then(() => {
      Movie.updateMany({rank: {$gt: rank}}, {$inc: {rank: -1}}, function(err, raw) {
        if (err) res.send(err);
        res.json({ message: 'Movie successfully deleted' });
      });
    })
  });
};
