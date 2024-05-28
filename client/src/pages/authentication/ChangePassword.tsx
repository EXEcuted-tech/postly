import React, { useState } from "react";
import { RiLock2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import api from "../../hooks/api";
import config from "../../common/config";
import UserNotification from "../../components/alerts/Notification";
import { AiFillExclamationCircle } from "react-icons/ai";
import PassChange from "../../components/modal/PassChange";
import BounceLoader from "react-spinners/ClipLoader";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState("");
  const [changed,setChanged] = useState(false);

  const currentEmail = localStorage.getItem('email');

  const getAccID = async () => {
    const col = "email_address";
    const val = currentEmail;

    try {
        const res = await api.get(`${config.API}/user/retrieve/public?col=${col}&val=${val}`);
        //console.log("Response: ", res);
        if (res.data.success === true) {
            return res.data.user[0].account_id;
        }
    } catch (err) {
        //console.error(err);
    }

    return 0;
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    var acc_id = await getAccID();

    //console.log(acc_id);
    e?.preventDefault();
    setIsLoading(true)

    if (acc_id === 0) {
      setError('User cannot be identified!');
      setTimeout(()=>{
        setIsLoading(false)
      },500)
      return;
  }

    if (!password || !confirmPassword) {
        setError('All fields must be filled!');
        setTimeout(()=>{
          setIsLoading(false)
        },500)
        return;
    }

    if (password !== confirmPassword) {
        setError('Entered passwords do not match!');
        setTimeout(()=>{
          setIsLoading(false)
        },500)
        return;
    }

    if(password === confirmPassword){
        api.post(`${config.API}/user/edit/public?userID=${acc_id}`,{
            password: confirmPassword,
          }).then((res)=>{
            
            if(res.data.success==true){
              localStorage.removeItem('email')
              setPassword('');
              setConfirmPassword('');
              setTimeout(()=>{
                setIsLoading(false);
              },800)
              setChanged(true);
            }else{
                setError(res.data.error);
                setTimeout(()=>{setIsLoading(false)},800);
                errorTimer();
                return;
            }
          }).catch((err)=>{
            setError(err.response.data.error);
            setTimeout(()=>{setIsLoading(false)},800);
            errorTimer(); 
            return;
          })
    }
  }

  const errorTimer =  ()=>{ 
    setTimeout(() => {
      setError("");
    }, 5000);
  }


  return (
    <div className="animate-fade-in font-poppins flex-row  h-full w-full pr-[20%]">
      {error !=='' && 
        <UserNotification
          icon={<AiFillExclamationCircle/>}
          logocolor='#ff0000'
          title="Error!"
          message={error}
          animate='animate-shake'
        />
      }
      {changed && <PassChange/>}
      <div className="flex justify-center items-center pt-[20%] mt-[8%]">
        <RiLock2Fill className="dark:text-white text-[12em]" />
      </div>
      <div className="flex justify-center items-center">
        <p className="text-[4.2em] font-poppins font-semibold dark:text-white ">
          Forgot Password?
        </p>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-[2em] font-poppins text-[#5E5C5C] dark:text-primary">
          You can now change your password here.
        </p>
      </div>
      <div className="flex justify-center items-center mb-[0.5%]"></div>
      <div className="flex justify-center items-center w-full">
        <div className="flex h-12 w-[70%] mt-3 border-yellow-400 ">
          <input
            type="password"
            name="password"
            className="relative z-[50] border-yellow-400 h-full w-full text-[1.4em] placeholder-[#8F8F8F] dark:placeholder-white rounded-xl border-none ring-2 ring-[#fdcf43] pl-3 py-2 focus:ring-[#FECC31] focus:ring-2 font-poppins dark:bg-black dark:text-white"
            placeholder="New Password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="flex h-12 w-[70%] mt-3 border-yellow-400 ">
          <input
            type="password"
            name="confirmpassword"
            className="relative z-[50] border-yellow-400 h-full w-full text-[1.4em] placeholder-[#8F8F8F] dark:placeholder-white rounded-xl border-none ring-2 ring-[#fdcf43] pl-3 py-2 focus:ring-[#FECC31] focus:ring-2 font-poppins dark:bg-black dark:text-white"
            placeholder="Confirm Password"
            autoComplete="off"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="flex mt-5 h-14 justify-center items-center">
        <div className="flex-col w-[30%] h-full bg-[#fecc31] m-5 rounded-lg hover:bg-[#f0b500]">
          <button
            type="submit"
            className="relative z-[100] w-full h-full p-1"
            onClick={(e)=>onSubmit(e)}
          >
            <div className="flex justify-center">
            <BounceLoader className="" color="#FFFFFF" loading={isLoading} />
            <p className="font-poppins font-semibold text-[24px] hover:cursor-pointer">
              Save
            </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
