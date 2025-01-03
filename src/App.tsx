import React from 'react'
import Navbar from './Pages/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
// import Footer from './Pages/Footer'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import ContextProvider from './context/ContextProvider'
import OtpVerify from './components/OtpVerify'
import ForgetPassword from './components/ForgetPassword'
import CreateNewPassword from './components/CreateNewPassword'
import ErrorPage from './Pages/ErrorPage'

const App: React.FC = () => {
    const router = createBrowserRouter([
        {
            errorElement:<><Navbar /><ErrorPage /></>
        },
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
        {
            path: '/otpverify',
            element: <><Navbar /><OtpVerify/></>
        },
        {
            path: '/forgetpassword',
            element: <><Navbar /><ForgetPassword /></>
        },
        {
            path: '/createnewpassword/:_id/:authtoken',
            element: <><Navbar /><CreateNewPassword /></>
        },

    ])
    return (
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    )
}

export default App
