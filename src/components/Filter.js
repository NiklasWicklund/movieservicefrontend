import React, { useEffect, useState } from 'react';
import Genre from './Genre';
import Slider from '@mui/material/Slider';

const API_KEY = "4ec6b61281e851668f78b722c60b91d4"
function Filter({handleApplyFilter}) {
    const [collapsed,setCollapsed] = useState(true)
    const [fetching,setFetching] = useState(true)
    const [filter,setFilter] = useState({genres: [],rating: [0, 10]})
    

    useEffect(() => {
        setFetching(true)
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
            .then((res) => res.json())
            .then((json) => {
            setFilter(prev => {return {
                genres: json.genres.map(genre => ({name: genre.name,id: genre.id,selected: false})),
                rating: prev.rating
                }
            })
            setFetching(false)
          })
    },[])


    function handleToggleGenre (_genre){
        const updateList = [...filter.genres]
        const genre = updateList.find(genre => genre.id === _genre.id)
        genre.selected = !genre.selected
        setFilter(prev => {return {
            genres: updateList,
            rating: prev.rating
            }
        })
    }

    function handleResetFilter(){
        setFilter(prev => {return {
            genres: prev.genres.map(genre => ({name: genre.name,id: genre.id,selected: false})),
            rating: [0, 10]}
        })
    }
    const handleRatingChange = (event, newValue) => {
        setFilter(prev => {return {
            genres: prev.genres,
            rating: newValue
            }
        })
    };

    return (
        <div>
            <div onClick={() => {setCollapsed(prev => {return !prev})}} className= "cursor-pointer">Filter {collapsed ? "+" :"-"}</div>
            <div className={`filter-container${collapsed ? "" : "-open"}`}>
                {
                    fetching ? <div>Fetching ...</div> :
                    <div>
                        <button className='apply-filter-button normal-text cursor-pointer' onClick={() => {
                            handleResetFilter();
                            }}>
                            Reset
                        </button>
                        <h4>Select genres</h4>
                        <div className='genres'>
                            
                            {filter.genres.map(genre => 
                                <Genre key={genre.id} genre={genre} handleToggleGenre={handleToggleGenre}/>    
                            )}
                        </div>
                        <h4>Select rating</h4>
                        <Slider
                            getAriaLabel={() => 'Rating range'}
                            value={filter.rating}
                            onChange={handleRatingChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={10}
                        />
                    </div>
                    
                }
                
                <button className='apply-filter-button normal-text cursor-pointer' onClick={() => {
                    handleApplyFilter(filter);
                    setCollapsed(prev => {return !prev});
                    }}>
                    Apply
                </button>
            </div>
        </div>
        
    )
        
}

export default Filter