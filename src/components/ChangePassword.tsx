import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { useContextTodo } from '../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ChangePassword: React.FC = () => {
    const { user }: any = useContextTodo();
    const [passwords, setPasswords] = useState({ password: "", oldPassword: "" });
    const host = "https://notes-app-qa3n.onrender.com";
    
    // const host = "http://localhost:4002";
    let navigate = useNavigate();
    const handleChangePassword = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        let { password, oldPassword } = passwords;
        const response = await fetch(`${host}/api/user/changepassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token') || ""
            },
            body: JSON.stringify({ password, oldPassword })
        })
        const json = await response.json();
        console.log(json);
        if (json.success === true) {
            toast.success("Password changed Successfully", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })

            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
        else {
            toast.error("Password is required or incorrect!", {
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
    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value })
    }
    return (
        <div className='min-h-[100vh] w-full bg-[#f1f2f3]'>
            <div className='flex flex-col justify-center items-center py-10'>
                <ToastContainer />
                <form action="" onSubmit={handleChangePassword} className='flex flex-col xl:w-[30%] md:w-[50%] sm:w-[70%] w-[90%] my-2 bg-white shadow-md p-6 rounded'>
                    <h4 className='flex justify-center items-center mb-2 px-2 text-center text-gray-900 font-serif'><FcGoogle className='w-6' /> <span className='font-serif'>{user.email}</span></h4>
                    <label htmlFor="odlpassword" className='font-serif'>Old Password</label>
                    <input type="password" value={passwords.oldPassword} onChange={onchange} className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="oldPassword" id="oldPassword" placeholder='Enter your old password' />
                    <label htmlFor="password" className='font-serif'>New Password</label>
                    <input type="password" value={passwords.password} onChange={onchange} className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="password" id="password" placeholder='Enter your new password' />
                    <button type='submit' className='border-[1px] my-3 border-gray-900 px-2 py-1 cursor-pointer bg-[#009dff] text-white rounded'>Change Password</button>
                    <div className='flex justify-end'>
                        <Link to="/" className='text-[#009dff] font-serif underline'>Back</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword
