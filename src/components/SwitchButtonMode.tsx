import React from 'react'
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";
import { useContextTodo } from '../context/ContextProvider';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const SwitchButtonMode: React.FC = () => {
    const { mode, setMode }: any = useContextTodo();
    const handleDarkAndLight = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (mode === true) {
            toast.success("Light Mode has been enabled", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setMode(false);
        }
        else {
            toast.success("Dark Mode has been enabled", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setMode(true);
        }
    }
    return (
        <div onClick={() => { setMode(!mode) }} className={`flex h-6 w-14  bg-gray-600 rounded-full`}>
            {mode ? <span onClick={handleDarkAndLight}
                className={`h-6 w-8  flex justify-center items-center ${mode === false ? 'ml-0' : 'ml-6'} border-[1px] border-white transition-all duration-500 shadow-xl bg-black  rounded-full`}>
                <MdOutlineDarkMode className='text-sky-600 size-6' />
            </span>
                : <span onClick={handleDarkAndLight}
                    className={`h-6 w-8  border-[2px] border-sky-800 flex justify-center items-center transition-all duration-500 shadow-xl bg-white rounded-full`}>
                    <CiLight className='text-sky-700 size-6'/>
                </span>}
        </div>
    )
}

export default SwitchButtonMode
