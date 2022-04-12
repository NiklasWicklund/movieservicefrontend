import React, { useEffect, useState } from 'react';
import MovieSection from '../components/MovieSection';
import { useNavigate } from "react-router-dom"
import Header from '../components/Header';

const API_KEY = "4ec6b61281e851668f78b722c60b91d4"

function Home() {
    const [trendingMovies,setTrendingMovies] = useState([])
    const [topRatedMovies,setTopRatedMovies] = useState([])
    const [fetching,setFetching] = useState(false)
    const [searchString,setSearchString] = useState('')
    const [searching,setSearching] = useState(false)
    const [searchResult,setSearchResult] = useState([])

    const navigate = useNavigate()
    
    useEffect(() => {
        setFetching(true)
        fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
            .then((res) => res.json())
            .then((json) => {
            setFetching(false)
            
            setTrendingMovies(json.results)
          })
        setFetching(true)
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
            .then((res) => res.json())
            .then((json) => {
            setFetching(false)
          
            setTopRatedMovies(json.results)
        })
    },[])
    

      //Search for specific movie by title
    useEffect(() => {
        setSearching(true)
        if(searchString === ''){
          setSearching(false)
          setSearchResult([])
          return
        }
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchString}`)
            .then((res) => res.json())
            .then((json) => {
            setSearching(false)
            setSearchResult(json.results)
          })
    },[searchString])
    
    function handleMoviePress(movie){
        navigate(`/movie/${movie.id}`)
    }
        
    if (fetching){
        return (
          <div> 
              <Header handleSearch={handleSearch}/>
              <h1> Loading movies.... </h1> 
              <footer>
                <p>Footer</p>
              </footer>
          </div>
          
        );
    }
    function handleSearch(string){
      setSearchString(string)
    }
    return (
        <>
        <Header handleSearch={handleSearch}/>
        <div className='movie-container'>
                {searching ? (
                <div>Searching...</div>) : 
                  <MovieSection section="Search Result"movies={searchResult} handleMoviePress={handleMoviePress}/>
                }
                <MovieSection section="Trending" movies={trendingMovies} handleMoviePress={handleMoviePress}/>
                <MovieSection section="Top Rated" movies={topRatedMovies} handleMoviePress={handleMoviePress}/>
        </div>
        </>
          
    );
}

export default Home
