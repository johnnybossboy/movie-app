import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route';

class App extends Component {
  constructor(){
    super();
    this.state = {
      movieTitle: "The 100",
      searchedText: ""
    }

    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitSearchForm = this.onSubmitSearchForm.bind(this);
  }

  onChangeText(e){
    this.setState({
      searchedText: e.target.value
    });

    console.log("New text: " + this.state.searchedText);
  }

  onSubmitSearchForm(e){
    e.preventDefault();
    console.log("Form submitted!");
    this.setState({
      movieTitle: e.target.value
    });

    console.log("movieTitle: " + this.state.movieTitle);
  }

  render() {
    return (
      <Router>
        <div className="App container-fluid mt-large">
          <div className="row">
            <div className="col-xs-12">
              <form onSubmit={this.onSubmitSearchForm}>
                <input type="text" onChange={this.onChangeText} />
              </form>
            </div>
          </div>
          <Movie title={this.state.movieTitle} />
        </div>
      </Router>
    );
  }
}

export default App;


class Movie extends React.Component {
  state = {
    title: this.props.title,
    year: "",
    rated: "",
    released: "",
    runtime: "",
    genre: "",
    director: "",
    writer: "",
    actors: "",
    plot: "",
    language: "",
    awards: "",
    poster: "",
    list_ratings: "",
    imdbRating: "",
    imdbVotes: "",
    type: ""
  }

  isEmpty(variable){
    if(variable == "" || variable === "" || variable == undefined || variable === undefined || variable == null || variable === null){
      return true;
    } else {
      return false;
    }
  }

  componentDidMount() {
    var xhr = new XMLHttpRequest();
    var json_obj, status = false;
    xhr.open("GET", "http://www.omdbapi.com/?t=" + this.props.title + "&apikey=6c3a2d45", true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var movie = JSON.parse(xhr.responseText);
          status = true;
          console.log(movie);
          this.setState({
            year: movie.Year,
            rated: movie.Rated,
            released: movie.Released,
            runtime: movie.Runtime,
            genre: movie.Genre,
            director: movie.Director,
            writer: movie.Writer,
            actors: movie.Actors,
            plot: movie.Plot,
            language: movie.Language,
            awards: movie.Awards,
            poster: movie.Poster,
            // list_ratings: movie.Ratings // Need to come up with a solution to render arrays as csv.
            imdbRating: movie.imdbRating,
            imdbVotes: movie.imdbVotes,
            type: movie.Type
          });
        } else {
          console.error(xhr.statusText);
        }
      }
    }.bind(this);
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send(null);
  }

  render() {
    if(this.isEmpty(this.props.title)){
      return(
        <div>
          <p>Please search for a movie title</p>
        </div>
      );
    } else {
      return (
        <div className="movie">
          <div className="row">
            <div className="col-xs-12 col-sm-3 col-md-2">
              <img src={this.state.poster} className="img-responsive movie--image" />
            </div>
            <div className="col-xs-12 col-sm-9 col-md-10">
              <div className="flex flex-justify-between flex-align-center">
                <div className="flex-padding-left">
                  <h3>{this.state.title} <span style={{textTransform:'capitalize'}}>{"(" + this.state.type}</span> - {this.state.year + ")"}</h3>
                </div>
                <div className="flex-padding-right">
                  Rating
                </div>

              </div>

              <div className="row">
                <div className="col-xs-12">
                  <p className="text--subtext">{this.state.runtime} | {this.state.genre} | {this.state.released}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 mt-small">
                  {this.state.plot}
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <ul className="list">
                    <li>Director: {this.state.director}</li>
                    <li>Writer: {this.state.writer}</li>
                    <li>Language: {this.state.language}</li>
                    <li>Actors: {this.state.actors}</li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 box">
                  List of ratings
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 box">
                  Awards
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
