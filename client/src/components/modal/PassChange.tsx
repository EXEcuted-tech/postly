import React from 'react'
import { useNavigate } from 'react-router-dom';


const PassChange = () => {
  const navigate = useNavigate();
  return (
    <div className='animate-fade-in w-full h-full top-0 left-0 fixed backdrop-brightness-50 z-[1000]'>
      <div className='bg-white w-[30%] px-[5%] py-[2%] h-[31vh] mt-[18%] ml-[38%] rounded-[12px] shadow-2xl dark:bg-black'>
        <div className='text-white'>
          <div className='text-center'>
            <h1 className='text-[2.5em] font-semibold text-black mb-[2%] dark:text-white'>Password Change</h1>
            <div className='px-[2%]'>
              <p className='font-medium text-[1.6em] text-[#8F8F8F]'>You may now log in back to your account.</p>
            </div>
            <div className='flex justify-center mt-[2%]'>
                <button type='submit' className='bg-primary text-black text-[1.5em] w-[50%] py-[2%] mt-[1%] font-bold rounded-md
                  hover:bg-[#edbe2b]'
                  onClick={()=>(navigate('/'))}>Go Back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PassChange