const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const ConnectionRequest = sequelize.define(
  "ConnectionRequest",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fromUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
    },
    toUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
    },
    status: {
      type: DataTypes.ENUM("ignored", "interested", "accepted", "rejected"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    indexes: [{ fields: ["fromUserId", "toUserId"] }],
  }
);

ConnectionRequest.addHook("beforeCreate", (request) => {
  if (request.fromUserId === request.toUserId) {
    throw new Error("Cannot send connection request to yourself!");
  }
});

module.exports = ConnectionRequest;
