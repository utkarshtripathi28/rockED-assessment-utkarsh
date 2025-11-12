"use strict";
const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
let db = {};
const dbConfig = require(path.join(__dirname, "../config/config.js"));
let sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  //   dbConfig
  {
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
  }
);
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`Connection to ${dbConfig.database} established`);
  })
  .catch((err) => {
    console.log(err);
  });
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.users = require("./users")(sequelize,Sequelize);
db.videos = require("./videos")(sequelize, Sequelize);
db.userVideos = require("./userVideos")(sequelize, Sequelize);

db.users.belongsToMany(db.videos,{through: db.userVideos, foreignKey: "userId", as:"userVideos"})
db.videos.belongsToMany(db.users,{through: db.userVideos, foreignKey: "videoId", as:"videoUsers"})
module.exports = db;
