require("dotenv").config();
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const sqlConnection = require("./db/dbconnection");
const schema = require("./graphql/index.schema");
const resolvers = require("./graphql/index.resolvers");
const CategoryModel = require("./models/CategoryModel")

const app = express();

app.use(
  "/graphql",
  createHandler({
    schema,
    rootValue: resolvers,
    context: (req) => ({ req }),
  })
);

// try to connect to DB
try {
  sqlConnection.authenticate();
  sqlConnection.sync({ alter: true });
  // sqlConnection.sync({ force: true }) // این دستور مدل‌ها را با تنظیم `force: true` دوباره می‌سازد که می‌تواند کمک کننده باشد.

  console.log("Conected successfuly");
} catch (error) {
  console.log("faild to conect", error);
}

// (async () => {
//   const data = await CategoryModel.findByPk(1);
//   console.log(data.dataValues);
  
// })()

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is runing on http://localhost:${port}`);
});
