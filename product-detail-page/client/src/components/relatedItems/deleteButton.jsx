import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const DeleteButton = ({userProducts, filterUserProducts, productID}) => {

const handleClick = (e) => {
  filterUserProducts(productID)
}

// console.log(userProducts);

  return (
      <FontAwesomeIcon icon={faXmark}
      className="related-compare-button" onClick={handleClick}
      style={{color: 'red'}}/>
  )

}

export default DeleteButton;