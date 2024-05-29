import React, { FormEvent, useState } from "react";
import Logo from "../../assets/applogo.png";
import { IoCloseOutline } from "react-icons/io5";
import BounceLoader from "react-spinners/ClipLoader";
import config from "../../common/config";
import api from "../../hooks/api";
import { useNavigate } from "react-router-dom";
import { decodeBase64Url } from "../../helpers/functions";
import UserNotification from "../alerts/Notification";
import { AiFillExclamationCircle } from "react-icons/ai";

const Login = ({ setLogin }: { setLogin: (value: boolean) => void }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (credential === "") {
      setError("Username or email is required!");
      setLoading(false);
      errorTimer();
    } else {
      api
        .post(`${config.API}/login`, {
          credential: credential,
          password: password,
        })
        .then((res) => {
          //console.log("RES DATA: ",res.data);
          if (res.data.success === true) {
            const { accessToken, refreshToken } = res.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            var decodedPayload: string;
            if (typeof accessToken === "string") {
              const [_, payload] = accessToken.split(".");
              decodedPayload = decodeBase64Url(payload);
              localStorage.setItem("payload", decodedPayload);
            }

            navigate("/home");

            setTimeout(() => {
              setLoading(false);
            }, 800);
          } else {
            setTimeout(() => {
              setLoading(false);
            }, 800);
            setError(res.data.error);
            errorTimer();
          }
        })
        .catch((err) => {
          //console.log("Error: ",err);
          setError(err.response.data.error);
          setLoading(false);
          errorTimer();
        });
    }
  };

  const errorTimer = () => {
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  return (
    <div className="animate-fade-in w-full h-full top-0 left-0 absolute backdrop-brightness-50 z-[1000]">
      {error !== "" && (
        <UserNotification
          icon={<AiFillExclamationCircle />}
          logocolor="#ff0000"
          title="Error!"
          message={error}
          animate="animate-shake"
        />
      )}
      <div className="bg-white w-[32%] h-[50%] ml-[35%] mt-[11%] rounded-[50px] shadow-2xl dark:bg-black">
        <div className="text-white">
          <div className="flex justify-center pt-[5%] pb-[1%]">
            <img src={Logo} className="w-[15%] ml-[40%]" />
            <IoCloseOutline
              className="cursor-pointer text-[#C2C2C2] text-[3em] content-end ml-[30%] hover:text-[#a1a1a1] dark:text-white"
              onClick={() => setLogin(false)}
            />
          </div>
          <div className="ml-[11%]">
            <h1 className="text-[3em] font-medium text-black dark:text-white">
              Sign in to Postly
            </h1>
            <p className="text-[1.25em] text-[#8F8F8F] mb-[3%] dark:text-primary">
              Welcome to Postly!
            </p>
            <form className="inline text-black">
              <div>
                <input
                  type="text"
                  name="un_email"
                  className="w-[85%] h-[2em] mb-[3%] text-[1.5em] pl-[2%] rounded-xl border-primary border-2 font-semibold dark:text-white dark:bg-black"
                  placeholder="Username or Email"
                  value={credential}
                  onChange={(e) => {
                    setCredential(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  className="w-[85%] h-[2em] mb-[3%] text-[1.5em] pl-[2%] pr-[2%] rounded-xl border-primary border-2 font-semibold dark:text-white dark:bg-black"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
              </div>
              <div className='text-center ml-[-9%]'>
                <button type='submit' name='login-btn' className=' bg-primary text-[1.5em] w-[25%] py-[1.5%] mt-[1%] font-bold rounded-lg hover:bg-[#f0b500]'
                onClick={login}>
                  <div className='flex items-center justify-center mr-[2%]'>
                    <BounceLoader className='mx-[2%]' color="#FFFFFF" loading={loading} />
                    Login
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
