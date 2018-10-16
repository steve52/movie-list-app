import React, { Component } from 'react';
import Movie from '../movieItem';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

class MovieList extends Component {
  render() {
    const MovieItem = SortableElement(({movie}) =>
      <li className="movie-list-item clearfix">
        <Movie
          movie={movie}
          markWatched={this.props.markWatched}
          removeMovie={this.props.removeMovie}
          markUnwatched={this.props.markUnwatched}
          type={this.props.type}
        />
      </li>
    );

    const MovieList = SortableContainer(({movies}) => {
      let movieItems = movies.map((movie, index) => {
        const disableSortable = this.props.type === 'search';
        return (
          <MovieItem
            key={`item-${index}`}
            index={index}
            movie={movie}
            disabled={disableSortable}
          />
        );
      });

      return (
        <ul className="movie-list list-unstyled">
          {movieItems}
        </ul>
      );
    });

    return (
      <MovieList
        movies={this.props.movies}
        onSortEnd={this.props.onSortEnd}/>
    );
  }
}

export default MovieList;


