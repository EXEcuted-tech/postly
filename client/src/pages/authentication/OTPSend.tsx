import React, { useState, useRef } from "react";
import lockIcon from "../../assets/material-symbols_lock.png";

const OTPSend = () => {
  const [email, setEmail] = useState("");
  const currEmail = localStorage.getItem("email");
  const [digits, setDigits] = useState(Array(5).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (/^\d?$/.test(value)) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      // Focus the next input if current one has a digit and it's not the last input
      if (value && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

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
          Enter OTP Code sent to {currEmail}
        </p>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="flex h-14 w-[70%] mt- space-x-4 justify-center items-center">
          {digits.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-14 h-14 text-center border border-yellow-400 rounded"
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center mt-2">
        <p className="text-[24px] font-poppins text-[#989898] font-semibold">
          Didn't receive OTP code?
        </p>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-[24px] font-poppins text-[#0066FE] font-semibold">
          Resend code
        </p>
      </div>
      <div className="flex mt-2 h-14 justify-center items-center">
        <div className="flex w-[30%] h-full bg-[#fecc31] justify-center items-center m-2 rounded-lg">
          <button className="w-full h-full justify-center items-center border-none cursor-pointer">
            <p className="font-poppins text-[24px] text-black font-semibold">
              Verify
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPSend;
