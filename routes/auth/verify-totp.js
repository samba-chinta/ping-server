import express from "express";
import speakeasy from "speakeasy"; // to verify token

// user model
import User from "../../models/User.js";
import authorize from "../../middleware/authorize.js";

// router
const router = express.Router();

// functionality:
// -> verify the token entered by the user after scanning the QR
// -> If it valid, set the MFAEnabled = True if it false
// -> else through Invalid Token error
router.get("/", authorize, async (req, res) => {
    const { username, totp } = req.query;

    // get the MFASecret stored in the Database
    const user = await User.findOne({
        where: {
            userName: username,
        },
    });

    const MFASecret = user.dataValues.MFASecret;

    console.log(speakeasy.totp({
        secret: MFASecret
    }), totp);

    // verify the token entered by the user
    const isValidToken = speakeasy.totp.verify({
        secret: MFASecret,
        encoding: "base32",
        token: totp,
    });

    if (isValidToken) {
        res.json({
            message: "Successfully Verified",
        })
    } else {
        res.json({
            message: "Invalid Token entered. Please recheck it",
        })
    }
});

export default router;
