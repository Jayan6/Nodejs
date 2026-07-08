require("dotenv").config(); // must be first — loads env vars before any module reads them

const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

// Define associations between models
const User = require("./models/user");
const ConnectionRequest = require("./models/connectionRequest");
ConnectionRequest.belongsTo(User, { as: "fromUser", foreignKey: "fromUserId" });
ConnectionRequest.belongsTo(User, { as: "toUser", foreignKey: "toUserId" });
User.hasMany(ConnectionRequest, { foreignKey: "fromUserId" });
User.hasMany(ConnectionRequest, { foreignKey: "toUserId" });

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

const server = http.createServer(app);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    server.listen(8000, () => {
      console.log("Server is successfully listening on port 8000...");
    });
  })
  .catch((err) => {
    console.error("Database connection failed!!", err);
  });
