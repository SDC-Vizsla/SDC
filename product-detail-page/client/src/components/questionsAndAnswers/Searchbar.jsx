import React, { useState } from 'react';


const Searchbar = ({searchQuery, setSearchQuery}) => {


  const handleSearchInput = (e) => {
    if (e.target.value.length >= 3) {
      setSearchQuery(e.target.value);
    } else {
      setSearchQuery('');
    }
  };

  return (
    <div>
      <input id="qa-searchbar-input" placeholder='Have a question? Search for answers…' onChange={(e) => {handleSearchInput(e)}} />
    </div>
  )
}


export default Searchbar

