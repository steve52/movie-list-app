'use strict';

module.exports = function(app) {
  const movieList = require('../controllers/movieListController');

  //movieList Routes
  app.route('/movies')
    .get(movieList.list_all_movies)
    .post(movieList.add_a_movie);

  app.route('/movies/:movieId')
    .put(movieList.update_a_movie)
    .delete(movieList.delete_a_movie);

  app.route('/movies/update_rank/:movieId')
    .patch(movieList.update_rank)
};
