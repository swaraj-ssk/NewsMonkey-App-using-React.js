import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

const apikey = process.env.REACT_APP_API_KEY;

export default class App extends Component {
  pageSize = 6
  country="in"
  
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
          <Route exact path="/" element={ <News key="/" pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="general" /> } />
            <Route exact path="/general" element={ <News key="general" pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="general" /> } />
            <Route exact path="/business" element={ <News key="business" pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="business" /> } />
            <Route exact path="/entertainment" element={ <News key="entertainment" pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="entertainment" /> } />
            <Route exact path="/health" element={ <News key="health" pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="health" /> } />
            <Route exact path="/science" element={ <News key="science" pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="science" /> } />
            <Route exact path="/sports" element={ <News key="sports" pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="sports" /> } />
            <Route exact path="/technology" element={ <News key="technology" pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="technology" /> } />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}