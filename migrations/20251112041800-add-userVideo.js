"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("userVideos", {
      Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "Id" },
        onDelete: "CASCADE",
      },
      videoId: {
        type: Sequelize.INTEGER,
        references: { model: "videos", key: "Id" },
        onDelete: "CASCADE",
      },
      watchedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("userVideos");
  },
};