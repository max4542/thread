'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type:  Sequelize.TEXT('long'),
        allowNull: true,
      },
      sub_category_id: { // Self-referencing foreign key
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      created_by: { // Changed to underscore
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',  // The table the foreign key references
          key: 'id',       // The primary key of the referenced table
        },
        onUpdate: 'CASCADE',  // Update related rows in `categories` if the user is updated
        onDelete: 'SET NULL', // Set `created_by` to `NULL` if the user is deleted
      },
      created_at: {  // Changed to underscore
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {  // Changed to underscore
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('categories');
  },
};
