import { asyncHandler } from "../Utility/AsyncHandler.js";
import bcryptjs from "bcryptjs";
import { User } from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import {
    sendVarification,
    WelcomeEmail,
    ResetPasswordSet,
    WelcomeCreateNewPassword
} from "../middleware/Email.js";

const UserRegister = asyncHandler(async (req, res) => {
    let { name, email, number, password } = req.body;

    if (!(name && number && email && password)) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    if (number.length < 10 || number.length > 10) {
        return res.status(400).json({ success: false, message: "Phone number must be exactly 10 digits." });
    }
    if (password.length < 6) {
        return res.status(400).json({ success: false, message: "Password must be at least 6 characters!" });
    }

    // chack unique 
    let user = await User.findOne({ email });
    if (user) {
        return res.status(401).json({ success: false, error: "Sorry a user with this email already exists" })
    }

    // send otp code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // create hash password
    let hashPassword = await bcryptjs.hash(password, 10);

    // create new User
    user = new User({
        name,
        email,
        number,
        password: hashPassword,
        verificationCode
    });
    await user.save();
    sendVarification(user.email, verificationCode);
    const data = {
        user: {
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ success: true, authtoken });
});

// When User register to varify opt then sign up Method Using POST
const UserSignUpOtp = asyncHandler(async (req, res) => {
    const { code } = req.body;
    if (!code) {
        return res.status(400).json({ success: false, message: "OTP is required" });
    }
    const user = await User.findOne({ verificationCode: code });
    if (!user) {
        return res.status(400).json({ success: false, message: "Invalid or Expired Code" });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();
    await WelcomeEmail(user.email, user.name);
    return res.status(200).json({ success: true, message: "User Sign Up Successfully" });
})

// User Login using method POST 
const UserLogin = asyncHandler(async (req, res) => {
    const { email, number, password } = req.body;
    if (!(email && password)) {
        return res.status(401).json({ success: false, message: "email and password can be blank!" });
    }

    // find email and number 
    const user = await User.findOne({
        $or: [{ email }, { number }]
    });
    if (!user) {
        return res.status(401).json({ success: false, message: "email and number are not found" });
    }

    let comparePassword = await bcryptjs.compare(password, user.password);
    if (!comparePassword) {
        return res.status(401).json({ success: false, message: "Password is incorrect!" });
    }
    if (user.isVerified === false) {
        return res.status(401).json({ success: false, message: "Not Verify your email" })
    }

    const data = {
        user: {
            id: user.id
        }
    }
    let authtoken = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ success: true, message: "User login successfully", authtoken });

});

// User Change Password using the POST method.
const UserChangePassword = asyncHandler(async (req, res) => {
    const { password, oldPassword } = req.body;
    if (!password || !oldPassword) {
        res.status(401).json({ success: false, message: "Both old and new passwords are required" });
    }
    if (password.length < 6) {
        res.status(401).json({ success: false, message: "Password must be at least 6 characters!" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    // Verify old password
    const isMatch = await bcryptjs.compare(oldPassword, user.password);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: "Old password is incorrect" });
    }
    const salt = await bcryptjs.genSalt(10);
    const newPassword = await bcryptjs.hash(password, salt);
    await User.findByIdAndUpdate(req.user.id, { $set: { password: newPassword } });
    res.status(200).json({ success: true, message: "Password changed successufully" });
})



//User Account Forgot Password using the POST method.
const UserforgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ success: false, message: "Email not found" });
    }
    const secret = user.id + process.env.JWT_SECRET;
    const authtoken = await jwt.sign({ userId: user.id }, secret, { expiresIn: "15m" });
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode
    await user.save();
    if (user.isVerified === true) {
        ResetPasswordSet(user.email, user.verificationCode);
        let link = `http://localhost:4002/api/auth/resetpassword/${user.id}/${authtoken}`;
        console.log(link);
        res.status(200).json({ success: true, message: "Password is forgot successfully", user: user.id, authtoken });
    }
    else {
        res.status(401).json({ success: false, message: "Email not found" });
    }
})

// When a User forgets their Password, they can create a new Password Using the POST method.
const UserCreateNewPassword = asyncHandler(async (req, res) => {
    const { password, code } = req.body;
    const { id, authtoken } = req.params;
    if (!password || !code) {
        return res.status(400).json({ success: false, error: "Password and OTP are required" });
    }
    if (password.length < 6) {
        res.status(400).json({ success: false, message: "Password must be at least 6 characters!" });
    }
    const user = await User.findById(id);
    const user1 = await User.findOne({ verificationCode: code });
    if (!user1) {
        return res.status(401).json({ success: false, message: "Invalid or Expired Code" });
    }

    if (user.isVerified === true) {
        const new_secret = user.id + process.env.JWT_SECRET;
        jwt.verify(authtoken, new_secret);

        const newPassword = await bcryptjs.hash(password, 10);
        await User.findByIdAndUpdate(user.id, { $set: { password: newPassword } });

        user.verificationCode = undefined;
        await user.save();
        await WelcomeCreateNewPassword(user1.email, user1.name);

        res.status(200).json({ success: true, message: "Password new set Successfully" });
    }
})

const getUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    console.log(userId);
    const user = await User.findById(userId).select("-password");
    res.send(user);
})

export {
    UserRegister,
    UserSignUpOtp,
    UserLogin,
    UserChangePassword,
    UserforgotPassword,
    UserCreateNewPassword,
    getUser
}