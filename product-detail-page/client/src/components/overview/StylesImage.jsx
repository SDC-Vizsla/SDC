import React, {useEffect} from "react";

const StylesImage = ({style, chosenStyle, clickHandler}) => {
  // console.log("chosen and mapped", chosenStyle, style.style_id)


  return (
    <li onClick={() => clickHandler(style)} >
      <img  className={`styles-img ${chosenStyle.style_id === style.style_id && "ov-selected"}`} src={style.photos[0].thumbnail_url} alt="product-image"/>

    </li>
  )
}

export default StylesImage