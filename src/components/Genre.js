import React from 'react';
function Genre({genre,handleToggleGenre}) {
  return (
    <div className={`genre ${genre.selected ? " genre-selected" : ""} small-text cursor-pointer`} onClick={() => {
            handleToggleGenre(genre);
        } 
        }>
        {genre.name}
    </div>
  )
}

export default Genre