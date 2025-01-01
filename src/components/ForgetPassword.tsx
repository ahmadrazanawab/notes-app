import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPassword: React.FC = () => {
    const [isActive, setIsActive] = useState(true);
    const navigate = useNavigate();
    const handleForgotPassword = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (isActive) {
            setIsActive(true);
            alert("Go to the next page");
            navigate('/createnewpassword');
        }
    }
  return (
    <div className='min-h-[100vh] w-full bg-[#f1f2f3]'>
    <div className='flex flex-col justify-center items-center py-10'>
        <form action="" onSubmit={handleForgotPassword} className='flex flex-col xl:w-[30%] md:w-[50%] w-[70%] my-2 bg-white shadow-md p-6 rounded'>
            <h4 className='text-xl py-3 text-center text-gray-900 font-serif'>Find your email</h4>
            <label htmlFor="email" className='font-serif'>Email</label>
            <input type="email"  className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="email" id="email" placeholder='Enter your email' />
            <button type='submit' className='border-[1px] my-3 border-gray-900 px-2 py-1 cursor-pointer bg-[#009dff] text-white rounded'>Next</button>
        </form>
    </div>
</div>
  )
}

export default ForgetPassword
