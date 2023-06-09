import exprees from "express";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

// import "User" model to create accounts
import User from "../../models/User.js";

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
        const isUserExists = await User.findOne({
            where: {
                [Op.or]: [
                    {
                        userName: username,
                    },
                    {
                        emailAddress: email,
                    },
                ],
            },
        });

        if (isUserExists) {
            res.status(409).json({
                message: "User Already Exists",
            });
        } else {
            const user = await User.create({
                userName: username,
                emailAddress: email,
                password: encryptPassword
            });

            // if user creation success
            if (user) {
                res.json({
                    message: "Successfully Account Created!",
                });
            } else {
                // sending user's account creation failed message
                res.status(501).json({
                    message: "Creation Failed",
                });
            }
        }
    } catch (err) {
        // throwing error
        console.log(err);
        res.status(500).json({
            message: "An Error Occurred",
        });
    }
});

export default router;
