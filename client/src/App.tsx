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
import ProfileOther from "./pages/profile/ProfileOther";
import LogOut from "./components/modal/LogOut";

function App() {
  return (
    <Routes>
      <Route element={<SignedInLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile/user" element={<ProfileOther />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/likes" element={<Profile />} />
        <Route path="/profile/dashboard" element={<Profile />} />
        <Route path="/logout" element={<LogOut setLogout={function (value: boolean): void {
          throw new Error("Function not implemented.");
        } } />} />
      </Route>
      <Route element={<SignedOutLayout/>}>
        <Route path="/" element={<Landing />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="/changepass" element={<ChangePassword />} />
        <Route path="/verify" element={<OTPSend />} />
      </Route>
    </Routes>
  );
}

export default App;
