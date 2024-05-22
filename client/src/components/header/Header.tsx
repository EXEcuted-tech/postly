import React from 'react'
import logo from '../../assets/logo-transparent.png'
import user from '../../assets/user-icon.jpg'
import {FaSearch,FaMoon} from "react-icons/fa";


const Header = () => {
  return (
    <div className='font-poppins flex items-center bg-primary h-[10vh] w-full'>
        <div className='flex items-center w-[25%]'>
            <img src={logo} alt="Postly Logo" className="ml-[25%] w-[13%] h-[17%] mr-[5%]"></img>
            <h1 className='font-semibold text-[2.1em]'>Postly</h1>
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
            <FaMoon className='text-[2.8em] ml-[35%] mr-[5%] bg-black text-primary rounded-full px-[2%] py-[2%]'/>
            <img src={user} alt="Profile Picture" className='rounded-full w-[13%]'/>
        </div>
    </div>
  )
}

export default Header