import express from "express";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

// import User model
// here it is useful for persists the token temporary
// before it MFA is enabled
import User from "../../models/User.js";

// import authorize middleware to authorize the user
import authorize from "../../middleware/authorize.js";

// creating router
const router = express.Router();

router.get("/", authorize, async (req, res) => {
    const secret = speakeasy.generateSecret();

    // get "username" to get user record
    const { username } = req.query;

    // get "user" details
    const user = await User.findOne({
        where: {
            userName: username,
        },
    });

    // temporarily storing the secret by not modifying MFAEnabled
    // which is set to false.
    user.set("MFASecret", secret.base32);

    try {
        // generating the QRCode image using secret generated earlier
        const qr_image_url = await QRCode.toDataURL(secret.otpauth_url);

        const response = await user.save();

        // send the template file
        res.json({
            qrURL: qr_image_url,
        });
    } catch (err) {
        res.json({
            error: err,
        });
    }
});

export default router;
