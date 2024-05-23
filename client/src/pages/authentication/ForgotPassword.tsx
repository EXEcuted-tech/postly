import React, { useState } from "react";
import lockIcon from "../../assets/material-symbols_lock.png";
import { MdEmail } from "react-icons/md";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex-row  h-full w-full pr-[20%]">
      <div className="flex justify-center items-center pt-[20%] mb-[-10px]">
        <img src={lockIcon} alt="" />
      </div>
      <div className="flex justify-center items-center">
        <p className="text-[72px] font-poppins font-semibold">
          Forgot Password?
        </p>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-[24px] font-poppins text-[#5E5C5C]">
          No worries! Enter your email and we will
        </p>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-[24px] font-poppins text-[#5E5C5C]">
          send a reset link to your inbox.
        </p>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="flex h-14 w-[70%] mt-3 border-yellow-400 ">
          <MdEmail className="absolute flex ml-2 mt-3 items-center text-[#8F8F8F] text-[30px] pointer-events-none" />
          <input
            type="text"
            name="email"
            className=" border-yellow-400 h-full w-full text-[30px] placeholder-[#8F8F8F] rounded-xl border-none ring-2 ring-[#fdcf43] pl-10 py-2 focus:ring-[#FECC31] focus:ring-2 "
            placeholder="Email Address"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="flex mt-5 h-14 justify-center items-center">
        <div className="flex-col w-[30%] h-full bg-black justify-center items-center m-5 rounded-lg">
          <button className="w-full h-full justify-center items-center border-none">
            <p className="font-poppins text-[24px] text-white font-semibold">
              Cancel
            </p>
          </button>
        </div>
        <div className="flex-col w-[30%] h-full bg-[#fecc31] m-5 rounded-lg">
          <button type="submit" className="w-full h-full p-1">
            <p className="font-poppins font-semibold text-[24px]">
              Reset Password
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
