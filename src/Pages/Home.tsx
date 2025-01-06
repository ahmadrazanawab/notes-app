import React from 'react'
import Todos from './Todos'
import { useContextTodo } from '../context/ContextProvider'


const Home: React.FC = () => {
    const {mode }:any=useContextTodo()
    return (
        <div className={`md:min-h-[100vh] ${mode === true ? 'bg-[#2c2c2c]':'bg-white'}`}>
      <Todos/>
    </div>
  )
}

export default Home
