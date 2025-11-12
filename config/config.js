let path = require("path");
let f = path.join(__dirname, "../.env");
let dotenv = require("dotenv").config({ path: f });
let config = dotenv.parsed
module.exports = {
  username: process.env.DBUSERNAME || config.DBUSERNAME,
  database: process.env.DBNAME || config.DBNAME,
  password: process.env.DBPASS || config.DBPASS,
  host: process.env.DBHOST || config.DBHOST,
  port: process.env.DBPORT || config.DBPORT,
  dialect: 'mysql',
  dialectOptions: {
    timezone: "+05:30",
  },
};
