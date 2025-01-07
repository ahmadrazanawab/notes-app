import {
    React, Navbar,
    Home, About,
    createBrowserRouter,
    RouterProvider,
    SignIn, SignUp,
    ContextProvider,
    OtpVerify, ForgetPassword,
    CreateNewPassword, ErrorPage,
    ChangePassword
} from './components/AppImportAllFiles';

const App: React.FC = () => {
    const router = createBrowserRouter([
        {
            errorElement: <><Navbar /><ErrorPage /></>
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
            element: <><Navbar /><OtpVerify /></>
        },
        {
            path: '/forgetpassword',
            element: <><Navbar /><ForgetPassword /></>
        },
        {
            path: '/createnewpassword/:_id/:authtoken',
            element: <><Navbar /><CreateNewPassword /></>
        },
        {
            path: '/changepassword',
            element: <><Navbar /><ChangePassword /></>
        },

    ])
    return (
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    )
}

export default App
