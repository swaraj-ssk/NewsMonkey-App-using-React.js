import React from 'react'
import loading from "./Ellipsis2.gif";

const Spinner = ()=>{
    return (
      <div className='text-center my-2'>
        <img src={loading} alt="loading" />
      </div>
    )
}

export default Spinner 