import React from 'react'
import { Link } from 'react-router-dom'

const SignUp :React.FC= () => {
  return (
    <div className='w-full bg-[#f1f2f3]'>
          <div className='flex flex-col justify-center items-center py-10'>
              <form action="" className='flex flex-col md:w-[50%] xl:w-[30%] w-[60%] my-2 bg-white shadow-md p-6 rounded'>
                <h4 className='text-xl py-3 text-center text-gray-900 font-serif'>Sign Up Form</h4>
                  <label htmlFor="name">Name</label>
                  <input type="text" className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name='name' id="name" placeholder='Enter your name' />
                  <label htmlFor="email">Email</label>
                  <input type="email" className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="email" id="email" placeholder='Enter your email'/>
                  <label htmlFor="number">Number</label>
                  <input type="number" className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="number" id="number" placeholder='Enter your mobile number' />
                  <label htmlFor="password">Password</label>
                  <input type="password" className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="password" id="password" placeholder='Enter your password'/>
                  <p className='tracking-tighter text-sm mb-4 text-gray-500'>Passwords must be contain at least six charecters</p>
                  <label htmlFor="check" className='flex items-center'><input type="checkbox" name="check" id="check" required /><p className='text-sm mx-2'>I agree to the <span className='text-[#018ce3]'>Terms and Conditions</span></p></label>
                  <button className='border-[1px] my-3 border-gray-900 px-2 py-1 cursor-pointer bg-[#009dff] text-white rounded'>Sign Up</button>
              </form>
              <p className='text-gray-900 my-6  font-sans'>already have an account? <Link to='/signIn' className='text-[#007ac6] underline tracking-tighter'>Sign In</Link> </p>
       </div>
    </div>
  )
}

export default SignUp
