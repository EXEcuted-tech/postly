import React, { useEffect, useState } from "react";
import user from "../../assets/user-icon.jpg";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { PostProps, UserProps } from "../../common/interface";
import config from "../../common/config";
import api from "../../hooks/api";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Delete from "../modal/Delete";
import EditPost from "../modal/EditPost";

import { PiPencilCircleDuotone, PiXCircleDuotone } from "react-icons/pi";

const PostCard = (props: PostProps) => {
  const navigate = useNavigate();
  //Likes kay to be added pa sa PostProps
  const { post_id, account_id, content, created_at, updated_at, is_owner } =
    props;
  const payload = localStorage.getItem("payload");
  const payloadObj = payload && JSON.parse(payload);
  // console.log(props);
  const [dpURL, setDpURL] = useState<string | null>(null);
  const [duration, setDuration] = useState("");
  const [accDeets, setAccDeets] = useState<UserProps>();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [changed, setChanged] = useState(false);

  const [isItLike, setIsItLike] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const userID = Number(localStorage.getItem("view_id"));

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    retrieveAcc();
    calculateTime();
    editedTime();
    countLike();
    hasLiked();
  }, []);

  const retrieveAcc = () => {
    api
      .get(`${config.API}/user/retrieve?col=account_id&val=${account_id}`)
      .then((res) => {
        if (res.data.success === true) {
          setAccDeets(res.data.user[0]);
          getProfilePicture(res.data.user[0].dp_id);
        }
      });
  };

  const editedTime = () => {
    if (updated_at != created_at) {
      setChanged(true);
    }
  };

  const calculateTime = () => {
    const postDate = new Date(created_at);
    const now = new Date();
    const diff = now.getTime() - postDate.getTime();

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));

    if (diff < 1000 * 60) {
      setDuration("Just Now");
    } else if (minutes === 1) {
      setDuration("1 minute ago");
    } else if (minutes < 60) {
      setDuration(`${minutes} minutes ago`);
    } else if (hours === 1) {
      setDuration("1 hour ago");
    } else if (hours < 24) {
      setDuration(`${hours} hours ago`);
    } else if (days === 1) {
      setDuration("1 day ago");
    } else if (days < 7) {
      setDuration(`${days} days ago`);
    } else if (weeks === 1) {
      setDuration("a week ago");
    } else {
      const month = postDate.getMonth() + 1;
      const day = postDate.getDate();
      const year = postDate.getFullYear();
      setDuration(`${month}/${day}/${year}`);
    }
  };

  const getProfilePicture = (accID: number) => {
    api
      .get(`${config.API}/file/retrieve?col=file_id&val=${accID}`)
      .then(async (res) => {
        if (res.data.success == true && res.data.filedata) {
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
        }
      })
      .catch((err) => {
        console.log("File Err? ", err);
      });
  };

  const viewProfile = () => {
    localStorage.setItem("view_id", JSON.stringify(account_id));
    if (account_id !== payloadObj?.userID) {
      setTimeout(() => {
        navigate("/profile/user");
      }, 50);
    } else {
      setTimeout(() => {
        navigate("/profile");
      }, 50);
    }
  };

  const countLike = () => {
    api
      .get(`${config.API}/react/count?col=post_id&val=${props.post_id}`)
      .then((res) => {
        if (res.data.success == true) {
          setIsItLike(res.data.post[0].count);
          setIsLike(res.data.isLiked);
        } else {
        }
      })
      .catch((err) => {});
  };

  const likeUser = async () => {
    const previous = await hasLiked();

    if (previous === 0) {
      api
        .post(`${config.API}/react/create`, {
          postID: props.post_id,
          reactID: payloadObj?.userID,
        })
        .then((res) => {
          if (res.data.success === true) {
            setIsItLike(isItLike + (isLike ? -1 : 1));
            setIsLike(true);
          }
        });
    } else {
      api
        .post(`${config.API}/react/relike?reaction_id=${previous}`)
        .then((res) => {
          if (res.data.success === true) {
            setIsItLike(isItLike + (isLike ? -1 : 1));
            setIsLike(true);
          }
        });
    }
  };

  const unlikePost = async () => {
    const previous_id = await hasLiked();

    //console.log("Went in here",previous_id);
    if (previous_id !== 0) {
      api
        .post(`${config.API}/react/delete?reaction_id=${previous_id}`)
        .then((res) => {
          if (res.data.success === true) {
            setIsItLike(isItLike + (isLike ? -1 : 1));
            setIsLike(false);
          }
        });
    }
  };

  const hasLiked = async () => {
    var retVal = 0;
    await api
      .get(
        `${config.API}/react/retrieveparams?col1=post_id&val1=${props.post_id}&col2=reactor_id&val2=${payloadObj?.userID}`
      )
      .then((res) => {
        if (res.data.success === true && res.data.records.length > 0) {
          if (res.data.records[0].deleted_at !== null) {
            retVal =
              res.data.records[0].reaction_id !== null
                ? res.data.records[0].reaction_id
                : 0;
          } else {
            //console.log("retrieve");
            setIsLike(true);
            retVal =
              res.data.records[0].reaction_id !== null
                ? res.data.records[0].reaction_id
                : 0;
          }
        }
      });
    return retVal;
  };

  return (
    <div className="bg-white rounded-[20px] px-[2%] py-[2%] mb-[2%] dark:bg-black">
      {!isEditOpen ? (
        <>
          <div className="flex items-center">
            <div className="w-[50px] h-[50px]">
              <img
                src={dpURL !== null ? dpURL : user}
                alt="Profile Picture"
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <div className="w-[89%] ml-[1%]">
              <h1
                className="font-semibold text-[1.3em] hover:cursor-pointer dark:text-white"
                onClick={viewProfile}
              >
                {accDeets?.name}
              </h1>
              <p className="text-[1em] text-[#9D9D9D]">
                {duration} {changed && "• Edited"}
              </p>
            </div>
            <div className="flex items-center">
              {is_owner && (
                <div className="flex mr-[10%] ml-[-22%]">
                  <PiPencilCircleDuotone
                    className="hover:animate-pop1 text-[2em] text-[#1c1c1c] cursor-pointer mr-[10px] dark:text-white"
                    name="Edit"
                    onClick={() => {
                      setIsEditOpen(true);
                    }}
                  />
                  <PiXCircleDuotone
                    className="hover:animate-pop1 text-[2em] text-[#1c1c1c] cursor-pointer dark:text-white"
                    onClick={() => setIsDeleteOpen(true)}
                    name="Delete"
                  />
                </div>
              )}
              <div className="mr-[5%]">
                {isLike ? (
                  <FaHeart
                    onClick={unlikePost}
                    className="animate-pop1 text-[2em] text-[#D2042D] dark:text-white cursor-pointer"
                  />
                ) : (
                  <FaRegHeart
                    onClick={likeUser}
                    className="animate-pop2 text-[2em] dark:text-white cursor-pointer"
                  />
                )}
              </div>
              <div>
                <p className="text-[1.1em] ml-[30%] dark:text-white">
                  {isItLike}
                </p>
              </div>
            </div>
          </div>
          <div className="ml-[0.5%] mr-[1%] mt-[1%] text-justify dark:text-white">
            {content}
          </div>
        </>
      ) : (
        <EditPost
          postContent={content}
          onClose={() => {
            setIsEditOpen(false);
          }}
          postId={post_id}
          postName={accDeets ? accDeets?.name : null}
          postDuration={duration}
          imageUrl={dpURL !== null ? dpURL : user}
        />
      )}

      {/* Delete Popup */}
      <Delete
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
        }}
        postId={post_id}
      />
    </div>
  );
};

export default PostCard;
