import React from 'react'

const DashCardLoader = () => {
  return (
    <div className='mr-[2%]'>
        <div className='rounded-[20px] bg-white w-[460px] h-[259px] drop-shadow-md p-[3%]'>
            <div className='animate-pulse w-[150px] h-[30px] rounded-lg bg-gray-200 '></div>
            <div className='flex my-[5%] justify-center'>
                <div className='w-[250px] h-[100px] rounded-lg animate-pulse bg-gray-200 '>             
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='w-[250px] h-[30px] rounded-lg animate-pulse bg-gray-200 text-center'></div>
            </div> 
        </div>
    </div>
  )
}

export default DashCardLoader