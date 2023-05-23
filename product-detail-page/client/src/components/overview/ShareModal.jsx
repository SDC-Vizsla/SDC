import React, {useState} from "react";

const ShareModal = ({show, onClose}) => {
  if (!show) {
    return null
  }

  return (
    <div className="ov-share-modal" onClick={onClose}>
      <div className="ov-share-modal-content" onClick={e => e.stopPropagation()}>
        <div className="ov-share-modal-header">
          <div className="ov-share-modal-title">
            Share To Social Media
          </div>
          <div className="ov-share-modal-body">
            <button>Facebook</button>
            <button>Twitter</button>
            <button>Instagram</button>
          </div>
          <div className="ov-share-modal-footer">
            <button onClick={onClose} type="button">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ShareModal