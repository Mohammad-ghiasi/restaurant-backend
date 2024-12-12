require("dotenv").config();
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const sqlConnection = require("./db/dbconnection");
const Category = require("./models/CategoryModel");
const Food = require("./models/FoodModel");
const User = require("./models/UserModel");
const Order = require("./models/OrderModel");
const Address = require("./models/AddressModel");

const app = express();

// app.use("/graphql", createHandler({ schema, context: (req) => ({ req }) }));

// try to connect to DB
try {
  sqlConnection.authenticate();
  sqlConnection.sync({ alter: true });
  // sqlConnection.sync({ force: true }) // این دستور مدل‌ها را با تنظیم `force: true` دوباره می‌سازد که می‌تواند کمک کننده باشد.

  console.log("Conected successfuly");
} catch (error) {
  console.log("faild to conect", error);
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is runing on http://localhost:${port}`);
});
