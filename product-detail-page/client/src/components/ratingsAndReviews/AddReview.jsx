import React, { useState } from 'react';
import ReviewsModal from './ReviewsModal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { submitReview } from './controllerReviews.js';

const positions = [1, 2, 3, 4, 5];
const starsExplanation = ['', 'Poor', 'Fair', 'Average', 'Good', 'Great!'];
const characteristicLabels = {
  'Size': ['', 'A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
  'Width': ['', 'Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
  'Comfort': ['', 'Uncomfortable', 'Slightly uncomfortable', 'OK', 'Comfortable', 'Perfect'],
  'Quality': ['', 'Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
  'Length': ['', 'Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
  'Fit': ['', 'Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly big', 'Runs big']
};
const emptyStar = (<FontAwesomeIcon icon={ icon({name: 'star', style: 'regular'}) } />);
const filledStar = (<FontAwesomeIcon icon={ icon({name: 'star', style: 'solid'}) } />);
const fakeImagesUrls = [
  'https://media.cnn.com/api/v1/images/stellar/prod/200906155336-04-thompson-farm-sunflowers.jpg?q=x_2,y_112,h_898,w_1596,c_crop/h_540,w_960/f_webp',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7fGb6xepP8Ax-vVCLi2qq2N2_rpn7DI1bf8b6zymVDw&usqp=CAU&ec=48600112'
];
const maxPhotos = 5;

const AddReview = ({ productID, productName, characteristics, retrieveFreshReviews }) => {
  const [addingReview, setAddingReview] = useState(false);
  const [starCount, setStarCount] = useState(0);
  const [photoAlert, setPhotoAlert] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const numOfPhotos = formData.getAll('add-review-photos').length;
    const formObj = Object.fromEntries(formData.entries());
    const review = {};
    review.product_id = Number.parseInt(productID);
    review.rating = starCount;
    review.summary = formObj['add-review-summary'];
    review.body = formObj['add-review-body'];
    review.recommend = formObj.recommend === 'yes';
    review.name = formObj['add-review-nickname'];
    review.email = formObj['add-review-email'];
    const photos = [];
    for (var p = 0; p < numOfPhotos; p++) {
      const indexToPush = p % fakeImagesUrls.length;
      photos.push(fakeImagesUrls[indexToPush]);
    }
    review.photos = photos;
    review.characteristics = {};
    for (let c in characteristics) {
      let id = characteristics[c].id;
      review.characteristics[id] = Number.parseInt(formObj[c]);
    }
    submitReview(review)
      .then(() => retrieveFreshReviews());
    setAddingReview(false);
  }

  const photoUpdate = (e) => {
    let photoCount = e.target.files.length;
    if (photoCount > maxPhotos) {
      // if more than maxPhotos are added, replace the files in the form with a subset of the photos
      let list = new DataTransfer();
      for (let i = 0; i < maxPhotos; i++) {
        list.items.add(e.target.files[i]);
      }
      e.target.files = list.files;
      setPhotoAlert(true);
    } else {
      if (photoAlert) setPhotoAlert(false);
    }
    // render images to DOM here
  }

  return (
    <div>
    {!addingReview ? <button onClick={ () => setAddingReview(true) }>ADD A REVIEW  +</button> :
      <ReviewsModal visible={ addingReview }>
        <div className='rr-full-screen-modal-close-container'>
          <div className='rr-full-screen-modal-close' onClick={() => setAddingReview(false)}>
            <span>close</span><FontAwesomeIcon icon={ icon({name: 'circle-xmark', style: 'solid'}) } />
          </div>
        </div>
        <h1>Write Your Review</h1>
        <h3>About { productName } </h3>

        <form className='rr-add-review' method='post' onSubmit={ submitHandler }>
          <fieldset>
            <legend>Overall rating</legend>
            <div className='rr-add-review-stars'>
              { positions.map(pos => {
                  return (
                    <div key={pos} className='rr-add-review-star' onClick={ () => setStarCount(starCount === pos ? 0 : pos) }>
                      { starCount >= pos ? filledStar : emptyStar }
                    </div>
                  )
                })
              }
              <div className='rr-add-review-overall-explanatory-note'>{ starCount > 0 && starsExplanation[starCount] }</div>
            </div>
          </fieldset>
          <fieldset>
            <legend>Do you recommend this product?</legend>
            <div>
              <input type='radio' name='recommend' id='recommend-yes' value='yes' />
              <label htmlFor='recommend-yes'>Yes</label>

              <input type='radio' name='recommend' id='recommend-no' value='no' />
              <label htmlFor='recommend-no'>No</label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Characteristics</legend>
            { Object.keys(characteristics).map(charName => {
              const lowerName = charName.toLowerCase();
              return (
                <div className='rr-add-review-row-characteristic'>
                  <div className='rr-add-review-characteristic-row-label'>
                    <label htmlFor={`${lowerName}`}>{ `${charName}: ` }</label>
                  </div>
                  <div className='rr-add-review-characteristic-row-content'>
                    <div className='rr-add-review-row-characteristic-selection'>
                      {  }
                    </div>
                    <div className='rr-add-review-row-characteristic-buttons'>
                      { positions.map(p => <input key={p} type='radio' name={`${charName}`} id={`${lowerName}-${p}`} value={`${p}`} />) }
                    </div>
                    <div className='rr-add-review-row-characteristic-low-high-labels'>
                      <div className='rr-add-review-row-characteristic-low-label'>{`${characteristicLabels[charName][1]}`}</div>
                      <div className='rr-add-review-row-characteristic-high-label'>{`${characteristicLabels[charName][5]}`}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </fieldset>
          <fieldset>
            <legend>Write your review</legend>

            <label htmlFor='add-review-summary'>Review summary: </label>
            <input type='text' id='add-review-summary' name='add-review-summary' placeholder='Example: A must-buy product for anyone' size='50' maxLength='60' required></input>
            <br />
            <label htmlFor='add-review-body'>Review body: </label>
            <textarea id='add-review-body' name='add-review-body' placeholder='Why did you like the product or not?' minLength='50' required></textarea>
            <br />
            <label htmlFor='add-review-photos'>Add photos to your review:</label>
            <input type='file' onChange={ photoUpdate } id='add-review-photos' name='add-review-photos' accept='image/*' multiple></input>
            <div className='review-form-explanatory-note'>up to {maxPhotos} photos can be added</div>
            <br />
            { photoAlert && <div className='rr-review-photo-alert'>{`Note: Only your first ${maxPhotos} photos will be included with your review.`}</div>}
            <div className='rr-add-review-photo-display'></div>

          </fieldset>
          <fieldset>
            <legend>Your information</legend>

            <label htmlFor='add-review-nickname'>What is your nickname? </label>
            <input type='text' id='add-review-nickname' name='add-review-nickname' placeholder='Example: jackson11' size='30' maxLength='60' required></input>
            <div className='review-form-explanatory-note'>For privacy reasons, do not use your full name or email address</div>
            <br />
            <label htmlFor='add-review-email'>What is your email? </label>
            <input type='email' id='add-review-email' name='add-review-email' placeholder='Example: jackson11@email.com' required></input>
            <div className='review-form-explanatory-note'>For authentication reasons, you will not be emailed</div>

          </fieldset>
          <input type='submit' value='Submit review' />
        </form>
      </ReviewsModal>
    }
    </div>
  )
}

export default AddReview;