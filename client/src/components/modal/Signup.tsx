import React, { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/applogo.png'
import { IoCloseOutline } from "react-icons/io5";
import config from '../../common/config';
import api from '../../hooks/api';
import UserNotification from '../alerts/Notification';
import { AiFillExclamationCircle,AiFillCheckCircle } from 'react-icons/ai';
import BounceLoader from "react-spinners/ClipLoader";

const Signup = ({setRegister} : { setRegister: (value: boolean) => void }) => {
  const navigate = useNavigate();
  const [username, setUsername]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [retypePassword, setRetypePassword]= useState("");
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signUp = (event:FormEvent) =>{
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email!");
      setIsLoading(false);
      errorTimer();
      return;
    }
    
    if (password!==retypePassword) {
      setError("Please check the typed password again!");
      setIsLoading(false);
      errorTimer();
      return;
    }

    api.post(`${config.API}/signup`,{
      account_handle: username,
      email_address: email,
      password: password,
    }).then((res)=>{
        if (res.data.success == true){
                                
          setSuccess("You have successfully created an account! You may now log in.");

          setTimeout(()=>{
            setIsLoading(false);
          },1500);
          
          setTimeout(() => {
            setSuccess("");
            setRegister(false);
          }, 1000);

        }else{
          setTimeout(()=>{setIsLoading(false)},800);
          setError(res.data.error);
          errorTimer();
        }

    }).catch((err) => { 
        setError(err.response.data.message);
        setIsLoading(false);
        errorTimer();
    });
  }

  const errorTimer =  ()=>{ 
    setTimeout(() => {
      setError("");
    }, 5000);
  }

  return (
    <div className='animate-fade-in w-full h-full top-0 left-0 absolute backdrop-brightness-50 z-[1000]'>
    {error !=='' && 
        <UserNotification
          icon={<AiFillExclamationCircle/>}
          logocolor='#ff0000'
          title="Error!"
          message={error}
          animate='animate-shake'
        />
    }
    {success !=='' &&
      <UserNotification
        icon={<AiFillCheckCircle/>}
        logocolor='#17ab0c'
        title="Registered Successfully!"
        message={success}
        animate='animate-fade-in'
      />
    }
    
    <div className='bg-white w-[32%] h-[63.5%] ml-[35%] mt-[8%] rounded-[50px] shadow-2xl dark:bg-black '>
      <div className='text-white'>
        <div className='flex justify-center pt-[5%]'>
          <img src={Logo} className='w-[13%] ml-[40%]' />
          <IoCloseOutline className='cursor-pointer text-[#C2C2C2] text-[3em] content-end ml-[32%] hover:text-[#a1a1a1] dark:text-white'
          onClick={()=>(setRegister(false))}/>
        </div>
        <div className='ml-[12%]'>
          <h1 className='text-[3em] font-medium text-black dark:text-white'>Create an Account</h1>
          <p className='text-[1.25em] text-[#8F8F8F] mb-[3%] dark:text-primary'>You must create an account to use Postly.</p>
          <form className='inline text-black' method='POST'>
            <div>
              <input type='text' name='username' value={username} onChange={(e)=>{setUsername(e.target.value)}} className='w-[85%] h-[2em] mb-[3%] text-[1.5em] pl-[2%] rounded-xl border-primary border-2 font-semibold dark:text-white dark:bg-black' placeholder='Username'></input>
            </div>
            <div>
              <input type='email' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} className='w-[85%] h-[2em] mb-[3%] text-[1.5em] pl-[2%] rounded-xl border-primary border-2 font-semibold dark:text-white dark:bg-black' placeholder='Email'></input>
            </div>
            <div>
              <input type='password' name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} className='w-[85%] h-[2em] mb-[3%] text-[1.5em] pl-[2%] rounded-xl border-primary border-2 font-semibold dark:text-white dark:bg-black' placeholder='Password'></input>
            </div>
            <div>
              <input type='password' name='confirmpassword' value={retypePassword} onChange={(e)=>{setRetypePassword(e.target.value)}} className='w-[85%] h-[2em] mb-[3%] text-[1.5em] pl-[2%] rounded-xl border-primary border-2 font-semibold dark:text-white dark:bg-black' placeholder='Re-type Password'></input>
            </div>
            <div className='text-center ml-[-9%]'>
                <button type='submit' name='signup-btn' onClick={signUp} className=' bg-primary text-[1.5em] w-[30%] py-[1.5%] mt-[1%] font-bold rounded-lg hover:bg-[#f0b500]'>
                <div className='flex items-center justify-center mr-[2%]'>
                    <BounceLoader className='mx-[2%]' color="#FFFFFF" loading={isLoading} />
                    Sign Up
                  </div>
                </button>
            </div>
          </form>
          {/* {{#if message}}
          <h4 className='alert alert-danger mt-4'>{{message}}</h4> */}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Signup