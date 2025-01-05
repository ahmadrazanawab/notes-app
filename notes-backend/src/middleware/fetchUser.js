import jwt from "jsonwebtoken";
import { asyncHandler } from "../Utility/AsyncHandler.js";


const fetchUser = asyncHandler(async (req, res, next) => {
    let token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ error: "Please authenticate using a valid token" });
    }
    const data = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
})

export { fetchUser };