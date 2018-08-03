import React, { Component } from 'react';
import MovieList from './MovieList';

class Watched extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
    this.removeMovie = this.removeMovie.bind(this);
  }

  _isWatched(movie) {
    return movie.watched;
  }

  // Fetch all movies and sort by rank
  fetchAllMovies() {
    fetch('/api/movies', {
      method: 'GET'
    }).then((res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      res.json().then((movies) => {
        movies = movies.filter(this._isWatched).sort((a,b) => a.rank - b.rank);
        this.setState({movies:movies});
      });
    });
  }

  removeMovie(movieToRemove) {
    // Make a DELETE request to delete movie from database
    fetch(`/api/movies/${movieToRemove._id}`, {
      method: 'DELETE'
    }).then((res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      // If successful, also remove the movie from our local array of movies
      // No need to make another fetch
      let movies = this.state.movies.slice();
      let index = movies.findIndex((m) => m._id === movieToRemove._id);
      movies.splice(index, 1);
      this.setState({movies: movies});
    });
  }

  componentDidMount() {
    this.fetchAllMovies();
  }

  render() {
    return (
      <MovieList
        movies={this.state.movies}
        onSortEnd={this.onSortEnd}
        markWatched={this.markWatched}
        removeMovie={this.removeMovie}
      />
    );
  }
}

export default Watched;


