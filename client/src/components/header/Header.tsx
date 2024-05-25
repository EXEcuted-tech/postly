import React, { useEffect, useState } from "react";
import logoLight from "../../assets/logo-transparent.png";
import logoDark from "../../assets/logo-yellow 1.png";
import user from "../../assets/sana.jpg";
import { FaSearch, FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import useColorMode from "../../hooks/useColorMode";

const Header = () => {
  const [darkMode, setDarkMode] = useColorMode();

  const color = localStorage.getItem("color-theme");

  useEffect(() => {}, [color]);

  const toggleDarkMode = () => {
    setDarkMode(darkMode === "light" ? "dark" : "light");
  };

  return (
    <div className="font-poppins flex items-center bg-primary h-[10vh] w-full dark:bg-black">
      <div className="flex items-center w-[25%]">
        <img
          src={darkMode === "dark" ? logoDark : logoLight}
          alt="Postly Logo"
          className="ml-[25%] w-[13%] h-[17%] mr-[5%]"
        ></img>

        <h1 className="font-semibold text-[2.1em] dark:text-primary">Postly</h1>
      </div>
      <div className="flex items-center w-[60%] ml-[3%] ">
        <FaSearch className="text-[1.2em] absolute ml-[1%] text-[#8F8F8F]" />
        <input
          type="text"
          placeholder="Search for people, posts, stories"
          className="bg-[#F3F5F7] pl-[5%] py-[1%] pr-[2%] w-[90%] rounded-[30px] mr-[1%] text-[1.2em]"
        ></input>
      </div>
      <div className="flex items-center">
        <div>
          <button onClick={toggleDarkMode}>
            {darkMode === "dark" ? (
              <IoIosSunny
                className="text-[2.8em] bg-primary text-black rounded-full px-[15%] py-[15%]
            hover:cursor-pointer  hover:bg-[#FEF200] animate-pop1"
              />
            ) : (
              <FaMoon
                className="text-[2.8em] bg-black text-primary rounded-full px-[15%] py-[15%]
              hover:cursor-pointer hover:bg-gray-900 animate-pop1"
              />
            )}
          </button>
        </div>
        <div className="ml-[15%]">
          <div className="w-[50px] h-[50px]">
            <img
              src={user}
              alt="Profile Picture"
              className="rounded-full object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
