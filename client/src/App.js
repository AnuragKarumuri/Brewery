import React from 'react';
import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Brewery from './pages/Brewery';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/search' element={<Search />} />
        <Route exact path='/brewery/:id' element={<Brewery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
