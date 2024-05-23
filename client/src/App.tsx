import React from "react";
import { Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import SignedOutLayout from './components/layout/SignedOutLayout';
import SignedInLayout from './components/layout/SignedInLayout';
import Landing from './pages/landing/Landing';
import Home from './pages/home/Home';
import Notifications from './pages/notification/Notifications';
import Profile from './pages/profile/Profile';
import ForgotPassword from "./pages/authentication/ForgotPassword";
import OTPSend from "./pages/authentication/OTPSend";
import Search from "./pages/search/Search";
import Login from "./pages/authentication/Login"
import Signup from "./pages/authentication/Signup"
import PassChange from "./components/modal/PassChange";

function App() {
  return (
    <Routes>
      <Route element={<SignedInLayout />} >
        <Route path="/home" element={<Home/>}/>
        <Route path="/notifications" element={<Notifications/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/profile/likes" element={<Profile/>}/>
        <Route path="/profile/dashboard" element={<Profile/>}/>
      </Route>
      <Route element={<PassChange />} >
        <Route path="/" element={<Landing/>} />
      </Route>  
    </Routes>
  );
}

export default App;
