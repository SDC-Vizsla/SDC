import React, {useState} from "react";
import StylesImage from './StylesImage.jsx';
import ShareModal from './ShareModal.jsx';

const StylesAndCart = ({chosenStyle, setChosenStyle, setNewStyleImg, setMainImg, newStyle, stylesData, setPickedImg}) => {

  let sizeAndQuantityData = []

  for (var x in newStyle.skus) {
    sizeAndQuantityData.push(newStyle.skus[x])
  }

  const [sizeVal, setSizeVal] = useState(sizeVal)
  const [qty, setQty] = useState(qty)
  const [selectStyleId, setSelectStyleId] = useState('')
  const [show, setShow] = useState(false)

  let handleSizeVal = function(event) {
    setSizeVal(event.target.value)
    for (var i in newStyle.skus) {
      if (newStyle.skus[i].size === event.target.value) {
        setQty(newStyle.skus[i].quantity)
      }
    }
  }

  let handleSelectStyle = function(clickedStyle) {
    setSelectStyleId(clickedStyle.style_id)
    setChosenStyle(clickedStyle)
    setNewStyleImg(clickedStyle)
    setMainImg(clickedStyle.photos[0])
    setPickedImg(clickedStyle.photos[0])
  }

  var qtyArr = []
  var num = 1
  var itemsLeft = qty
  if (itemsLeft > 15) {
    itemsLeft = 15
  }

  for (var x = 0; x < itemsLeft; x++) {
    qtyArr.push(num)
    num++
  }

  let styleSelected;
  stylesData.forEach((styleObj) => {
    if (styleObj.style_id === selectStyleId) {
        styleSelected = styleObj.name
    }
  })

  let price = function() {
    if (newStyle.sale_price === null) {
      return newStyle.original_price
    } else {
      return newStyle.sale_price
    }
  }

  return (
    <div>
      <p>${price()}</p>
      <p>In STOCK/ OUT OF STOCK</p>

      <div className="ov-style-photos-drop-downs">
        <div>
            <p>style > {styleSelected ? styleSelected: 'select style'}</p>
            <ul className="ov-style-photo">
                {stylesData.map((style, index) => (
                <StylesImage clickHandler={handleSelectStyle} chosenStyle={chosenStyle} setSelectStyleId={setSelectStyleId} style={style} key={style.style_id}/>
                ))}
            </ul>
        </div>
        <label>
            <select defaultValue="size" value={sizeVal} onChange={handleSizeVal}>
            <option value="size" disabled>Select Size</option>
            {sizeAndQuantityData.map((sizeQtyObj, index) => (
                <option key={index} value={`${sizeQtyObj.size}`}>{`${sizeQtyObj.size}`}</option>
            ))}
            </select>
        </label>
        <label>
            <select defaultValue="qty">
              <option value="qty" disabled>Select Quantity</option>
            {qtyArr.map((item, index) => (
                <option key={index} value={item}>{item}</option>
            ))}
            </select>
        </label>
      </div>

      <button>ADD TO BAG</button>
      <button onClick={() => setShow(true)}>SHARE</button>
      <ShareModal onClose={() => setShow(false)} show={show}/>
    </div>
  )
}

export default StylesAndCart