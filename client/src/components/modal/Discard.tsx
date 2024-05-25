import React from 'react'

const Discard = () => {
  return (
    <div className='w-full h-full bg-gray-900'>
      <div className='absolute w-[50%] h-[47%] top-[27%] left-[25%] rounded-[50px] shadow-2xl dark:bg-black'>
        <div className='text-white'>
          <div className='flex ml-[5%]'>
            <form className='inline text-black w-[89%]'>
              <div className='ml-[3%] mb-[5%] mt-[10%] w-full text-center'>
                <p className='font-semibold text-5xl dark:text-white' >Discard Changes?</p>
              </div>
              <div className='ml-[3%] mb-[1%] w-full text-center'>
                <p className='font-normal text-4xl dark:text-white'>If you leave, your changes will not be</p>
              </div>
              <div className='ml-[3%] mb-[5%] w-full text-center'>
                <p className='font-normal text-4xl dark:text-white'>saved.</p>
              </div>
              <div className='flex justify-center mt-[2%]'>
                <button type='submit' className=' bg-black text-white text-3xl w-[20%] py-[2%] mt-[1%] mr-[10%] font-bold rounded-md dark:bg-white dark:text-black'>Cancel</button>
                <button type='submit' className=' bg-primary text-black text-3xl w-[20%] py-[2%] mt-[1%] font-bold rounded-md'>Discard</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Discard