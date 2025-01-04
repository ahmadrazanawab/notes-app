import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useContextTodo } from '../context/ContextProvider';



const SignUp: React.FC = () => {
    // const [credentials, setCredentials] = useState({ name: "", email: "", number: "", password: ""});
    const {credentials, setCredentials }:any = useContextTodo()
    const navigate = useNavigate();
    const host = "https://notes-app-qa3n.onrender.com";
    // const host = "http://localhost:4002";
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const { name, email, number, password } = credentials;
        const response = await fetch(`${host}/api/user/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, number, password })
        });
        const json = await response.json();

        console.log(json.verificationCode);
        if (response.ok) {
            // localStorage.setItem('token', json.authtoken);
            setCredentials({name:'',email:'',number:'',password:''});
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
        } else {
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
        <div className='w-full md:min-h-[80vh] bg-[#f1f2f3]'>
            <div className='flex flex-col justify-center items-center py-2'>
                <form action="" onSubmit={handleSubmit} className='flex flex-col md:w-[50%] xl:w-[30%] sm:w-[70%] w-[90%] my-2 bg-white shadow-sm p-6 rounded'>
                    <ToastContainer />
                    <h4 className='text-xl py-1 text-center text-gray-900 font-serif'>Sign Up</h4>
                    <label htmlFor="name">Name</label>
                    <input type="text" value={credentials.name || ""} onChange={onChange} className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name='name' id="name" placeholder='Enter your name' minLength={3} />
                    <label htmlFor="email">Email</label>
                    <input type="email" value={credentials.email || ""} onChange={onChange} className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="email" id="email" placeholder='Enter your email' />
                    <label htmlFor="number">Number</label>
                    <input type="number" value={credentials.number || ""} onChange={onChange} className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="number" id="number" placeholder='Enter your mobile number' minLength={10} maxLength={10} />
                    <label htmlFor="password">Password</label>
                    <input type="password" value={credentials.password || ""} onChange={onChange} className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="password" id="password" placeholder='Enter your password' minLength={6} />
                    <p className='tracking-tighter text-sm mb-4 text-gray-500'>Passwords must be at least 6 characters.</p>
                    <label htmlFor="check" className='flex items-center'><input type="checkbox" name="check" id="check" required /><p className='text-sm mx-2'>I agree to the <span className='text-[#018ce3]'>Terms and Conditions</span></p></label>
                    <button type='submit' className='border-[1px] hover:scale-95 my-3 border-gray-900 px-2 py-1 cursor-pointer bg-[#009dff] text-white rounded'>Verify email</button>
                    <div className='flex justify-center'>
                        <p className='text-gray-900 my-2 text-sm  font-sans'>already have an account? <Link to='/login' className='text-[#007ac6] underline tracking-tighter'>Login</Link> </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
