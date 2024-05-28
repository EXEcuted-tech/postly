import React, { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { FaBell, FaUser, FaHeart } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { SignedInLinks } from "../../common/links";
import { getLinkClass } from "../../helpers/functions";
import { useLocation, useNavigate } from "react-router-dom";
import LogOut from "../modal/LogOut";
import api from '../../hooks/api';
import config from '../../common/config';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [logout, setLogout] = useState(false);

  return (
    <div className="w-[20%] pt-[3%] ">
      {logout && <LogOut setLogout={setLogout} />}
      <div className="flex justify-center">
        <ul>
          {SignedInLinks.map((link) => (
            <li
              className={
                getLinkClass(link.link, location.pathname) === "link active"
                  ? "bg-[#E7E7E7] ml-[-6%] mr-[-50%] pl-[5%] py-[5%] rounded-[10px] flex items-center mb-[10%] hover:cursor-pointer"
                  : "flex items-center mb-[15%] hover:animate-zoom-out hover:cursor-pointer"
              }
              onClick={() => 
                link.link!== 'logout' ? navigate(link.link) : setLogout(true)
              }
            >
              <div className="bg-primary rounded-full p-[3%] dark:bg-black dark:text-primary">
                {link.name === "Home" ? (
                  <IoMdHome className="text-[2.5em] p-[8%]" />
                ) : link.name === "Notifications" ? (
                  <FaBell className="text-[2.5em] p-[8%]" />
                ) : link.name === "Profile" ? (
                  <FaUser className="text-[2.5em] p-[8%]" />
                ) : link.name === "Likes" ? (
                  <FaHeart className="text-[2.5em] p-[8%]" />
                ) : link.name === "Dashboard" ? (
                  <AiFillDashboard className="text-[2.5em] p-[8%]" />
                ) : (
                  <MdLogout className="text-[2.5em] p-[8%]" />
                )}
              </div>
              <p
                className={
                  getLinkClass(link.link, location.pathname) === "link active"
                    ? "text-[1.3em] ml-[5%]"
                    : "text-[1.3em] ml-[10%]"
                }
              >
                {link.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <hr className="border-[2px] ml-[30%]" />
      <div className="flex justify-center mt-[8%] ml-[30%]">
        <button className="bg-primary rounded-[50px] font-semibold text-[1.3em] px-[23%] py-[3%] hover:bg-black hover:text-primary hover:animate-zoom-out dark:bg-black dark:text-primary">
          Create A Post
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
