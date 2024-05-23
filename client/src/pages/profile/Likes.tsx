import React, { useState } from 'react'
import PostCard from '../../components/card/PostCard'
import Spinner from '../../components/loader/Spinner'

const Likes = () => {
  const [loading,setLoading]= useState(false);

  return (
    <div className='animate-fade-in'>
        {loading 
            ?
            <div className='flex justify-center mt-[2%]'>
                <Spinner/>
            </div>
            :
            <div>
                <div className='my-[2%]'>
                    <PostCard/>
                </div>
                <div className='my-[2%]'>
                    <PostCard/>
                </div>
            </div>
        }
    </div>
  )
}

export default Likes