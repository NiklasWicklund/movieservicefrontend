import React from 'react'
function Description({movie}) {
  return (
    <div>
        <div className='section-title'>
            <h2>Description</h2>
            <h2>Rating: {movie.vote_average}</h2>
        </div>
        <hr className='line-break'/>
        <span className='movie-overview'>
            {movie.overview}
        </span>
        <div className='genres'>
            {movie.genres.map(genre => (
                <div key={genre.id} className='genre'>
                    {genre.name}
                </div>
            ))}
        </div>
        
    </div>
    
    
  )
}

export default Description