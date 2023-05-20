import express from "express";
import bcrypt from "bcryptjs";

// import User model
import User from "../models/User.js";

// creating route
const router = express.Router();

// define the functionality
router.get("/", async (req, res) => {
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
        console.log(user);
        await bcrypt
            .compareSync(password, user.dataValues.password)
            .then((success) => {
                res.json({
                    message: "Successfully LoggedIn",
                });
            })
            .catch((err) => {
                res.json({
                    message: "Invalid Credentials",
                });
            });
    }
});

export default router;
