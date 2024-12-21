'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      github_username: { // Changed to underscore
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Ensure unique GitHub username
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone_number: { // Changed to underscore
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: { // Added password field
        type: Sequelize.STRING,
        allowNull: false,
      },
      admin: {
        type: Sequelize.ENUM('0', '1'), // Enum for admin role
        allowNull: false,
        defaultValue: '0', // Default to normal user (0)
      },
      created_at: { // Changed to underscore
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: { // Changed to underscore
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
