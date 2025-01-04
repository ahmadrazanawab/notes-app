import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useContextTodo } from '../context/ContextProvider';

const OtpVerify: React.FC = () => {
    const [code, setCode] = useState<string>('');
    const { credentials,setCredentials }:any = useContextTodo();
    const navigate = useNavigate();
    const host = "https://notes-app-qa3n.onrender.com";
    // const host = "http://localhost:4002";
    const handleOtpSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/user/verifyemail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code })
        });
        const json = await response.json();
        console.log(json);
        if (response.ok) {
            // alert("Sign up successfully");
            toast.success("Sign up successfully", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setCredentials('');
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } else {
            // alert("Invalid otp")
            toast.error("Invalid OTP or Expired", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCode(value);
    };
    return (
        <>
            <div className='w-full md:min-h-[80vh] bg-[#f1f2f3]'>
                <div className='flex flex-col justify-center items-center py-10'>
                    <ToastContainer />
                    <form action="" onSubmit={handleOtpSubmit} className='flex flex-col xl:w-[30%] md:w-[50%] sm:w-[70%] w-[90%] my-2 bg-white shadow-sm p-6 rounded'>
                        <div className='flex justify-center  items-center'>
                            <h4 className='flex justify-center shadow-sm bg-slate-100 rounded px-2 mb-4 text-xl py-1 text-center text-gray-900 font-serif'><FcGoogle className='w-6' /> <span className='text-sm text-[#009dff] underline'>{credentials.email}</span></h4>
                        </div>
                        <label htmlFor="email" className='font-serif text-sm '>Enter the 6-digit verification code to sign up</label>
                        <input type="text" value={code} onChange={onChange} className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="code" id="code" placeholder='Enter OTP' />
                        <button type='submit' className='border-[1px] my-3 border-gray-900 px-2 py-1 cursor-pointer bg-[#009dff] text-white rounded'>Sign Up</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default OtpVerify
