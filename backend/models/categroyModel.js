const { DataTypes, sequelize } = require("./baseModel"); // Import sequelize and DataTypes
const Category = sequelize.define(
  "Category",
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
      unique: true, // Ensure category name is unique
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sub_category_id: { // Self-referencing foreign key
      type: DataTypes.INTEGER,
      allowNull: false, // Ensure this field cannot be null
      defaultValue: 0, // Default to 0 for top-level categories
    },
    created_by: {
      // Foreign key for the user who created the category
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Referencing the 'users' table
        key: "id", // Primary key of the users table
      },
      onUpdate: "CASCADE", // Update on user update
      onDelete: "SET NULL", // Set to NULL if the referenced user is deleted
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
    tableName: "categories", // Table name should match the migration
    timestamps: false, // Automatically add createdAt and updatedAt
    paranoid: true, // Soft deletes (deleteAt column will be used)
  }
);

Category.hasMany(Category, { 
  foreignKey: 'sub_category_id', 
  as: 'sub_category',  // Alias to access the subcategory
  onDelete: 'SET NULL', 
});

module.exports = Category;
