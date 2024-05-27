import React, { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/applogo.png'
import { IoCloseOutline } from "react-icons/io5";
import config from '../../common/config';
import api from '../../hooks/api';

const Signup = ({setRegister} : { setRegister: (value: boolean) => void }) => {
  const navigate = useNavigate();
  const [username, setUsername]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [retypePassword, setRetypePassword]= useState("");
  const [error,setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signUp = (event:FormEvent) =>{
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Please enter a valid Email");
      setError("Please enter a valid Email");
      setIsLoading(false);
      return;
    }
    
    if (password!==retypePassword) {
      console.log('Wrong pass');
      setError("Please check the password typed");
      setIsLoading(false);
      return;
    }

    api.post(`${config.API}/signup`,{
      account_handle: username,
      email_address: email,
      password: password,
    }).then((res)=>{
        console.log(res);
        if (res.data.success == true){
          setTimeout(()=>{
            setIsLoading(false);
          },1500);
          alert("Registered Successfully!");

        }else{
          setTimeout(()=>{setIsLoading(false)},800);
          setError(res.data.error);
        }

    }).catch((err) => { 
        setError(err.error);
        setIsLoading(false);
    });
  }



  return (
    <div className='animate-fade-in w-full h-full top-0 left-0 absolute backdrop-brightness-50 z-[1000]'>
    <div className='bg-white w-[32%] h-[60%] ml-[35%] mt-[8%] rounded-[50px] shadow-2xl dark:bg-black '>
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
              <input type='text' value={username} onChange={(e)=>{setUsername(e.target.value)}} className='w-[85%] h-[2em] mb-[3%] text-[1.5em] pl-[2%] rounded-xl border-primary border-2 font-semibold dark:text-white dark:bg-black' placeholder='Username'></input>
            </div>
            <div>
              <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} className='w-[85%] h-[2em] mb-[3%] text-[1.5em] pl-[2%] rounded-xl border-primary border-2 font-semibold dark:text-white dark:bg-black' placeholder='Email'></input>
            </div>
            <div>
              <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} className='w-[85%] h-[2em] mb-[3%] text-[1.5em] pl-[2%] rounded-xl border-primary border-2 font-semibold dark:text-white dark:bg-black' placeholder='Password'></input>
            </div>
            <div>
              <input type='password' value={retypePassword} onChange={(e)=>{setRetypePassword(e.target.value)}} className='w-[85%] h-[2em] mb-[3%] text-[1.5em] pl-[2%] rounded-xl border-primary border-2 font-semibold dark:text-white dark:bg-black' placeholder='Re-type Password'></input>
            </div>
            <div className='text-center ml-[-9%]'>
              <button type='submit' onClick={signUp} className=' bg-primary text-[1.5em] w-[30%] py-[1.5%] mt-[1%] font-bold rounded-lg hover:bg-[#f0b500]'>Create</button>
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