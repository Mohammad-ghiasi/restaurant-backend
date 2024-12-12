const { DataTypes } = require("@sequelize/core");
const sqlConnection = require("../db/dbconnection");
const User = require("./UserModel"); // Import Category model
const Food = require("./FoodModel"); // Import Category model

const Order = sqlConnection.define(
  "Order", // نام مدل
  {
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
    foodId: {
      type: DataTypes.INTEGER,
      references: {
        model: Food,
        key: "id",
      },
      allowNull: false,
    },
    isDeliver: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Order;
