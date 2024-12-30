const transporter = require("./Email.Config");
const VerificationTamplate = require('./EmailTemplate');
const welcomEmailTemplate = require('./EmailTemplate');

const sendVarification = async (email,verificationCode) => {
    try {
        const response = await transporter.sendMail({
            from: '"CodeWithAhmad" <codewithahmad0786@gmail.com>', // sender address
            to: email, 
            subject: "varify your email", // Subject line
            text: "Hello world?", // plain text body
            html:VerificationTamplate.replace("{verificationCode}",verificationCode),// html body
        });
        console.log("Email send successfully",response);
    } catch (error) {
        console.log("Email Error");
    }
}




const WelcomeEmail = async (email,name) => {
    try {
        const response = await transporter.sendMail({
            from: '"CodeWithAhmad" <codewithahmad0786@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "varify your email", // Subject line
            text: "Hello world?", // plain text body
            html:welcomEmailTemplate.replace("{name}",name),// html body
        });
        console.log("sign Up successfully",response);
    } catch (error) {
        console.log("Email Error");
    }
}

module.exports =sendVarification,WelcomeEmail;
//Send the email
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return console.error(`Error: ${error}`);
//   }
//   console.log(`Email sent: ${info.response}`);
// });