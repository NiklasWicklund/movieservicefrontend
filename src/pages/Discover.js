import React, { useEffect, useState } from 'react';
import MovieItem from '../components/MovieItem';
import Filter from '../components/Filter';
import { useNavigate } from "react-router-dom"
import Header from '../components/Header';


const API_KEY = "4ec6b61281e851668f78b722c60b91d4"
function Discover() {
    const [movies,setMovies] = useState([])
    const [maxPage,setMaxPage] = useState()
    const [fetching,setFetching] = useState(true)
    const [settings,setSettings] = useState({genres: [],rating: [0,10],page: 1,query: ''})
    
    const navigate = useNavigate()
    
    //Calls for API with the current settings
    useEffect(() => {
        if(settings.query === ''){
            let with_genres = "";
            if(settings.genres !== undefined){
                const genre_ids = settings.genres.filter(genre=>genre.selected === true).map(genre => genre.id)
                if(genre_ids.length > 0){
                    with_genres = `&with_genres=${genre_ids.join(",")}`
                }
                
            }

            const with_ratings = `&vote_average.gte=${settings.rating[0]}&vote_average.lte=${settings.rating[1]}`;

            setFetching(true)
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${settings.page}${with_genres}${with_ratings}`)
                .then((res) => res.json())
                .then((json) => {
                setMovies(json.results)
                setMaxPage(json.total_pages > 500 ? 500 : json.total_pages)
                setFetching(false)
                
                
            })
        }else{
            setFetching(true)
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${settings.query}&page=${settings.page}`)
                .then((res) => res.json())
                .then((json) => {
                setMovies(json.results)
                setMaxPage(json.total_pages > 500 ? 500 : json.total_pages)
                setFetching(false)
            })
        }
        
    },[settings])

    function handleMoviePress(movie){
        navigate(`/movie/${movie.id}`)
    }
    function handleSwitchPage(new_page){
        setSettings(prev => {return {genres: prev.genres,rating:prev.rating,page: new_page,query: prev.query}})
    }
    function handleApplyFilter(new_settings){
        setSettings(prev => {
            return {
                genres: new_settings.genres,
                rating: new_settings.rating,
                page: 1,
                query: ''
            }
        })
    }
    function handleSearch(string){
        setSettings(prev => {
            return {
                genres: prev.genres,
                rating: prev.rating,
                page: 1,
                query: string
            }
        })
    }
    return (
        <div>
            <Header handleSearch={handleSearch}/>
            <div className='centered'>
                <Filter handleApplyFilter={handleApplyFilter}/>
                <div className="movie-section ">
                    <hr className='line-break'/>
                    <h2>{(settings.query === ''|| settings.query === undefined) ? "Discover" : `Showing results for: ${settings.query}`}</h2>
                        
                    {(fetching) ? <div>Fetching movies...</div> :
                    <div>
                        <div className={'movie-grid'}>
                        {movies.map((movie) => (
                            <MovieItem key={movie.id} movie={movie} handleMoviePress = {handleMoviePress}/>
                            ))
                        }
                        </div>
                        <div className='switch-page-container'>
                        {settings.page !== 1 && <button onClick={() => handleSwitchPage(1)}>{"<<"}</button>}
                        {settings.page > 1 && <button onClick={() => handleSwitchPage(settings.page-1)}>{"<"}</button>}
                        <span className='small-text'>{settings.page}/{maxPage}</span>
                        {settings.page < maxPage && <button onClick={() => handleSwitchPage(settings.page + 1)}>{">"}</button>}
                        {settings.page !== maxPage && <button onClick={() => handleSwitchPage(maxPage)}>{">>"}</button>}
                        </div>
                    </div>
                    
                    }
                    
                </div>
            </div>
            
            
            
        </div>
        
    )
}

export default Discover