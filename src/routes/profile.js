const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);

    } catch (error) {
        res.status(400).send("Error fetching profile: " + error.message);
    }

});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if(!validateEditProfileData(req)){
            throw new Error("Invalid profile data");
        }

        const user = req.user;
        Object.keys(req.body).forEach((key) => {
            user[key] = req.body[key];
        });
res.send("Profile updated successfully");
        console.log("User:", user);
    } catch (error) {
        res.status(400).send("Error fetching profile: " + error.message);
    }

});
module.exports = profileRouter;

