import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useContextTodo } from '../context/ContextProvider';

const ForgetPassword: React.FC = () => {
    // const [email, setEmail] = useState('');
    const { email, setEmail}:any = useContextTodo();
    const host = "https://notes-app-qa3n.onrender.com";
    // const host = "http://localhost:4002";
    const navigate = useNavigate();
    const handleForgotPassword = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/user/userforgotpassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email })
        })
        const json = await response.json();
        if (json.success === true) {
            navigate(`/createnewpassword/${json.user}/${json.authtoken}`);
            // localStorage.setItem('token', json.authtoken);
            // alert("password is reset succussfully");
            toast.success("Send OTP  succussfully", {
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
        else {
            toast.error("Email Not found", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            console.log(json);
        }

    }
    return (
        <div className='min-h-[100vh] w-full bg-[#f1f2f3]'>
            <div className='flex flex-col justify-center items-center py-10'>
                <ToastContainer />
                <form action="" onSubmit={handleForgotPassword} className='flex flex-col xl:w-[30%] md:w-[50%] w-[70%] my-2 bg-white shadow-md p-6 rounded'>
                    <h4 className='text-xl py-3 text-center text-gray-900 font-serif'>Find your email</h4>
                    <label htmlFor="email" className='font-serif'>Email Address</label>
                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="email" id="email" placeholder='Enter your email' />
                    <button type='submit' className='border-[1px] my-3 border-gray-900 px-2 py-1 cursor-pointer bg-[#009dff] text-white rounded'>Next</button>
                    <div className='flex justify-end'>
                        <Link to="/login" className='text-[#009dff] font-serif underline'>Back</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword
