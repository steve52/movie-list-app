import React, { Component } from 'react';
import MovieList from '../shared/movieList';

class MovieSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      results: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const qs = this.props.location.search;
    if (!qs) return {};

    const params = qs.split('?')[1].split('&').reduce((acc, curr) => {
      const [k, v] = curr.split('=');
      acc[k] = v;
      return acc;
    }, {});

    this.setState({params: params});

    // TODO:sg improve with _.isNil()
    if (typeof params.term !== 'undefined') {
      this.setState({term: params.term});
      this._searchForMovies(params.term);
    }
  }

  handleInputChange(event) {
    const value = event.target.value;
    this.setState({term: value})
  }

  handleSubmit(event) {
    event.preventDefault();
    this._searchForMovies(this.state.term);
  }

  _fetchMovie(imdbID) {
    return fetch(`https://www.omdbapi.com?apikey=${process.env.REACT_APP_OMDB_API_KEY}&r=json&i=${imdbID}&plot=short`, {
      method: 'GET'
    }).then((res) => {
      return res.json().then((m) => {
        let ratingObj = m.Ratings.find(m => m.Source === 'Rotten Tomatoes');
        let rating = ratingObj ? ratingObj.Value : 'N/A';
        return ({
          rating: rating,
          poster: m.Poster,
          title: m.Title,
          plot: m.Plot,
          year: m.Year,
          imdbID: m.imdbID
        })
      });
    });
  }

  _searchForMovies(title) {
    fetch(`https://www.omdbapi.com?apikey=${process.env.REACT_APP_OMDB_API_KEY}&r=json&s=${title}`, {
      method: 'GET'
    }).then((res) => {
      res.json().then((res) => {
        let searchResults = res.Search || [];
        const moviePromises = searchResults.map((movie) => {
          return this._fetchMovie(movie.imdbID);
        })
        Promise.all(moviePromises).then((movies) => {
          this.setState({results: movies});
        })
      });
    });
  }

  render() {
    return (
      <div className="search-wrapper">
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Movie Title"
              value={this.state.term}
              onChange={this.handleInputChange} />
            <div className="input-group-append">
              <button
                className="btn btn-info"
                type="button">Search</button>
            </div>
          </div>
        </form>
        <MovieList
          movies={this.state.results}
          type="search"/>
      </div>
    );
  }
}

export default MovieSearch;
