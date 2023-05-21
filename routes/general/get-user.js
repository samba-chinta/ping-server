import exprees from "express";

// import "User" model to create accounts
import User from "../../models/User.js";

// creating router
const router = exprees.Router();

// defining the functionality
router.get("/", async (req, res) => {
    try {
        const users = await User.findAll();
        res.send(users);
    } catch (err) {
        res.json({
            error: err,
        });
    }
});

export default router;
