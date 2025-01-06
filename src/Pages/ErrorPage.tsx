import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import { useContextTodo } from '../context/ContextProvider'

const ErrorPage: React.FC = () => {
    const error = useRouteError() as { data: string, status: number }
    const {mode }:any=useContextTodo();
    console.log(error);
  return (
      <div className={`min-h-[100vh] pt-20 ${mode === true ? 'bg-[#2c2c2c] text-white':'bg-slate-200 text-black'}`}>
          {(error.status === 404) ?<div className='flex flex-col mx-4 justify-center items-center'>
              <h2 className='md:text-6xl mb-2 text-2xl font-serif'>404</h2>
              <h2 className='md:text-3xl my-1 text-xl font-serif '>Ooops! Page Not Found</h2>
              <h4 className='md:text-xl my-1 font-serif md:mx-0 mx-4'>{error.data}</h4>
              <Link to="/" className='text-xl underline my-4 text-[#009dff]'>Go back to home</Link>
          </div> :
            <div className='flex justify-center'>
              <h2 className='md:text-3xl font-serif '>Opps! Page could not find</h2>    
         </div>
         }
    </div>
  )
}

export default ErrorPage
