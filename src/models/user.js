const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: { len: [4, 50] },
    },
    lastName: {
      type: DataTypes.STRING(50),
    },
    emailId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      validate: { min: 18 },
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    membershipType: {
      type: DataTypes.STRING,
    },
    photoUrl: {
      type: DataTypes.STRING,
      defaultValue: "https://geographyandyou.com/images/user-profile.png",
      validate: {
        isValidUrl(value) {
          if (value && !validator.isURL(value)) {
            throw new Error("Invalid Photo URL: " + value);
          }
        },
      },
    },
    about: {
      type: DataTypes.TEXT,
      defaultValue: "This is a default about of the user!",
    },
    skills: {
      type: DataTypes.JSON,
    },
  },
  {
    timestamps: true,
  }
);

User.prototype.getJWT = async function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

User.prototype.validatePassword = async function (passwordInputByUser) {
  return bcrypt.compare(passwordInputByUser, this.password);
};

module.exports = User;
