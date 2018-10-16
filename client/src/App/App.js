import React, { Component } from 'react';
import './App.scss';
import MovieSearch from './search';
import Unwatched from './unwatched';
import Watched from './watched';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  NavLink
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container">
          <header id="main-header" className="row">
            <div className="col-sm-2 d-flex justify-content-center">
              <img
                id="logo"
                alt="Logo"/>
            </div>
            <nav className="col">
              <ul className="nav row">
                <li className="col nav-item"><NavLink to="/unwatched">What's On Tonight?</NavLink></li>
                <li className="col nav-item"><NavLink to="/watched">Our Favorites</NavLink></li>
                <li className="col nav-item"><NavLink to="/search">Find A Movie</NavLink></li>
              </ul>
            </nav>
          </header>
          <section className="row">
            <Route path="/unwatched" component={Unwatched}/>
            <Route path="/watched" component={Watched}/>
            <Route path="/search" component={MovieSearch}/>
            <Route exact path="/" render={() => (
                <Redirect to="/unwatched"/>
              )}/>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
