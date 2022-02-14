import React, { Component } from "react";
import Login from "./Login.js";
import Register from "./Register.js";
import Vote  from "./Vote.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default class App extends Component{
  render(){
    return(
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link font-weight-bold text-light" href="http://localhost:3000/">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link font-weight-bold text-light" href="http://localhost:3000/Register">Register</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/Vote" element={<Vote/>}/>
          </Routes>
        </Router>
    )
  }  
}

