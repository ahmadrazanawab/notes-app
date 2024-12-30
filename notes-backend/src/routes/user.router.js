const express = require('express');
const User = require('../Models/user.model');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchUser');
const sendVarification = require("../middleware/Email");
const WelcomeEmail = require("../middleware/Email");



// Route:1 Create a User using : Post "/api/user/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('number', 'Enter your number').isLength({ min: 10, max: 10 }),
    body('password', 'Password must be atleast 6 characters').isLength({ min: 6 })
], async (req, res) => {
    let success = false;
    try {
        // if there are errors, return Bad request and the errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            // return res.send(`Hello, ${req.query.person}!`);
            return res.status(400).json({ success, result: result.array() })
        }
        const { name, email, number, password } = req.body;
        // Check whether the user with this email exists already
        let user = await User.findOne({
            $or: [{ email: email, number: number }]
        });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(password, salt);

        // send otp code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // create a new user
        user = await User.create({
            name: name,
            email: email,
            number: number,
            password: secPass,
            verificationCode
        });
        await user.save();
        sendVarification(user.email, verificationCode);
        const data = {
            user: {
                id: user.id
            }
        }
        await res.json(user);
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);

        success = true;
        res.json({ success: true, authtoken });
    }

    catch (err) {
        if (!res.headersSent) {
            res.status(500).send('Internal server error');
            console.error(err);
        }
    }

});


// Send Opt verfication route
router.post("/verifyemail", async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({ success: false, message: "Verification code is required" });
        }
        const user = await User.findOne({ verificationCode: code });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or Expired Code" });
        }

        user.isVerified = true;
        user.verificationCode = undefined;
        await user.save();
        await WelcomeEmail(user.email, user.name);
        return res.status(200).json({ success: true,message: "Email Verifed Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false,message: "internal server error" });
    }
})



//Route:2 Authenticate a user using POST "/api/user/login". No Login required
router.post('/login', async (req, res) => {
    let success = false;
    // if there are errors, return Bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        // return res.send(`Hello, ${req.query.person}!`);
        return res.status(400).json({ result: result.array() })
    }
    const { email, number, password } = req.body;
    try {
        // if (!number || !email) {
        //     return res.status(400).json({success:false,error:"email or number is required"})
        // }
        const user = await User.findOne({
            $or: [{ email }, { number }]
        })
        // let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Please try to Login with correct Credentiols" });
        }

        if (user.isVerified === false) {
            return res.status(401).json({ success: false, message: "Please verify your account" });
        }

        // user.isVerified = true;


        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to Login with correct Credentiols" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})




//Route:3 Authenticate a user using POST "/api/auth/getuser". No Login required

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})
module.exports = router

