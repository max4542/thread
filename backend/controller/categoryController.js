const CategoryRepository = require("../Repository/categoryRepository");
const ResponseTrait = require("../traits/responseTrait");
const Category = require("../models/categroyModel");
const categoryRepo = new CategoryRepository();
const { sequelize } = require("../models/baseModel");

const createCategory = async (req, res) => 
  ResponseTrait.success(res, await categoryRepo.create({...req.body, created_by: req.user.id}), "Category created successfully", 201);

const bulkCreate = async (req, res) => 
  Array.isArray(req.body.categories) && req.body.categories.length 
    ? ResponseTrait.success(res, await categoryRepo.bulkCreate(req.body.categories.map(c => ({...c, created_by: req.user.id}))), "Categories created successfully", 201) 
    : ResponseTrait.error(res, "Categories array is required", 400);

const bulkCreateSubcategories = async (req, res) => {
  const { id } = req.params;
  const { subcategories } = req.body;
  const parentCategory = await categoryRepo.findById(id);
  return parentCategory && Array.isArray(subcategories) && subcategories.length 
    ? res.status(201).json({ message: "Subcategories created successfully", subcategories: await Category.bulkCreate(subcategories.map(s => ({...s, sub_category_id: id, created_by: req.user.id}))) })
    : res.status(400).json({ message: "Parent category not found or invalid subcategories array" });
};

const createCategoryAndSubcategories = async (req, res) => {
  const transaction = await sequelize.transaction(); // Start a transaction
  try {
    const { name, description, subcategories } = req.body;

    const category = await categoryRepo.create(
      { name, description, created_by: req.user.id },
      { transaction }
    ); 

    if (Array.isArray(subcategories) && subcategories.length) {
      await Category.bulkCreate(
        subcategories.map(sub => ({
          ...sub,
          sub_category_id: category.id,
          created_by: req.user.id,
        })),
        { transaction }
      ); 
    }

    await transaction.commit(); // Commit the transaction if all succeeds
    ResponseTrait.success(res, category, "Category and subcategories created successfully", 201);
  } catch (error) {
    await transaction.rollback(); // Rollback the transaction on error
    ResponseTrait.error(res, error.message, 400);
  }
};



const getCategories = async (req, res) => 
  ResponseTrait.success(res, await categoryRepo.findAll({ include: [{ model: Category, as: "sub_category" }] }), "Categories fetched successfully");

const getCategoryById = async (req, res) => 
  ResponseTrait.success(res, await categoryRepo.findOne({ where: { id: req.params.id }, include: [{ model: Category, as: "sub_category" }] }), "Category fetched successfully");

const updateCategory = async (req, res) => 
  ResponseTrait.success(res, await categoryRepo.update(req.params.id, {...req.body, created_by: req.user.id}), "Category updated successfully");

const deleteCategory = async (req, res) => 
  ResponseTrait.success(res, await categoryRepo.delete(req.params.id), "Category deleted successfully");

module.exports = {createCategory, bulkCreate,bulkCreateSubcategories,getCategories,getCategoryById,updateCategory,deleteCategory,createCategoryAndSubcategories};
