import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import AuthModal from '../components/AuthModal';
import { useContextTodo } from '../context/ContextProvider';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Navbar: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const { user }: any = useContextTodo();
    interface link {
        id: number;
        name: string;
        to: string;
        style?: string;
        hover?: string;
    }
    let navigate = useNavigate();
    const handleLogout = (e: React.SyntheticEvent) => {
        e.preventDefault();
        localStorage.removeItem('token');
        toast.success("Log out Successfully", {
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
            navigate("/login");
        }, 2000);
    }

    const [showModal, setShowModal] = useState<boolean>(false);
    const showModalBtn = () => {
        setShowModal(true)
    }
    const onClosed = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setShowModal(false);
    }

    // Combined handler
    const handleBothActions = (e: React.SyntheticEvent) => {
        handleLogout(e);
        onClosed(e);
    };
    const links: link[] = [
        { id: 1, name: 'Home', to: '/', },
        { id: 2, name: 'About', to: '/about' },
    ]

    return (
        <nav className='shadow-md flex  justify-between  min-h-[60px] items-center   border-b-2 border-blue-500 bg-[#f8f9f9]'>
            <div className='flex'>
                <div>
                    <Link to='/' className='text-blue-600 hidden md:block  text-xl font-serif mx-4'>Todo<strong className='text-green-600'>App</strong></Link>
                    <div className='md:hidden' onClick={() => { setOpen(!open) }}>
                        {
                            !open ? <MdMenu size={30} className='mx-4' />
                                : <IoClose size={30} className='mx-4' />
                        }
                    </div>
                </div>
                {/* navlink start */}
                <div className='md:mt-0'>
                    <ul className={`md:flex md:bg-[#f8f9f9]  bg-slate-300 w-full md:mx-2 mx-0 md:my-0 my-5 md:flex-row md:static flex-col left-0 mx:z-10 z-0 absolute duration-500 ease-in-out ${open === true ? 'top-10 opacity-0' : 'left-[-895px]'} opacity-100`}>
                        {
                            links.map(({ id, name, to, style }) => (
                                <li key={id} onClick={() => { setOpen(false) }} className='flex items-center justify-center md:mx-4 md:my-0 my-4  text-xl'>
                                    <Link to={to} className={`${style}`}>{name}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {/* navlink start */}
            </div>

            {/* Auth Modal Start */}
            <AuthModal isVisible={showModal} onClose={() => setShowModal(false)} >
                <div className="mb-4 px-2 text-center">
                    <div className='flex justify-center'>
                        <h4
                            className="text-xl font-semibold text-gray-900  flex justify-center items-center border-[1px] w-10 h-10 cursor-pointer bg-slate-300 shadow-sm font-serif rounded-full border-gray-900">
                            {user.email ? user.email.substring(0, 1).toUpperCase() : ""}
                        </h4>
                    </div>
                    <form action="" className="space-y-2">
                        <h1 className='md:text-xl text-sm font-serif'>{user.name}</h1>
                        <p className='font-serif bg-slate-200 shadow-sm rounded px-2 py-1 text-[#007ac6] text-sm cursor-pointer'>{user.email}</p>
                        <p className='font-semibold cursor-pointer'>Mob: {user.number}</p>
                        <Link to='/changepassword' onClick={() => { setShowModal(false) }} className='text-[#007ac6] underline font-serif'>Change Password</Link>
                        <button onClick={handleBothActions} className='bg-sky-400  text-sm text-white  w-[100%] font-serif px-2 py-1 rounded'>Logout</button>
                    </form>
                </div>
            </AuthModal>
            {/* Auth Modat End */}


            <div className='flex justify-center items-center'>
                {!localStorage.getItem('token') ? (<>
                    <Link to='/login' className='border-[1px] border-gray-900 text-sm px-2 py-1 md:mx-1 rounded bg-sky-600 mx-1 text-white font-serif md:my-0'>Login</Link>
                    <Link to='/signUp' className='border-[1px] border-gray-900 text-sm px-2 py-1 md:mr-4 mr-2 rounded bg-sky-600 mx-1 text-white font-serif md:my-0'>Sign Up</Link>
                </>) : <>
                    <button onClick={showModalBtn}
                        className='w-10 h-10 mx-3 bg-blue-400 text-black font-serif text-xl hover:border-[2px] rounded-full border-[1px] border-gray-900'>
                        {user.email ? user.email.substring(0, 1).toUpperCase() : ""}
                    </button>
                </>
                }
            </div>
        </nav>
    )
}

export default Navbar
