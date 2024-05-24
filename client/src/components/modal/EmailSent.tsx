import React from 'react'

const EmailSent = () => {
  return (
    <div className='w-full h-full bg-gray-900'>
      <div className='absolute w-[40%] h-[40%] top-[28%] left-[30%] rounded-[50px] shadow-2xl text-center'>
        <div className='text-white'>
          <div className='flex justify-end mt-[3%] mb-[2%]'>
          </div>
          <div className='text-center'>
            <h1 className='text-6xl font-medium text-black mb-[3%]'>Email sent!</h1>
            <div className='text-center'>
              <p className='text-[#8F8F8F] text-5xl font-medium'>Check your email to</p>
              <p className='text-[#8F8F8F] text-5xl font-medium mt-[1%] mb-[4%]'> retrieve your account</p>
            </div>
            
              <div className='text-center'>
                <button type='submit' className='text-black bg-primary text-3xl w-[27%] py-[1.5%] mt-[1%] font-bold rounded-lg'>Go Back</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailSent