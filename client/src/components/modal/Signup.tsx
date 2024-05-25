import React from 'react'
import Logo from '../../assets/applogo.png'
import { IoCloseOutline } from "react-icons/io5";

const Signup = ({setRegister} : { setRegister: (value: boolean) => void }) => {
  return (
    <div className='animate-fade-in w-full h-full top-0 left-0 absolute backdrop-brightness-50 z-[1000]'>
    <div className='bg-white w-[32%] h-[60%] ml-[35%] mt-[8%] rounded-[50px] shadow-2xl dark:bg-black '>
      <div className='text-white'>
        <div className='flex justify-center pt-[5%]'>
          <img src={Logo} className='w-[13%] ml-[40%]' />
          <IoCloseOutline className='cursor-pointer text-[#C2C2C2] text-[3em] content-end ml-[32%] hover:text-[#a1a1a1] dark:text-white'
          onClick={()=>(setRegister(false))}/>
        </div>
        <div className='ml-[12%]'>
          <h1 className='text-[3em] font-medium text-black dark:text-white'>Create an Account</h1>
          <p className='text-[1.25em] text-[#8F8F8F] mb-[3%] dark:text-primary'>You must create an account to use Postly.</p>
          <form className='inline text-black'>
            <div>
              <input type='text' className='w-[85%] h-[2em] mb-[3%] text-[1.5em] pl-[2%] rounded-xl border-primary border-2 font-semibold dark:text-white dark:bg-black' placeholder='Username'></input>
            </div>
            <div>
              <input type='text' className='w-[85%] h-[2em] mb-[3%] text-[1.5em] pl-[2%] rounded-xl border-primary border-2 font-semibold dark:text-white dark:bg-black' placeholder='Email'></input>
            </div>
            <div>
              <input type='text' className='w-[85%] h-[2em] mb-[3%] text-[1.5em] pl-[2%] rounded-xl border-primary border-2 font-semibold dark:text-white dark:bg-black' placeholder='Password'></input>
            </div>
            <div>
              <input type='text' className='w-[85%] h-[2em] mb-[3%] text-[1.5em] pl-[2%] rounded-xl border-primary border-2 font-semibold dark:text-white dark:bg-black' placeholder='Re-type Password'></input>
            </div>
            <div className='text-center ml-[-9%]'>
              <button type='submit' className=' bg-primary text-[1.5em] w-[30%] py-[1.5%] mt-[1%] font-bold rounded-lg hover:bg-[#f0b500]'>Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Signup