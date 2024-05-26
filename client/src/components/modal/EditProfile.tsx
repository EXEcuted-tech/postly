import React, { useEffect, useRef, useState } from "react";
import cover from "../../assets/default-cover.png";
import user from "../../assets/user-icon.jpg";
import { IoMdClose } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { TbCameraPlus } from "react-icons/tb";
import { ProfileProps } from "../../common/interface";
import config from "../../common/config";
import api from "../../hooks/api";
import { useNavigate } from "react-router-dom";
import { decodeBase64Url } from "../../helpers/functions";

const EditProfile: React.FC<ProfileProps> = ({ isOpen, dpURL, coverURL, onClose, ...accDeets }) => {
  const navigate = useNavigate();

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  //const [defCoverUrl, setDefCoverUrl] = useState<string | null>(null);
  const [remove,setRemove] = useState(false);
  const fileInputRef1 = useRef<HTMLInputElement>(null);

  const [dpFile, setDpFile] = useState<File | null>(null);
  const [dpUrl, setDpUrl] = useState<string | null>(null);
  const [change1,setChange1] = useState(false);
  const [change2,setChange2] = useState(false);
  const fileInputRef2 = useRef<HTMLInputElement>(null);


  const refresh = localStorage.getItem('refreshToken');

  const [date, setDate] = useState<string>("");
  //ikaw lang niya add sa katong other variables ug ila useState ty
  
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChange1(true);
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setCoverFile(selectedFile);
      setCoverUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleDPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChange2(true)
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setDpFile(selectedFile);
      setDpUrl(URL.createObjectURL(selectedFile));
    }
  };

  const triggerCoverInput = () => {
    if (fileInputRef1.current) {
      fileInputRef1.current.value = '';
      fileInputRef1.current.click();
    }
  };

  const triggerDPInput = () => {
    if (fileInputRef2.current) {
      fileInputRef2.current.value = '';
      fileInputRef2.current.click();
    }
  };

  const coverUpload = async () => {
      const formData = new FormData();
      if (coverFile && remove!==true) {
        formData.append('file', coverFile);
        await api.post(`${config.API}/file/upload`, formData)
          .then((res) => {
            if (res.data.success === true) {
              updateFile(res.data.data.insertId,1)
            } 
          })
      }else if(coverUrl=== null && change1===true || dpURL===null){
        updateFile(0,1);
      }
  };

  const dpUpload = async () => {
    const formData = new FormData();
    if(dpFile){
      formData.append('file', dpFile);
      await api.post(`${config.API}/file/upload`, formData)
      .then((res) => {
        if (res.data.success === true) {
          updateFile(res.data.data.insertId,2)
        } 
      })
    }
};

  const updateFile = (fileID:number,type:number) =>{
    const userID = accDeets?.account_id;
    var userUpdate;

    if(type===1){
      userUpdate = {
        "cover_id":fileID !== 0 ? fileID : null
      }
    }else{
      userUpdate = {
        "dp_id":fileID !== 0 ? fileID : null
      }
    }

    api.post(`${config.API}/user/edit?userID=${userID}`,userUpdate)
    .then((res)=>{
      //console.log("Response: ",res);
    })
  }

  const onSubmit = async () => {
  
    try {
      await coverUpload();
      await dpUpload();
      await updateToken();
      
      navigate('/profile'); //To Refresh token ni haa 
  
      setTimeout(() => {
        navigate('/home');
        setTimeout(() => {
          navigate('/profile');
        }, 50);
      }, 50);
    } catch (error) {
      console.error("Error during submission: ", error);
    }

    onClose();
  };

  const updateToken = async () =>{
    const response = api.post(`${config.API}/token`, { token: refresh });
    console.log("Response: ",response);
    const newAccessToken = (await response).data.accessToken;
    console.log("New Access Token: ",newAccessToken);
      
    var decodedPayload: string;

    if(typeof newAccessToken === 'string'){
      const [_, payload] = newAccessToken.split('.');
      decodedPayload = decodeBase64Url(payload);

      localStorage.setItem('payload', decodedPayload);
    }
    console.log("payload: ",localStorage.getItem('payload'));
    localStorage.setItem('accessToken', newAccessToken);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 animate-fade-in animate-fade-out">
      <div className="bg-white rounded-[20px] ml-[6%] shadow-lg py-[0.5%] w-[30%] h-[67%] flex-row">
        <div className="flex mb-1 items-center px-[3%]">
          <div className="flex w-[8vh] justify-center items-center">
            <IoCloseOutline
              className="text-black text-[2.5em] mb hover:cursor-pointer hover:text-[#C2C2C2]"
              onClick={()=>{
                setCoverFile(null);
                setDpFile(null);
                setCoverUrl(null);
                setDpUrl(null);
                setRemove(false);
                setChange1(false);
                setChange2(false);
                onClose()
              }}
            />
          </div>
          <div className="flex w-[72vh] pl-[1%]">
            <h2 className="text-[1.4em] mb">Edit Profile</h2>
          </div>
          <div className="flex justify-end items-center w-[20vh] mr-1">
            <button className="text-[1.2em] w-full bg-black text-white rounded-2xl hover:bg-gray-900"
            onClick={()=>{
              onSubmit()
            }
            }>
              Save
            </button>
          </div>
        </div>
        <div className="relative h-[13vh] flex items-center justify-center px-0">
          {accDeets?.cover_id !== null && remove===false && change1 === false
          ?
          <img
          src={coverURL ?? cover}
          alt="Cover Photo"
          className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
          />
          :
          <img
          src={coverUrl!==null? coverUrl : cover }
          alt="Cover Photo"
          className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
          />
          }

          <div className="relative flex space-x-6">
            <div className="flex justify-center items-center bg-black h-10 w-10 rounded-3xl bg-opacity-50">
              <TbCameraPlus className="text-2xl text-white hover:cursor-pointer hover:brightness-90" 
              onClick={triggerCoverInput}/>
              <input
                type="file"
                ref={fileInputRef1}
                onChange={handleCoverChange}
                style={{ display: "none" }}
                accept="image/*"
              />
            </div>
            <div className="flex justify-center items-center  bg-black h-10 w-10 rounded-3xl bg-opacity-50">
              <IoMdClose
                className="text-2xl mb hover:cursor-pointer text-white hover:brightness-90"
                onClick={()=>{
                  setCoverUrl(null)
                  setRemove(true);
                  setChange1(true);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="absolute top-[30%] ml-[2%] w-[100px] h-[100px] outline outline-[5px] rounded-full text-white">
          {accDeets?.dp_id !== null && change2 === false
          ?
            
            <img
              src={dpURL !==null ? dpURL : user}
              alt="Profile Picture"
              className="rounded-full object-cover w-full h-full brightness-75 hover:cursor-pointer"
            />
            :
            <img
              src={dpUrl!==null? dpUrl : user}
              alt="Profile Picture"
              className="rounded-full object-cover w-full h-full brightness-75 hover:cursor-pointer"
            />
          }
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white z-10">
                <div className="flex justify-center items-center bg-black h-10 w-10 rounded-3xl bg-opacity-50">
                  <TbCameraPlus className="text-2xl text-white hover:cursor-pointer hover:brightness-90" 
                  onClick={triggerDPInput}/>
                  <input
                    type="file"
                    ref={fileInputRef2}
                    onChange={handleDPChange}
                    style={{ display: "none" }}
                    accept="image/*"
                  />
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className="px-[3%] flex-row mt-20 justify-center items-center w-full">
          <div className="flex-row h-full w-[100%] mt-3 border-yellow-400 placeholder-[#8F8F8F] rounded-lg ring-[#9d9d9d] ring-1 border-none pl-5 py-2 font-poppins justify-center items-center">
            <div className="flex ">
              <p className="text-[1em] text-[#5E5C5C]">Name</p>
            </div>
            <input
              type="text"
              name="name"
              className="relative z-[50] ring-transparent w-[95%] text-[1em] focus:outline-none focus:ring-0"
              value={accDeets?.name}
            ></input>
          </div>
          <div className="flex flex-col h-[12vh] w-[100%] my-[3%] border-yellow-400 text-[1em] placeholder-[#8F8F8F] rounded-lg ring-[#9d9d9d] ring-1 border-none pl-5 py-2 font-poppins">
            <div className="flex mb-1">
              <p className="text-[#5E5C5C]">Bio</p>
            </div>
            <textarea
              name="bio"
              className="flex-1 z-[50] ring-transparent w-full focus:outline-none focus:ring-0 resize-none"
              placeholder="Type Bio"
              value={accDeets?.bio}
            ></textarea>
          </div>
          <div className="flex-row h-full w-[100%] my-[3%] border-yellow-400 text-[1em] placeholder-[#8F8F8F] rounded-lg ring-[#9d9d9d] ring-1 border-none pl-5 py-2 font-poppins justify-center items-center">
            <div className="flex ">
              <p className="text-[#5E5C5C]">Location</p>
            </div>
            <input
              type="text"
              name="name"
              className="relative z-[50] ring-transparent w-[95%] focus:outline-none focus:ring-0"
              placeholder="Type Location"
              value={accDeets?.location}
            ></input>
          </div>
          <div className="flex-row h-full w-[100%] mt-3  border-yellow-400 text-[1em] placeholder-[#8F8F8F] rounded-lg ring-[#9d9d9d] ring-1 border-none pl-5 py-2 font-poppins justify-center items-center">
            <div className="flex ">
              <p className="text-[#5E5C5C]">Birthdate</p>
            </div>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={handleChange}
              className="relative z-[50] ring-transparent w-[95%] focus:outline-none focus:ring-0"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
