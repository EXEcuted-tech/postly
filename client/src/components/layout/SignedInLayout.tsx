import React from 'react'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import { useOutlet } from 'react-router-dom';

const SignedInLayout = () => {
  const outlet = useOutlet();
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