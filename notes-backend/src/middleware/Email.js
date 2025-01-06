import { transporter } from "./Email.Config.js";
import {
    VerificationTamplate,
    welcomEmailTemplate,
    ResetPasswordEmail,
    WellcomeNewCreatePassword
} from "./EmailTemplate.js";


const sendVarification = async (email, verificationCode) => {
    try {
        const response = await transporter.sendMail({
            from: '"CodeWithAhmad" <codewithahmad0786@gmail.com>', // sender address
            to: email,
            subject: "varify your email", // Subject line
            text: "Hello world?", // plain text body
            html: VerificationTamplate.replace("{verificationCode}", verificationCode),// html body
        });
        console.log("Email send successfully", response);
    } catch (error) {
        console.log("Email Error");
    }
}

const WelcomeEmail = async (email, name) => {
    try {
        const response = await transporter.sendMail({
            from: '"CodeWithAhmad" <codewithahmad0786@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "varify your email", // Subject line
            text: "Hello world?", // plain text body
            html: welcomEmailTemplate.replace("{name}", name),// html body
        });
        console.log("sign Up successfully", response);
    } catch (error) {
        console.log("Email Error");
    }
}


// Forgot Password
const ResetPasswordSet = async (email, verificationCode) => {
    try {
        const response = await transporter.sendMail({
            from: '"CodeWithAhmad" <codewithahmad0786@gmail.com>', // sender address
            to: email,
            subject: "Reset Password", // Subject line
            text: "Hello world?", // plain text body
            html: ResetPasswordEmail.replace("{verificationCode}", verificationCode),// html body
        });
        console.log("Send OTP successfully", response);
    } catch (error) {
        console.log("Email Error");
    }
}


// Successfull create the password then send message
const WelcomeCreateNewPassword = async (email, name) => {
    try {
        const response = await transporter.sendMail({
            from: '"CodeWithAhmad" <codewithahmad0786@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "varify your email", // Subject line
            text: "Hello world?", // plain text body
            html: WellcomeNewCreatePassword.replace("{name}", name),// html body
        });
        console.log("Your password has been created successfully", response);
    } catch (error) {
        console.log("Email Error");
    }
}

export {
    sendVarification,
    WelcomeEmail,
    ResetPasswordSet,
    WelcomeCreateNewPassword
}
