const express = require('express');
const { getDashboard } = require('../controllers/dashboardController.js');
const { authenticateToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/dashboard', authenticateToken, getDashboard);

module.exports = router;
