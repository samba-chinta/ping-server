import express from 'express';

// import 'User' model
// which helps out in finding friend details
import User from '../../models/User.js';

// to authorize the user (authorization)
import authorize from '../../middleware/authorize.js';

const router = express.Router();

// creating GET request 
// => expecting "full username" as input from user
router.get('/', authorize, async (req, res) => {
    const { friend_username } = req.query;

    // finding the friend using "their username"
    const friend_details = await User.findOne({
        where: {
            userName: friend_username,
        }
    })

    // if user founded
    if (friend_details) {
        res.json({
            details: friend_details,
        })
    } else {
        res.json({
            message: "User not found",
        })
    }
});

export default router;