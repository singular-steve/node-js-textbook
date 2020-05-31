require('dotenv').config();

module.exports = {
  development: {
    username: "rawcoder",
    password: "password",
    database: "nodejs",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false
  },
  production: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "nodejs",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false,
    logging: false,
  }
}