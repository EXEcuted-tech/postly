import React from 'react';
import { Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import SignedOutLayout from './components/layout/SignedOutLayout';
import SignedInLayout from './components/layout/SignedInLayout';
import Landing from './pages/landing/Landing';
import Home from './pages/home/Home';
import Notifications from './pages/notification/Notifications';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <Routes>
      <Route element={<SignedInLayout />} >
        <Route path="/home" element={<Home/>}/>
        <Route path="/notifications" element={<Notifications/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/profile/likes" element={<Profile/>}/>
        <Route path="/profile/dashboard" element={<Profile/>}/>
      </Route>
      <Route element={<SignedOutLayout />} >
        <Route path="/" element={<Landing/>} />
      </Route>  
    </Routes>
  );
}

export default App;
