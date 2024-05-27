import React, { useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import user from '../../assets/user-icon.jpg'
import { AddPostProps } from '../../common/interface';
import BounceLoader from 'react-spinners/BounceLoader';

const AddPost:React.FC<AddPostProps>= ({ setAddPost }) => {
  const [loading,setLoading] = useState(false);
  const [content,setContent] = useState('');

  return (
    <div className='animate-fade-in w-full h-full top-0 left-0 absolute backdrop-brightness-50 z-[1000]'>
      <div className='bg-white w-[80%] mt-[15%] mx-[15%] h-[34vh] rounded-[20px] shadow-2xl dark:bg-black'>
        <div className='text-white'>
          <div className='flex justify-end pt-[1%] mb-[1%]'>
            <IoCloseOutline className='cursor-pointer text-[#C2C2C2] text-[3em] mr-[3%] dark:text-white'/>
          </div>
          <div className='flex ml-[3%]'>
            <div className='w-[50px] h-[50px]'>
              <img src={user} alt="Profile Picture" className='rounded-full object-cover w-full h-full'/>
            </div>
              <form className='inline text-black w-[89%]'>
                <div className='ml-[3%] w-full'>
                <textarea
            maxLength={1000}
            placeholder="What's on your mind today?"
            className="font-light outline-none bg-[#F3F5F7] pl-[2%] py-[1%] pr-[2%] w-full rounded-[30px] text-[1.2em] resize-none max-h-[50vh]"
            value={content}
            onChange={(e)=>{setContent(e.target.value)}}></textarea>
                </div>
                <div>
                  <hr></hr>
                </div>
                <div className='flex justify-end mt-[1%]'>
                <button className='flex bg-primary px-[2%] py-[0.3%] rounded-[39px] text-secondary font-bold text-[1.3em] hover:bg-black hover:text-primary hover:animate-zoom-out'
                  onClick={()=>{}}>
                  <BounceLoader className='' color="#FFFFFF" loading={loading} />
                    Post
                  </button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPost