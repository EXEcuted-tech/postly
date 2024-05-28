import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in font-poppins flex-row  h-full w-full pr-[20%]">
      <div className="flex justify-center items-center pt-[20%] mt-[8%]">
        <RiLock2Fill className="dark:text-white text-[12em]" />
      </div>
      <div className="flex justify-center items-center">
        <p className="text-[4.2em] font-poppins font-semibold dark:text-white">
          Forgot Password?
        </p>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-[1.3em] font-poppins text-[#5E5C5C] dark:text-primary">
          No worries! Enter your email and we will
        </p>
      </div>
      <div className="flex justify-center items-center mb-[0.5%]">
        <p className="text-[1.3em] font-poppins text-[#5E5C5C] dark:text-primary">
          send a reset link to your inbox.
        </p>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="flex h-14 w-[70%] mt-3 border-yellow-400 ">
          <MdEmail className="absolute z-[100] flex ml-2 mt-3 items-center text-[#8F8F8F] text-[30px] pointer-events-none dark:text-white" />
          <input
            type="text"
            name="email"
            className="relative z-[50] border-yellow-400 h-full w-full text-[1.4em] placeholder-[#8F8F8F] dark:placeholder-white rounded-xl border-none ring-2 ring-[#fdcf43] pl-10 py-2 focus:ring-[#FECC31] focus:ring-2 font-poppins dark:bg-black dark:text-white"
            placeholder="Email Address"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="flex mt-5 h-14 justify-center items-center">
        <div className="flex-col w-[30%] h-full bg-black dark:bg-white justify-center items-center m-5 hover:bg-[#212121] dark:hover:bg-[#dadada] rounded-lg">
          <button
            className="relative z-[100] w-full h-full justify-center items-center border-none"
            onClick={() => navigate("/")}
          >
            <p className="font-poppins text-[24px] text-white dark:text-black font-semibold ">
              Cancel
            </p>
          </button>
        </div>
        <div className="flex-col w-[30%] h-full bg-[#fecc31] m-5 rounded-lg hover:bg-[#f0b500]">
          <button
            type="submit"
            className="relative z-[100] w-full h-full p-1"
            onClick={() =>{ 
              navigate("/verify")
              localStorage.setItem('email',email);
            }}
          >
            <p className="font-poppins font-semibold text-[24px] hover:cursor-pointer">
              Reset Password
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
