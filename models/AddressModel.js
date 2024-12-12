// AddressModel.js
const { DataTypes } = require("@sequelize/core");
const sqlConnection = require("../db/dbconnection");
const User = require("./UserModel"); // Import Category model

const Address = sqlConnection.define(
  "Address", // نام مدل
  {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [20, 250],
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Address;
