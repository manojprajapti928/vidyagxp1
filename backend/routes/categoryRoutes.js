const express = require('express');

const { createCategory, getCategories } = require('../controllers/categoryController.js');

const router = express.Router();


router.post('/categories',createCategory);
router.get('/categories',getCategories);


module.exports = router;

