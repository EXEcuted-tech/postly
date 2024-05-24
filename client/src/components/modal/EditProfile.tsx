import React, { useState } from "react";
import cover from "../../assets/cover.jpg";
import user from "../../assets/sana.jpg";
import { IoMdClose } from "react-icons/io";
import { TbCameraPlus } from "react-icons/tb";

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfile: React.FC<ProfileProps> = ({ isOpen, onClose }) => {
  const [date, setDate] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 animate-fade-in animate-fade-out">
      <div className="bg-white rounded-lg shadow-lg p-2 w-[30%] h-[67%] flex-row">
        <div className="flex mb-1">
          <div className="flex w-[8vh] justify-center items-center">
            <IoMdClose
              className="text-2xl mb hover:cursor-pointer"
              onClick={onClose}
            />
          </div>
          <div className="flex w-[72vh] pl-5">
            <h2 className="text-[1.4em] mb">Edit Profile</h2>
          </div>
          <div className="flex justify-center items-center w-[20vh] px-2 mr-3">
            <button className="text-[1.2em] w-full bg-black text-white rounded-2xl">
              Save
            </button>
          </div>
        </div>
        <div className="relative h-[13vh] flex items-center justify-center">
          <img
            src={cover}
            alt="Cover Photo"
            className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
          />
          <div className="relative flex space-x-6">
            <div className="flex justify-center items-center bg-black h-10 w-10 rounded-3xl bg-opacity-50">
              <TbCameraPlus className="text-2xl text-white hover:cursor-pointer" />
            </div>
            <div className="flex justify-center items-center  bg-black h-10 w-10 rounded-3xl bg-opacity-50">
              <IoMdClose
                className="text-2xl mb hover:cursor-pointer text-white"
                onClick={onClose}
              />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="absolute top-[30%] ml-[2%] w-[100px] h-[100px] outline outline-[5px] rounded-full text-white">
            <img
              src={user}
              alt="Profile Picture"
              className="rounded-full object-cover w-full h-full brightness-75 hover:cursor-pointer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white z-10">
                <div className="flex justify-center items-center bg-black h-10 w-10 rounded-3xl bg-opacity-50">
                  <TbCameraPlus className="text-2xl text-white hover:cursor-pointer" />
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className="flex-row mt-20 justify-center items-center w-full">
          <div className="flex-row h-full w-[100%] mt-3  border-yellow-400 text-[1.4em] placeholder-[#8F8F8F] rounded-lg ring-[#9d9d9d] ring-1 border-none pl-5 py-2 font-poppins justify-center items-center">
            <div className="flex ">
              <p className="text-[0.8em] text-[#5E5C5C]">Name</p>
            </div>
            <input
              type="text"
              name="name"
              className="relative z-[50] ring-transparent w-[95%] focus:outline-none focus:ring-0"
              value="kitteu?"
            ></input>
          </div>
          <div className="flex flex-col h-[12vh] w-[100%] mt-3 border-yellow-400 text-[1.4em] placeholder-[#8F8F8F] rounded-lg ring-[#9d9d9d] ring-1 border-none pl-5 py-2 font-poppins">
            <div className="flex mb-1">
              <p className="text-[0.8em] text-[#5E5C5C]">Bio</p>
            </div>
            <textarea
              name="bio"
              className="flex-1 text-[0.8em] z-[50] ring-transparent w-full focus:outline-none focus:ring-0 resize-none"
              value="I'm so cute bahala na si Tyrone"
            ></textarea>
          </div>
          <div className="flex-row h-full w-[100%] mt-3  border-yellow-400 text-[1.4em] placeholder-[#8F8F8F] rounded-lg ring-[#9d9d9d] ring-1 border-none pl-5 py-2 font-poppins justify-center items-center">
            <div className="flex ">
              <p className="text-[0.8em] text-[#5E5C5C]">Location</p>
            </div>
            <input
              type="text"
              name="name"
              className="relative z-[50] ring-transparent w-[95%] focus:outline-none focus:ring-0"
              value="f"
            ></input>
          </div>
          <div className="flex-row h-full w-[100%] mt-3  border-yellow-400 text-[1.4em] placeholder-[#8F8F8F] rounded-lg ring-[#9d9d9d] ring-1 border-none pl-5 py-2 font-poppins justify-center items-center">
            <div className="flex ">
              <p className="text-[0.8em] text-[#5E5C5C]">Birthdate</p>
            </div>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={handleChange}
              className="relative z-[50] ring-transparent w-[95%] focus:outline-none focus:ring-0"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
