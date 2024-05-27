import React, { useEffect, useState } from "react";
import NotificationCard from "../../components/card/NotificationCard";
import Spinner from "../../components/loader/Spinner";
import { NotifProps } from "../../common/interface";
import api from "../../hooks/api";
import config from "../../common/config";

const Notifications = () => {
  const [loading, setLoading] = useState(false);
  const [notifs, setNotifs] = useState<NotifProps[]>([]);
  const payload = localStorage.getItem("payload");
  const payloadObj = payload && JSON.parse(payload);
  const [notifLoading, setNotifLoading] = useState(false);

  useEffect(() => {
    fetchNotifs();
  });

  const fetchNotifs = () => {
    setNotifLoading(true);

    api
      .get(`${config.API}/notif?userID=${payloadObj?.userID}`)
      .then((res) => {
        if (res.data.success === true) {
          setNotifs(res.data.notif);
          setTimeout(() => {
            setNotifLoading(false);
          }, 1000);
        }
      })
      .catch((err) => {});
  };

  return (
    <div className="animate-fade-in w-[80%]">
      <div className="bg-white ml-[2%] h-full">
        <div>
          <h1 className="pl-[2%] py-[1%] text-[2.2em] font-semibold">
            Notifications
          </h1>
        </div>
        <hr />
        {loading ? (
          <div className="flex justify-center mt-[2%]">
            <Spinner />
          </div>
        ) : (
          <>
            {notifs.map((notif, index) => {
              <NotificationCard {...notif} key={index} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Notifications;
