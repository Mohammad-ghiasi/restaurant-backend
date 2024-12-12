// CategoryModel.js
const { DataTypes } = require("@sequelize/core");
const sqlConnection = require("../db/dbconnection");

const Category = sqlConnection.define(
  "Category", // نام مدل
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
      },
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 255],
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Category;
