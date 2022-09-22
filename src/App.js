import React, { useState, } from "react"
import { Provider } from "react-redux";
import AddProducts from "./components/AddProducts";
import Cart  from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products"
import data from "./data.json"
import { useStateCallback } from "./Hooks/useStateCallback"
import { BrowserRouter as Router, Switch, Link, Navigate } from 'react-router-dom';
import { Routes ,Route } from 'react-router-dom';

import store from './store';
import Login from "./Login";
import MainApp from "./MainApp";

function App() {

  return (
    <Router>
      <Routes>
            {/* <Route exact path='/' component={Home} /> */}
            {/* <Route exact path='/' element={<Login/>} 
            render={() => {
              return (
                // this.state.isUserAuthenticated ?
                <Navigate to="/login" /> 
                // <Redirect to="/test1" /> 
              )
            }}/> */}
            <Route exact path='/login' element={<Login/>} />
            <Route exact path='/register' element={<Login/>} />
            <Route exact path='/app'   element={<MainApp />}  />
      </Routes>
    
    </Router>
  );
}

export default App;
