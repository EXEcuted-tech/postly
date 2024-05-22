import React from 'react';
import { Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import SignedOutLayout from './components/layout/SignedOutLayout';
import SignedInLayout from './components/layout/SignedInLayout';
import Landing from './pages/landing/Landing';
import Home from './pages/home/Home';

function App() {
  return (
    <Routes>
      <Route element={<SignedInLayout />} >
          <Route path="/home" element={<Home/>}/>
      </Route>
      <Route element={<SignedOutLayout />} >
        <Route path="/" element={<Landing/>} />
      </Route>  
    </Routes>
  );
}

export default App;
