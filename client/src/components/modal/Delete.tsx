import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaTriangleExclamation } from "react-icons/fa6";
import api from "../../hooks/api";
import config from "../../common/config";
import { useNavigate } from "react-router-dom";

interface DeleteProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
}

const Delete: React.FC<DeleteProps> = ({ isOpen, onClose, postId }) => {
  const navigate = useNavigate();
  const userID = Number(localStorage.getItem("view_id"));
  const handleDelete = () => {
    api
      .delete(`${config.API}/post/delete?col=post_id&val=${postId}`)
      .then((res) => {
        if (res.data.success === true) {
          console.log("Post successfully deleted");
        }
      })
      .catch((err) => {
        console.error("Error Deleting post: ", err);
      });
  };

  const onDelete = async () => {
    try {
      await handleDelete();

      navigate("/profile"); //To Refresh token ni haa

      setTimeout(() => {
        navigate("/home");
        setTimeout(() => {
          navigate("/profile");
        }, 50);
      }, 50);
    } catch (error) {
      console.error("Error during submission: ", error);
    }

    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 animate-fade-in animate-fade-out">
      <div className="absolute w-[50%] h-[55%] top-[22%] left-[25%] rounded-[50px] shadow-2xl dark:bg-black">
        <div className="text-white">
          <div className="flex justify-end mt-[3%] mb-[2%]">
            <FaTriangleExclamation className="cursor-pointer text-[#CB0000] text-[9em] mr-[35%] mt-[3%]" />
            <IoCloseOutline
              className="cursor-pointer text-black text-[3em] mr-[3%] dark:text-white"
              onClick={() => {
                onClose();
              }}
            />
          </div>
          <div className="flex ml-[5%]">
            <form className="inline text-black w-[89%]">
              <div className="ml-[3%] mb-[2%] w-full text-center">
                <p className="font-semibold text-5xl dark:text-white">
                  Are You Sure? {postId}
                </p>
              </div>
              <div className="ml-[3%] w-full text-center">
                <p className="font-normal text-4xl dark:text-white">
                  Do you want to delete this task? This
                </p>
              </div>
              <div className="ml-[3%] mb-[2%] w-full text-center">
                <p className="font-normal text-4xl dark:text-white">
                  process cannot be undone.
                </p>
              </div>
              <div className="flex justify-center mt-[2%]">
                <button
                  className=" bg-[#6C6C6C] text-white text-3xl w-[20%] py-[2%] mt-[1%] mr-[10%] font-bold rounded-md dark:bg-white dark:text-black"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Cancel
                </button>
                <button
                  className=" bg-[#D40000] text-white text-3xl w-[20%] py-[2%] mt-[1%] font-bold rounded-md"
                  onClick={() => {
                    onDelete();
                  }}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;
