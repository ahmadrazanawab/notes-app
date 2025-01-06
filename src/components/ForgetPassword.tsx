import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useContextTodo } from '../context/ContextProvider';
import axios from 'axios';

const ForgetPassword: React.FC = () => {
    // const [email, setEmail] = useState('');
    const { email, setEmail, mode }: any = useContextTodo();
    const host = "https://notes-app-qa3n.onrender.com";
    // const host = "http://localhost:4002";
    const navigate = useNavigate();
    const handleForgotPassword = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${host}/api/user/userforgotpassword`,
                { email: email });

            if (response.data.success === true) {
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

                setTimeout(() => {
                    navigate(`/createnewpassword/${response.data.user}/${response.data.authtoken}`);
                }, 3000);
            }
        } catch (error) {
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
        }
    }
    return (
        <div className={`min-h-[91vh] w-full  ${mode === true ? 'bg-[#2c2c2c] text-white' : 'bg-[#f1f2f3] text-black'} `}>
            <div className='flex flex-col justify-center items-center py-10'>
                <ToastContainer />
                <form action=""
                    onSubmit={handleForgotPassword}
                    className={`flex flex-col xl:w-[30%] md:w-[50%] sm:w-[70%] w-[90%] my-2 ${mode === true ?'bg-[#212529] text-white' :'bg-white text-gray-900'} shadow-md p-6 rounded`}>
                    
                    <h4 className='text-xl py-3 text-center font-serif'>Find your email</h4>
                    <label htmlFor="email" className='font-serif'>Email Address</label>
                    <input type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        className={`px-1 py-1 mb-1 border-[1px] ${mode === true ? 'bg-[#212529] text-white' :'bg-white text-gray-900'} rounded outline-none`}
                        name="email" id="email"
                        placeholder='Enter your email' />
                    
                    <button type='submit'
                        className='border-[1px] my-3 hover:scale-95 border-gray-900 px-2 py-1 cursor-pointer bg-[#009dff] text-white rounded'>
                        Next
                    </button>
                    <div className='flex justify-end'>
                        <Link to="/login" className='text-[#009dff] font-serif underline'>Back</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword
