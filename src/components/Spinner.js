import React, { Component } from 'react'
import loading from "./Ellipsis2.gif";

export default class Spinner extends Component {

  render() {
    return (
      <div className='text-center my-2'>
        <img src={loading} alt="loading" />
      </div>
    )
  }
}
