import React, { Component } from 'react';

class MovieImage extends Component {
    constructor(props){
        super(props);
        this.state = {
            poster: "https://picsum.photos/150/300"
        };

        this.getMovie = this.getMovie.bind(this);
    }

    componentDidMount(){
        this.getMovie(this.props.title);
    }

    getMovie(title){
        var xhr = new XMLHttpRequest();
        var json_obj, status = false;
        xhr.open("GET", "http://www.omdbapi.com/?t=" + title + "&apikey=6c3a2d45", true);
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
                            poster: (movie.Poster === "N/A" ? this.state.poster : movie.Poster)
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
            <img src={this.state.poster} alt={this.props.title + " poster"} className="img-responsive" />
        )
    }
}

export default MovieImage;
