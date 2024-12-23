import React from 'react'
import { IoCloseSharp } from "react-icons/io5";

interface ModelProps {
    isVisible:boolean;
    onClose: () => void;
    children: React.ReactNode;
}
const Model: React.FC <ModelProps> = ({ isVisible, onClose,children}) => {
    if (!isVisible) return null;
    const handleClose = (e:React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).id === "wrapper") onClose();
    }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" id="wrapper" onClick={handleClose}>
          <div className="md:w-[600px] w-[300px]">
              <div className="bg-white p-2 rounded flex flex-col"><IoCloseSharp size={25} onClick={()=>onClose()} className="place-self-end cursor-pointer "/>{ children}</div>  
      </div>
    </div>
  )
}

export default Model
