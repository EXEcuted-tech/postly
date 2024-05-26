import React, { useEffect, useState } from 'react'
import user from '../../assets/user-icon.jpg'
import { FaRegHeart } from "react-icons/fa";
import { PostProps, UserProps } from '../../common/interface';
import config from '../../common/config';
import api from '../../hooks/api';
import { useNavigate } from 'react-router-dom';

const PostCard = (props:PostProps) => {
  const navigate = useNavigate();
  //Likes kay to be added pa sa PostProps 
  const {post_id,account_id,content,created_at,updated_at} = props;
  const payload = localStorage.getItem('payload');
  const payloadObj = payload && JSON.parse(payload);

  const [dpURL,setDpURL]=useState<string | null>(null);
  const [duration,setDuration]=useState('');
  const [accDeets,setAccDeets] = useState<UserProps>();

  useEffect(()=>{
    retrieveAcc();
    calculateTime();
  },[])

  const retrieveAcc = () =>{
    api.get(`${config.API}/user/retrieve?col=account_id&val=${account_id}`)
    .then((res)=>{
      if(res.data.success===true){
        setAccDeets(res.data.user[0]);
        getProfilePicture(res.data.user[0].dp_id)
      }
    })
  }

  const calculateTime = () => {
    const postDate = new Date(created_at);
    const now = new Date();
    const diff = now.getTime() - postDate.getTime(); 

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));

    if (diff < 1000 * 60) {
      setDuration('Just Now');
    } else if (minutes === 1) {
      setDuration('1 minute ago');
    } else if (minutes < 60) {
      setDuration(`${minutes} minutes ago`);
    } else if (hours === 1) {
      setDuration('1 hour ago');
    } else if (hours < 24) {
      setDuration(`${hours} hours ago`);
    } else if (days === 1) {
      setDuration('1 day ago');
    } else if (days < 7) {
      setDuration(`${days} days ago`);
    } else if (weeks === 1) {
      setDuration('a week ago');
    } else {
      const month = postDate.getMonth() + 1;
      const day = postDate.getDate();
      const year = postDate.getFullYear();
      setDuration(`${month}/${day}/${year}`);
    }
  }

  const getProfilePicture = (accID:number) =>{
    api.get(`${config.API}/file/retrieve?col=file_id&val=${accID}`)
    .then(async (res)=>{
      if(res.data.success == true && res.data.filedata){
        const response = await api.get(`${config.API}/file/fetch?pathfile=${encodeURIComponent(res.data.filedata.path)}`, {
          responseType: 'arraybuffer',
        });
  
        const url = URL.createObjectURL(new Blob([response.data]));
        setDpURL(url);
      }
    }).catch((err)=>{
      console.log("File Err? ", err);
    })
}

    const viewProfile = () =>{
        localStorage.setItem('view_id',JSON.stringify(account_id));
        if(account_id!==payloadObj?.userID){
            setTimeout(()=>{
                navigate('/profile/user')
            },50)
        }else{
            setTimeout(()=>{
                navigate('/profile')
            },50)
        }
    }

  return (
    <div className='bg-white rounded-[20px] px-[2%] py-[2%] mb-[2%]'>
        <div className='flex items-center'>
            <div className='w-[50px] h-[50px]'>
                <img src={dpURL!==null ? dpURL :user} alt="Profile Picture" className='rounded-full object-cover w-full h-full'/>
            </div>
            <div className='w-[89%] ml-[1%]'>
                <h1 className='font-semibold text-[1.3em] hover:cursor-pointer'
                onClick={viewProfile}>{accDeets?.name}</h1>
                <p className='text-[1em] text-[#9D9D9D]'>{duration}</p>
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
            {content}
        </div>
    </div>
  )
}

export default PostCard