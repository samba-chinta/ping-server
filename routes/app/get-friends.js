import express from "express";

// Contact model
import Contact from "../../models/Contact.js";
import authorize from "../../middleware/authorize.js";

const router = express.Router();

// helps in getting the friends of particular user
router.get("/", authorize, async (req, res) => {
    // get userId from the request
    const { userId } = req.query;

    // fetching the friends details
    await Contact.findAll({
        where: {
            userId,
        },
    })
        .then((response) => {
            res.json({
                // sending friends array as response
                friends: response,
            });
        })
        .catch((err) => {
            res.json({
                message: "Error occurred while fetching the friends",
            });
        });
});

export default router;
