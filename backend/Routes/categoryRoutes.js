const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');

router.post('/categories', categoryController.createCategory);
router.post('/bulk/categories', categoryController.bulkCreate);
router.post('/category/create/:id', categoryController.bulkCreateSubcategories);
router.get('/categories', categoryController.getCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);
module.exports = router;
