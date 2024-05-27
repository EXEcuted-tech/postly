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
      <div className="absolute w-[26%] h-[38vh] top-[25%] left-[42%] py-[0.5%] rounded-[30px] shadow-2xl bg-white dark:bg-black">
        <div className="text-white text-center">
          <div className="flex justify-end">
            <IoCloseOutline
              className="cursor-pointer text-[#C2C2C2] text-[3.5em] mr-[3%] dark:text-white hover:text-[#9c9c9c]"
              onClick={() => {
                onClose();
              }}
            />
          </div>
          <div className="ml-[42%]">
              <FaTriangleExclamation className="cursor-pointer text-[#CB0000] text-[6em] mr-[35%]" />
          </div>
          <div className="flex ml-[6%]">
            <form className="inline text-black w-[89%]">
              <div className="ml-[3%] mb-[1%] w-full text-center">
                <p className="font-semibold text-[2em] dark:text-white">
                  Are You Sure?
                </p>
              </div>
              <div className="ml-[3%] w-full text-center">
                <p className="font-normal text-[1.2em] dark:text-white">
                  Do you want to delete this task? This
                </p>
              </div>
              <div className="ml-[3%] mb-[2%] w-full text-center">
                <p className="font-normal text-[1.2em] dark:text-white">
                  process cannot be undone.
                </p>
              </div>
              <div className="flex justify-center mt-[2%]">
                <button
                  className="bg-[#6C6C6C] text-white text-[1.2em] w-[20%] py-[1.5%] mt-[1%] mr-[10%] font-semibold rounded-md hover:bg-[#575757] dark:bg-white dark:text-black"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Cancel
                </button>
                <button
                  className=" bg-[#D40000] text-white text-[1.2em] w-[20%] py-[1%] mt-[1%] font-semibold rounded-md hover:bg-[#a80000]"
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
