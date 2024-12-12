require('dotenv').config();
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const sqlConnection = require("./db/dbconnection");

const app = express();

// app.use("/graphql", createHandler({ schema, context: (req) => ({ req }) }));

// try to connect to DB
try {
  sqlConnection.authenticate();
  sqlConnection.sync({ alter: true });
  console.log("Connection successfuly");
} catch (error) {
  console.log("faild to conect", error);
};

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is runing on http://localhost:${port}`);
});
