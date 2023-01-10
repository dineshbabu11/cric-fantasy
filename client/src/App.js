import React, { Component } from 'react'
//import {BrowserRouter, Route, Routes} from "react-router-dom"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home';


class App extends Component{
  render() {
    return(
      <div>
        <Router>
          <Routes>
              <Route exact path="/" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/home" element={<Home />}></Route>
            </Routes>
        </Router>
          
        
      </div>
    )


  }
}

export default App