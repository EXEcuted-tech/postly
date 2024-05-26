import React, { useEffect, useState } from "react";
import logoLight from "../../assets/logo-transparent.png";
import logoDark from "../../assets/logo-yellow.png";
import { IoIosSunny } from "react-icons/io";
import user from '../../assets/sana.jpg'
import defaultuser from '../../assets/user-icon.jpg'
import { FaMoon, FaSearch } from "react-icons/fa";
import useColorMode from "../../hooks/useColorMode"
import api from "../../hooks/api";
import config from "../../common/config";

const Header = () => {
  const payload = localStorage.getItem('payload');
  const payloadObj = payload && JSON.parse(payload);
  const color = localStorage.getItem("color-theme");

  const [darkMode, setDarkMode] = useColorMode();
  const [dpURL,setDpURL] = useState<string | null>(null);
  // const [payloadObj, setPayloadObj] = useState(() => {
  //   const initialPayload = localStorage.getItem('payload');
  //   return initialPayload ? JSON.parse(initialPayload) : null;
  // });

  // useEffect(() => {
  //   updatePayload();

  //   window.addEventListener('storage', updatePayload);

  //   return () => {
  //     window.removeEventListener('storage', updatePayload);
  //   };
  // }, []);

  // const updatePayload = () => {
  //   const payload = localStorage.getItem('payload');
  //   setPayloadObj(payload ? JSON.parse(payload) : null);
  // };
  
  useEffect(() => {
    if (payloadObj) {
      getProfilePicture();
    }
  }, []);

  useEffect(() => {}, [color]);

  const toggleDarkMode = () => {
    setDarkMode(darkMode === "light" ? "dark" : "light");
  };

  const getProfilePicture = () =>{
    api.get(`${config.API}/file/retrieve?col=file_id&val=${payloadObj?.dp}`)
    .then(async (res)=>{
      if(res.data.success == true && res.data.filedata){
        const response = await api.get(`${config.API}/file/fetch?pathfile=${encodeURIComponent(res.data.filedata.path)}`, {
          responseType: 'arraybuffer',
        });
  
        const url = URL.createObjectURL(new Blob([response.data]));
        setDpURL(url);
      }
    }).catch((err)=>{
      console.log("File Err? ", err);
    })
}


  return (
    <div className="font-poppins flex items-center bg-primary h-[10vh] w-full dark:bg-black">
      <div className="flex items-center w-[25%]">
        <img
          src={darkMode === "dark" ? logoDark : logoLight}
          alt="Postly Logo"
          className="ml-[25%] w-[13%] h-[17%] mr-[5%]"
        ></img>

        <h1 className="font-semibold text-[2.1em] dark:text-primary">Postly</h1>
      </div>
      <div className="flex items-center w-[60%] ml-[3%] ">
        <FaSearch className="text-[1.2em] absolute ml-[1%] text-[#8F8F8F]" />
        <input
          type="text"
          placeholder="Search for people, posts, stories"
          className="bg-[#F3F5F7] pl-[5%] py-[1%] pr-[2%] w-[90%] rounded-[30px] mr-[1%] text-[1.2em]"
        ></input>
      </div>
      <div className="flex items-center">
        <div>
          <button onClick={toggleDarkMode}>
            {darkMode === "dark" ? (
              <IoIosSunny
                className="text-[2.8em] bg-primary text-black rounded-full px-[15%] py-[15%]
            hover:cursor-pointer  hover:bg-[#FEF200] animate-pop1"
              />
            ) : (
              <FaMoon
                className="text-[2.8em] bg-black text-primary rounded-full px-[15%] py-[15%]
              hover:cursor-pointer hover:bg-gray-900 animate-pop1"
              />
            )}
          </button>
        </div>
        <div className="ml-[15%]">
          <div className="w-[50px] h-[50px]">
                  {payloadObj?.dp !== null 
                  ?
                <img
              src={dpURL ?? defaultuser}
              alt="Profile Picture"
              className="rounded-full object-cover w-full h-full"
            />
                  :
                    <img src={defaultuser} alt="Profile Picture" className='rounded-full object-cover w-full h-full'/>
                  }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
