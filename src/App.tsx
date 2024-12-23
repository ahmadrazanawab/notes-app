import React from 'react'
import Navbar from './Pages/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
// import Footer from './Pages/Footer'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import ContextProvider from './context/ContextProvider'

const App: React.FC = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <><Navbar /><Home /></>
        },
        {
            path: '/about',
            element: <><Navbar /><About /></>
        },
        {
            path: '/login',
            element: <><Navbar /><SignIn /></>
        },
        {
            path: '/signUp',
            element: <><Navbar /><SignUp /></>
        },

    ])
    return (
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    )
}

export default App
