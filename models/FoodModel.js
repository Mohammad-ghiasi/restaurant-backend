const { DataTypes } = require("@sequelize/core");
const sqlConnection = require("../db/dbconnection");
const Category = require("./CategoryModel"); // Import Category model

const Food = sqlConnection.define(
  "Food", // نام مدل
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 35],
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
      allowNull: false,
    },
    inventory: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    }
  },
  {
    timestamps: false,
  }
);


module.exports = Food;
