import React, { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import user1 from "../../assets/user-icon.jpg";
import user from "../../assets/user-icon.jpg";
import api from "../../hooks/api";
import config from "../../common/config";
import { useNavigate } from "react-router-dom";
import { EditProps } from "../../common/interface";
import UserNotification from "../alerts/Notification";
import { AiFillExclamationCircle } from "react-icons/ai";
import BounceLoader from "react-spinners/ClipLoader";

const EditPost: React.FC<EditProps> = ({
  onClose,
  postId,
  postContent,
  postName,
  postDuration,
  imageUrl,
}) => {
  const [content, setContent] = useState(postContent);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error,setError]=useState("");

  const onSubmit = async () => {
    try {
      await handleSaveChanges();
    } catch (error) {
      //console.error("Error during submission: ", error);
    }
  };

  const handleSaveChanges = () => {
    api
      .post(`${config.API}/post/edit?postID=${postId}&val=${content}`)
      .then((res) => {
        if (res.data.success === true) {
          console.log("Hello");
          setTimeout(() => {
            setLoading(false);
          }, 200);

          navigateBack();
        }else{
          //console.log("Hello");
          setTimeout(()=>{setLoading(false)},800);
          setError(res.data.error);
          errorTimer();
          return;
        }
      })
      .catch((err) => {
        setError(err.response.data.error);
        setLoading(false);   
        errorTimer(); 
        return;
      });
  };
  
  const navigateBack = () =>{
    navigate("/profile");

    setTimeout(() => {
      navigate("/home");
      setTimeout(() => {
        navigate("/profile");
      }, 50);
    }, 50);

    onClose();
  }

  const errorTimer =  ()=>{ 
    setTimeout(() => {
      setError("");
    }, 5000);
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  return (
    <div className="animate-fade-in flex flex-col">
      {error !=='' && 
        <UserNotification
          icon={<AiFillExclamationCircle/>}
          logocolor='#ff0000'
          title="Error!"
          message={error}
          animate='animate-shake'
        />
      }
      <div className="flex w-full h-full justify-between items-center">
      <div className="w-12 h-12">
          <img
            src={imageUrl !== null ? imageUrl : user}
            alt="Profile Picture"
            className="rounded-full object-cover w-full h-full"
          />
        </div>
        <div className="flex-row justify-start w-[50%] pl-[1%]">
          <h1 className="font-semibold text-[1.3em] hover:cursor-pointer dark:text-white">
            {postName}
          </h1>
          <p className="text-[1em] text-[#9D9D9D]">{postDuration}</p>
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
        <textarea
          ref={textareaRef}
          maxLength={1000}
          placeholder="What's on your mind today?"
          className="font-light outline-none bg-[#F3F5F7] pl-4 py-2 w-full rounded-2xl ml-[4%] mt-[1%] text-lg resize-none overflow-hidden"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ minHeight: "50px" }}
        ></textarea>
      </div>
      <hr className="border-1 my-2 ml-[4%]" />
      <div className="flex justify-end">
        <button
          className="flex items-center bg-primary px-4 py-2 rounded-full text-secondary font-bold text-lg hover:bg-black hover:text-primary transition duration-300"
          onClick={() => {
            onSubmit();
          }}
        >
          <BounceLoader className="" color="#FFFFFF" loading={loading} />
          Save
        </button>
      </div>
    </div>
  );
};

export default EditPost;
