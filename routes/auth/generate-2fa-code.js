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

router.post("/", authorize, async (req, res) => {
    const secret = speakeasy.generateSecret();

    // get "username" to get user record
    const { username } = req.body;

    // get "user" details
    const user = await User.findOne({
        where: {
            userName: username,
        },
    });

    // temporarily storing the secret by not modifying MFAEnabled
    // which is set to false.
    user.set("MFASecret", secret.base32);

    // generating the QRCode image using secret generated earlier
    const qr_image_url = QRCode.toDataURL(secret.otpauth_url);

    await user
        .save()
        .then((success) => {
            res.statusCode(201).json({
                image_url: qr_image_url,
            });
        })
        .catch((err) => {
            res.statusCode(301).json({
                message: "Secret Generation Failed",
            });
        });
});

export default router;
