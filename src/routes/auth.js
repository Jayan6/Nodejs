const express = require('express')

const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");

const bcrypt = require("bcrypt");



authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);

    const {firstName, lastName, email, password} = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
  console.log("Password hash:", passwordHash);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.status(201).send("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).send("Error creating user: " + error.message);
  }
});
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login successful");
    }
      else {
throw new Error("Invalid password");
    }
  } catch (error) {
    res.status(400).send("Error logging in: " + error.message);
  }
});

authRouter.post("/logout", (req, res) => {

    res.cookie("token", null, { expires: new Date(Date.now()) }); // Clear the token cookie
  // Implement logout logic (e.g., clear session or token)
  res.send("Logout successful");
});

module.exports = authRouter;