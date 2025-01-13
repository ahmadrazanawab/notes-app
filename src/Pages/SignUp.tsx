import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useContextTodo } from '../context/ContextProvider';
import axios from 'axios';
import Spinner from './Spinner';



const SignUp: React.FC = () => {
    const { credentials, setCredentials,mode,loading, setLoading }: any = useContextTodo()
    const navigate = useNavigate();
    const host = "https://notes-app-qa3n.onrender.com";
    // const host = "http://localhost:4002";

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const { name, email, number, password } = credentials;
        
        try {
            setLoading(true);
            const response = await axios.post(`${host}/api/user/createuser`,
                { name: name, email: email, number: number, password: password });
            
            setLoading(false);
            if (response.data.success === true) {
                setCredentials({ name: '', email: '', number: '', password: '' });
                toast.success("Send OTP your email Successfully", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setTimeout(() => {
                    navigate("/otpverify");
                }, 3000);
            }
        } catch (error) {
            setLoading(false);
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
        <div className={`pt-16 w-full min-h-[100vh] ${mode === true ? 'bg-[#2c2c2c] text-white':'bg-[#f1f2f3] text-black'}`}>
            <div className='flex flex-col justify-center items-center py-2'>
                <div className='my-4'>{loading && <Spinner/> }</div>
                {!loading && (<form action=""
                    onSubmit={handleSubmit}
                    className={`flex flex-col md:w-[50%] xl:w-[30%] sm:w-[70%] w-[90%] my-2 ${mode === true ? 'bg-[#212529] text-white' : 'bg-white text-gray-900'} shadow-sm p-6 rounded`}>
                    <ToastContainer />
                    <h4 className='text-xl py-1 text-center font-serif'>Sign Up</h4>
                    <label htmlFor="name">Name</label>
                    <input type="text"
                        value={credentials.name || ""}
                        onChange={onChange}
                        className={`px-1 py-1 mb-1 border-[1px] ${mode === true ? 'bg-[#212529] border-white' : 'bg-white border-gray-900'}  rounded outline-none`}
                        name='name' id="name"
                        placeholder='Enter your name' minLength={3} />
                    
                    <label htmlFor="email">Email</label>
                    <input type="email"
                        value={credentials.email || ""}
                        onChange={onChange}
                        className={`px-1 py-1 mb-1 border-[1px] ${mode === true ? 'bg-[#212529] border-white' : 'bg-white border-gray-900'} rounded outline-none`}
                        name="email" id="email"
                        placeholder='Enter your email' />
                    
                    <label htmlFor="number">Number</label>
                    <input type="number"
                        value={credentials.number || ""}
                        onChange={onChange}
                        className={`px-1 py-1 mb-1 border-[1px] ${mode === true ? 'bg-[#212529] border-white' : 'bg-white border-gray-900'} rounded outline-none`}
                        name="number" id="number"
                        placeholder='Enter your mobile number'
                        minLength={10} maxLength={10} />
                    
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        value={credentials.password || ""}
                        onChange={onChange}
                        className={`px-1 py-1 mb-1 border-[1px] ${mode === true ? 'bg-[#212529] border-white' : 'bg-white border-gray-900'} rounded outline-none`}
                        name="password" id="password"
                        placeholder='Enter your password' minLength={6} />
                    
                    <p className='tracking-tighter text-sm mb-4 text-gray-500'>Passwords must be at least 6 characters.</p>
                    <label htmlFor="check" className='flex items-center'><input type="checkbox" name="check" id="check" required /><p className='text-sm mx-2'>I agree to the <span className='text-[#018ce3]'>Terms and Conditions</span></p></label>
                    <button type='submit' className='border-[1px] hover:scale-95 my-3  px-2 py-1 cursor-pointer bg-[#009dff] text-white rounded'>Verify email</button>
                    <div className='flex justify-center'>
                        <p className='my-2 text-sm  font-sans'>already have an account? <Link to='/login' className='text-[#007ac6] underline tracking-tighter'>Login</Link> </p>
                    </div>
                </form>)}
            </div>
        </div>
    )
}

export default SignUp
