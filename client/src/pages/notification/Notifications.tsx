import React, { useEffect, useState } from "react";
import NotificationCard from "../../components/card/NotificationCard";
import Spinner from "../../components/loader/Spinner";
import { NotifProps } from "../../common/interface";
import api from "../../hooks/api";
import config from "../../common/config";

const Notifications = () => {
  const [notifs, setNotifs] = useState<NotifProps[]>([]);
  const payload = localStorage.getItem("payload");
  const payloadObj = payload && JSON.parse(payload);
  const [notifLoading, setNotifLoading] = useState(false);
  const [retrieved, setRetrieved] = useState(false);

  useEffect(() => {
    fetchNotifs();
  }, [retrieved]);

  const fetchNotifs = () => {
    setNotifLoading(true);
    api
      .get(`${config.API}/notif/all?userID=${payloadObj?.userID}`)
      .then((res) => {
        console.log(res.data.notif);
        if (res.data.success === true && res.data.notif) {
          setNotifs(res.data.notif);
          setTimeout(() => {
            setNotifLoading(false);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log("Error Retrieving Notifications: ", err);
      });
  };

  return (
    <div className='animate-fade-in w-[80%]'>
      <div className='bg-white ml-[2%] h-full dark:bg-black'>
        <div>
          <h1 className='pl-[2%] py-[1%] text-[2.2em] font-semibold dark:text-white'>Notifications</h1>
        </div>
        <hr />
        {notifLoading ? (
          <div className="flex justify-center mt-[2%]">
            <Spinner />
          </div>
        ) : (
          <>
            {notifs.length > 0 ? (
              <>
                {notifs.map((notif, index) => (
                  <NotificationCard {...notif} key={index} />
                ))}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[50vh]">
                <h1 className="mt-4 text-[#C2C2C2] text-[1.2em] font-light">
                  No notifications as of now...
                </h1>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Notifications;
