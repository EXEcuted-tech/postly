import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import user1 from "../../assets/user-icon.jpg";

interface EditProps {
  onClose: () => void;
  postId: number;
  postContent: string;
}

const EditPost: React.FC<EditProps> = ({ onClose, postId, postContent }) => {
  return (
    <div className="flex items-center w-full">
      <div className="text-white">
        <div className="flex justify-end mt-[3%] mb-[2%]">
          <IoCloseOutline
            className="cursor-pointer text-black text-[3em] mr-[3%] dark:text-white"
            onClick={() => {
              onClose();
            }}
          />
        </div>
        <div className="flex ml-[5%]">
          <img src={user1} className="w-[7%] h-[7%] rounded-full" />
          <form className="inline text-black w-[89%]">
            <div className="ml-[3%] w-full">
              <textarea
                className="w-[97%] h-[5em] mb-[3%] text-4xl pl-[2%] rounded-3xl pt-[2%] bg-[#F3F5F7] text-[#AAAAAA] resize-none"
                value={postContent}
              ></textarea>
            </div>
            <div>
              <hr></hr>
            </div>
            <div className="text-end mt-[2%]">
              <button
                type="submit"
                className=" bg-primary text-3xl w-[11%] py-[1%] mt-[1%] font-bold rounded-full"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
