'use strict';

module.exports = function(app) {
  const movieList = require('../controllers/movieListController');

  //movieList Routes
  app.route('/api/movies')
    .get(movieList.list_all_movies)
    .post(movieList.add_a_movie);

  app.route('/api/movies/:movieId')
    .put(movieList.update_a_movie)
    .delete(movieList.delete_a_movie);

  app.route('/api/movies/update_rank/:movieId')
    .patch(movieList.update_rank)

  app.route('/api/movies/mark_watched/:movieId')
    .patch(movieList.mark_watched)
};
