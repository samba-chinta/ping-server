import exprees from "express";
import bcrypt from "bcryptjs";

// import "User" model to create accounts
import User from "../models/User.js";

// creating router
const router = exprees.Router();

// defining the functionality
router.post("/", async (req, res) => {
    // retrieve username & entered password
    // here we are assuming empty is not sent
    // by request (validate by frontend app)
    const { username, email, password } = req.body;

    try {
        // hashing the password to encrypt it
        const encryptPassword = bcrypt.hashSync(password, 10);

        // creating the user else throws error
        // if userName already exists
        const user = await User.create({
            userName: username,
            emailAddress: email,
            password: encryptPassword,
        });

        // if user creation success
        if (user) {
            res.status(204).json({
                message: "Successfully Account Created!",
            });
        } else {
            // sending user's account creation failed message
            res.status(501).json({
                message: "Creation Failed",
            });
        }
    } catch (err) {
        // throwing error
        res.json({
            error: err,
        });
    }
});

export default router;
