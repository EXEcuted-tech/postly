import React from 'react'

const GraphLoader = () => {
  return (
    <div className='rounded-[20px] mb-[2%] bg-white w-full drop-shadow-md min-h-[60vh] p-[2.5%]'>
        <div>
            <div className='animate-pulse w-[250px] h-[30px] rounded-lg bg-gray-200 '></div>
        </div>
        <div>
            <div className='mt-[2%] animate-pulse w-[1400px] h-[440px] rounded-lg bg-gray-200 '></div>
        </div>
    </div>
  )
}

export default GraphLoader