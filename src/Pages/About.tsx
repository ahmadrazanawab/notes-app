import React, { useEffect } from 'react'
import Profile from '../components/Profile'
import { useContextTodo } from '../context/ContextProvider'
import { useNavigate  } from 'react-router-dom';



const About: React.FC = () => {
    const { mode,fetchUser }: any = useContextTodo();
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchUser();
        }
        else {
            navigate('/login');
        }
    }, []);
  return (
    <div className={` pt-20 min-h-[100vh] ${mode === true ? 'bg-[#2c2c2c] text-white':'bg-white text-gray-900'}`}>
          this is About section
          <Profile />
    </div>
  )
}

export default About
