import React, { useEffect, useState } from "react";
import PostCard from "../../components/card/PostCard";
import user from "../../assets/user-icon.jpg";
import Spinner from "../../components/loader/Spinner";
import BounceLoader from "react-spinners/ClipLoader";
import config from '../../common/config';
import api from '../../hooks/api';
import { PostProps } from '../../common/interface';
import mail from '../../assets/mail.png'
import UserNotification from "../../components/alerts/Notification";
import { AiFillExclamationCircle } from "react-icons/ai";

const Home = () => {
  const payload = localStorage.getItem("payload");
  const payloadObj = payload && JSON.parse(payload);
  const dp_id = payloadObj?.dp;

  const [posts, setData] = useState<PostProps[]>([]);
  const [dpURL, setDpURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [content, setContent] = useState("");
  const [retrieved, setRetrieved] = useState(false);
  const [error,setError]=useState("");

  useEffect(() => {
    if (payloadObj) {
      getProfilePicture();
    }
  }, [dp_id]);

  useEffect(() => {
    getAllPosts();
  }, [retrieved]);

  const getProfilePicture = () => {
    api
      .get(`${config.API}/file/retrieve?col=file_id&val=${payloadObj?.dp}`)
      .then(async (res) => {
        if (res.data.success === true && res.data.filedata) {
          const response = await api.get(
            `${config.API}/file/fetch?pathfile=${encodeURIComponent(
              res.data.filedata.path
            )}`,
            {
              responseType: "arraybuffer",
            }
          );

          const url = URL.createObjectURL(new Blob([response.data]));
          setDpURL(url);
          setRetrieved(true);
        }
      })
      .catch((err) => {
        console.log("File Err? ", err);
      });
  };

  const submitPost = () => {
    setLoading(true);
    try {
      api
        .post(`${config.API}/post/create`, {
          account_id: payloadObj?.userID,
          content: content,
        })
        .then((res) => {
          //console.log("RESPONSE POST: ", res);
          if (res.data.success === true) {
            setContent("");
            setTimeout(() => {
              setLoading(false);
            }, 500);
            getAllPosts();
          }else{
            setTimeout(()=>{setLoading(false)},800);
            setError(res.data.error);
            errorTimer();
          }
        }).catch((err)=>{
          setError(err.response.data.error);
          setLoading(false);   
          errorTimer(); 
        })
    } catch {}
  };

  const errorTimer =  ()=>{ 
    setTimeout(() => {
      setError("");
    }, 5000);
  }

  const getAllPosts = () => {
    setPostLoading(true);
    api
      .get(`${config.API}/post/retrieve_all`)
      .then((res) => {
        if (res.data.success === true) {
          setData(res.data.post);
          setTimeout(() => {
            setPostLoading(false);
          }, 1000);
        }
      })
      .catch((err) => {});
  };

  return (
    <div className="pt-[3%] animate-fade-in w-[80%]">
    {error !=='' && 
        <UserNotification
          icon={<AiFillExclamationCircle/>}
          logocolor='#ff0000'
          title="Error!"
          message={error}
          animate='animate-shake'
        />
      }
      <div className="ml-[2%] bg-white rounded-[20px] w-[95%] px-[2%] pt-[2%] pb-[1%] dark:bg-black">
        <div className="flex">
          <div className="w-[50px] h-[50px]">
            <img
              src={dpURL != null ? dpURL : user}
              alt="Profile Picture"
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          <textarea
            maxLength={1000}
            placeholder="What's on your mind today?"
            className="font-light outline-none bg-[#F3F5F7] pl-[2%] py-[1%] pr-[2%] w-full rounded-[30px] ml-[1%] text-[1.2em] resize-none max-h-[50vh]"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </div>
        <hr className="border-1 my-[1%]" />
        <div className="flex justify-end">
          <button
            className="flex bg-primary px-[2%] py-[0.3%] rounded-[39px] text-secondary font-bold text-[1.3em] hover:bg-black hover:text-primary hover:animate-zoom-out dark:hover:bg-gray-800"
            onClick={submitPost}
          >
            <BounceLoader className="" color="#FFFFFF" loading={loading} />
            Post
          </button>
        </div>
      </div>
      <div className="my-[2%] ml-[2%] w-[95%]">
      {postLoading
        ?
          <div className='flex justify-center'>
            <Spinner/>
          </div>
        :
          <>
          {posts.length > 0 ?
            <>
            {posts.map((post,index)=>(
                <PostCard {...post} key={index} />
            ))}
            </>
            :
              <div className="flex flex-col items-center justify-center h-[50vh]">
                  <img src={mail} alt="Email" className="w-[15%]" />
                  <h1 className="mt-4 text-[#2e2e2e] text-[1.2em] font-light">No posts as of now...</h1>
              </div>
          }
          </>
        }
      </div>
    </div>
  );
};

export default Home;
