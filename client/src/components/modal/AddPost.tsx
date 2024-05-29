import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import user from '../../assets/user-icon.jpg'
import { AddPostProps } from '../../common/interface';
import BounceLoader from "react-spinners/ClipLoader";
import api from '../../hooks/api';
import config from '../../common/config';
import UserNotification from '../alerts/Notification';
import { AiFillExclamationCircle } from 'react-icons/ai';

const AddPost:React.FC<AddPostProps>= ({ setAddPost }) => {
  const payload = localStorage.getItem("payload");
  const payloadObj = payload && JSON.parse(payload);
  const dp_id = payloadObj?.dp;

  const [loading,setLoading] = useState(false);
  const [content,setContent] = useState('');
  const [dpURL, setDpURL] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (payloadObj) {
      getProfilePicture();
    }
  }, [dp_id]);

  const getProfilePicture = () => {
    api.get(`${config.API}/file/retrieve?col=file_id&val=${payloadObj?.dp}`)
      .then(async (res) => {
        if (res.data.success === true && res.data.filedata) {
          const response = await api.get(
            `${config.API}/file/fetch?pathfile=${encodeURIComponent(
              res.data.filedata.path
            )}`,
            {
              responseType: "arraybuffer",
            }
          );
          const url = URL.createObjectURL(new Blob([response.data]));
          setDpURL(url);
        }
      })
      .catch((err) => {
        console.log("File Err? ", err);
      });
  };

  const submitPost = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);
    try {
      api
        .post(`${config.API}/post/create`, {
          account_id: payloadObj?.userID,
          content: content,
        })
        .then((res) => {
          //console.log("RESPONSE POST: ", res);
          if (res.data.success === true) {
            setContent("");
            setTimeout(() => {
              setLoading(false);
            }, 500);
            setAddPost(false)
          }else{
            setTimeout(() => {
              setLoading(false);
            }, 800);
            setError(res.data.error);
            errorTimer();
          }
        });
    } catch {}
  };

  const errorTimer = () => {
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  return (
    <div className='animate-fade-in w-full h-full top-0 left-0 fixed backdrop-brightness-50 z-[1000]'>
      {error !== "" && (
        <UserNotification
          icon={<AiFillExclamationCircle />}
          logocolor="#ff0000"
          title="Error!"
          message={error}
          animate="animate-shake"
        />
      )}
      <div className='bg-white w-[80%] mt-[15%] mx-[15%] h-[28vh] rounded-[20px] shadow-2xl dark:bg-black'>
        <div className='text-white'>
          <div className='flex justify-end pt-[1%] mb-[1%]'>
            <IoCloseOutline className='cursor-pointer text-[#C2C2C2] hover:text-[#545454] text-[3em] mr-[3%] dark:text-white'
            onClick={()=>setAddPost(false)}/>
          </div>
          <div className='flex ml-[3%]'>
            <div className='w-[50px] h-[50px]'>
              <img src={dpURL!==null? dpURL: user} alt="Profile Picture" className='rounded-full object-cover w-full h-full'/>
            </div>
              <form className='inline text-black w-[89%]'>
                <div className='ml-[3%] w-full'>
                <textarea
                  maxLength={1000}
                  name='addpost-textarea'
                  placeholder="What's on your mind today?"
                  className="font-light outline-none bg-[#F3F5F7] pl-[2%] py-[1%] pr-[2%] w-full rounded-[30px] text-[1.2em] resize-none max-h-[50vh]"
                  value={content}
                  onChange={(e)=>{setContent(e.target.value)}}></textarea>
                </div>
                <hr className="w-[100%] border-1 my-[1%] ml-[3%]" />
                {/* <div>
                  <hr className='ml-[5%]'></hr>
                </div> */}
                <div className='flex justify-end mr-[-3%] mt-[1%]'>
                <button className='flex bg-primary px-[2%] py-[0.3%] rounded-[39px] text-secondary font-bold text-[1.3em] hover:bg-black hover:text-primary hover:animate-zoom-out dark:hover:bg-gray-800'
                  onClick={(e)=>submitPost(e)}>
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