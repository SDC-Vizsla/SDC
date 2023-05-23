import React from "react";

const ThumbnailList = ({photoObj, setMainImg, pickedImg, clickHandler}) => {

  let handleMainImg = function() {
    setMainImg(photoObj)
    // setMainImg(photoObj.thumbnail_url)

  }
  // console.log('picked', pickedImg.thumbnail_url, 'mapped', photoObj.thumbnail_url)

  return (
    <li onClick={() => clickHandler(photoObj)} className="ov-Thumbnail-li">
      <img onClick={handleMainImg} className={`thumbnail-img ${pickedImg.thumbnail_url === photoObj.thumbnail_url && "ov-selected-img"}`} src={`${photoObj.thumbnail_url}`} alt="product-image"/>
    </li>
  )
}


export default ThumbnailList