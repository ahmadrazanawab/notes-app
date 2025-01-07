import React from 'react'
import Navbar from '../Pages/Navbar';
import Home from '../Pages/Home'
import About from '../Pages/About'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from '../Pages/SignIn'
import SignUp from '../Pages/SignUp'
import ContextProvider from '../context/ContextProvider'
import OtpVerify from '../components/OtpVerify'
import ForgetPassword from '../components/ForgetPassword'
import CreateNewPassword from '../components/CreateNewPassword'
import ErrorPage from '../Pages/ErrorPage'
import ChangePassword from '../components/ChangePassword'

export {
    React, Navbar,
    Home, About,
    createBrowserRouter,
    RouterProvider,
    SignIn, SignUp,
    ContextProvider,
    OtpVerify, ForgetPassword,
    CreateNewPassword, ErrorPage,
    ChangePassword
}