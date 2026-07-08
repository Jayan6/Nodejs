const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
};

module.exports = { sequelize, connectDB };
