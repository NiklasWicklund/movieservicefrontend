import React from 'react'
function Review({review}) {
    const dateObject = new Date(review.created_at)
    
    return (
    <div className='review'>
        <div className='section-title'>
            <h5>{review.author}</h5>
            <h5>{dateObject.toDateString()}</h5>
        </div>
        <span>{review.content}</span>
    </div>
  )
}

export default Review