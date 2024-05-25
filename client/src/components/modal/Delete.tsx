import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { FaTriangleExclamation } from "react-icons/fa6";


const Delete = () => {
  return (
    <div className='w-full h-full bg-gray-900'>
      <div className='absolute w-[50%] h-[55%] top-[22%] left-[25%] rounded-[50px] shadow-2xl dark:bg-black'>
        <div className='text-white'>
          <div className='flex justify-end mt-[3%] mb-[2%]'>
          <FaTriangleExclamation className='cursor-pointer text-[#CB0000] text-[9em] mr-[35%] mt-[3%]'/>
            <IoCloseOutline className='cursor-pointer text-black text-[3em] mr-[3%] dark:text-white'/>
            
          </div>
          <div className='flex ml-[5%]'>
            <form className='inline text-black w-[89%]'>
              <div className='ml-[3%] mb-[2%] w-full text-center'>
                <p className='font-semibold text-5xl dark:text-white'>Are You Sure?</p>
              </div>
              <div className='ml-[3%] w-full text-center'>
                <p className='font-normal text-4xl dark:text-white'>Do you want to delete this task? This</p>
              </div>
              <div className='ml-[3%] mb-[2%] w-full text-center'>
                <p className='font-normal text-4xl dark:text-white'>process cannot be undone.</p>
              </div>
              <div className='flex justify-center mt-[2%]'>
                <button type='submit' className=' bg-[#6C6C6C] text-white text-3xl w-[20%] py-[2%] mt-[1%] mr-[10%] font-bold rounded-md dark:bg-white dark:text-black'>Cancel</button>
                <button type='submit' className=' bg-[#D40000] text-white text-3xl w-[20%] py-[2%] mt-[1%] font-bold rounded-md'>Delete</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Delete