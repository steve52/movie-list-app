import React, { Component } from 'react';
import SearchResult from './SearchResult';

class MovieSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: null,
      results: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;

    this.setState({
        searchTerm: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this._searchForMovies(this.state.searchTerm);
  }

  _searchForMovies(title) {
    fetch(`https://www.omdbapi.com?apikey=${process.env.REACT_APP_OMDB_API_KEY}&r=json&s=${title}`, {
      method: 'GET'
    }).then((res) => {
      res.json().then((res) => {
        let searchResults = res.Search || [];
        this.setState({results:searchResults});
      });
    });
  }

  render() {
    let results = this.state.results.map((movie => {
      return (
        <div className="col-lg-6" key={movie.imdbID}>
          <SearchResult
            imdbID={movie.imdbID}
          />
        </div>
      );
    }));

    return (
      <div className="add_movie">
        <form className="add_movie_form" onSubmit={this.handleSubmit}>
          <div className="add_movie_field">
            <label>Title</label>
            <input
              type="text"
              onChange={this.handleInputChange}
            />
          </div>
          <button>
            Search
          </button>
        </form>
        {this.state.results && results}
      </div>
    );
  }
}

export default MovieSearch;
