import React, { Component } from 'react';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      isSavingMovie: false,
      isFinishedSaving: false
    };
    this._fetchMovie = this._fetchMovie.bind(this);
  }

  _fetchMovie(imdbID) {
    return fetch(`https://www.omdbapi.com?apikey=${process.env.REACT_APP_OMDB_API_KEY}&r=json&i=${imdbID}&plot=short`, {
      method: 'GET'
    }).then((res) => {
      res.json().then((m) => {
        let ratingObj = m.Ratings.find(m => m.Source === 'Rotten Tomatoes');
        let rating = ratingObj ? ratingObj.Value : 'N/A';
        if (ratingObj === undefined) {
          console.warn('Couldn\'t find Rotten Tomatoes rating. API may have changed.', m);
        }
        this.setState({rating: rating });
        this.setState({poster: m.Poster});
        this.setState({title: m.Title});
        this.setState({plot: m.Plot});
        this.setState({year: m.Year});
        this.setState({imdbID: m.imdbID});
      });
    });
  }

  addMovie(movie) {
    this.setState({isSaving: true});
    let formData =
      `poster=${encodeURIComponent(this.state.poster)}` +
      `&title=${encodeURIComponent(this.state.title)}` +
      `&plot=${encodeURIComponent(this.state.plot)}` +
      `&year=${encodeURIComponent(this.state.year)}` +
      `&rating=${encodeURIComponent(this.state.rating)}` +
      `&imdbID=${encodeURIComponent(this.state.imdbID)}`;

    // Make a POST request to API with form data
    fetch('movies', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: formData
    }).then((res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      res.json().then((movie) => {
        console.log('MOVIE JUST SAVED', movie);
        this.setState({isSaving: false});
        this.setState({isFinishedSaving: true});
        // TODO: update the date store with new movie
      });
    });
  }

  componentDidMount() {
    this._fetchMovie(this.props.imdbID);
  }

  render() {
    let isSaving = this.state.isSaving;
    let isFinishedSaving = this.state.isFinishedSaving;
    let addButton = null;

    if (isSaving) {
      addButton = 'Adding...';
    } else if (isFinishedSaving) {
      addButton = "Added to list";
    } else {
      addButton =
        <button
          className="btn btn-sm"
          onClick={() => this.addMovie()}>
          Add
        </button>;
    }

      return (
        <div className="movie container">
          <div className="row">
            <div className="col-3">
              <img src={this.state.poster} className="movie_img" alt="Movie Poster"/>
            </div>
            <div className="col-6">
              <h4 className="movie_title">{this.state.title}</h4>
              <div className="movie_rating">
                {this.state.rating}
              </div>
              <div className="movie_description">
                {this.state.plot}
              </div>
              <div className="movie_year">
                {this.state.year}
              </div>
            </div>
            <div className="col-3">
              <div className="movie_buttons">
                {addButton}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

export default SearchResult;
