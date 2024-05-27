import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import user from "../../assets/user-icon.jpg";
import { NotifProps, PostProps, UserProps } from "../../common/interface";
import api from "../../hooks/api";
import config from "../../common/config";
import { useNavigate } from "react-router-dom";

const NotificationCard = (props: NotifProps) => {
  const { notif_id, account_id, actor_id, type, message, post_id } = props;
  const payload = localStorage.getItem("payload");
  const payloadObj = payload && JSON.parse(payload);

  const [dpURL, setDpURL] = useState<string | null>(null);
  const [actorDeets, setActorDeets] = useState<UserProps>();
  const [postDeets, setPostDeets] = useState<PostProps>();

  const navigate = useNavigate();

  useEffect(() => {
    retrieveActor();
    fetchPost();
  }, []);

  const retrieveActor = () => {
    api
      .get(`${config.API}/user/retrieve?col=account_id&val=${actor_id}`)
      .then((res) => {
        console.log("Retrieve Account info: ", res.data.user[0]);
        if (res.data.success === true) {
          setActorDeets(res.data.user[0]);
          getProfilePicture(res.data.user[0].dp_id);
        }
      });
  };

  const fetchPost = () => {
    api
      .get(`${config.API}/post/retrieve?col=post_id&val=${post_id}`)
      .then((res) => {
        console.log("Retrieve Post info: ", res.data.post[0]);
        if (res.data.success === true) {
          setPostDeets(res.data.post[0]);
        }
      })
      .catch((err) => {});
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

  return (
    <div>
      <div className="flex ml-[3%] mt-[1%]">
        <FaHeart className="text-primary text-[3em]" />
        <div className="ml-[1%] w-[50px] h-[50px]">
          <img
            src={dpURL !== null ? dpURL : user}
            alt="Profile Picture"
            className="rounded-full object-cover w-full h-full"
            onClick={viewProfile}
          />
        </div>
      </div>
      <div className="flex ml-[7%] mt-[1%] text-[1.2em]">
        <h1 className="font-semibold" onClick={viewProfile}>
          {actorDeets?.name}
        </h1>
        <p>
          {" "}
          {type !== "follow" ? "\u00A0 liked your post" : "\u00A0followed you"}
        </p>
      </div>
      <div className="mx-[7%]">
        <p className="text-[1em] text-[#727272] text-justify">
          {postDeets?.content}
        </p>
      </div>
      <hr className="my-[1%]" />
    </div>
  );
};

export default NotificationCard;
