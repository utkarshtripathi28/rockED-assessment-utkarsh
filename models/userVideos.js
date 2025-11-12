"use Strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userVideos extends Model {
    static associate(models) {}
  }
  userVideos.init(
    {
      Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        // references: { model: "users", key: "Id" },
        // onDelete: "CASCADE",
      },
      videoId: {
        type: DataTypes.INTEGER,
        // references: { model: "videos", key: "Id" },
        // onDelete: "CASCADE",
      },
      watchedAt: { type: DataTypes.DATE, defaultValue: Date.now() },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "userVideos",
      timestamps: true,
    }
  );
  return userVideos;
};