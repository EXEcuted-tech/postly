import React from "react";
import { Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import SignedOutLayout from "./components/layout/SignedOutLayout";
import SignedInLayout from "./components/layout/SignedInLayout";
import Landing from "./pages/landing/Landing";
import Home from "./pages/home/Home";
import Notifications from "./pages/notification/Notifications";
import Profile from "./pages/profile/Profile";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import OTPSend from "./pages/authentication/OTPSend";
import ChangePassword from "./pages/authentication/ChangePassword";
import Search from "./pages/search/Search";
import Signup from "./components/modal/Signup";
import Login from "./components/modal/Login";
import PassChange from "./components/modal/PassChange";
import AddPost from "./components/modal/AddPost";
import EmailSent from "./components/modal/EmailSent";
import Discard from "./components/modal/Discard";
import Delete from "./components/modal/Delete";
import LogOut from "./components/modal/LogOut";
import Header from "./components/header/Header";

function App() {
  return (
    <Routes>
      <Route element={<SignedInLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/likes" element={<Profile />} />
        <Route path="/profile/dashboard" element={<Profile />} />
      </Route>
      <Route element={<LogOut />}>
        <Route path="/" element={<Header />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="/changepass" element={<ChangePassword />} />
        <Route path="/verify" element={<OTPSend />} />
      </Route>
    </Routes>
  );
}

export default App;
