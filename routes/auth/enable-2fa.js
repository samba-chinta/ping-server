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
router.post("/", authorize, async (req, res) => {
    const { totp } = req.body;

    // get the MFASecret stored in the Database
    const user = await User.findOne({
        where: {
            userName: "gopichinta",
        },
    });

    const MFASecret = user.dataValues.MFASecret;

    // verify the token entered by the user
    const isValidToken = speakeasy.totp.verify({
        secret: MFASecret,
        encoding: "base32",
        token: totp,
    });

    if (isValidToken) {
        user.set("MFAEnabled", true);
        await user
            .save()
            .then((success) => {
                res.json({
                    message: "MFA Enabled Successfully",
                });
            })
            .catch((err) => {
                res.json({
                    err,
                });
            });
    } else {
        res.json({
            message: "Invalid Token entered. Please recheck it",
        })
    }
});

export default router;
