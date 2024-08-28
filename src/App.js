// render here is called lifecycle method , when react app is run a series of method runs -screen par html render krna after jsx is compiled into
//rcc
import './App.css';
import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
//another way to write state without a constructor involvement
  state = {
    progress:0
  }
  setProgress = (progress) => {
    //here we cant use normal function , to obtain the direct pointing to the class,for this to point to the outer class we need to use arrow function
    this.setState({progress:progress});//destructuring
  }
  render() {
    return (
      <Router>
        <Navbar />
        <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
      />
        <Routes>
          {/* the key here treats each element as a new instance rather than a common instance with different routes */}
          <Route path="/" element={<News setProgress={this.setProgress} key={"general"} pageSize={18} category={"general"} />} />
          <Route path="/science" element={<News setProgress={this.setProgress} key={"science"} pageSize={18} category={"science"} />} />
          <Route path="/business" element={<News setProgress={this.setProgress} key={"business"} pageSize={18} category={"business"} />} />
          <Route path="/entertainment" element={<News setProgress={this.setProgress} key={"entertainment"} pageSize={18} category={"entertainment"} />} />
          <Route path="/health" element={<News setProgress={this.setProgress} key={"health"} pageSize={18} category={"health"} />} />
          <Route path="/sports" element={<News setProgress={this.setProgress} key={"sports"} pageSize={18} category={"sports"} />} />
          <Route path="/technology" element={<News setProgress={this.setProgress} key={"technology"} pageSize={18} category={"technology"} />} />
        </Routes>
      </Router>
    );
  }
}
