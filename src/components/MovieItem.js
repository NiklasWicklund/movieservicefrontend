import React from 'react';
import default_movie_img from '../images/default_movie.svg'
function MovieItem({movie,handleMoviePress}) {
    const img_path = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`

    let movie_img;
    if(movie.poster_path === null){
      movie_img = <img src={default_movie_img} alt="Movie"/>
    }else{
      movie_img = <img src={img_path} alt="Movie"/>
    }
    let year = new Date(movie.release_date).getFullYear()
    if(Number.isNaN(year)) year = ""
    return (
      <div onClick={() =>{handleMoviePress(movie)}} className="movie-grid-item cursor-pointer">
          {movie_img}
          <div className="movie-grid-item overlay-container">
            <div className='overlay-title'>{movie.title}</div>
            <div className='overlay-year'>{year}</div>
            <div className='overlay-rating'>Rating: {movie.vote_average}</div>
          </div>
      </div>
    );
}

export default MovieItem;
