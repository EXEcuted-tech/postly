import React, { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import user1 from "../../assets/user-icon.jpg";
import user from "../../assets/user-icon.jpg";
import api from "../../hooks/api";
import config from "../../common/config";
import { useNavigate } from "react-router-dom";

interface EditProps {
  onClose: () => void;
  postId: number;
  postContent: string;
  imageUrl: string | null;
}

const EditPost: React.FC<EditProps> = ({
  onClose,
  postId,
  postContent,
  imageUrl,
}) => {
  const [content, setContent] = useState(postContent);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      await handleSaveChanges();

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

  const handleSaveChanges = () => {
    api
      .post(`${config.API}/post/edit?postID=${postId}&val=${content}`)
      .then((res) => {
        console.log("Post Details: ", res.data);
        if (res.data.success) {
          console.log("Post has successfully been edited");
          console.log("Updated Data", res.data);
        }
      })
      .catch((err) => {
        console.error("Error udpating post: ", err);
      });
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  return (
    <div className="flex flex-col">
      <div className="flex w-full h-full justify-between items-center">
        <div className="flex-row justify-start w-[50%] pl-16">
          <p className="cursor-pointer text-black font-semibold text-[1.6em] dark:text-white">
            Edit Post
          </p>
        </div>
        <div className="flex-row justify-end w-[50%] pl-[47%]">
          <IoCloseOutline
            className="cursor-pointer text-black text-[3em] dark:text-white"
            onClick={() => {
              onClose();
            }}
          />
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="w-12 h-12">
          <img
            src={imageUrl !== null ? imageUrl : user}
            alt="Profile Picture"
            className="rounded-full object-cover w-full h-full"
          />
        </div>
        <textarea
          ref={textareaRef}
          maxLength={1000}
          placeholder="What's on your mind today?"
          className="font-light outline-none bg-[#F3F5F7] pl-4 py-2 w-full rounded-2xl ml-4 text-lg resize-none overflow-hidden"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ minHeight: "50px" }}
        ></textarea>
      </div>
      <hr className="border-1 my-2" />
      <div className="flex justify-end">
        <button
          className="flex items-center bg-primary px-4 py-2 rounded-full text-secondary font-bold text-lg hover:bg-black hover:text-primary transition duration-300"
          onClick={() => {
            onSubmit();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditPost;
