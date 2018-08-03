import React, { Component } from 'react';
import Movie from '../movieItem';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

class MovieList extends Component {
  render() {
    const MovieItem = SortableElement(({movie}) =>
      <li>
        <Movie
          movie={movie}
          markWatched={this.props.markWatched}
          removeMovie={this.props.removeMovie}
        />
      </li>
    );

    const MovieList = SortableContainer(({movies}) => {
      let movieItems = movies.map((movie, index) => {
        return (
          <MovieItem
            key={`item-${index}`}
            index={index}
            movie={movie}
          />
        );
      });

      return (
        <ul className="movie-list">
          {movieItems}
        </ul>
      );
    });

    return (
      <MovieList
        movies={this.props.movies}
        onSortEnd={this.props.onSortEnd
      }/>
    );
  }
}

export default MovieList;


