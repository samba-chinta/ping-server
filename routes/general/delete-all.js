import exprees from "express";

// import "User" model to create accounts
import User from "../../models/User.js";

// creating router
const router = exprees.Router();

// defining the functionality
router.delete("/", async (req, res) => {
    try {
        const noOfUsersDeleted = await User.destroy({
            where: {}
        });
        res.json({
            numberOfRowsDeleted: noOfUsersDeleted
        });
    } catch (err) {
        res.json({
            error: err,
        });
    }
});

export default router;
