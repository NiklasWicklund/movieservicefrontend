import React, { useEffect, useState } from 'react'
import { useParams} from "react-router-dom"
import Description from '../components/Description';
import Actors from '../components/Actors';
import Reviews from '../components/Reviews';

import default_movie_img from '../images/default_movie.svg'
const API_KEY = "4ec6b61281e851668f78b722c60b91d4"
function Movie() {
    let {id } = useParams()
    const [movie,setMovie] = useState()
    const [movieVideo,setMovieVideo] = useState()
    const [fetchingMovie,setFetchingMovie] = useState(true)
    const [fetchingVideos,setFetchingVideos] = useState(true)
    useEffect(() => {
        setFetchingMovie(true)
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
            .then((res) => res.json())
            .then((json) => {
            setMovie(json)
            setFetchingMovie(false)
        })
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
            .then((res) => res.json())
            .then((json) => {
            let video = undefined
            if(Object.keys(json.results).length > 0){
                video = json.results.find(video => video.type === "Trailer")
                if(video === undefined){
                    video = json.results[0]
                }
                setMovieVideo(video)
            }
            setFetchingVideos(false)
        })
        
    },[id])

    if(fetchingMovie || movie === undefined){
        return (
            <div>
                <div>Fetching movie: {id}</div>
            </div>
            
        )
    }

    let movie_title_image;
    if(movie.backdrop_path === null){
        movie_title_image = <img src={default_movie_img} alt="Movie backdrop"/>
    }else{
        movie_title_image = <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="Movie backdrop"/>
    }
    let year = new Date(movie.release_date).getFullYear()

    if(!fetchingVideos)
        console.log(movieVideo)

    if(Number.isNaN(year)) year = ""

    let movieImageElement = <div className='movie-title-img'>
            {movie_title_image}
        </div>
    if(movieVideo !== undefined){
        movieImageElement = <div className = "video-wrapper">
                <iframe
                    src={`https://www.youtube.com/embed/${movieVideo.key}`}
                    className="embedded-video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
            </div>
    }
    if(movie)
    return (
        <div className='centered'>
            <div className='movie-img-container'>
                    <div className='movie-title-overlay-container'>
                        {movieImageElement}
                        <div className='movie-title-overlay'>
                            <h3>
                                {movie.title}
                            </h3>
                            <h4>
                                {year}
                            </h4>
                        </div> 
                    </div>
                    
            </div>
            
            <Description movie={movie}/>
            <Actors movie={movie}/>
            <Reviews movie={movie} />
        </div>
    )

    
}

export default Movie