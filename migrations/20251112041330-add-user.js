'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: Math.random(),
        primaryKey: true,
      },
      gender: Sequelize.STRING(7),
      name: { type: Sequelize.STRING(50), allowNull: false },
      enabled: Sequelize.BOOLEAN,
      email: { type: Sequelize.STRING(50), unique: true, allowNull: false },
      star: {type: Sequelize.INTEGER, defaultValue: 0},
      department: { type: Sequelize.STRING(50) },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("users")
  }
};
// "gender": "female",
//       "name": { "title": "Miss", "first": "Eloane", "last": "Nguyen" },
//       "enabled": true,
//       "email": "eloane.nguyen@example.com",
      
//       "department": "SALES"