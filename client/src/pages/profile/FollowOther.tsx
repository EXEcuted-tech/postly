import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import FollowCard from '../../components/card/FollowCard';
import api from '../../hooks/api';
import config from '../../common/config';
import { FollowProps, UserProps } from '../../common/interface';

const Follow = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem('user_id');
  
  const value = localStorage.getItem('following') === 'true' ? true : false;
  const [isFollowing,setIsFollowing]=useState(value);
  const [follows,setData]=useState<FollowProps[]>([]);
  const [accDeets,setAccDeets] = useState<UserProps>();

  useEffect(() => {
    //Ilisan Ni
    api.get(`${config.API}/user/retrieve?col=account_id&val=${id}`)
    .then((res)=>{
      if(res.data.success===true){
        setAccDeets(res.data.user[0]);
      }
    })
  }, []);

  useEffect(()=>{
    var col = isFollowing ? 'follower_id' : 'account_id'
    //console.log("Column: ",col," USER ID: ",payloadObj?.userID)
    api.get(`${config.API}/follow/retrieve?col=${col}&val=${id}`)
    .then((res)=>{
      if(res.data.success === true){
        setData(res.data.records);
      }
    })
  },[id,isFollowing])



  return (
    <div className='animate-fade-in w-[80%]'>
      <div className='bg-white ml-[2%] h-full dark:bg-black'>
      <div className="flex items-center ml-[1.5%] py-[0.5%]">
            <FaArrowLeft className="text-[3em] hover:cursor-pointer dark:text-white"
             onClick={()=>{
              localStorage.removeItem('user_id')
              navigate(-1)
             }} />
            <div className="ml-[1%]">
              <h1 className="font-medium text-[1.3em] dark:text-white">
                {accDeets?.name}
              </h1>
              <p className="text-[1em] text-[#A5A5A5]">@{accDeets?.account_handle}</p>
            </div>
          </div>
        <div>
            <ul className='flex justify-center w-full mt-[1%] text-[1.1em] font-medium'>
                <li className={`w-[50%] text-center hover:cursor-pointer ${isFollowing ? 'text-black border-b-[5px] pb-[0.6%] border-primary dark:text-white' : 'text-[#9D9D9D] border-b-[1.5px] border-[#dbdbdb]'}`}
                    onClick={()=>setIsFollowing(true)}>
                    <p className='hover:cursor-pointer'>Following</p>
                </li>
                <li className={`w-[50%] text-center text-[#9D9D9D] hover:cursor-pointer ${isFollowing ? 'text-[#9D9D9D] border-b-[1.5px] border-[#dbdbdb]' : 'text-black border-b-[5px] pb-[0.6%] border-primary dark:text-white'}`}
                    onClick={()=>setIsFollowing(false)}>
                    <p className='hover:cursor-pointer'>Followers</p>
                </li>
            </ul>
        </div>
        {isFollowing
          ?
          <div>
            {follows.map((follow)=>(
              <FollowCard {...follow}  type="following" isFollowing={isFollowing}/>
            ))}

          </div>
          :
          <div>
            {follows.map((follow)=>(
              <FollowCard {...follow}  type="followers" isFollowing={isFollowing}/>
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default Follow