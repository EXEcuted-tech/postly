import React, { useState } from "react";
import Login from "../../components/modal/Login";
import { useNavigate } from "react-router-dom";
import Signup from "../../components/modal/Signup";

const Landing = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  return (
    <div className="animate-fade-in z-[50]">
      {login && <Login setLogin={setLogin} />}
      {register && <Signup setRegister={setRegister} />}
      <div className="absolute top-[30%] left-[55%]">
        <p className="text-8xl font-bold dark:text-white">Post Now.</p>
        <div className="mt-[10%] mb-[2%]">
          <button
            className="w-[90%] ml-[3%] bg-primary text-[1.5em] rounded-[50px] py-[1%] font-bold hover:bg-[#f0b500]"
            onClick={() => setRegister(true)}
          >
            Create Account
          </button>
        </div>
        <div className="flex text-center mb-[3%] mt-[3%]">
          <hr className="w-[43%] mt-[1.2em] border-t-black dark:border-t-white"></hr>
          <p className="text-[1.5em] bg-white dark:bg-black text-black w-[8%] font-bold dark:text-white">
            or
          </p>
          <hr className="w-[45%] mt-[1.2em] border-t-black dark:border-t-white"></hr>
        </div>
        <p className="text-2xl font-bold text-center mb-[3%] dark:text-white">
          Already have an account?
        </p>
        <button
          className="w-[90%] ml-[3%] bg-white text-[1.5em] rounded-[50px] py-[1%] font-bold border-primary border-2 text-primary z-2
          hover:bg-black dark:hover:bg-[#202020] dark:bg-black"
          onClick={() => setLogin(true)}
        >
          Sign in
        </button>
        <div className="text-center mt-[3%]">
          <p className="text-center justify-center dark:text-white">
            Forgot password?{" "}
            <span
              className="text-primary hover:cursor-pointer hover:text-[#f0b500]"
              onClick={() => navigate("/forgotpass")}
            >
              Click here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
