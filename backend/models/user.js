const { DataTypes, sequelize } = require("./baseModel");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    github_username: {
      // Changed to underscore
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure unique GitHub username
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      // Changed to underscore
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.ENUM("0", "1"), // Enum for admin role
      allowNull: false,
      defaultValue: "0", // Default to normal user (0)
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "users", // Table name as 'users'
    timestamps: false, // Disables automatic timestamps
    paranoid: false, // Disables soft delete (no 'deletedAt')
  }
);

module.exports = User;
