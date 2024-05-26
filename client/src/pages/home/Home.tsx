import React, { useEffect, useState } from 'react'
import PostCard from '../../components/card/PostCard'
import myuser from '../../assets/sana.jpg'
import Spinner from '../../components/loader/Spinner';
import { decodeBase64Url } from '../../helpers/functions';
import config from '../../common/config';
import api from '../../hooks/api';

const Home = () => {
  const payload = localStorage.getItem('payload');
  const payloadObj = payload && JSON.parse(payload);

  const [dpURL,setDpURL] = useState<string | null>(null);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    getProfilePicture()
  },[])

  const getProfilePicture = () =>{
    api.get(`${config.API}/file/retrieve?col=file_id&val=${payloadObj?.dp}`)
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
  return (
    <div className='pt-[3%] animate-fade-in w-[80%]'>
      <div className='ml-[2%] bg-white rounded-[20px] w-[95%] px-[2%] pt-[2%] pb-[1%]'>
        <div className='flex'>
          <div className='w-[50px] h-[50px]'>
            <img src={dpURL!=null ? dpURL : myuser} alt="Profile Picture" className='rounded-full object-cover w-full h-full'/>
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