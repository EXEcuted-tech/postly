import React, { useEffect, useRef, useState } from "react";
import logoLight from "../../assets/logo-transparent.png";
import logoDark from "../../assets/logo-yellow.png";
import { IoIosSunny } from "react-icons/io";
import user from '../../assets/sana.jpg'
import defaultuser from '../../assets/user-icon.jpg'
import { FaMoon, FaSearch } from "react-icons/fa";
import useColorMode from "../../hooks/useColorMode"
import api from "../../hooks/api";
import config from "../../common/config";
import { FollowProps, UserProps } from "../../common/interface";
import Search from "../../pages/search/Search";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const payload = localStorage.getItem('payload');
  const payloadObj = payload && JSON.parse(payload);
  const dp_id = payloadObj?.dp;
  const color = localStorage.getItem("color-theme");
  const [search, setSearch] = useState(false);

  const [darkMode, setDarkMode] = useColorMode();
  const [dpURL,setDpURL] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tasks, setTasks] = useState<UserProps[]>([]);
  const [errMess,setErrMess] = useState("");
  const [taskExist, setTaskExist] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const click = () =>{
    if(location.pathname!== '/search'){
        localStorage.setItem('searchtab','posts');
        navigate('/search');
    }
  }

  // const [payloadObj, setPayloadObj] = useState(() => {
  //   const initialPayload = localStorage.getItem('payload');
  //   return initialPayload ? JSON.parse(initialPayload) : null;
  // });

  useEffect(() => {
    if(payloadObj){
      getProfilePicture();
    }
  }, [dp_id]);

  useEffect(() => {}, [color]);

  const toggleDarkMode = () => {
    setDarkMode(darkMode === "light" ? "dark" : "light");
  };

  const getAllTasks = () => {
    api
      .get(
        `${config.API}/user/getall`
      )
      .then((res) => {
        if (res.data.success === true && res.data.tasks.length > 0) {
          setTaskExist(true);
          setTasks(res.data.tasks);
        } else {
          setTaskExist(false);
          setTasks([]);
        }
      })
      .catch((error) => {
        error.response? setErrMess(error.response?.data.message): setErrMess("Request Failed!");
        errorTimer();
      });
  };

  const getProfilePicture = async () =>{
    await api.get(`${config.API}/file/retrieve?col=file_id&val=${payloadObj?.dp}`)
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      localStorage.setItem("search_query", searchQuery);
      localStorage.setItem('searchtab','people');
      window.location.href = window.location.pathname;
    }
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setSearchQuery(e.target.value)
    if(e.target.value){
    api.get(
      `${config.API}/user/search?col2=name&val2=${searchQuery}`,{
    }
    ).then(response =>{
      if(response.status === 200){
        if(response.data.tasks.length === 0){
          setTasks([]);
          setErrMess("No Results Found");
        }else{
          setTasks(response.data.tasks);
          setErrMess("");
          setShowSuggestions(true);
        }
        //console.log(response.data.tasks)
        
      }
    }).catch(error=>{
      //console.log(error.response.data.message)
      setErrMess(error?.response?.data.message);
    }).finally(()=>{
      errorTimer();
    })
  }else{
    getAllTasks()
  }
  };

  function errorTimer (){ setTimeout(() => {
    setErrMess("");
  }, 5000);
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
          // onClick={() => click()}
          
          onClick={() => click()}
          onKeyDown={(event)=>{handleKeyDown(event)}}
          onChange={(e)=>{handleChangeSearch(e)}}
          value={searchQuery}
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
