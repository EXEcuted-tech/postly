import React from 'react'
import Logo from '../../assets/applogo.png'

const Login = () => {
  return (
    <div className='w-full h-full'>
      <div className='absolute w-[50%] h-[80%] top-[10%] left-[25%] bg-black rounded-[50px]'>
        <div className='text-white items-center justify-center align-center'>
          <img src={Logo} className='w-[15%] items-center justify-items-center' />
          <div className='ml-[7%]'>
            <h1 className='text-7xl font-medium'>Create an Account</h1>
            <p className='text-xl mt-[2%] text-[#8F8F8F]'>You must create an account to use Postly.</p>
            <form>
              <input></input>
            </form>
          </div>
          
        </div>
      </div>


    </div>
  )
}

export default Login