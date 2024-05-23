import React from 'react'
import user from '../../assets/user-icon.jpg'
import { FaRegHeart } from "react-icons/fa";

const PostCard = () => {
  return (
    <div className='bg-white rounded-[20px] px-[2%] py-[2%]'>
        <div className='flex items-center'>
            <div className='w-[50px] h-[50px]'>
                <img src={user} alt="Profile Picture" className='rounded-full object-cover w-full h-full'/>
            </div>
            <div className='w-[89%] ml-[1%]'>
                <h1 className='font-semibold text-[1.3em]'>Joshua Hong</h1>
                <p className='text-[1em] text-[#9D9D9D]'>4 hours ago</p>
            </div>
            <div className='flex items-center'>
                <div className=' mr-[15%]'>
                    <FaRegHeart className='text-[2em]'/>
                </div>
                <div className=''>
                    <p className='text-[1.1em]'>1.2k</p>
                </div>
            </div>
        </div>
        {/* Content */}
        <div className='ml-[0.5%] mr-[1%] mt-[1%] text-justify'>
            The window is open, so's that door I didn't know they did that anymore Who knew we owned eight thousand salad plates? For years I've roamed these empty halls Why have a ballroom with no balls?Finally they're opening up the gates There'll be actual real live people It'll be totally strange But wow, am I so ready for this change? 'Cause for the first time in forever There'll be music, there'll be light For the first time in forever I'll be dancing through the night Don't know if I'm elated or gassy But I'm somewhere in that zone 'Cause for the first time in forever I won't be alone
        </div>
    </div>
  )
}

export default PostCard