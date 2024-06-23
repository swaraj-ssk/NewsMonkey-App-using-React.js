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
          <Route exact path="/" element={ <News pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="general" /> } />
            <Route exact path="/general" element={ <News pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="general" /> } />
            <Route exact path="/business" element={ <News pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="business" /> } />
            <Route exact path="/entertainment" element={ <News pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="entertainment" /> } />
            <Route exact path="/health" element={ <News pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="health" /> } />
            <Route exact path="/science" element={ <News pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="science" /> } />
            <Route exact path="/sports" element={ <News pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="sports" /> } />
            <Route exact path="/technology" element={ <News pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="technology" /> } />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}