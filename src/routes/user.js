const express = require("express");
const userRouter = express.Router();
const { Op } = require("sequelize");

const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = ["firstName", "lastName", "photoUrl", "age", "gender", "about", "skills"];

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.findAll({
      where: { toUserId: loggedInUser.id, status: "interested" },
      include: [{ model: User, as: "fromUser", attributes: USER_SAFE_DATA }],
    });

    res.json({ message: "Data fetched successfully", data: connectionRequests });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.findAll({
      where: {
        status: "accepted",
        [Op.or]: [{ toUserId: loggedInUser.id }, { fromUserId: loggedInUser.id }],
      },
      include: [
        { model: User, as: "fromUser", attributes: USER_SAFE_DATA },
        { model: User, as: "toUser", attributes: USER_SAFE_DATA },
      ],
    });

    const data = connectionRequests.map((row) => {
      if (row.fromUserId === loggedInUser.id) return row.toUser;
      return row.fromUser;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const offset = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.findAll({
      where: {
        [Op.or]: [{ fromUserId: loggedInUser.id }, { toUserId: loggedInUser.id }],
      },
      attributes: ["fromUserId", "toUserId"],
    });

    const hideUserIds = new Set();
    connectionRequests.forEach((req) => {
      hideUserIds.add(req.fromUserId);
      hideUserIds.add(req.toUserId);
    });

    const users = await User.findAll({
      where: {
        id: {
          [Op.notIn]: Array.from(hideUserIds),
          [Op.ne]: loggedInUser.id,
        },
      },
      attributes: USER_SAFE_DATA,
      limit,
      offset,
    });

    res.json({ data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
