import React from 'react'

const CreateNewPassword :React.FC= () => {
  return (
    <div className='min-h-[100vh] w-full bg-[#f1f2f3]'>
    <div className='flex flex-col justify-center items-center py-10'>
        <form action="" className='flex flex-col xl:w-[30%] md:w-[50%] w-[70%] my-2 bg-white shadow-md p-6 rounded'>
            <h4 className='text-xl py-3 text-center text-gray-900 font-serif'>Create New Password</h4>
            <label htmlFor="password" className='font-serif'>Create a New Password</label>
            <input type="password"  className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="password" id="password" placeholder='Enter your new password' />
            <label htmlFor="code" className='font-serif'>Enter OTP</label>
            <input type="text"  className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="otp" id="otp" placeholder='Enter your otp' />
            <button type='submit' className='border-[1px] my-3 border-gray-900 px-2 py-1 cursor-pointer bg-[#009dff] text-white rounded'>Submit</button>
        </form>
    </div>
</div>
  )
}

export default CreateNewPassword
