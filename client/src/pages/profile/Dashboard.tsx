import React, { useEffect, useRef, useState } from 'react'
import { FaThumbsUp } from "react-icons/fa";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import DashCardLoader from '../../components/loader/DashCardLoader';
import GraphLoader from '../../components/loader/GraphLoader';
import api from '../../hooks/api';
import config from '../../common/config';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { MonthlyCount } from '../../common/interface';
import { getMonth } from '../../helpers/functions';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const payload = localStorage.getItem("payload");
  const payloadObj = payload && JSON.parse(payload);

  const [loading,setLoading] = useState(false);
  const [gainedFollowers,setGainedFollowers]=useState(0);
  const [lostFollowers,setLostFollowers]=useState(0)
  const [numFollowers, setNumFollowers] = useState<MonthlyCount[]>([]);
  const [numLikes, setNumLikes] = useState<MonthlyCount[]>([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [plusLikes,setPlusLikes] = useState(0)
  const [year,setYear] = useState(0);

  const chartRef = useRef(null);

  useEffect(() => {
    const now = new Date();
    setYear(now.getFullYear());

    setLoading(true);
    setTimeout(async ()=>{
      await getGainedFollowers();
      await getLostFollowers();
      await getMonthlyFollowers();
      await getMonthlyLikes();
      await getTotalLikes();
    },1000)

  }, []);

  const getGainedFollowers = () =>{
    api.get(`${config.API}/follow/retrieve/count_gained?col=account_id&val=${payloadObj?.userID}`)
    .then((res)=>{
      if(res.data.success === true){
        setGainedFollowers(res.data.count);
      }
    })
  }

  const getLostFollowers = () =>{
    api.get(`${config.API}/follow/retrieve/count_lost?col=follower_id&val=${payloadObj?.userID}`)
    .then((res)=>{
      if(res.data.success === true){
        setLostFollowers(res.data.count);
        setLoading(false);
      }
    })
  }

  const getMonthlyFollowers = () => {
    api.get(`${config.API}/follow/retrieve/monthly_followers?col=account_id&val=${payloadObj?.userID}`)
        .then((res) => {
            //console.log("Response: ",res);
            if (res.data.success === true) {
                setNumFollowers(res.data.monthlyCounts);
            }
        });
    };

    const getMonthlyLikes = () => {
        api.get(`${config.API}/react/retrieve/monthly?col=p.account_id&val=${payloadObj?.userID}`)
        .then((res) => {
            //console.log("Response: ",res);
            if (res.data.success === true) {
                setNumLikes(res.data.monthlyCounts);
            }
        });
    };

    const getTotalLikes = () => {
    api.get(`${config.API}/react/retrieve/total?col=p.account_id&val=${payloadObj?.userID}`)
        .then((res) => {
            //console.log("Response: ",res);
            if (res.data.success === true) {
                setTotalLikes(res.data.count[0].count);
                const currentDate = new Date();
                const currentYearMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
                const currentMonthData = numLikes.find(entry => entry.month === currentYearMonth);
                const currentMonthCount = currentMonthData ? currentMonthData.count : 0;
                const ans = currentMonthCount - plusLikes;
                setPlusLikes(ans)
            }
        });
    };

    const followersData = numFollowers.length > 0 ? numFollowers.map((data) => ({
        label: getMonth(data.month),
        followers: data.count,
      })) : [];

    const likesData = numLikes.length > 0 ? numLikes.map((data) => ({
        label: getMonth(data.month),
        likes: data.count,
    })) : [];

    return (
    <>
    {loading ?
    <>
    <div className='flex my-[2%]'>
        <DashCardLoader/>
        <DashCardLoader/>
        <DashCardLoader/>
    </div>
        <GraphLoader/>
        <GraphLoader/>
    </>
    :
    <div className='animate-fade-in font-poppins'>
    <div className='flex h-[24vh] my-[2%]'>
        <div className='rounded-[20px] bg-white w-[33%] drop-shadow-md px-[2%] py-[1.5%] dark:bg-black'>
            <h1 className='font-medium text-[1.7em] dark:text-white'>Total Likes Received</h1>
            <div className='flex items-center my-[2%] justify-center'>
                <div className='mr-[4%]'>
                    <FaThumbsUp className='text-[4em] text-primary'/>
                </div>
                <div>
                    <h1 className='font-bold text-[4em] dark:text-white'>{totalLikes}</h1>
                </div>
            </div>
            <p className='text-[#00A05D] text-center'>+{plusLikes} in 30 days</p>
        </div>
        <div className='rounded-[20px] bg-white w-[33%] drop-shadow-md mx-[2%] px-[2%] py-[1.5%] dark:bg-black'>
            <h1 className='font-medium text-[1.7em] dark:text-white'>Gained Followers</h1>
            <div className='flex items-center my-[2%] justify-center'>
                <div className='mr-[1%]'>
                    <FaArrowUpLong className='text-[4em] text-[#00B147] text-primary'/>
                </div>
                <div>
                    <h1 className='font-bold text-[4em] dark:text-white'>{gainedFollowers}</h1>
                </div>
            </div>
            <p className='text-[#7E7E7E] text-center dark:text-[#C2C2C2]'>vs previous 30 days</p>
        </div>
        <div className='rounded-[20px] bg-white w-[33%] drop-shadow-md px-[2%] py-[1.5%] dark:bg-black'>
            <h1 className='font-medium text-[1.7em] dark:text-white'>Lost Followers</h1>
            <div className='flex items-center my-[2%] justify-center'>
            <div className='mr-[1%]'>
                    <FaArrowDownLong className='text-[4em] text-[#00B147] text-primary'/>
                </div>
                <div>
                    <h1 className='font-bold text-[4em] dark:text-white'>{lostFollowers}</h1>
                </div>
            </div>
            <p className='text-[#7E7E7E] text-center dark:text-[#C2C2C2]'>vs previous 30 days</p>
        </div>
    </div>
    <div className='rounded-[20px] bg-white w-full drop-shadow-md min-h-[60vh] p-[2.5%] dark:bg-black'>
        <div>
            <h1 className='font-medium text-[1.7em] dark:text-white'>Likes Gained Over Time</h1>
        </div>
        <div>
        <Line 
            ref={chartRef}
            data={{
                labels: likesData.map((data)=>data.label),
                datasets:[
                    {
                        label: "Likes Received",
                        data: likesData.map((data)=>data.likes),
                        backgroundColor: "#C80815",
                        borderColor: "#C80815"
                    }
                ]
            }}
            />
        </div>
    </div>
    <div className='my-[2%] rounded-[20px] bg-white w-full drop-shadow-md min-h-[60vh] p-[2.5%] dark:bg-black'>
        <div>
            <h1 className='font-medium text-[1.7em] dark:text-white'>Follower Growth Over Time</h1>
            <p className='text-[#737373] dark:text-[#C2C2C2]'>as of the year {year}</p>
        </div>
        <div>
            <Line 
            ref={chartRef}
            data={{
                labels: followersData.map((data)=>data.label),
                datasets:[
                    {
                        label: "Followers",
                        data: followersData.map((data)=>data.followers),
                        backgroundColor: "#064FF0",
                        borderColor: "#064FF0"
                    }
                ]
            }}
            />
        </div>
    </div>
    </div>
    }
    </>
  )
}

export default Dashboard