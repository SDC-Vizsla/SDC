import React, {useState, useEffect} from "react";
import ImageGallery from './ImageGallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import StylesAndCart from './StylesAndCart.jsx';
import ProductDescription from './ProductDescription.jsx';
import Controller from '../relatedItems/controller.js';

const Overview = ({productInfoData, chosenStyle, setChosenStyle, stylesData, newStyle, mainImg, pickedImg, setStylesData, setNewStyleImg, setMainImg, setPickedImg}) => {

  return (
    <div>
      <div className="ov-top-container">
        <div className="ov-main-photo-container">
          <ImageGallery
          pickedImg={pickedImg} setPickedImg={setPickedImg}
          setMainImg={setMainImg} mainImg={mainImg}
          newStyle={newStyle}/>
        </div>
        <div className="ov-info-style-container">
          <ProductInfo productInfoData={productInfoData} />
          <StylesAndCart
            chosenStyle={chosenStyle} setChosenStyle={setChosenStyle}
            setPickedImg={setPickedImg} stylesData={stylesData}
            newStyle={newStyle} setMainImg={setMainImg}
            setNewStyleImg={setNewStyleImg} />
        </div>
      </div>
      <div>
        <ProductDescription productInfoData={productInfoData} />
      </div>
      <p>_________________________________________________________________</p>
    </div>
  )
}


export default Overview