import React from "react";
import cover from "../../assets/cover.jpg";
import user from "../../assets/sana.jpg";
import { IoMdClose } from "react-icons/io";

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfile: React.FC<ProfileProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-2 w-[30%] h-[50%] flex-row">
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
        <div className="pr-1 h-[13vh] flex">
          <div></div>
          <img
            src={cover}
            alt="Cover Photo"
            className="object-cover w-full h-full brightness-75 cursor-pointer"
          />
        </div>
        <div className="flex">
          <div>
            <div className="absolute top-[38%] ml-[3%] w-[100px] h-[100px] outline outline-[5px] rounded-full text-white">
              {/* Maka-preview sila sa pictures */}
              <img
                src={user}
                alt="Profile Picture"
                className="rounded-full object-cover w-full h-full brightness-75 hover:cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
