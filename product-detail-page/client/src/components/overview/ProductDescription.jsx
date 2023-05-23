import React from "react";

const ProductDescription = ({productInfoData}) => {
  // let productInfoData = {
  //   "id": 37311,
  //   "campus": "hr-rfe",
  //   "name": "Camo Onesie",
  //   "slogan": "Blend in to your crowd",
  //   "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
  //   "category": "Jackets",
  //   "default_price": "140.00",
  //   "created_at": "2021-08-13T14:37:33.145Z",
  //   "updated_at": "2021-08-13T14:37:33.145Z"
  // }
  return (
    <div>
      <h5>{productInfoData.slogan}</h5>
      <p>{productInfoData.description}</p>
      <div>
        LIST OF PRODUCT INFO
        LIST OF PRODUCT INFO
        LIST OF PRODUCT INFO
        LIST OF PRODUCT INFO
      </div>
    </div>
  )
}


export default ProductDescription