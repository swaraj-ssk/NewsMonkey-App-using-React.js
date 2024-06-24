import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const apikey = process.env.REACT_APP_API_KEY;

export default class App extends Component {
  pageSize = 6
  country = "in"

  state ={
    progress :0
  }
  
  setProgress =(progress)=>{
    this.setState({progress : progress})
  }

  render() {
    return (
      <div>
        <BrowserRouter>

          <Navbar />
          <LoadingBar
            color='#f11946'
            height={3}
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress}  key="/" pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="general" />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress}  key="general" pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="general" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress}  key="business" pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress}  key="entertainment" pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="entertainment" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress}  key="health" pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress}  key="science" pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress}  key="sports" pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress}  key="technology" pageSize={this.pageSize} API_KEY={apikey} country={this.country} category="technology" />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}