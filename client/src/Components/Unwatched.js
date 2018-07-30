import React, { Component } from 'react';
import MovieList from './MovieList';
import {arrayMove} from 'react-sortable-hoc';

class Unwatched extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
    this.removeMovie = this.removeMovie.bind(this);
    this.markWatched = this.markWatched.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  _isUnwatched(movie) {
    return !movie.watched;
  }

  // Fetch all movies and sort by rank
  fetchAllMovies() {
    fetch('http://localhost:9000/movies', {
      method: 'GET'
    }).then((res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      res.json().then((movies) => {
        movies = movies.filter(this._isUnwatched).sort((a,b) => a.rank - b.rank);
        this.setState({movies:movies});
      });
    });
  }

  markWatched(movieToUpdate) {
    // Set 'watched' to true and make a PUT request that updates this movie in the database
    movieToUpdate.watched = true;
    fetch(`http://localhost:9000/movies/mark_watched/${movieToUpdate._id}`, {
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
    fetch(`http://localhost:9000/movies/${movieToRemove._id}`, {
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
  
  onSortEnd({oldIndex, newIndex}) {
    if (oldIndex === newIndex) return;

    let movie = this.state.movies[oldIndex];
    let newRank = this.state.movies[newIndex].rank;
    fetch(`http://localhost:9000/movies/update_rank/${movie._id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: 'rank=' + newRank
    }).then((res) => {
      console.info('Done updating movie rank');
    }, (err) => {
      console.log('err', err);
    });
    this.setState({
      movies: arrayMove(this.state.movies, oldIndex, newIndex),
    });
  };

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

export default Unwatched;


