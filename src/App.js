import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'

const apikey= process.env.REACT_APP_API_KEY;

export default class App extends Component {
  
  render() {
    return (
      <div>
        <Navbar/>
        <News pageSize = {3} API_KEY={apikey} country="in" category="science"/>
      </div>
    )
  }
}