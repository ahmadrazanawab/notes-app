import React from 'react'
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
    const socailLinks = [
        {
            id: 1,
            name: 'twitter',
            link: <FaTwitter />,
            color: "text-black",
        },
        {
            id: 2,
            name: 'Instagram',
            link: <FaInstagramSquare />,
            color: "text-red-600",
        },
        {
            id: 3,
            name: 'Linkdin',
            link: <FaLinkedin />,
            color: "text-blue-600",
        },
        {
            id: 4,
            name: 'Github',
            link: <FaGithub />,
            color: "text-black",
        },
        
    ]
    return (
        <div className='bg-slate-500  h-20 py-5 flex items-center justify-center'>
            <div>
                <ul className='flex'>
                    {
                        socailLinks.map(({id,name,link,color}) => {
                            return <li key={id} className='flex items-center mx-1 my-1'>
                                <h4 className='text-xl text-white mx-1 my-1'>{name}</h4>
                            <p className={`mx-1 my-1 cursor-pointer hover:scale-95  text-2xl ${color}`}>{link}</p>
                        </li>   
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Footer
