"use Strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {}
  }
  users.init(
    {
      Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      gender: DataTypes.STRING(7),
      name: { type: DataTypes.STRING(50), allowNull: false },
      enabled: DataTypes.BOOLEAN,
      email: { type: DataTypes.STRING(50), unique: true, allowNull: false },
      star: { type: DataTypes.INTEGER, defaultValue: 0 },
      department: { type: DataTypes.STRING(50) },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "users",
      timestamps: true,
    }
  );
  return users;
};
