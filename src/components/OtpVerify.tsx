import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
// import OtpInput from 'react-otp-input';

const OtpVerify: React.FC = () => {
    const [code, setCode] = useState<string>('');
    const navigate = useNavigate();
    // const host = import.meta.env.VITE_API_URL;
    // const host = "https://notes-app-qa3n.onrender.com";
    const host = "http://localhost:4002";
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
            navigate("/login");
            alert("Sign up successfully");
        } else {
            alert("Invalid otp")
        }
    }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCode(value);
      };
    return (
        <div className='flex justify-center items-center bg-slate-200 md:min-h-[100vh] min-h-[50vh]'>
            <div className='bg-white shadow-md rounded sm:p-6 py-4 px-2 mx-4 flex flex-col '>
                <h4 className='text-xl my-2 mx-2 text-gray-900 font-serif'>Enter the 6-digit verification code to sign up</h4>
                <input type="text" value={code} onChange={onChange} name="otm" id="otp" className="border-[1px] my-2 border-gray-900 rounded px-2 h-14 py-1 mx-2 text-xl font-serif" placeholder='Enter Opt' />
                <button onClick={handleOtpSubmit} className='mt-3 mx-2 py-3  hover:scale-95  rounded bg-green-500 text-white'>Submit Otp</button>
            </div>
        </div>
    )
}

export default OtpVerify
