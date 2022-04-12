import React, { useEffect, useState } from 'react'
import Actor from './Actor';
const API_KEY = "4ec6b61281e851668f78b722c60b91d4"
function Actors({movie}) {
    const [actors,setActors] = useState()
    const [fetching,setFetching] = useState(false)
    useEffect(() => {
        setFetching(true)
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`)
            .then((res) => res.json())
            .then((json) => {
            setFetching(false)
            setActors(json.cast)
        })
    },[movie])
    if(fetching || actors === undefined){
        return (
            <div>
                <div className='section-title'>
                    <h2>Actors</h2>
                </div>
                <hr className='line-break'/>
                <div>
                    Fetching actors...
                </div>
            </div>
        )
        
    }
    

    return (
        <div>
            <div className='section-title'>
                <h3>Actors</h3>
            </div>
            <hr className='line-break'/>
            <div className='actors'>
                { 
                    actors.map(actor =>
                        (
                            <Actor key={actor.id} actor={actor} />
                        )
                    )
                }
            </div>
            
        </div>
    )
}

export default Actors