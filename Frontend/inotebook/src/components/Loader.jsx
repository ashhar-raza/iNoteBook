import React from 'react'
import loadinggif from '../assets/images/lodingGif.gif'
function Loader() {
  return (
    <div className="d-flex justify-content-center">
    <img src={loadinggif} alt="Loading..."  style={{width :'50px' ,height : '50px' , margin : '20px'}}/>
  </div>
  )
}

export default Loader
