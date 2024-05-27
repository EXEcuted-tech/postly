import React, { useEffect } from 'react'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import { useOutlet } from 'react-router-dom';
import { decodeBase64Url } from '../../helpers/functions';

const SignedInLayout = () => {
  const outlet = useOutlet();
  
  // var decodedPayload: string;
  // const access = localStorage.getItem('accessToken');
  // const refresh = localStorage.getItem('refreshToken');

  //To get payload
  // if(typeof access === 'string'){
  //   const [_, payload] = access.split('.');
  //   decodedPayload = decodeBase64Url(payload);
  // }

  useEffect(()=>{
    //const payloadObj = JSON.parse(decodedPayload);
    // console.log("Access token: ",access);
    // console.log("Refresh token: ",refresh);
    //localStorage.setItem('payload', decodedPayload);
  },[])
  
  return (
    <div className='font-poppins animate-fade-in'>  
        <Header/>
        <div className='bg-[#F3F6F8] flex min-h-[90vh]'>
            <Sidebar/>
            {outlet}
        </div>
    </div>
  )
}

export default SignedInLayout