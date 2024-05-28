import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { PostProps, UserProps } from '../../common/interface';
import config from '../../common/config';
import api from '../../hooks/api';
import FollowCard from '../../components/card/FollowCard';
import UserNotification from '../../components/alerts/Notification';
import { AiFillExclamationCircle } from 'react-icons/ai';
import Spinner from '../../components/loader/Spinner';
import mail from '../../assets/mail.png'
import PostLayout from '../../components/card/PostLayout';

const Search = () => {
  const navigate = useNavigate();

  const [isPost,setIsPost]=useState(false);
  const [list,setList]=useState<UserProps[]>([]);
  const [post,setPost]=useState<PostProps[]>([]);
  const search = localStorage.getItem("search_query");
  const [query, setQuery] = useState<string | null>(search);
  const [loading, setLoading] = useState(false);
  const [error,setError]=useState("");

  useEffect(() => {
    handleSearch(query)
    getPosts(query)
  },[]);
  
  const handleSearch = (query: string | null) => {
    setLoading(true);
    api.get(`${config.API}/user/search?col1=account_handle&col2=name&value=${query}`)
      .then(response => {
        console.log("Response",response);
        if (response.data.status === 200) {
          if (response.data.user.length === 0) {
            setList([]);
          } else {
            setList(response.data.user);
          }
          setTimeout(()=>{
            setLoading(false)
          },800)
        }else{
          setTimeout(()=>{setLoading(false)},800);
          setError(response.data.error);
          errorTimer();
        }
      })
      .catch((error) => {
        setError(error.response.data.error);
        setLoading(false);   
        errorTimer(); 
      });
  };

  const getPosts = (query: string | null) => {
    setLoading(true);
    api.get(`${config.API}/post/search?col=content&val=${query}`)
      .then(response => {
        if (response.data.status === 200) {
          if (response.data.post.length === 0) {
            setPost([]);
          } else {
            setPost(response.data.post);
          }
          setTimeout(()=>{
            setLoading(false)
          },800)
        }
      })
      .catch((error) => {
        console.log("ERror: ",error);
        setError(error.response.data.error);
        setLoading(false);   
        errorTimer(); 
      });
  };

  const errorTimer =  ()=>{ 
    setTimeout(() => {
      setError("");
    }, 5000);
  }
  
  return (
    <div className='animate-fade-in w-[80%]'>
    {error !=='' && 
            <UserNotification
              icon={<AiFillExclamationCircle/>}
              logocolor='#ff0000'
              title="Error!"
              message={error}
              animate='animate-shake'
            />
        }
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
                <li className={`w-[50%] text-center hover:cursor-pointer ${isPost ? 'text-black border-b-[5px] pb-[0.6%] border-primary' : 'text-[#9D9D9D] border-b-[1.5px] border-[#dbdbdb]'}`}
                    onClick={()=>setIsPost(true)}>
                    <p className='hover:cursor-pointer'>Posts</p>
                </li>
                <li className={`w-[50%] text-center text-[#9D9D9D] hover:cursor-pointer ${isPost ? 'text-[#9D9D9D] border-b-[1.5px] border-[#dbdbdb]' : 'text-black border-b-[5px] pb-[0.6%] border-primary'}`}
                    onClick={()=>setIsPost(false)}>
                    <p className='hover:cursor-pointer'>People</p>
                </li>
            </ul>
        </div>
        {isPost
          ?
          <div>
            {loading ? 
              <div className='flex justify-center mt-[20%]'>
                 <Spinner/>
              </div>
            :
            <>
            {post.length > 0
              ?
                <>
                  {post.map((post)=>(
                    <PostLayout {...post}/>
                  ))}
                </>
              :
              <div className="flex flex-col items-center justify-center h-[60vh]">
                <img src={mail} alt="Email" className="w-[15%]" />
                <h1 className="mt-4 text-[#2e2e2e] text-[1.2em] font-light">Nothing to see here...</h1>
              </div>
              }
              </>
            }
          </div>
          :
          <div>
            {loading ? 
              <div className='flex justify-center mt-[20%]'>
                 <Spinner/>
              </div>
            :
            <>
            {list.length > 0
              ?
                <>
                  {list.map((follow)=>(
                    <FollowCard follow_id={1} follower_id={1} deleted_at={''} isFollowing={false} {...follow} type="following" />
                  ))}
                </>
              :
              <div className="flex flex-col items-center justify-center h-[60vh]">
                <img src={mail} alt="Email" className="w-[15%]" />
                <h1 className="mt-4 text-[#2e2e2e] text-[1.2em] font-light">Nothing to see here...</h1>
              </div>
              }
              </>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Search