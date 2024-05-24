import React from 'react'
import { IoCloseOutline } from "react-icons/io5";

const PassChange = () => {
  return (
    <div className='w-full h-full bg-gray-900'>
      <div className='absolute w-[45%] h-[55%] top-[22%] left-[28%] rounded-[50px] shadow-2xl'>
        <div className='text-white'>
          <div className='flex justify-end mt-[3%] mb-[2%]'>
            <IoCloseOutline className='cursor-pointer text-black text-[3em] mr-[3%]'/>
          </div>
          <div className='text-center'>
            <h1 className='text-6xl font-medium text-black mb-[5%]'>Password Change</h1>
            <form className='inline text-black'>
              <div>
                <input type='text' className='w-[85%] h-[2em] mb-[3%] text-4xl pl-[2%] rounded-xl border-primary border-2 font-semibold' placeholder='New Password'></input>
              </div>
              <div>
                <input type='text' className='w-[85%] h-[2em] mb-[3%] text-4xl pl-[2%] rounded-xl border-primary border-2 font-semibold' placeholder='Confirm Password'></input>
              </div>
              <div className='text-center'>
                <button type='submit' className=' bg-primary text-3xl w-[20%] py-[1.5%] mt-[1%] font-bold rounded-lg'>Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PassChange