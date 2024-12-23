import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'


const SignUp: React.FC = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "",number:"", password: "", cpassword: "" });
    const navigate = useNavigate();
    const host = "http://localhost:4002";
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const { name, email,number, password} = credentials;
        const response = await fetch(`${host}/api/user/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name,email,number,password })
        });
        const json = await response.json();
        console.log();
        if (response.ok) {
            localStorage.setItem('token', json.authtoken);
            navigate("/login");
            alert("Account Created Successfully");
        } else {
            alert("Invalid Crendentials")
        }
        
    }
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
  return (
    <div className='w-full bg-[#f1f2f3]'>
          <div className='flex flex-col justify-center items-center py-10'>
              <form action="" onSubmit={handleSubmit} className='flex flex-col md:w-[50%] xl:w-[30%] w-[60%] my-2 bg-white shadow-md p-6 rounded'>
                <h4 className='text-xl py-3 text-center text-gray-900 font-serif'>Sign Up Form</h4>
                  <label htmlFor="name">Name</label>
                  <input type="text" value={credentials.name} onChange={onChange} className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name='name' id="name" placeholder='Enter your name' />
                  <label htmlFor="email">Email</label>
                  <input type="email" value={credentials.email} onChange={onChange} className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="email" id="email" placeholder='Enter your email'/>
                  <label htmlFor="number">Number</label>
                  <input type="number" value={credentials.number} onChange={onChange} className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="number" id="number" placeholder='Enter your mobile number' />
                  <label htmlFor="password">Password</label>
                  <input type="password" value={credentials.password} onChange={onChange} className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="password" id="password" placeholder='Enter your password'/>
                  <label htmlFor="cpassword">Confirm Password</label>
                  <input type="password" value={credentials.cpassword} onChange={onChange} className='px-1 py-1 mb-1 border-[1px] border-gray-900 rounded outline-none' name="cpassword" id="cpassword" placeholder='Enter your confirm password'/>
                  <p className='tracking-tighter text-sm mb-4 text-gray-500'>Passwords must be contain at least six charecters</p>
                  <label htmlFor="check" className='flex items-center'><input type="checkbox" name="check" id="check" required /><p className='text-sm mx-2'>I agree to the <span className='text-[#018ce3]'>Terms and Conditions</span></p></label>
                  <button type='submit' className='border-[1px] my-3 border-gray-900 px-2 py-1 cursor-pointer bg-[#009dff] text-white rounded'>Sign Up</button>
              </form>
              <p className='text-gray-900 my-6  font-sans'>already have an account? <Link to='/login' className='text-[#007ac6] underline tracking-tighter'>Login</Link> </p>
       </div>
    </div>
  )
}

export default SignUp
