import React, { useRef, useState } from 'react'
import AuthCode, { AuthCodeRef } from 'react-auth-code-input';
import { useNavigate } from 'react-router-dom';

interface OtpFormProps { }

const OtpGenerate: React.FC<OtpFormProps> = () => {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    const handleGenerateOtp = async () => {
        // Simulate API call to send OTP
        console.log("Generating OTP for phone number:", phoneNumber);
        setOtpSent(true);
    };

    const handleSubmitOtp = async () => {
        // Simulate API call to verify OTP
        console.log("Submitting OTP:", otp);
        alert("OTP verified!");
    };

    // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    // const [username, setUsername] = useState<string | null>('');
    // const AuthInputRef = useRef<AuthCodeRef>(null);
    // const [result, setResult] = useState<string | null>('');
    // let navigate = useNavigate();
    // const handleOnChange = (res: string) => {
    //     setResult(res);
    // };
    // const handleSubmit = (e:React.SyntheticEvent) => {
    //     e.preventDefault();
    //     setResult(result);
    //     alert("otp has been submitted");
    //     navigate('/login');
    // }
    return (
        <section>
            {/* <div>
                <AuthCode onChange={handleOnChange} allowedCharacters='numeric' ref={AuthInputRef} inputClassName='border-[1px] border-gray-900 w-8 mx-2 rounded text-center' />
                <button className='border-[1px] my-4 mx-2 border-gray-900 rounded px-2 py-1 bg-sky-500 text-white' onClick={() => AuthInputRef.current?.clear()}>Clear</button>
            </div>
            <div>
                <button onClick={handleSubmit} className='border-[1px] my-4 mx-2 border-gray-900 rounded px-2 py-1 bg-sky-500 text-white'>Submit Now</button>
            </div> */}

            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="bg-white p-6 rounded shadow-md w-80">
                    {!otpSent ? (
                        <div>
                            <h2 className="text-lg font-semibold mb-4 text-gray-800">Generate OTP</h2>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <button
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                                onClick={handleGenerateOtp}
                            >
                                Send OTP
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-lg font-semibold mb-4 text-gray-800">Enter OTP</h2>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button
                                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                                onClick={handleSubmitOtp}
                            >
                                Verify OTP
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </section>
    )
}

export default OtpGenerate
