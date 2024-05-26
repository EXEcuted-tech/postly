import React, { useEffect, useState } from 'react'
import PostCard from '../../components/card/PostCard'
import user from '../../assets/user-icon.jpg'
import Spinner from '../../components/loader/Spinner';
import BounceLoader from "react-spinners/ClipLoader";
import config from '../../common/config';
import api from '../../hooks/api';

const Home = () => {
  const access = localStorage.getItem('accessToken');
  const payload = localStorage.getItem('payload');
  const payloadObj = payload && JSON.parse(payload);
  const dp_id = payloadObj?.dp;

  const [dpURL,setDpURL] = useState<string | null>(null);
  const [loading,setLoading] = useState(false);
  const [postLoading,setPostLoading] = useState(false);
  const [content,setContent] = useState('');

  useEffect(() => {
    console.log("HOME: ",access);
    console.log("Home Payload: ",payload);
    if(payloadObj){
      getProfilePicture();
    }
  }, [dp_id]);

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

  const submitPost = () =>{
    setLoading(true);
    try{
      api.post(`${config.API}/post/create`,{
        account_id: payloadObj?.userID,
        content: content
      }).then((res)=>{
        console.log("RESPONSE POST: ",res);
        if(res.data.success === true){
          setTimeout(()=>{
            setLoading(false);
          },500)
          window.location.reload();
        }
      })
    }catch{

    }
  }

  return (
    <div className='pt-[3%] animate-fade-in w-[80%]'>
      <div className='ml-[2%] bg-white rounded-[20px] w-[95%] px-[2%] pt-[2%] pb-[1%]'>
        <div className='flex'>
          <div className='w-[50px] h-[50px]'>
            <img src={dpURL!=null ? dpURL : user} alt="Profile Picture" className='rounded-full object-cover w-full h-full'/>
          </div>
          <textarea
            maxLength={1000}
            placeholder="What's on your mind today?"
            className="font-light outline-none bg-[#F3F5F7] pl-[2%] py-[1%] pr-[2%] w-full rounded-[30px] ml-[1%] text-[1.2em] resize-none max-h-[50vh]"
          value={content}
          onChange={(e)=>{setContent(e.target.value)}}></textarea>
        </div>
        <hr className='border-1 my-[1%]'/>
        <div className='flex justify-end'>
          <button className='flex bg-primary px-[2%] py-[0.3%] rounded-[39px] text-secondary font-bold text-[1.3em] hover:bg-black hover:text-primary hover:animate-zoom-out'
          onClick={submitPost}>
          <BounceLoader className='' color="#FFFFFF" loading={loading} />
            Post
          </button>
        </div>
      </div>
      <div className='my-[2%] ml-[2%] w-[95%]'>
        {postLoading
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