import React, { useState } from 'react'
import { FaThumbsUp } from "react-icons/fa";
import { FaArrowUpLong } from "react-icons/fa6";
import DashCardLoader from '../../components/loader/DashCardLoader';
import GraphLoader from '../../components/loader/GraphLoader';

const Dashboard = () => {
  const [loading,setLoading] = useState(false);
  
  return (
    <>
    {loading ?
    <>
    <div className='flex my-[2%]'>
        <DashCardLoader/>
        <DashCardLoader/>
        <DashCardLoader/>
    </div>
        <GraphLoader/>
        <GraphLoader/>
    </>
    :
    <div className='animate-fade-in font-poppins'>
    <div className='flex h-[24vh] my-[2%]'>
        <div className='rounded-[20px] bg-white w-[33%] drop-shadow-md px-[2%] py-[1.5%]'>
            <h1 className='font-medium text-[1.7em]'>Total Likes</h1>
            <div className='flex items-center my-[2%] justify-center'>
                <div className='mr-[4%]'>
                    <FaThumbsUp className='text-[4em] text-primary'/>
                </div>
                <div>
                    <h1 className='font-bold text-[4em]'>1,255</h1>
                </div>
            </div>
            <p className='text-[#00A05D] text-center'>+10 in 30 days</p>
        </div>
        <div className='rounded-[20px] bg-white w-[33%] drop-shadow-md mx-[2%] px-[2%] py-[1.5%]'>
            <h1 className='font-medium text-[1.7em]'>Gained Followers</h1>
            <div className='flex items-center my-[2%] justify-center'>
                <div className='mr-[1%]'>
                    <FaArrowUpLong className='text-[4em] text-[#00B147] text-primary'/>
                </div>
                <div>
                    <h1 className='font-bold text-[4em]'>50</h1>
                </div>
            </div>
            <p className='text-[#7E7E7E] text-center'>vs previous 30 days</p>
        </div>
        <div className='rounded-[20px] bg-white w-[33%] drop-shadow-md px-[2%] py-[1.5%]'>
            <h1 className='font-medium text-[1.7em]'>Total Likes</h1>
            <div className='flex items-center my-[2%] justify-center'>
            <div className='mr-[1%]'>
                    <FaArrowUpLong className='text-[4em] text-[#00B147] text-primary'/>
                </div>
                <div>
                    <h1 className='font-bold text-[4em]'>500</h1>
                </div>
            </div>
            <p className='text-[#7E7E7E] text-center'>vs previous 30 days</p>
        </div>
    </div>
    <div className='rounded-[20px] bg-white w-full drop-shadow-md min-h-[60vh] p-[2.5%]'>
        <div>
            <h1 className='font-medium text-[1.7em]'>Likes Over Time</h1>
        </div>
        <div>

        </div>
    </div>
    <div className='my-[2%] rounded-[20px] bg-white w-full drop-shadow-md min-h-[60vh] p-[2.5%]'>
        <div>
            <h1 className='font-medium text-[1.7em]'>Follower Growth Over Time</h1>
        </div>
        <div>

        </div>
    </div>
    </div>
    }
    </>
  )
}

export default Dashboard