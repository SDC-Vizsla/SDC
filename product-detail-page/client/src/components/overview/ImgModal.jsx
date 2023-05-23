import React, {useState} from "react";

const ImgModal = ({modalPhoto, showImg, onClose}) => {
  if (!showImg) {
    return null
  }

  return (
    <div className="ov-share-modal" onClick={onClose}>
      <div className="ov-share-modal-content" onClick={e => e.stopPropagation()}>
        <div className="ov-share-modal-header">
          <div className="ov-share-modal-title">
          </div>
          <div >
            <img className="ov-img-photo" src={modalPhoto}/>
          </div>
          <div className="ov-share-modal-footer">
            <button onClick={onClose} type="button">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ImgModal