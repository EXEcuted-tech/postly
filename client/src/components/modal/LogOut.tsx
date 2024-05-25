import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import Logo from '../../assets/applogo.png'

const LogOut = () => {
  return (
    <div className='w-full h-full bg-gray-900'>
      <div className='absolute w-[50%] h-[55%] top-[22%] left-[25%] rounded-[50px] shadow-2xl dark:bg-black'>
        <div className='text-white'>
          <div className='flex justify-end mt-[3%] mb-[2%]'>
            <img src={Logo} className='w-[20%] mr-[33%]'></img>
            <IoCloseOutline className='cursor-pointer text-black text-[3em] mr-[3%] dark:text-white'/>

          </div>
          <div className='flex ml-[5%]'>
            <form className='inline text-black w-[89%]'>
              <div className='ml-[3%] mb-[2%] w-full text-center'>
                <p className='font-semibold text-5xl dark:text-white'>Logout of [Username]?</p>
              </div>
              <div className='ml-[3%] w-full text-center'>
                <p className='font-normal text-4xl dark:text-white'>You will be logged out of your current</p>
              </div>
              <div className='ml-[3%] mb-[2%] w-full text-center'>
                <p className='font-normal text-4xl dark:text-white'>account.</p>
              </div>
              <div className='flex justify-center mt-[2%]'>
                <button type='submit' className=' bg-black text-white text-3xl w-[20%] py-[2%] mt-[1%] mr-[10%] font-bold rounded-md dark:text-black dark:bg-white'>Cancel</button>
                <button type='submit' className=' bg-primary text-black text-3xl w-[20%] py-[2%] mt-[1%] font-bold rounded-md'>Log Out</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogOut