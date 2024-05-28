import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Logo from '../../assets/applogo.png'
import { useLocation, useNavigate } from "react-router-dom";
import { ProfileProps, UserProps } from "../../common/interface";

import api from '../../hooks/api';
import config from '../../common/config';

const LogOut= ({setLogout} : { setLogout: (value: boolean) => void }) => {
  const payload = localStorage.getItem("payload");
  const payloadObj = payload && JSON.parse(payload);

  const [accUserHandle, setAccUserHandle] = useState(payloadObj?.userHandle);

  const logout = () =>{
    try{
      const refreshToken = localStorage.getItem('refreshToken');

      api.post(`${config.API}/logout`, { token: refreshToken })
      .then((res)=>{
        //console.log("Response? ",res);
        if(res.data.success=== true){
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
  
          window.location.href = '/';
        }
      })
    }catch (error) {
    console.error('Error logging out:', error);
    }
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 animate-fade-in animate-fade-out'>
      <div className='absolute w-[50%] h-[55%] top-[22%] left-[25%] rounded-[50px] shadow-2xl bg-white dark:bg-black'>
        <div className='text-white'>
          <div className='flex justify-end mt-[3%] mb-[2%]'>
            <img src={Logo} className='w-[20%] mr-[33%]'></img>
            <IoCloseOutline className='cursor-pointer text-black text-[3em] mr-[3%] dark:text-white'
            onClick={()=>(setLogout(false))}
            />

          </div>
          <div className='flex ml-[5%]'>
            <form className='inline text-black w-[89%]'>
              <div className='ml-[3%] mb-[2%] w-full text-center'>
                <p className='font-semibold text-5xl dark:text-white'>Logout of {accUserHandle ? accUserHandle : "User"}?</p>
              </div>
              <div className='ml-[3%] w-full text-center'>
                <p className='font-normal text-4xl dark:text-white'>You will be logged out of your current</p>
              </div>
              <div className='ml-[3%] mb-[2%] w-full text-center'>
                <p className='font-normal text-4xl dark:text-white'>account.</p>
              </div>
              <div className='flex justify-center mt-[2%]'>
                <button type='submit' className=' bg-black text-white text-3xl w-[20%] py-[2%] mt-[1%] mr-[10%] font-bold rounded-md dark:text-black dark:bg-white' onClick={()=>(setLogout(false))}>Cancel</button>
                <button type='submit' className=' bg-primary text-black text-3xl w-[20%] py-[2%] mt-[1%] font-bold rounded-md' onClick={logout}>Log Out</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogOut