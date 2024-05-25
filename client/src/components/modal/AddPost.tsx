import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import user1 from '../../assets/user-icon.jpg'

const AddPost = () => {
  return (
    <div className='w-full h-full bg-gray-900'>
      <div className='absolute w-[83%] h-[55%] top-[22%] left-[9%] rounded-[50px] shadow-2xl dark:bg-black'>
        <div className='text-white'>
          <div className='flex justify-end mt-[3%] mb-[2%]'>
            <IoCloseOutline className='cursor-pointer text-black text-[3em] mr-[3%] dark:text-white'/>
          </div>
          <div className='flex ml-[5%]'>
            <img src={user1} className='w-[7%] h-[7%] rounded-full'/>
            <form className='inline text-black w-[89%]'>
              <div className='ml-[3%] w-full'>
                <textarea className='w-[97%] h-[5em] mb-[3%] text-4xl pl-[2%] rounded-3xl pt-[2%] bg-[#F3F5F7] text-[#AAAAAA] resize-none' placeholder='What&apos;s on your mind today?'></textarea>
              </div>
              <div><hr></hr></div>
              <div className='text-end mt-[2%]'>
                <button type='submit' className=' bg-primary text-3xl w-[11%] py-[1%] mt-[1%] font-bold rounded-full'>Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPost