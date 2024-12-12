const { DataTypes } = require("@sequelize/core");
const sqlConnection = require("../db/dbconnection");

const User = sqlConnection.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
      },
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 40],
      },
    },
    phonenumber: {
      type: DataTypes.STRING,
      validate: {
        len: [10, 12],
        is: /^(\+98|0)?9\d{9}$/,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100],
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
