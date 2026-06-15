const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");

requestRouter.post("/sendConnectionRequest",userAuth, async (req, res) => {

const user = req.user;
console.log("User:", user);

res.send("Connection request sent successfully"+ user);

});

module.exports = requestRouter;