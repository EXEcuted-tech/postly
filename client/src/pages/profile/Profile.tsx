import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { getLinkClass, getMonthName } from "../../helpers/functions";
import { ProfileLinks } from "../../common/links";
import cover from "../../assets/default-cover.png";
import user from "../../assets/sana.jpg";
import defaultuser from '../../assets/user-icon.jpg'

import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import EditProfile from "../../components/modal/EditProfile";
import Posts from "./Posts";
import Likes from "./Likes";
import Dashboard from "./Dashboard";
import config from "../../common/config";
import api from "../../hooks/api";
import { UserProps } from "../../common/interface";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const payload = localStorage.getItem('payload');
  const payloadObj = payload && JSON.parse(payload);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [accDeets,setAccDeets] = useState<UserProps>();
  const [joinDate,setJoinDate] = useState('');
  const [dpURL,setDpURL] = useState('');
  const [coverURL,setCoverURL] = useState('');

  const [numFollower,setNumFollower]=useState(0);
  const [numFollowing,setNumFollowing]=useState(0)

  useEffect(() => {
    //Still utilized the API.get for the expiration of the accessToken
    api.get(`${config.API}/user/retrieve?col=account_id&val=${payloadObj?.userID}`)
    .then((res)=>{
      if(res.data.success===true){
        setAccDeets(res.data.user[0]);
      }
    })
  }, []);

  useEffect(()=>{
    if(accDeets){
      getProfilePicture();
      getCoverPicture();
      getFollowers();
      getFollowing();
      const dateObject = accDeets && new Date(accDeets.created_at);
      if(dateObject){
        const monthName = getMonthName(dateObject.getMonth());
        const year = dateObject.getFullYear();
        const formattedDate = `${monthName} ${year}`;
        setJoinDate(formattedDate);
      }
    }
  },[accDeets])

  const getProfilePicture = () =>{
      api.get(`${config.API}/file/retrieve?col=file_id&val=${accDeets?.dp_id}`)
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

  const getCoverPicture = () =>{
    api.get(`${config.API}/file/retrieve?col=file_id&val=${accDeets?.cover_id}`)
    .then(async (res)=>{
      if(res.data.success == true && res.data.filedata){
        const response = await api.get(`${config.API}/file/fetch?pathfile=${encodeURIComponent(res.data.filedata.path)}`, {
          responseType: 'arraybuffer',
        });
  
        const url = URL.createObjectURL(new Blob([response.data]));
        //console.log("URL: ", url);
        setCoverURL(url);
      }
    }).catch((err)=>{
      console.log("File Err? ", err);
    })
  }

  const getFollowers = () =>{
    api.get(`${config.API}/follow/retrieve/count?col=account_id&val=${payloadObj?.userID}`)
    .then((res)=>{
      if(res.data.success === true){
        setNumFollower(res.data.count);
      }
    })
  }

  const getFollowing = () =>{
    api.get(`${config.API}/follow/retrieve/count?col=follower_id&val=${payloadObj?.userID}`)
    .then((res)=>{
      if(res.data.success === true){
        setNumFollowing(res.data.count);
      }
    })
  }

  const navigateFollowing = () =>{
    localStorage.setItem('following','true')
    navigate('/follow')
  }

  const navigateFollowers = () =>{
    localStorage.setItem('following','false')
    navigate('/follow')
  }

  return (
    <div className="animate-fade-in w-[80%]">
      <div className="mx-[2%] h-full">
        <div className="bg-white dark:bg-black h-[62vh] rounded-b-[30px] drop-shadow-md dark:border-t dark:border-gray-300">
          <div className="flex items-center ml-[1.5%] py-[0.5%]">
            <FaArrowLeft className="text-[3em] hover:cursor-pointer dark:text-white"
             onClick={()=>navigate(-1)} />
            <div className="ml-[1%]">
              <h1 className="font-medium text-[1.3em] dark:text-white">
                {accDeets?.name}
              </h1>
              <p className="text-[1em] text-[#A5A5A5]">@{accDeets?.account_handle}</p>
            </div>
          </div>
          <div className="bg-primary h-[25vh] w-full">
            {/* Maka-preview sila sa pictures */}
            {accDeets?.cover_id !== null
            ?
            <img
              src={coverURL}
              alt="Cover Photo"
              className="object-cover w-full h-full hover:brightness-75 hover:cursor-pointer"
            />
            :
            <img
              src={cover}
              alt="Cover Photo"
              className="object-cover w-full h-full hover:brightness-75 hover:cursor-pointer"
            />
            }
          </div>

          <div className="flex">
            <div>
              <div className="absolute top-[38%] ml-[3%] w-[150px] h-[150px] outline outline-[5px] rounded-full text-white dark:text-black">
                {/* Maka-preview sila sa pictures */}
                {accDeets?.dp_id !== null 
                ?
                <img
                  src={dpURL}
                  alt="Profile Picture"
                  className="rounded-full object-cover w-full h-full hover:brightness-75 hover:cursor-pointer"
                />
                :
                <img
                  src={defaultuser}
                  alt="Profile Picture"
                  className="rounded-full object-cover w-full h-full hover:brightness-75 hover:cursor-pointer"
                />
                }
              </div>
            </div>
            <div className="flex-grow flex justify-end">
              <button
                className="font-medium text-[1.2em] outline outline-[1px] rounded-[20px] px-[1%] py-[0.1%] bg-white dark:bg-black mr-[2%] mt-[1%] dark:text-primary hover:bg-black dark:hover:bg-primary hover:text-primary dark:hover:text-black"
                onClick={() => setIsEditOpen(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
          <div className={accDeets?.bio !== null ? `mt-[2%] ml-[3%]` : `mt-[2%] ml-[3%] mb-[3.6%]`}>
            <h1 className="font-medium text-[1.3em] dark:text-white">
              {accDeets?.name}
            </h1>
            <p className="text-[1em] text-[#A5A5A5] dark:text-white">@{accDeets?.account_handle}</p>
            <p className="text-[1em] text-[#414040] mt-[0.5%] dark:text-white">
              {accDeets?.bio}
            </p>
            <div className="flex items-center my-[0.5%] text-[#5E5C5C] dark:text-white">
              {accDeets?.location &&
              <div className="flex items-center mr-[1.5%] dark:text-white">
                <IoLocationOutline className="text-[1.2em] dark:text-white" />
                <p>‎ {accDeets?.location}</p>
              </div>
              }
              <div className="flex items-center dark:text-white">
                <IoCalendarOutline className="text-[1.2em] dark:text-white" />
                <p className="dark:text-white">‎ Joined {joinDate}</p>
              </div>
            </div>
            <div className="flex text-[#5E5C5C] dark:text-white">
              <div className="flex items-center mr-[1.5%] hover:cursor-pointer"
                onClick={navigateFollowing}>
                <p className="hover:underline hover:underline-offset-8 ">
                  <span className="font-semibold text-black dark:text-white">
                  {numFollowing}
                  </span>
                  ‎ Following
                </p>
              </div>
              <div className="flex items-center hover:cursor-pointer"
              onClick={navigateFollowers}>
                <p className="hover:underline hover:underline-offset-8 ">
                  <span className="font-semibold text-black dark:text-white">
                  {numFollower}
                  </span>
                  ‎ {numFollower === 1 ? 'Follower' : 'Followers'}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div>
            <ul className="flex justify-center w-full mt-[1.5%] text-[1.1em] font-medium">
              {ProfileLinks.map((link) => (
                <li
                  className={
                    getLinkClass(link.link, location.pathname) === "link active"
                      ? "w-[33%] mx-[1.5%] text-center border-b-[5px] pb-[0.6%] border-primary dark:text-primary"
                      : "w-[33%] text-center text-[#9D9D9D] hover:cursor-pointer dark:text-white"
                  }
                  onClick={() => navigate(`/${link.link}`)}
                >
                  <p className="hover:cursor-pointer">{link.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Content */}
        <div>
          {location.pathname === "/profile" ? (
            <Posts />
          ) : location.pathname === "/profile/likes" ? (
            <Likes />
          ) : (
            <Dashboard />
          )}
        </div>
        {/* Edit Popup */}
        <EditProfile isOpen={isEditOpen} 
        dpURL={dpURL}
        coverURL={coverURL}
        onClose={() =>{
          setIsEditOpen(false)}} 
          {...accDeets}/>
      </div>
    </div>
  );
};

export default Profile;
