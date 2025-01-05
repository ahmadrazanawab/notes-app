import express from 'express';
const router = express.Router();
import { fetchUser } from "../middleware/fetchUser.js";
import {
    UserRegister,
    UserSignUpOtp,
    UserLogin,
    UserChangePassword,
    UserforgotPassword,
    UserCreateNewPassword,
    getUser
} from '../Controller/Auth.Controller.js';

router.route('/createuser').post(UserRegister);
router.route('/verifyemail').post(UserSignUpOtp);
router.route('/login').post(UserLogin);
router.route('/changepassword').post(fetchUser,UserChangePassword);
router.route('/userforgotpassword').post(UserforgotPassword);
router.route('/usercreatenewpassword/:id/:authtoken').post(UserCreateNewPassword);
router.route('/getuser').post(fetchUser,getUser);

export { router };

