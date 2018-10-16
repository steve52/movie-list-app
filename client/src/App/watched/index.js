import React, { Component } from 'react';
import MovieList from '../shared/movieList';

class Watched extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
    this.removeMovie = this.removeMovie.bind(this);
    this.markUnwatched = this.markUnwatched.bind(this);
  }

  _isWatched(movie) {
    return movie.watched;
  }

  // Fetch all movies and sort by rank
  _fetchAllMovies() {
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

  markUnwatched(movieToUpdate) {
    // Set 'watched' to true and make a PATCH request that updates this movie in the database
    movieToUpdate.watched = false;
    fetch(`/api/movies/mark_watched/${movieToUpdate._id}`, {
      method: 'PATCH'
    }).then((res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      // Use the updatedMovie that is returned by the API to update our local list
      res.json().then((updatedMovie) => {
        let movies = this.state.movies.filter((movie) => {
          return movie._id !== movieToUpdate._id;
        });
        this.setState({movies: movies});
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
    this._fetchAllMovies();
  }

  render() {
    return (
      <div className="search-wrapper">
        <MovieList
          movies={this.state.movies}
          onSortEnd={this.onSortEnd}
          markUnwatched={this.markUnwatched}
          removeMovie={this.removeMovie}
        />
      </div>
    );
  }
}

export default Watched;


