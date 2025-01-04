import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useContextTodo } from '../context/ContextProvider';
import { FcGoogle } from "react-icons/fc";


const CreateNewPassword: React.FC = () => {
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const { email,setEmail}:any = useContextTodo();
    
    
    const host = "https://notes-app-qa3n.onrender.com";
    // const host = "http://localhost:4002";

    const { _id, authtoken } = useParams<{ _id: string; authtoken: string }>();
    if (!_id || !authtoken) {
        return <p className='mx-4 my-2 text-2xl'>Missing parameters!</p>;
      }

    let navigate = useNavigate();
    const handleSubmitNewPassword = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/user/usercreatenewpassword/${_id}/${authtoken}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password, code })
        });
        const json = await response.json();
        console.log(json);
        if (json.success === true) {
            navigate('/login');
            alert("Password is new created successfully");
            setEmail('');
        }
        else {
            alert("Password is not created. Please check your password and otp");
        }
    }
  return (
    <div className='min-h-[100vh] w-full bg-[#f1f2f3]'>
    <div className='flex flex-col justify-center items-center py-10'>
        <form action="" onSubmit={handleSubmitNewPassword} className='flex flex-col xl:w-[30%] md:w-[50%] w-[70%] my-2 bg-white shadow-md p-6 rounded'>
            <div className='flex justify-center  items-center'>
                <h4 className='flex justify-center shadow-sm bg-slate-100 rounded px-2 mb-4 text-xl  text-center text-gray-900 font-serif'><FcGoogle className='w-6' /> <span className='text-sm text-[#009dff] underline'>{email}</span></h4>
            </div>
            {/* <h4 className='text-xl py-3 text-center text-gray-900 font-serif'>Create New Password</h4> */}
            <label htmlFor="password" className='font-serif'>Enter New Password</label>
            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}  className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="password" id="password" placeholder='Enter your new password' />
            <label htmlFor="code" className='font-serif'>Enter OTP</label>
            <input type="text" value={code} onChange={(e)=>{setCode(e.target.value)}}  className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="otp" id="otp" placeholder='Enter your otp' />
            <button type='submit' className='border-[1px] my-3 border-gray-900 px-2 py-1 cursor-pointer bg-[#009dff] text-white rounded'>Change Password</button>
        </form>
    </div>
</div>
  )
}

export default CreateNewPassword
