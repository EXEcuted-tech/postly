import React from 'react'
import NotificationCard from '../../components/card/NotificationCard'

const Notifications = () => {
  return (
    <div className='animate-fade-in w-[80%]'>
      <div className='bg-white ml-[2%] h-full'>
        <div>
          <h1 className='pl-[2%] py-[1%] text-[2.2em] font-semibold'>Notifications</h1>
        </div>
        <hr/>
        <div>
          <NotificationCard/>
        </div>
      </div>
    </div>
  )
}

export default Notifications