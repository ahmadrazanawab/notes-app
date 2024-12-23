import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignIn: React.FC = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const host = "http://localhost:4002";
    const handleSubmit = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            // props.showAlert("Logged in Successfully", "success");
            alert("Logged in Successfully");
            navigate("/");
        }
        else {
            alert("Invalid crendentials");
            // props.showAlert("Invalid Credentials","danger");
        }
    }
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='w-full bg-[#f1f2f3]'>
            <div className='flex flex-col justify-center items-center py-10'>
                <form action="" onSubmit={handleSubmit} className='flex flex-col xl:w-[30%] md:w-[50%] w-[70%] my-2 bg-white shadow-md p-6 rounded'>
                    <h4 className='text-xl py-3 text-center text-gray-900 font-serif'>Login Form</h4>
                    <label htmlFor="email"  className='font-serif'>Email</label>
                    <input type="email" value={credentials.email} onChange={onChange} className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="email" id="email" placeholder='Enter your email or number' />
                    <label htmlFor="password" className='font-serif'>Password</label>
                    <input type="password" value={credentials.password} onChange={onChange} className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="password" id="password" placeholder='Enter your password' />
                    <button type='submit' className='border-[1px] my-3 border-gray-900 px-2 py-1 cursor-pointer bg-[#009dff] text-white rounded'>Login</button>
                </form>
                <p className='text-gray-900 my-6 font-serif'>Don't have an account? <Link to='/signUp' className='tracking-tighter text-[#007ac6] underline font-sans'>Sign Up</Link> </p>
            </div>
        </div>
    )
}

export default SignIn
