import React from 'react'
import Logo from '../../assets/applogo.png'
import { IoCloseOutline } from "react-icons/io5";

const Login = () => {
  return (
    <div className='w-full h-full'>
      <div className='absolute w-[45%] h-[80%] top-[10%] left-[28%] rounded-[50px] shadow-2xl'>
        <div className='text-white'>
          <div className='flex justify-center mt-[3%]'>
            <img src={Logo} className='w-[13%] ml-[40%]' />
            <IoCloseOutline className='cursor-pointer text-black text-[3em] content-end ml-[32%]'/>
            

          </div>
          <div className='ml-[9%]'>
            <h1 className='text-6xl font-medium text-black'>Create an Account</h1>
            <p className='text-xl mt-[2%] text-[#8F8F8F] mb-[3%]'>You must create an account to use Postly.</p>
            <form className='inline text-black'>
              <div>
                <input type='text' className='w-[85%] h-[2em] mb-[3%] text-4xl pl-[2%] rounded-xl border-primary border-2' placeholder='Username'></input>
              </div>
              <div>
                <input type='text' className='w-[85%] h-[2em] mb-[3%] text-4xl pl-[2%] rounded-xl border-primary border-2' placeholder='Email'></input>
              </div>
              <div>
                <input type='text' className='w-[85%] h-[2em] mb-[3%] text-4xl pl-[2%] rounded-xl border-primary border-2' placeholder='Password'></input>
              </div>
              <div>
                <input type='text' className='w-[85%] h-[2em] mb-[3%] text-4xl pl-[2%] rounded-xl border-primary border-2' placeholder='Retype Password'></input>
              </div>
              <div className='text-center ml-[-9%]'>
                <button type='submit' className=' bg-primary text-3xl w-[20%] py-[1.5%] mt-[1%] font-bold rounded-lg'>Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Login