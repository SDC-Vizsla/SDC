import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const StarBar = ({ rating }) => {
  let fullStars = Math.floor(rating);
  let quarterStars = Math.round((rating - fullStars) / .25);  // get decimal part of rating. see how many .25s fit in it, rounded to nearest integer.
  if (quarterStars === 4) {  // account for ratings like 2.9, which will yield 2 full stars and 4 quarter stars. convert 4 quarter stars into 1 full star.
    fullStars += 1;
    quarterStars = 0;
  }
  let stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FontAwesomeIcon key={i} icon={ icon({name: 'star', style: 'solid'}) } />);
    }
    if (i === fullStars) {
      stars.push((quarterStars > 0) ? (
        <span className='fa-layers fa-fw'>
          <FontAwesomeIcon key={i+0.5} icon={ icon({name: 'star', style: 'regular'}) } />
          <FontAwesomeIcon key={i} className={`rr-star-filled-${quarterStars}-4`} icon={ icon({name: 'star', style: 'solid'}) } />
        </span>
        ) : (<FontAwesomeIcon key={i} icon={ icon({name: 'star', style: 'regular'}) } />)
    )};
    if (i > fullStars) {
      stars.push(<FontAwesomeIcon key={i} icon={ icon({name: 'star', style: 'regular'}) } />)
    }
  }
  return (
    <div className='rr-star-bar'>
      { stars }
    </div>
  )
}

export default StarBar;