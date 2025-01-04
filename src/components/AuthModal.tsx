import React from 'react'
import { IoCloseSharp } from "react-icons/io5";

interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
const AuthModal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;
    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).id === "wrapper") onClose();
    }
    return (
        <div className='flex absolute w-[100px] md:right-[220px] right-[190px]'>
            <div className="fixed border-[1px] rounded border-black  flex justify-center mx-2 mt-10" id="wrapper" onClick={handleClose}>
                <div className="md:w-[300px]">
                    <div className="bg-white p-2 rounded flex flex-col"><IoCloseSharp size={25} onClick={() => onClose()} className="place-self-end cursor-pointer " />{children}</div>
                </div>
            </div>
        </div>
    )
}

export default AuthModal
