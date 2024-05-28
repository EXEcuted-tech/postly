import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Logo from '../../assets/applogo.png'
import { useLocation, useNavigate } from "react-router-dom";
import { ProfileProps, UserProps } from "../../common/interface";

import api from '../../hooks/api';
import config from '../../common/config';

const LogOut= ({setLogout} : { setLogout: (value: boolean) => void }) => {
  const navigate = useNavigate();
  const payload = localStorage.getItem("payload");
  const payloadObj = payload && JSON.parse(payload);

  const [accUserHandle, setAccUserHandle] = useState(payloadObj?.userHandle);

  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault();
    try{
      const refreshToken = localStorage.getItem('refreshToken');

      api.post(`${config.API}/logout`, { token: refreshToken })
      .then((res)=>{
        console.log("Response? ",res);
        if(res.data.success=== true){
          console.log("HERE");
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
  
          navigate('/')
        }
      })
    }catch (error) {
      console.error('Error logging out:', error);
    }
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-[100] backdrop-brightness-50 animate-fade-in animate-fade-out'>
      <div className='w-[30%] h-[45vh] rounded-[12px] shadow-2xl bg-white dark:bg-black'>
        <div className='text-white'>
          <div className='flex justify-end mt-[3%]'>
            <IoCloseOutline className='cursor-pointer text-[#C2C2C2] text-[3em] mr-[3%] dark:text-white'
            onClick={()=>(setLogout(false))}
            />

          </div>
          <div className='flex flex-col text-center justify-center ml-[5%]'>
            <div className="flex justify-center">
              <img src={Logo} className='w-[20%] mr-[10%]'></img>
            </div>
            <form className='inline text-black w-[89%]'>
              <div className='ml-[3%] mb-[2%] mt-[2%] w-full text-center'>
                <p className='font-semibold text-[2em] dark:text-white'>Logout of @{accUserHandle ? accUserHandle : "User"}?</p>
              </div>
              <div className='ml-[3%] w-full text-center px-[10%]'>
                <p className='font-normal text-[1.5em] dark:text-white'>You will be logged out of your current account.</p>
              </div>
              <div className='flex justify-center mt-[2%]'>
                <button type='submit' className=' bg-black text-white text-[1.2em] w-[20%] py-[2%] mt-[1%] mr-[10%] font-bold rounded-md dark:text-black dark:bg-white
                    hover:bg-gray-600' onClick={()=>(setLogout(false))}>Cancel</button>
                <button type='submit' className=' bg-primary text-black text-[1.2em] w-[20%] py-[2%] mt-[1%] font-bold rounded-md
                    hover:bg-[#dbad1d]' onClick={(e)=>logout(e)}>Log Out</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogOut