const { Sequelize } = require("@sequelize/core");
const { MySqlDialect } = require("@sequelize/mysql");

const sqlConnection = new Sequelize({
  dialect: MySqlDialect,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 3306,
});

module.exports = sqlConnection;