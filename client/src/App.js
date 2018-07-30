import React, { Component } from 'react';
import './App.css';
import MovieSearch from './Components/MovieSearch';
import Unwatched from './Components/Unwatched';
import Watched from './Components/Watched';
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
        <div className="App">
          <header id="main-header">
            <div id="logo"></div>
            <nav id="main-nav">
              <ul>
                <li><NavLink to="/unwatched">What's On Tonight?</NavLink></li>
                <li><NavLink to="/watched">Our Favorites</NavLink></li>
                <li><NavLink to="/search">Find A Movie</NavLink></li>
              </ul>
            </nav>
          </header> 
          <section>
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
