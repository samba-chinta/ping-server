import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const authorize = async (req, res, next) => {
    // search & retrieve token
    const user_token = req.headers['x-access-token'] || req.body.token;

    // if exists, verify the token
    if (user_token) {
        if (!jwt.verify(user_token, process.env.JWT_TOKEN)) {
            return res.status(401).json({
                message: "Invalid Token",
            })
        }
        // success
    } else {
        return res.status(403).json({
            message: "Token is required",
        })
    }
    return next();
}

export default authorize;