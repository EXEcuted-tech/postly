import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { UserProps } from '../../common/interface';
import config from '../../common/config';
import api from '../../hooks/api';
import FollowCard from '../../components/card/FollowCard';

const Search = () => {
  const navigate = useNavigate();

  const value = localStorage.getItem('searchtab') === 'people' ? false : true;
  const [isPost,setIsPost]=useState(value);
  const [list,setList]=useState<UserProps[]>([]);
  const search = localStorage.getItem("search_query");
  const [query, setQuery] = useState<string | null>(search);
  
  useEffect(() => {
    handleSearch(query)
  }, [isPost]);
  
  const handleSearch = (query: string | null) => {
    console.log(query);
    api.get(`${config.API}/user/search?col2=name&val2=${query}`)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          if (response.data.tasks.length === 0) {
            setList([]);
            
          } else {
            console.log(response.data.tasks);
            setList(response.data.tasks);
          }
        }
      })
      .catch((error) => {
        
      });
  };
  
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
            {query}
            {list.map((follow)=>(
              <FollowCard follow_id={1} follower_id={1} deleted_at={''} isFollowing={false} {...follow} type="following" />
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default Search