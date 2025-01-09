import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useContextTodo } from '../context/ContextProvider';

const OtpVerify: React.FC = () => {
    const { mode }: any = useContextTodo()
    const [code, setCode] = useState<string>('');
    const navigate = useNavigate();
    const host = "https://notes-app-qa3n.onrender.com";
    // const host = "http://localhost:4002";

    const handleOtpSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${host}/api/user/verifyemail`, { code: code });
            if (response.data.success) {
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
                // setCredentials('');
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }
        } catch (error) {
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
            <div className={`pt-10 w-full min-h-[91vh] ${mode === true ? 'bg-[#2c2c2c] text-white' : 'bg-[#f1f2f3] text-black'}`}>
                <div className='flex flex-col justify-center items-center py-10'>
                    <ToastContainer />
                    <form action=""
                        onSubmit={handleOtpSubmit}
                        className={`flex flex-col xl:w-[30%] md:w-[50%] sm:w-[70%] w-[90%] my-2 ${mode === true ? 'bg-[#212529] text-white' : 'bg-white text-gray-900'} shadow-sm p-6 rounded`}>
                        <div className='flex justify-center  items-center'>
                            <h4
                                className={`flex justify-center shadow-sm  ${mode === true ? 'bg-[#212529] text-white':'bg-slate-100'} rounded px-2 mb-4 text-xl py-1 text-center font-serif`}>
                                <FcGoogle className='w-6' />
                                <span className='text-sm text-[#009dff] underline'>gmail.com</span>
                            </h4>
                        </div>
                        <label htmlFor="email" className='font-serif text-sm '>Enter the 6-digit verification code to sign up</label>
                        <input type="text"
                            value={code}
                            onChange={onChange}
                            className={`px-1 py-1 mb-1 border-[1px] ${mode === true ?'bg-[#212529] text-white' :'bg-white text-gray-900'} rounded outline-none`}
                            name="code" id="code"
                            placeholder='Enter OTP' />

                        <button type='submit'
                            className='border-[1px] my-3 border-gray-900 px-2 hover:scale-95 py-1 cursor-pointer bg-[#009dff] text-white rounded'>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default OtpVerify
