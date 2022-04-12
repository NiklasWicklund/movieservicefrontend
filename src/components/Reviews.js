import React, { useEffect, useState } from 'react'
import Review from './Review';
const API_KEY = "4ec6b61281e851668f78b722c60b91d4"
function Reviews({movie}) {

    const [reviews,setReviews] = useState()
    const [fetching,setFetching] = useState(true)
    useEffect(() => {
        setFetching(true)
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/reviews?api_key=${API_KEY}`)
            .then((res) => res.json())
            .then((json) => {
            setFetching(false)
            setReviews(json.results)
        })
    },[movie])
    if(reviews === undefined) return <></>
    return (
        <div>
            <div className='section-title'>
                <h2>Reviews({fetching ? "..." : reviews.length})</h2>
            </div>
            <hr className='line-break'/>
            <div className='reviews'>
                { 
                    reviews.map(review =>
                        (
                            <Review key={review.id} review={review} />
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Reviews