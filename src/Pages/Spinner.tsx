import React from 'react'
import image from "../assets/loading.gf.gif";

const Spinner :React.FC= () => {
  return (
    <div>
      <img src={image} alt="" />
    </div>
  )
}

export default Spinner
