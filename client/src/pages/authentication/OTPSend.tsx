import React, { useState, useRef, useEffect } from "react";
import { RiLock2Fill } from "react-icons/ri";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../../hooks/api";
import config from "../../common/config";

const OTPSend = () => {
  const currEmail = localStorage.getItem("email");
  const [digits, setDigits] = useState(Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(true);
  const [errMess, setErrMess] = useState("");
  const [success, setSuccess] = useState(false);
  const [notif, setNotif] = useState(false);
  const [userOTP, setUserOTP] = useState("");
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(300);

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      await api
        .post(`${config.API}/forgotpass/sendEmail`, { email })
        .then((res) => {
          localStorage.setItem("email", email);
          if (res.status == 200) {
            setTimeout(() => {
              setIsLoading(false);
            }, 800);
            setConfirmMessage(false);
          }
        });
    } catch (err) {
      console.error(err);
      alert("Error sending reset email");
    }
  };

  const confirmOTP = () => {
    setIsLoading(true);
    setErrMess("");
    try {
      api
        .post(`${config.API}/forgotpass/verifycode`, { email, digits })
        .then((res) => {
          if (res.data.success == true) {
            alert("Success");
            setSuccess(true);
            navigate("/changepass");
          } else {
            setErrMess("Incorrect OTP code!");
          }
        });
    } catch (err) {
      setErrMess("Inccorect OTP code!");
    }
  };

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(countdownInterval);
        // Handle countdown expiration
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdown]);

  const triggerNotification = () => {
    setTimeout(() => {
      setNotif(true);
      setTimeout(() => {
        setNotif(false);
      }, 5000);
    }, 500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (/^\d?$/.test(value)) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      if (value && index < 5) {
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
    <div className="animate-fade-in flex-row  h-full w-full pr-[20%]">
      <div className="flex justify-center items-center pt-[20%] mt-[5%]">
        <RiLock2Fill className="dark:text-white text-[12em]" />
      </div>
      <div className="flex justify-center items-center">
        <p className="text-[4.2em] font-poppins font-semibold dark:text-white">
          Forgot Password?
        </p>
      </div>
      <div className="flex justify-center items-center mb-[1%]">
        <p className="text-[1.4em] font-poppins text-[#5E5C5C] dark:text-primary">
          Enter OTP Code sent to {currEmail}
        </p>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="flex h-14 w-[70%] mt- space-x-4 justify-center items-center dark:text-white">
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
              className="relative z-[100] w-14 h-14 text-center border border-yellow-400 rounded dark:bg-black"
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center mt-[2%]">
        <p className="text-[1.3em] font-poppins text-[#989898] font-semibold dark:text-white">
          Didn't receive OTP code?
        </p>
      </div>
      <div className="relative z-[100] flex justify-center items-center hover:cursor-pointer">
        <p
          className="text-[1.3em] font-poppins text-[#0066FE] font-medium"
          onClick={handleResetPassword}
        >
          Resend code
        </p>
      </div>
      <div className="flex mt-2 h-14 justify-center items-center">
        <div className="relative z-[100] flex w-[30%] h-full bg-[#fecc31] hover:bg-[#f0b500] justify-center items-center m-2 rounded-lg">
          <button
            className="w-full h-full justify-center items-center border-none cursor-pointer"
            onClick={() => {
              confirmOTP();
            }}
            disabled={isLoading}
          >
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
