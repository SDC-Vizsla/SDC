import React, { useState } from 'react';
import ReviewsModal from './ReviewsModal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const ReviewPhoto = ({ classToApply, url, alt }) => {
  const [viewing, setViewing] = useState(false);
  return (
    <>
    <img className={ classToApply } src={ url } alt={ alt } onClick={() => setViewing(true)}></img>
    <ReviewsModal visible={ viewing }>
      <div className='rr-full-screen-modal-close-container'>
        <div className='rr-full-screen-modal-close' onClick={() => setViewing(false)}>
          <span>close</span><FontAwesomeIcon icon={ icon({name: 'circle-xmark', style: 'solid'}) } />
        </div>
      </div>
      <img className='rr-full-screen-modal-image' src={ url } alt={ alt } ></img>
    </ReviewsModal>
    </>
  );
};

export default ReviewPhoto;