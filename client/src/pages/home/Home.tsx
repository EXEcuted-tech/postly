import React, { useState } from 'react'
import PostCard from '../../components/card/PostCard'
import myuser from '../../assets/sana.jpg'
import Spinner from '../../components/loader/Spinner';

const Home = () => {
  const [loading,setLoading] = useState(false);
  
  return (
    <div className='pt-[3%] animate-fade-in w-[80%]'>
      <div className='ml-[2%] bg-white rounded-[20px] w-[95%] px-[2%] pt-[2%] pb-[1%]'>
        <div className='flex'>
          <div className='w-[50px] h-[50px]'>
            <img src={myuser} alt="Profile Picture" className='rounded-full object-cover w-full h-full'/>
          </div>
          <textarea
            maxLength={1000}
            placeholder="What's on your mind today?"
            className="font-light outline-none bg-[#F3F5F7] pl-[2%] py-[1%] pr-[2%] w-full rounded-[30px] ml-[1%] text-[1.2em] resize-none max-h-[50vh]"
          ></textarea>
        </div>
        <hr className='border-1 my-[1%]'/>
        <div className='flex justify-end'>
          <button className='bg-primary px-[2%] py-[0.3%] rounded-[39px] text-secondary font-bold text-[1.3em] hover:bg-black hover:text-primary hover:animate-zoom-out'>Post</button>
        </div>
      </div>
      <div className='my-[2%] ml-[2%] w-[95%]'>
        {loading
        ?
          <div className='flex justify-center'>
            <Spinner/>
          </div>
        :
        <PostCard/>
        }
      </div>
    </div>
  )
}

export default Home