import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import cover from '../../assets/cover.jpg'
import user from '../../assets/sana.jpg'

import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";

const Profile = () => {
  return (
    <div className='animate-fade-in w-[80%]'>

      <div className='mx-[2%] h-full'>
        <div className='bg-white h-[62vh] rounded-b-[30px] drop-shadow-md'>

          <div className='flex items-center ml-[1.5%] py-[0.5%]'>
            <FaArrowLeft className='text-[3em] hover:cursor-pointer'/>
            <div className='ml-[1%]'>
              <h1 className='font-medium text-[1.3em]'>kitteu?</h1>
              <p className='text-[1em] text-[#A5A5A5]'>@TYK_Ea</p>
            </div>
          </div>
          <div className='bg-primary h-[25vh] w-full'>
            {/* Maka-preview sila sa pictures */}
            <img src={cover} alt="Cover Photo" className='object-cover w-full h-full hover:brightness-75 hover:cursor-pointer'/>
          </div>

          <div className='flex'>
            <div>
              <div className='absolute top-[38%] ml-[3%] w-[150px] h-[150px] outline outline-[5px] rounded-full text-white'>
                {/* Maka-preview sila sa pictures */}
                <img src={user} alt="Profile Picture" className='rounded-full object-cover w-full h-full hover:brightness-75 hover:cursor-pointer'/>
              </div>
            </div>
            <div className='flex-grow flex justify-end'>
              <button className='font-medium text-[1.2em] outline outline-[1px] rounded-[20px] px-[1%] py-[0.1%] bg-white mr-[2%] mt-[1%]
                                hover:bg-black hover:text-primary'>Edit Profile</button>
            </div>
          </div>
          
          <div className='mt-[2%] ml-[3%]'>
              <h1 className='font-medium text-[1.3em]'>kitteu?</h1>
              <p className='text-[1em] text-[#A5A5A5]'>@TYK_Ea</p>
              <p className='text-[1em] text-[#414040] mt-[0.5%]'>I'm so cute bahala na si Tyrone</p>
              <div className='flex items-center my-[0.5%] text-[#5E5C5C]'>
                <div className='flex items-center mr-[1.5%]'>
                  <IoLocationOutline className='text-[1.2em]'/>
                  <p>‎ f</p>
                </div>
                <div className='flex items-center'>
                  <IoCalendarOutline className='text-[1.2em]'/>
                  <p>‎ Joined May 2011</p>
                </div>
              </div>
              <div className='flex text-[#5E5C5C]'>
                <div className='flex items-center mr-[1.5%]'>
                  <p><span className='font-semibold text-black'>529</span>‎ Following</p>
                </div>
                <div className='flex items-center'>
                  <p><span className='font-semibold text-black'>529</span>‎ Followers</p>
                </div>
              </div>
          </div>

          {/* Tabs */}
          <div className=''>
            <ul className='flex justify-center w-full mt-[1.5%] text-[1.1em] font-semibold'>
              <li className='w-[33.3%]'>
                <p className='hover:cursor-pointer'>Posts</p>
              </li>
              <li className='w-[33.3%]'>
                Likes
              </li>
              <li>
                Dashboard
              </li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Profile