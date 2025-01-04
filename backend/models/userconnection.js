const { DataTypes, sequelize } = require("./baseModel");

const UserConnection = sequelize.define(
  "user_connections",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    socket_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('0', '1'),  // '0' for inactive, '1' for active
      defaultValue: '0',  // Default status is '0' (inactive)
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
    tableName: "user_connections", // Table name as 'user_connections'
    timestamps: false, // Disables automatic timestamps
    paranoid: false, // Disables soft delete (no 'deletedAt')
  }
);

module.exports = UserConnection;
