import React, { Component } from 'react';
import SearchResult from '../searchResultItem';

class SearchResultsList extends Component {
  render() {
    console.log('RENDER')
    const searchResultItems = this.props.results.map((movie => {
      return (
        <li className="col-lg-6" key={movie.imdbID}>
          <SearchResult
            imdbID={movie.imdbID}
          />
        </li>
      );
    }));

    return (
      <ul className="search-results-list">
        {searchResultItems}
      </ul>
    )
  }
}

export default SearchResultsList;
