import express from "express";

// import 'Contact' & 'User' model
import Contact from "../../models/Contact.js";
import User from "../../models/User.js";

// importing authorize which helps in authorizing the user
import authorize from "../../middleware/authorize.js";

const router = express.Router();

// functionality to add a friend to the requested user
router.post("/", authorize, async (req, res) => {
    // get userId (one who requested),
    // friend_userId (one who will be added as friend)
    const { userId, friend_userId } = req.body;

    // fetching the friend details using their id
    const friendDetails = await User.findOne({
        where: {
            id: friend_userId,
        },
    });

    // if successfully fetched
    if (friendDetails) {
        // successfully fetched friend details
        // get friend email address
        const friendEmailAddress = friendDetails.dataValues.emailAddress;

        // adding the friend in the Contact table with 'userId' as
        // foreign key
        await Contact.create({
            userId,
            contactId: friend_userId,
            contactEmailAddress: friendEmailAddress,
        })
            .then((success) => {
                res.json({
                    // sending success message
                    message: `${friendEmailAddress} with usedId ${friend_userId} is successfully added as your friend`,
                });
            })
            .catch((err) => {
                res.json({
                    // failure case
                    message: `Adding ${friendEmailAddress} as friend is failed`,
                });
            });
    } else {
        // friend details not found
        res.json({
            message: `User with id ${friend_userId} not found`,
        });
    }
});

export default router;
