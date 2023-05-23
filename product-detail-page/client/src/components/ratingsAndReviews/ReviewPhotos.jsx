import React, { useState } from 'react';
import ReviewPhoto from './ReviewPhoto.jsx';

const ReviewPhotos = ({ photos }) => {
  const [fullScreenPhoto, setFullScreenPhoto] = useState(false);

  const openFullScreen = (url) => {
    const image = (<dialog><img className='rr-review-img-full-screen' src={`${url}`} alt='a user provided photo' /></dialog>);
    console.log(image);
    image.showModal();
  }

  return (
    <div className='rr-review-photos'>
        { photos.map(p => <ReviewPhoto key={p.id} classToApply='rr-review-img' url={`${p.url}`} alt='a user provided photo' />) }
    </div>
  );
};

export default ReviewPhotos;