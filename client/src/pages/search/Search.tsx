import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { UserProps } from '../../common/interface';
import config from '../../common/config';
import api from '../../hooks/api';
import FollowCard from '../../components/card/FollowCard';

const Search = () => {
  const navigate = useNavigate();
  const [isPost,setIsPost]=useState(true);
  const [list,setList]=useState<UserProps[]>([]);

  return (
    <div className='animate-fade-in w-[80%]'>
      <div className='bg-white ml-[2%] h-full'>
        <div className='flex items-center w-full px-[2%] py-[1%]'>
            <FaArrowLeft className='text-[2.2em] hover:cursor-pointer'
            onClick={()=>(navigate('/home'))}
            />
            <div className='ml-[1%]'>
                <h1 className='text-[1.3em] font-medium'>Search Results</h1>
            </div>
        </div>
        <div>
            <ul className='flex justify-center w-full mt-[1%] text-[1.1em] font-medium'>
                <li className={`w-[50%] text-center hover:cursor-pointer ${isPost ? 'text-black border-b-[5px] pb-[0.6%] border-primary' : 'text-[#9D9D9D]'}`}
                    onClick={()=>setIsPost(true)}>
                    <p className='hover:cursor-pointer'>Posts</p>
                </li>
                <li className={`w-[50%] text-center text-[#9D9D9D] hover:cursor-pointer ${isPost ? 'text-[#9D9D9D]' : 'text-black border-b-[5px] pb-[0.6%] border-primary'}`}
                    onClick={()=>setIsPost(false)}>
                    <p className='hover:cursor-pointer'>People</p>
                </li>
            </ul>
        </div>
        {isPost
          ?
          <div>
            Insert Post Content
          </div>
          :
          <div>
            hehehe
            {list.map((follow)=>(
              <FollowCard follow_id={0} account_id={0} follower_id={0} created_at={''} updated_at={''} deleted_at={''} isFollowing={false} {...list} type="following" />
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default Search