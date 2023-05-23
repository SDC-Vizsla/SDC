import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const RelatedButton = ({compare}) => {

  const handleClick = (e) => {
    compare();
  }

  return (
      // <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={ icon({name: 'star', style: 'regular'}) }
      className="related-compare-button" onClick={handleClick}
      style={{color: 'gold'}}/>
  )

}

export default RelatedButton;