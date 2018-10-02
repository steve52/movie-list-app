import React, { Component } from 'react';
import SearchResultsList from './searchResultsList';

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
    console.log("RENDER SEARCH INDEX")
    return (
      <div className="add_movie">
        <form className="add_movie_form" onSubmit={this.handleSubmit}>
          <div className="add_movie_field">
            <label>Title</label>
            <input
              type="text"
              name="movie-title"
              value={this.state.term}
              onChange={this.handleInputChange}
            />
          </div>
          <button>
            Search
          </button>
        </form>
        <SearchResultsList results={this.state.results}/>
      </div>
    );
  }
}

export default MovieSearch;
