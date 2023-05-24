import express from "express";

// import 'Contact' & 'User' model
import Contact from "../../models/Contact.js";

// importing authorize which helps in authorizing the user
import authorize from "../../middleware/authorize.js";

const router = express.Router();

// functionality to delete a friend to the requested user
router.delete("/", authorize, async (req, res) => {
    // get userId (one who requested),
    // friend_userId (one who will be removed from user's friend list)
    const { userId, friend_userId } = req.body;

    // deleting the user
    await Contact.destroy({
        where: {
            userId: userId,
            contactId: friend_userId,
        }
    }).then((usr) => {
        res.json({
            message: `Friend removed from the list successfully`
        })
    }).catch((err) => {
        res.json({
            message: "Removal of friend is unsuccessful",
        })
    })
});

export default router;
