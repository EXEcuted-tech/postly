import React from "react";
import borderTopLeft from "../../assets/border-topright.png";
import appLogo from "../../assets/applogo.png";
import borderBottomRight from "../../assets/border-bottomright.png";
import { useOutlet } from "react-router-dom";

const SignedOutLayout = () => {
  const outlet = useOutlet();
  return (
    <div>
      <div className=" animate-fade-in font-poppins w-screen h-screen grid grid-rows-2 md:grid-cols-2 dark:bg-black">
        <div className=" w-full h-full md:h-screen flex-row ">
          <div className="relative z-0 flex h-[30%]">
            <img
              src={borderTopLeft}
              alt="topright_design"
              className="transform -scale-x-100 w-auto h-[500px]"
            />
          </div>
          <div className="flex-row h-[70%] items-top p-2 justify-center">
            <div className="flex justify-center items-center h-auto">
              <img src={appLogo} alt="Logo" className="w-auto h-[250px]" />
            </div>
            <div className="flex justify-center items-center h-auto">
              <p className="text-black font-poppins font-semibold text-[80px] dark:text-white">
                Postly
              </p>
            </div>
          </div>
        </div>
        <div className=" w-full h-full md:h-screen flex-row">
          <div className="flex h-[80%]">{outlet}</div>
          <div className="relative z-0 flex h-[20%] align-bottom justify-end">
            <img
              src={borderBottomRight}
              alt="borderbottom_right"
              className="self-end w-auto h-[300px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignedOutLayout;
