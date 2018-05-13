import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';

import './App.css';

import language from './Components/Language';
import Navbar from './Components/Navbar';
import Movie from './Components/Movie';
import PieChart from './Components/PieChart';


class App extends Component {
  constructor(){
    super();

    this.state = {
      movieSearchTerm: '',
      error: '',
      languageIndex: 0,
      searchSubmitted: false,

      title: "",
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
      list_ratings: [],
      imdbRating: "",
      imdbVotes: "",
      type: ""
    }

    this.onChangeMovieInput = this.onChangeMovieInput.bind(this);
    this.onSubmitMovieForm = this.onSubmitMovieForm.bind(this);
    this.switchLanguageTo = this.switchLanguageTo.bind(this);

    this.setSearchSubmittedTo = this.setSearchSubmittedTo.bind(this);
  }

  switchLanguageTo(id){
    this.setState({
      languageIndex: id
    });
  }

  getMovie(title){
    var xhr = new XMLHttpRequest();
    // var json_obj;
    var status = false;
    xhr.open("GET", "http://www.omdbapi.com/?plot=full&t=" + title + "&apikey=6c3a2d45", true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var movie = JSON.parse(xhr.responseText);
          status = true;
          if(movie.Error){
            this.setState({
              error: movie.Error
            });
          } else {
            let _list_ratings = movie.Ratings;
            var msg = "We do" + (movie.Poster === "N/A" ? " not" : "") + "have an image";

            this.setState({
              title: movie.Title,
              year: movie.Year,
              rated: movie.Rated,
              released: movie.Released,
              runtime: movie.Runtime,
              genre: movie.Genre,
              director: movie.Director,
              writer: movie.Writer,
              actors: movie.Actors,
              plot: (movie.Plot === "N/A" ? "" : movie.Plot),
              language: movie.Language,
              awards: (movie.Awards === "N/A" ? "No movie awards" : movie.Awards),
              poster: (movie.Poster === "N/A" ? "https://picsum.photos/350/500" : movie.Poster),
              list_ratings: movie.Ratings, // Need to come up with a solution to render arrays as csv.
              imdbRating: movie.imdbRating,
              imdbVotes: movie.imdbVotes,
              type: movie.Type
            });
          }
        } else {
          console.log(xhr.status + ": " + xhr.statusText);
        }
      }
    }.bind(this);
    xhr.onerror = function (e) {
      console.log(xhr.status + ": " + xhr.statusText);
    };
    xhr.send(null);
  }

  onChangeMovieInput(e){
    this.setState({
      movieSearchTerm: e.target.value
    })
  }

  onSubmitMovieForm(e){
    e.preventDefault();
    this.setState({searchSubmitted: true});
    this.getMovie(this.state.movieSearchTerm);
  }

  setSearchSubmittedTo(value){
    this.setState({searchSubmitted: value});
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar languageIndex={this.state.languageIndex} switchTaal={this.switchLanguageTo} />
          
          <Route path="/featured" render={() => {
            return(
              <div className="App container-fluid mt-navbar featured">
                <div className="row">
                  <div className="col-xs-12 text-center clearfix">
                    <h1 className="stripe-below">{language[this.state.languageIndex].featured}</h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 text-center clearfix">
                    <p className="text--highlight text--description">{language[this.state.languageIndex].featuredPageText}</p>
                  </div>
                </div>

                <Movie title="interstellar" />
                <Movie title="Inception" />
              </div>
            )
          }} />

          <Route path="/" exact render={() => {
            return (
              <div>
                <div className="App container-fluid mt-navbar">
                
                  {/* START SEARCH COMPONENT */}
                  <div className="row">
                    <div className="col-xs-12 col-sm-8 col-sm-offset-2 text-center">
                      <form onSubmit={this.onSubmitMovieForm}>
                        <input type="text" className="input--width" onChange={this.onChangeMovieInput} placeholder={language[this.state.languageIndex].searchMovieInstruction} />
                        <button type="submit" className="width-100p btn btn--primary btn--wide-xs">{language[this.state.languageIndex].searchButton}</button>
                      </form>
                    </div>
                  </div>
                  {/* EINDE SEARCH COMPONENT */}

                  <div className="row">
                    <div className="col-xs-12 mt text-center">
                      <button type="button" className="width-100p btn btn--quartiary btn--wide-xs">John's Movie DataBase</button>
                    </div>
                  </div>

                  {/* START VIDEO */}
                  <div className="row video"><div className="col-xs-12 text-center mt embed-responsive embed-responsive-16by9">
                    <video muted autoPlay="true" className="img-responsive">
                      <source src={require('./img/countdown.mp4')} type="video/mp4" />
                    </video>
                  </div></div>
                  {/* EINDE VIDEO */}

                  {/* START MOVIE COMPONENT */}
                  <div className="row">
                    <div className={this.state.title === "" ? "hidden": "visible" + " movie mt"}>
                        <div className="row flex movie--details">
                            <div className="col-xs-12 col-sm-3">
                                <img src={this.state.poster} className="img-responsive movie--image full-width-xs" alt={"Image " + this.state.title} />
                            </div>
                            <div className="col-xs-12 col-sm-9 mt-small-xs">
                                <div className="flex flex-justify-between flex-align-center movie-title-and-rating">
                                    <div className="movie--title">
                                        <h3>{this.state.title} <span style={{textTransform:'capitalize'}}>{"(" + this.state.type}</span> - {this.state.year + ")"}</h3>
                                    </div>
                                    <div className="movie--rated">
                                        <p>Rated: {this.state.rated}</p>
                                    </div>
                                </div>
                
                                <div className="row">
                                    <div className="col-xs-12">
                                        <p className="text--subtext">{this.state.runtime} | {this.state.genre} | {this.state.released}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 mt-small mb-small">
                                        <p className="minimize">{this.state.plot}</p>
                                    </div>
                                </div>
                
                                <div className="row">
                                    <div className="col-xs-12 col-sm-6">
                                        <p className="text--highlight">People that contributed</p>
                                        <ul className="list">
                                            <li>Director: {this.state.director}</li>
                                            <li>Writer: {this.state.writer}</li>
                                            <li>Language: {this.state.language}</li>
                                            <li>Actors: {this.state.actors}</li>
                                        </ul>
                                    </div>

                                    <div className="col-xs-12 col-sm-6 mt-small-xs">
                                        <p className="text--highlight">Ratings</p>
                                        <ul className="mt-small list-xs_up">
                                        {
                                            (this.state.list_ratings === undefined ? "not defined" : 
                                                this.state.list_ratings.map(
                                                    (currElement) => {
                                                        return(
                                                            <li key={currElement.Source} className="flex-xs flex-justify-between">
                                                                <span>{currElement.Source}</span>
                                                                <span className="hidden-xs">: </span>
                                                                <span>{currElement.Value}</span>
                                                            </li>
                                                        );
                                                    }
                                                )
                                            )
                                        }
                                        </ul>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 mt-small">
                                        <p className="text--highlight">{this.state.awards}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                  {/* EINDE MOVIE COMPONENT */}
                </div>
              </div>
          )}} />
        </div>
      </Router>
    );
    // EINDE RETURN
  }

  isEmpty(variable){return (variable == "" || variable === "" || variable == undefined || variable === undefined || variable == null || variable === null) == true;}
}

export default App;
