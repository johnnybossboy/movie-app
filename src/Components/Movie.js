import React, { Component } from 'react';
import language from './Language';
import PieChart from './PieChart';

class Movie extends Component {
    constructor(props){
        super(props);
        this.getMovie = this.getMovie.bind(this);
        this.state = {
            title: this.props.title
        };
    }
    
    componentDidMount(){
        this.getMovie(this.props.title);
    }
    
    getMovie(title){
        var xhr = new XMLHttpRequest();
        var json_obj, status = false;
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
                            plot: movie.Plot,
                            language: movie.Language,
                            awards: movie.Awards,
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
    
    render(){
        return(
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
        )
    }
}

export default Movie;
