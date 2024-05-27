import React, { useEffect, useState } from 'react'
import user from '../../assets/user-icon.jpg'
import api from '../../hooks/api';
import config from '../../common/config';
import { FollowProps, UserProps } from '../../common/interface';
import { useNavigate } from 'react-router-dom';

const FollowCard = (props:FollowProps) => {
    const {account_id,follower_id,type, isFollowing} = props
    const navigate = useNavigate();
    const payload = localStorage.getItem('payload');
    const payloadObj = payload && JSON.parse(payload);
    
    const [dpURL,setDpURL]=useState<string | null>(null);
    const [accDeets,setAccDeets] = useState<UserProps>();

    useEffect(()=>{
        retrieveAcc();
        console.log("DP URL: ", dpURL);
    },[props,dpURL])

    const retrieveAcc = () =>{
        var val = type==='following' ? account_id : follower_id;
        console.log("Acc: ", account_id, "Follower: ", follower_id, "VALUE: ",val);
        api.get(`${config.API}/user/retrieve?col=account_id&val=${val}`)
        .then(async (res)=>{
          if(res.data.success===true){
            setAccDeets(res.data.user[0]);
            await getProfilePicture(res.data.user[0].dp_id)
          }
        })
      }

      const getProfilePicture = (accID:number) =>{
        console.log("Acc ID: ",accID);
        if(accID!==null){
            api.get(`${config.API}/file/retrieve?col=file_id&val=${accID}`)
            .then(async (res)=>{
            if(res.data.success == true && res.data.filedata){
                const response = await api.get(`${config.API}/file/fetch?pathfile=${encodeURIComponent(res.data.filedata.path)}`, {
                responseType: 'arraybuffer',
                });
        
                const url = URL.createObjectURL(new Blob([response.data]));
                setDpURL(url);
            }
            }).catch((err)=>{
            console.log("File Err? ", err);
            })
        }else{
            setDpURL(null);
        }
    }
      
    const viewProfile = () =>{
        const id = type==='following'? account_id : follower_id;
        localStorage.setItem('view_id',JSON.stringify(id));
        if(id!==payloadObj?.userID){
            setTimeout(()=>{
                navigate('/profile/user')
            },50)
        }else{
            setTimeout(()=>{
                navigate('/profile')
            },50)
        }
    }
  return (
    <div>
        <div className='flex items-center px-[2%] py-[1%] border-b-[1px] border-[#F2F2F2]'>
            <div className='w-[50px] h-[50px] hover:cursor-pointer'
                onClick={viewProfile}>
                <img src={dpURL!==null ? dpURL :user} alt="Profile Picture" className='rounded-full object-cover w-full h-full'/>
            </div>
            <div className='ml-[1%]'>
                <h1 className='font-semibold text-[1.3em] hover:cursor-pointer'
                onClick={viewProfile}>{accDeets?.name}</h1>
                <p className='text-[1em] text-[#9D9D9D]'>@{accDeets?.account_handle}</p>
            </div>
        </div>
    </div>
  )
}

export default FollowCard