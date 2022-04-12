import React from 'react'
import default_profile from '../images/default_profile.svg'
function Actor({actor}) {
    let profile_img;
    if(actor.profile_path === null){
        profile_img = <img src={default_profile} alt="Actor"/>
    }else{
        profile_img = <img src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`} alt="Actor"/>
    }
  return (
    <div className='actor'>
        {profile_img}
        <div>{actor.name}</div>
    </div>
  )
}

export default Actor