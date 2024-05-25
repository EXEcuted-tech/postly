import React from 'react'
import logo from '../../assets/logo-transparent.png'
import user from '../../assets/sana.jpg'

import { MdDarkMode } from "react-icons/md";
import { FaMoon, FaRegMoon, FaSearch } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import useColorMode from "../../hooks/useColorMode"

const Header = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <div className='font-poppins flex items-center bg-primary h-[10vh] w-full dark:bg-black'>
        <div className='flex items-center w-[25%]'>
            <img src={logo} alt="Postly Logo" className="ml-[25%] w-[13%] h-[17%] mr-[5%]"></img>
            <h1 className='font-semibold text-[2.1em] dark:text-white'>Postly</h1>
        </div>
        <div className='flex items-center w-[60%] ml-[3%] '>
            <FaSearch className="text-[1.2em] absolute ml-[1%] text-[#8F8F8F]" />
                <input
                  type="text"
                  placeholder="Search for people, posts, stories"
                  className="bg-[#F3F5F7] pl-[5%] py-[1%] pr-[2%] w-[90%] rounded-[30px] mr-[1%] text-[1.2em]"
                ></input>
        </div>
        <div className='flex items-center'>
            <div className='absolute top-[3%] right-[3%]'>
              <button className='float-right w-12 h-12 b-12 r-12 mt-[1%] ml-auto mr-[3%]' onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}> 
                {colorMode === "dark" ? <MdLightMode className='animate-pop2 ml-auto mr-auto w-10 h-10 b-10 r-10 text-white bg-black rounded-full'/> : <FaMoon className='animate-pop1 ml-auto mr-auto w-10 h-10 b-10 r-10 text-black bg-primary rounded-full'/>}
              </button>
            </div>
            <div className='ml-[15%]'>
              <div className='w-[50px] h-[50px]'>
                <img src={user} alt="Profile Picture" className='rounded-full object-cover w-full h-full'/>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Header