import React, { Component } from 'react';
import MovieList from '../shared/movieList';
import {arrayMove} from 'react-sortable-hoc';

class Unwatched extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isFetching: false,
      isFetched: false,
      isError: false,
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
    this.setState({
      movies: [],
      isFetching: true,
      isFetched: false,
      isError: false,
    });
    fetch('/api/movies', {
      method: 'GET',
    }).then((res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      console.log('res', res);
      res.json()
        .then((movies) => {
          console.log('res.json', movies);

          movies = movies
            .filter(this._isUnwatched)
            .sort((a,b) => a.rank - b.rank);

          this.setState({
            movies: movies,
            isFetching: false,
            isFetched: true,
            isError: false,
          });
        })
        .catch(err => {
          console.log('Error fetching your unwatched movies. ' +
           'Check the console to see what went wrong.', err);

          this.setState({
            movies: [],
            isFetching: false,
            isFetched: false,
            isError: true,
          });
        });
    });
  }

  markWatched(movieToUpdate) {
    // Set 'watched' to true and make a PATCH request that updates
    // this movie in the database
    movieToUpdate.watched = true;
    fetch(`/api/movies/mark_watched/${movieToUpdate._id}`, {
      method: 'PATCH',
    }).then((res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      // Use the updatedMovie that is returned by the API to update
      // our local list
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
      method: 'DELETE',
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

  // TODO: indicate in the UI when sorting fails. Maybe by putting back to the
  // previous order and displaying a message to the user
  onSortEnd({oldIndex, newIndex}) {
    if (oldIndex === newIndex) return;

    let movie = this.state.movies[oldIndex];
    let newRank = this.state.movies[newIndex].rank;
    fetch(`/api/movies/update_rank/${movie._id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: 'rank=' + newRank,
    }).then((res) => {
      console.info('Done updating movie rank');
    }, (err) => {
      console.log('err', err);
    });
    this.setState({
      movies: arrayMove(this.state.movies, oldIndex, newIndex),
    });
  }

  componentDidMount() {
    this.fetchAllMovies();
  }

  render() {
    return (
      <div>
        {this.state.isFetching &&
          <div className="text-center">
            <div className="spinner-border" role="status"> </div>
            <div className="strong">Loading...</div>
          </div>
        }
        {this.state.isFetched && !this.state.isError &&
          <MovieList
            movies={this.state.movies}
            onSortEnd={this.onSortEnd}
            markWatched={this.markWatched}
            removeMovie={this.removeMovie}
          />
        }
        {this.state.isError &&
          <span>There was an error loading your movies :(</span>
        }
      </div>
    );
  }
}

export default Unwatched;


