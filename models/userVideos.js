"use Strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class videos extends Model {
    static associate(models) {}
  }
  videos.init(
    {
      Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: Math.random(),
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "Id" },
        onDelete: "CASCADE",
      },
      videoId: {
        type: DataTypes.INTEGER,
        references: { model: "videos", key: "Id" },
        onDelete: "CASCADE",
      },
      watchedAt: { type: DataTypes.DATE, defaultValue: Date.now() },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "videos",
      timestamps: true,
    }
  );
  return videos;
};
// id": "1",
//       "title": "video 1",
//       "description": "This is description of video 1",
//       "url": "https://rocked.com/testVideo1.mp4",
//       "publishDate": "2025-01-01"