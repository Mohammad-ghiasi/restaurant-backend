require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const sqlConnection = require("./db/dbconnection");
const schema = require("./graphql/indexSchema");
const resolvers = require("./graphql/indexResolvers");

const app = express();

// Apply CORS middleware with specific configuration
// app.use(
//   cors({
//     origin: "http://localhost:3001", // Replace with your frontend URL
//     credentials: true, // Allow credentials such as cookies or authorization headers
//   })
// );

// Try to connect to DB
try {
  sqlConnection.authenticate();
  sqlConnection.sync({ alter: true });
  console.log("Connected successfully to the database.");
} catch (error) {
  console.error("Failed to connect to the database:", error);
}

const startServer = async () => {
  // console.log(schema); // بررسی کنید که TypeDefs چه مقدار خروجی می‌دهد.
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: ({ req }) => ({ req }),
  });

  await server.start();
  server.applyMiddleware({ app });
};

startServer();

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
