import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// import User model
import User from "../../models/User.js";

// creating route
const router = express.Router();

// define the functionality
router.post("/", async (req, res) => {
    // retrieving the credentials from req.body
    // assume not null data
    const { username, password } = req.body;

    // finding the user in "User" model
    const user = await User.findOne({
        where: {
            userName: username,
        },
    });

    if (!user) {
        // if user not exits
        res.json({
            message: "User Not Found!",
        });
    } else {
        // user exists now verify the password and if matched
        // sending success else invalid messages
        // if valid, sending "jwt" token to authorize the user
        if (bcrypt.compareSync(password, user.dataValues.password)) {
            // creating jwt token for authenticating user when
            // the user sending the requests
            const token = jwt.sign(
                { username: username },
                process.env.JWT_TOKEN
            );

            // set & save token in "User model" for respective user
            user.set("token", token);

            await user
                .save()
                .then((usr) => {
                    res.status(201).setHeader("auth-token", token).json({
                        message: "Successfully Loggedin",
                        isMFAEnabled: user.MFAEnabled,
                        username: username,
                        authToken: token
                    });
                })
                .catch((err) => {
                    res.status(301).json({
                        message: "Login Failed",
                    });
                });
        } else {
            res.status(201).json({
                message: "Invalid Credentials",
            });
        }
    }
});

export default router;
