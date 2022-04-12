import React, {useState } from 'react';
import MovieItem from './MovieItem';

//https://image.tmdb.org/t/p/w500/ base url
function MovieSection({section,movies,handleMoviePress}) {
    const [collapsed,setCollapsed] = useState(true)
    if (movies.length === 0) return
    return (
        <div className="movie-section">
            <h2>{section}</h2>
                

            <div className={'movie-grid movie-grid-' + (collapsed ? 'up' : 'down')}>
            {movies.map((movie) => (
                <MovieItem key={movie.id} movie={movie} handleMoviePress = {handleMoviePress}/>
                ))
            }
            </div>
            <button className = "expand-button" onClick={() => {setCollapsed(prev => {return !prev})}}>{collapsed ? "+" : "-"}</button>
            <hr className="line-break"/>
        </div>
    );
}

export default MovieSection;