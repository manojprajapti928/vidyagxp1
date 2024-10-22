const Category = require('../models/Category');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json({ message: 'Categories retrieved successfully', categories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getCategories,
  createCategory,
};
