import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const Navbar: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    interface link {
        id: number;
        name: string;
        to: string;
    }
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }
    const links: link[] = [
        { id: 1, name: 'Home', to: '/' },
        { id: 2, name: 'About', to: '/about' },
        // { id: 3, name: 'Login', to: '/login' },
        // { id: 4, name: 'SignUp', to: '/signUp' },
    ]
    return (
        <nav className='shadow-md flex  justify-between  min-h-[60px] items-center   border-b-2 border-blue-500 bg-[#f8f9f9]'>
            <div>
                <Link to='/' className='text-blue-600 text-xl font-serif mx-4'>Todo<strong className='text-green-600'>App</strong></Link>
            </div>

            <div className='md:mt-0'>
                <ul className={`md:flex md:bg-[#f8f9f9]  bg-slate-300 w-full md:mx-2 mx-0 md:my-0 my-5 md:flex-row md:static flex-col left-0 mx:z-10 z-0 absolute duration-500 ease-in-out ${open === true ? 'top-10 opacity-0' : 'left-[-895px]'} opacity-100`}>
                    {
                        links.map(({ id, name, to }) => (
                            <li key={id} onClick={() => { setOpen(false) }} className='flex items-center justify-center md:mx-4 md:my-0 my-4  text-xl'>
                                <Link to={to}>{name}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>


            <div className='flex justify-center items-center'>
                {!localStorage.getItem('token') ? (<>
                    <Link to='/login' className='border-[1px] border-gray-900 px-2 py-1 md:mx-1 rounded bg-sky-600 mx-1 text-white font-serif md:my-0'>Login</Link>
                    <Link to='/signUp' className='border-[1px] border-gray-900 px-2 py-1 md:mr-4 rounded bg-sky-600 mx-1 text-white font-serif md:my-0'>Sign Up</Link>
                </>) : <Link to='/login' onClick={handleLogout} className='border-[1px] px-2 py-1  rounded bg-sky-600 mx-1 font-serif text-white border-gray-900 md:mx-4 md:my-0'>Logout</Link>
                }

                <div className='md:hidden' onClick={() => { setOpen(!open) }}>
                    {
                        !open ? <MdMenu size={30} className='mx-4' />
                            : <IoClose size={30} className='mx-4' />
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
