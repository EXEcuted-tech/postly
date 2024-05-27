import React from "react";
import { FaHeart } from "react-icons/fa";
import user from "../../assets/user-icon.jpg";
import { NotifProps } from "../../common/interface";

const NotificationCard = (props: NotifProps) => {
  const { notif_id, account_id, actor_id, type, message, post_id };

  return (
    <div>
      <div className="flex ml-[3%] mt-[1%]">
        <FaHeart className="text-primary text-[3em]" />
        <div className="ml-[1%] w-[50px] h-[50px]">
          <img
            src={user}
            alt="Profile Picture"
            className="rounded-full object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="flex ml-[7%] mt-[1%] text-[1.2em]">
        <h1 className="font-semibold">Lizzeuu!</h1>
        <p>‎ liked your post</p>
      </div>
      <div className="mx-[7%]">
        <p className="text-[1em] text-[#727272] text-justify">
          Sa isang sulyap mo ay nabihag ako para bang himala ang lahat ng ito sa
          isang sulyap mo yawa yawa ka ty HAAHAHAHAHAH PISTE NANG COVER PHOTO
          asdfasdfasdfasfasfasdf
        </p>
      </div>
      <hr className="my-[1%]" />
    </div>
  );
};

export default NotificationCard;
