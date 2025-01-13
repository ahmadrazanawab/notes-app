import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useContextTodo } from '../context/ContextProvider';
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Spinner from '../Pages/Spinner';


const CreateNewPassword: React.FC = () => {
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const { email, setEmail ,mode,loading, setLoading }: any = useContextTodo();


    const host = "https://notes-app-qa3n.onrender.com";
    // const host = "http://localhost:4002";

    const { _id, authtoken } = useParams<{ _id: string; authtoken: string }>();
    if (!_id || !authtoken) {
        return <p className='mx-4 my-2 text-2xl'>Missing parameters!</p>;
    }

    let navigate = useNavigate();
    const handleSubmitNewPassword = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post(`${host}/api/user/usercreatenewpassword/${_id}/${authtoken}`,
                { password: password, code: code });
            setLoading(false);
            if (response.data.success === true) {
                toast.success("Password is new created successfully", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setEmail('');

                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            setLoading(false);
            toast.error("Password is not created. Please check your password and otp", {
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

    return (
        <div className={`pt-10 min-h-[91vh] w-full ${mode === true ? 'bg-[#2c2c2c] text-white':'bg-[#f1f2f3] text-black'}`}>
            <div className='flex flex-col justify-center items-center py-10'>
                <div className='my-3'>{loading && <Spinner/> }</div>
                {!loading && (<form action=""
                    onSubmit={handleSubmitNewPassword}
                    className={`flex flex-col xl:w-[30%] md:w-[50%] sm:w-[70%] w-[90%] my-2 ${mode === true ? 'bg-[#212529] text-white' : 'bg-white text-gray-900'} shadow-md p-6 rounded`}>
                    
                    <ToastContainer />
                    <div className='flex justify-center  items-center'>
                        <h4 className='flex justify-center shadow-sm bg-slate-100 rounded px-2 mb-4 text-xl  text-center text-gray-900 font-serif'><FcGoogle className='w-6' /> <span className='text-sm text-[#009dff] underline'>{email}</span></h4>
                    </div>

                    <label htmlFor="password" className='font-serif'>Enter New Password</label>
                    <input type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        className={`px-1 py-1 mb-1 border-[1px] ${mode === true ? 'bg-[#212529]' : 'bg-white'} rounded outline-none`}
                        name="password" id="password"
                        placeholder='Enter your new password' />
                    
                    <label htmlFor="code" className='font-serif'>Enter OTP</label>
                    <input type="text"
                        value={code}
                        onChange={(e) => { setCode(e.target.value) }}
                        className={`px-1 py-1 mb-1 border-[1px] ${mode === true ? 'bg-[#212529]' : 'bg-white'} rounded outline-none`}
                        name="otp" id="otp"
                        placeholder='Enter your otp' />
                    
                    <button type='submit' className='border-[1px] my-3 border-gray-900 px-2 py-1 cursor-pointer bg-[#009dff] text-white rounded'>Change Password</button>
                </form>)}
            </div>
        </div>
    )
}

export default CreateNewPassword
