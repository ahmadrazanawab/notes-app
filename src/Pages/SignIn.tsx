import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useContextTodo } from '../context/ContextProvider';
import axios from 'axios';

const SignIn: React.FC = () => {
    const { credentials, setCredentials,mode }: any = useContextTodo();
    let navigate = useNavigate();
    const host = "https://notes-app-qa3n.onrender.com";
    // const host = "http://localhost:4002";

    // hadle submit sign in
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const { email, password } = credentials;

        try {
            const response = await axios.post(`${host}/api/user/login`,
                { email: email, password: password });

            if (response.data.success === true) {
                //save the auth token and redirect
                localStorage.setItem('token', response.data.authtoken);
                toast.success("Logged in Successfully", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setCredentials({ email: '', password: '' });
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
        } catch (error) {
            toast.error("Invalid crendentials. Please try again.", {
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
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className={`pt-10 w-full min-h-[100vh] ${mode === true ? 'bg-[#2c2c2c] text-white':'bg-[#f1f2f3] text-black'} `}>
            <div className='flex flex-col justify-center items-center py-10'>
                <ToastContainer />
                <form action=""
                    onSubmit={handleSubmit}
                    className={`flex flex-col xl:w-[30%] md:w-[50%] sm:w-[70%] w-[90%] sm:mx-0 mx-2 my-2 ${mode === true ?'bg-[#212529] text-white' :'bg-white text-gray-900'} shadow-sm p-6 rounded`}>
                    <h4 className='md:text-2xl text-xl pb-3 pt-1 text-center  font-serif'>Sign In</h4>
                    <label htmlFor="email" className='font-serif'>Email</label>
                    <input type="email"
                        value={credentials.email || ""}
                        onChange={onChange}
                        className={`px-1 py-1 mb-1 border-[1px] ${mode === true ?'bg-[#212529]':'bg-white'} rounded outline-none`}
                        name="email" id="email"
                        placeholder='Enter your email or number' />
                    
                    <label htmlFor="password" className='font-serif mt-1 flex sm:flex-row flex-col justify-between '>
                        <span className='sm:block hidden'>Password</span><Link to="/forgetpassword" className='text-sm flex text-[#007ac6] font-serif'>Forgot Password</Link><span className='sm:hidden'>Password</span>
                    </label>

                    <input type="password"
                        value={credentials.password || ""}
                        onChange={onChange}
                        className={`px-1 py-1 mb-1 border-[1px] ${mode === true ?'bg-[#212529]':'bg-white'} rounded outline-none`}
                        name="password" id="password"
                        placeholder='Enter your password' />
                    
                    <button type='submit' className='border-[1px] my-3 border-gray-900 px-2 py-1 cursor-pointer bg-[#009dff] text-white rounded'>Login</button>
                    <div className='flex justify-center'>
                        <p className='my-2 text-sm font-serif'>Don't have an account? <Link to='/signUp' className='tracking-tighter text-[#007ac6] underline font-sans'>Sign Up</Link> </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn
