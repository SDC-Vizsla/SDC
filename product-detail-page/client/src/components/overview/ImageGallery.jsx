import React, {useState} from "react";
import ThumbnailList from './ThumbnailList.jsx';
import ImgModal from './ImgModal.jsx';

const ImageGallery = ({newStyle, mainImg, setMainImg, pickedImg, setPickedImg}) => {
  const [showImg, setShowImg] = useState(false)

    let handleSelectStyle = function(clickedImg) {
        setPickedImg(clickedImg)
    }

  return (
    <div>
      <img onClick={() => setShowImg(true)} className="main-img" src={mainImg.url}/>
      <ImgModal onClose={() => setShowImg(false)} modalPhoto={mainImg.url} showImg={showImg}/>
      <ul className="ov-no-list-dot thumbnails">
        {newStyle.photos.map((photoObj, index) => (
          <ThumbnailList clickHandler={handleSelectStyle} pickedImg={pickedImg} setMainImg={setMainImg} photoObj={photoObj} key={index}/>
        ))}
      </ul>
    </div>
  )
}


export default ImageGallery